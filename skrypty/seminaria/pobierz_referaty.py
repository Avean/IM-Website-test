#!/usr/bin/env python3
"""Referaty z osobnych repozytoriów seminariów — pobieranie przed budowaniem strony (patrz README,
„Repozytoria seminariów”).

Dla każdego seminarium src/content/seminaria/<id>.md z polem `repozytorium: właściciel/nazwa`:
  1. klonuje (płytko, bez tokenu; prywatne — z tokenem SEMINARIA_TOKEN) to repozytorium,
  2. sprawdza referaty z jego folderu referaty/ według schematu kolekcji `referaty`
     (src/content.config.ts); referat z błędem jest pomijany z ostrzeżeniem — jeden zły plik
     nie blokuje budowania strony,
  3. zastępuje nimi folder src/content/referaty/<id>/ — POBRANE NADPISUJĄ FOLDER: referaty tego
     seminarium leżące w głównym repozytorium są ignorowane (ostrzeżenie z listą),
  4. kopiuje pliki dozwolonych typów z folderu pliki/ do public/pliki/seminaria/<id>/,
  5. zapisuje pobrany stan w .cache/seminaria/<id>/ (workflow przechowuje go w actions/cache).
Gdy pobranie się nie uda: ostrzeżenie i ostatni dobry stan z .cache/seminaria/<id>/ (jeśli jest),
a bez niego — bez zmian (to, co jest w głównym repozytorium).
Gdy żadne seminarium nie ma pola `repozytorium`, skrypt niczego nie zmienia.
Skrypt zawsze kończy się kodem 0 (poza trybem --sprawdz).

Użycie (w katalogu głównym repozytorium strony):
  python3 skrypty/seminaria/pobierz_referaty.py                 # wszystkie seminaria z repozytorium
  python3 skrypty/seminaria/pobierz_referaty.py --tylko topologia
  python3 pobierz_referaty.py --sprawdz <katalog>               # sama kontrola repozytorium seminarium
Lokalnie służy tylko do podglądu (pobranych plików nie commituj) albo do przywrócenia seminarium
do głównego repozytorium (README).

Zmienne środowiskowe:
  SEMINARIA_TOKEN  token do odczytu prywatnych repozytoriów seminariów (publiczne — niepotrzebny)
  SEMINARIA_URL    wzór adresu repozytorium, domyślnie https://github.com/{repo}.git (testy: file:///…/{repo})
  SEMINARIA_CACHE  katalog ostatnich dobrych stanów, domyślnie .cache/seminaria
"""
import argparse, base64, datetime as dt, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

import yaml

REPO_RE = re.compile(r'^[A-Za-z0-9][A-Za-z0-9-]{0,38}/[A-Za-z0-9._-]{1,100}$')
TERMIN_RE = re.compile(r'^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2})(?::\d{2})?)?$')
# Typy plików kopiowanych do public/ (bez HTML/SVG/JS — mogłyby wykonać skrypt w domenie strony).
DOZWOLONE = {
    'pdf', 'djvu', 'ps', 'eps', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif',
    'txt', 'csv', 'tex', 'bib', 'zip', 'gz', 'tgz', 'bz2', 'xz', '7z',
    'ppt', 'pptx', 'pps', 'ppsx', 'odp', 'key', 'doc', 'docx', 'odt', 'rtf', 'xls', 'xlsx', 'ods',
    'ipynb', 'py', 'r', 'm', 'nb', 'mp3', 'mp4', 'webm', 'mov',
}
MAKS_PLIK = 50 * 1024 * 1024
# Surowy HTML, który mógłby uruchomić skrypt na stronie Instytutu.
NIEBEZPIECZNE = re.compile(
    r'<\s*/?\s*(script|iframe|frame|object|embed|style|form|meta|link|base)\b'   # niebezpieczne znaczniki
    r'|<[a-z][a-z0-9-]*\b[^<>\n]*\son[a-z]+\s*=\s*["\']'                       # onclick="…" itp. w znaczniku
    r'|(?:href|src|action)\s*=\s*["\']?\s*javascript\s*:|\]\(\s*<?\s*javascript\s*:',  # linki javascript:
    re.I)
POLA_TEKSTOWE = ('tytul', 'prelegent', 'afiliacja', 'sala')
W_ACTIONS = os.environ.get('GITHUB_ACTIONS') == 'true'


def adnotacja(rodzaj, tytul, tekst):
    """Adnotacja GitHub Actions (notice/warning/error) albo zwykły wydruk lokalnie."""
    if W_ACTIONS:
        t = tytul.replace('%', '%25').replace(':', '%3A').replace(',', '%2C')
        m = tekst.replace('%', '%25').replace('\r', '%0D').replace('\n', '%0A')
        print(f'::{rodzaj} title={t}::{m}', flush=True)
    else:
        print(f'[{rodzaj}] {tytul}: {tekst}', flush=True)


def frontmatter(tekst):
    """(słownik, treść) z pliku Markdown z frontmatterem YAML; wyjątek ValueError przy błędzie."""
    tekst = tekst.lstrip('﻿').replace('\r\n', '\n')
    m = re.match(r'^---[ \t]*\n(.*?)(?:^|\n)---[ \t]*(?:\n|$)(.*)$', tekst, re.S | re.M)
    if not m:
        raise ValueError('brak frontmattera (plik musi zaczynać się od ---)')
    try:
        dane = yaml.safe_load(m.group(1)) if m.group(1).strip() else {}
    except yaml.YAMLError as e:
        raise ValueError(f'błąd YAML: {str(e).splitlines()[0]}')
    if not isinstance(dane, dict):
        raise ValueError('frontmatter nie jest słownikiem pól')
    return dane, m.group(2)


def _tekst(v):
    if isinstance(v, bool) or isinstance(v, (list, dict)):
        raise ValueError
    if isinstance(v, (int, float)):
        return str(v)
    if isinstance(v, str):
        return v
    raise ValueError


def _termin(v):
    if isinstance(v, dt.datetime):
        if v.tzinfo is not None:
            try:
                from zoneinfo import ZoneInfo
                v = v.astimezone(ZoneInfo('Europe/Warsaw'))
            except Exception:
                pass
        return v.strftime('%Y-%m-%d') if (v.hour, v.minute) == (0, 0) else v.strftime('%Y-%m-%dT%H:%M')
    if isinstance(v, dt.date):
        return v.strftime('%Y-%m-%d')
    m = TERMIN_RE.match(str(v).strip()) if isinstance(v, str) else None
    if not m:
        raise ValueError
    dt.datetime.strptime(m.group(1) + 'T' + (m.group(2) or '00:00'), '%Y-%m-%dT%H:%M')  # czy data istnieje
    return m.group(1) + (f'T{m.group(2)}' if m.group(2) else '')


def sprawdz_referat(tekst):
    """Kontrola referatu jak w schemacie `referaty` (src/content.config.ts).
    Zwraca (znormalizowany tekst pliku albo None, lista błędów, lista uwag)."""
    bledy, uwagi = [], []
    try:
        dane, tresc = frontmatter(tekst)
    except ValueError as e:
        return None, [str(e)], uwagi
    fm = {}
    for k in ('tytul', 'prelegent'):
        try:
            v = _tekst(dane.get(k)).strip() if dane.get(k) is not None else ''
        except ValueError:
            v = ''
        if v:
            fm[k] = v
        else:
            bledy.append(f'brak wymaganego pola „{k}” (albo nie jest tekstem)')
    for k in ('afiliacja', 'sala'):
        v = dane.get(k)
        if v is None or v == '':
            continue
        try:
            fm[k] = _tekst(v)
        except ValueError:
            uwagi.append(f'pole „{k}” nie jest tekstem — pominięte')
    if dane.get('termin') in (None, ''):
        bledy.append('brak wymaganego pola „termin”')
    else:
        try:
            fm['termin'] = _termin(dane['termin'])
        except ValueError:
            bledy.append(f'pole „termin” musi mieć postać RRRR-MM-DD albo RRRR-MM-DDTGG:MM (jest: {dane["termin"]!r})')
    pliki = dane.get('pliki')
    fm['pliki'] = []
    if pliki not in (None, ''):
        if not isinstance(pliki, list):
            uwagi.append('pole „pliki” nie jest listą — pominięte')
        else:
            for p in pliki:
                if isinstance(p, dict) and isinstance(p.get('plik'), str) and p['plik'].strip():
                    w = {'plik': p['plik'].strip()}
                    if p.get('nazwa') not in (None, ''):
                        try:
                            w = {'nazwa': _tekst(p['nazwa']), **w}
                        except ValueError:
                            pass
                    fm['pliki'].append(w)
                else:
                    uwagi.append(f'pozycja pola „pliki” bez pliku — pominięta: {p!r}'[:200])
    op = dane.get('opublikowany')
    if op not in (None, ''):
        if isinstance(op, str) and op.strip().lower() in ('true', 'false'):
            op = op.strip().lower() == 'true'
        if isinstance(op, bool):
            fm['opublikowany'] = op
        else:
            bledy.append('pole „opublikowany” musi mieć wartość true albo false')
    if dane.get('seminarium') not in (None, ''):
        uwagi.append('pole „seminarium” zignorowane — referat należy do seminarium swojego repozytorium')
    for k in POLA_TEKSTOWE:
        if k in fm and NIEBEZPIECZNE.search(fm[k]):
            bledy.append(f'pole „{k}” zawiera niedozwolony kod HTML/JavaScript')
    if NIEBEZPIECZNE.search(tresc):
        bledy.append('streszczenie zawiera niedozwolony kod HTML/JavaScript (np. <script>, <iframe>, onclick=)')
    if bledy:
        return None, bledy, uwagi
    q = lambda s: json.dumps(s, ensure_ascii=False)  # JSON-owy napis = poprawny napis YAML w cudzysłowie
    linie = ['---'] + [f'{k}: {q(fm[k])}' for k in ('tytul', 'prelegent', 'afiliacja', 'termin', 'sala') if k in fm]
    if fm['pliki']:
        linie.append('pliki:')
        for p in fm['pliki']:
            linie += [('  - ' if i == 0 else '    ') + f'{k}: {q(v)}' for i, (k, v) in enumerate(p.items())]
    if 'opublikowany' in fm:
        linie.append(f'opublikowany: {"true" if fm["opublikowany"] else "false"}')
    linie.append('---')
    return '\n'.join(linie) + '\n' + (tresc if tresc.startswith('\n') else '\n' + tresc), [], uwagi


def zbierz(katalog):
    """Sprawdza repozytorium seminarium (katalog z referaty/ i pliki/).
    Zwraca (referaty {ścieżka względna: tekst}, pliki {ścieżka względna: Path}, błędy, uwagi)."""
    katalog = Path(katalog)
    referaty, pliki, bledy, uwagi = {}, {}, [], []
    for p in sorted((katalog / 'referaty').rglob('*')):
        rel = p.relative_to(katalog / 'referaty').as_posix()
        if p.is_dir() or p.name.startswith('.') or any(c.startswith('.') for c in Path(rel).parts):
            continue
        if p.is_symlink() or not p.is_file():
            uwagi.append(f'referaty/{rel}: dowiązanie lub plik specjalny — pominięty')
            continue
        if p.suffix.lower() != '.md':
            uwagi.append(f'referaty/{rel}: to nie jest plik .md — pominięty')
            continue
        try:
            tekst = p.read_text(encoding='utf-8')
        except (UnicodeDecodeError, OSError) as e:
            bledy.append(f'referaty/{rel}: nie da się odczytać jako UTF-8 ({e.__class__.__name__}) — pominięty')
            continue
        wynik, b, u = sprawdz_referat(tekst)
        uwagi += [f'referaty/{rel}: {x}' for x in u]
        if wynik is None:
            bledy += [f'referaty/{rel}: {x} — referat pominięty' for x in b]
        else:
            referaty[rel] = wynik
    if (katalog / 'pliki').is_dir():
        for p in sorted((katalog / 'pliki').rglob('*')):
            rel = p.relative_to(katalog / 'pliki').as_posix()
            if p.is_dir() or any(c.startswith('.') for c in Path(rel).parts):
                continue
            if p.is_symlink() or not p.is_file():
                uwagi.append(f'pliki/{rel}: dowiązanie lub plik specjalny — pominięty')
            elif p.suffix.lower().lstrip('.') not in DOZWOLONE:
                uwagi.append(f'pliki/{rel}: niedozwolony typ pliku — pominięty')
            elif p.stat().st_size > MAKS_PLIK:
                uwagi.append(f'pliki/{rel}: większy niż {MAKS_PLIK // 2**20} MB — pominięty')
            else:
                pliki[rel] = p
    return referaty, pliki, bledy, uwagi


def klonuj(repo, cel):
    """Płytki klon repozytorium; zwraca (True, hash) albo (False, opis błędu)."""
    url = os.environ.get('SEMINARIA_URL', 'https://github.com/{repo}.git').replace('{repo}', repo)
    cmd = ['git', '-c', 'http.https://github.com/.extraheader=']
    token = os.environ.get('SEMINARIA_TOKEN', '').strip()
    if token:
        cmd += ['-c', 'http.extraheader=AUTHORIZATION: basic ' + base64.b64encode(f'x-access-token:{token}'.encode()).decode()]
    cmd += ['clone', '--depth', '1', '--quiet', '--no-tags', url, str(cel)]
    env = {**os.environ, 'GIT_TERMINAL_PROMPT': '0', 'GIT_LFS_SKIP_SMUDGE': '1'}
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=180, env=env, cwd=tempfile.gettempdir())
    except subprocess.TimeoutExpired:
        return False, 'przekroczony czas pobierania (180 s)'
    if r.returncode != 0:
        opis = (r.stderr.strip().splitlines() or ['nieznany błąd git'])[-1]
        if token:
            opis = opis.replace(token, '***')
        return False, f'{opis} (repozytorium nie istnieje, jest prywatne bez tokenu albo GitHub jest niedostępny)'
    h = subprocess.run(['git', '-C', str(cel), 'rev-parse', '--short', 'HEAD'], capture_output=True, text=True)
    if not (Path(cel) / 'referaty').is_dir():
        return False, 'w repozytorium nie ma folderu referaty/ (czy to na pewno repozytorium seminarium?)'
    return True, h.stdout.strip()


def zapisz_stan(cel, referaty, pliki, opis):
    """Zapisuje zestaw referatów i plików do katalogu cel (referaty/, pliki/, zrodlo.json)."""
    tmp = Path(str(cel) + '.nowy')
    shutil.rmtree(tmp, ignore_errors=True)
    for rel, tekst in referaty.items():
        (tmp / 'referaty' / rel).parent.mkdir(parents=True, exist_ok=True)
        (tmp / 'referaty' / rel).write_text(tekst, encoding='utf-8')
    for rel, zrodlo in pliki.items():
        (tmp / 'pliki' / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(zrodlo, tmp / 'pliki' / rel, follow_symlinks=False)
    tmp.mkdir(parents=True, exist_ok=True)
    (tmp / 'zrodlo.json').write_text(json.dumps(opis, ensure_ascii=False, indent=1), encoding='utf-8')
    shutil.rmtree(cel, ignore_errors=True)
    tmp.rename(cel)


def wczytaj_stan(kat):
    referaty = {p.relative_to(kat / 'referaty').as_posix(): p.read_text(encoding='utf-8')
                for p in sorted((kat / 'referaty').rglob('*.md'))} if (kat / 'referaty').is_dir() else {}
    pliki = {p.relative_to(kat / 'pliki').as_posix(): p
             for p in sorted((kat / 'pliki').rglob('*')) if p.is_file()} if (kat / 'pliki').is_dir() else {}
    return referaty, pliki


def wstaw(korzen, sid, referaty, pliki):
    """Zastępuje src/content/referaty/<sid>/ pobranymi referatami; pliki dokłada do public/pliki/seminaria/<sid>/."""
    folder = korzen / 'src' / 'content' / 'referaty' / sid
    stare = sorted(p.relative_to(folder).as_posix() for p in folder.rglob('*.md')) if folder.is_dir() else []
    tmp = folder.with_name(folder.name + '.pobrane')
    shutil.rmtree(tmp, ignore_errors=True)
    for rel, tekst in referaty.items():
        (tmp / rel).parent.mkdir(parents=True, exist_ok=True)
        (tmp / rel).write_text(tekst, encoding='utf-8')
    tmp.mkdir(parents=True, exist_ok=True)
    shutil.rmtree(folder, ignore_errors=True)
    tmp.rename(folder)
    cel = korzen / 'public' / 'pliki' / 'seminaria' / sid
    for rel, zrodlo in pliki.items():
        (cel / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(zrodlo, cel / rel, follow_symlinks=False)
    return stare


def seminaria_z_repozytorium(korzen):
    """Lista (id, repozytorium, plik) seminariów z niepustym polem `repozytorium`."""
    wynik = []
    baza = korzen / 'src' / 'content' / 'seminaria'
    for p in sorted(baza.rglob('*.md')):
        sid = p.relative_to(baza).with_suffix('').as_posix()
        try:
            dane, _ = frontmatter(p.read_text(encoding='utf-8'))
        except (ValueError, OSError) as e:
            adnotacja('warning', 'Repozytoria seminariów', f'{p}: {e} — pomijam')
            continue
        repo = dane.get('repozytorium')
        if repo in (None, '') or (isinstance(repo, str) and not repo.strip()):
            continue
        repo = re.sub(r'^(https?://)?(www\.)?github\.com/', '', str(repo).strip()).removesuffix('.git').strip('/')
        wynik.append((sid, repo, p))
    return wynik


def pobierz(korzen, tylko=None):
    korzen = Path(korzen).resolve()
    cache = Path(os.environ.get('SEMINARIA_CACHE') or korzen / '.cache' / 'seminaria')
    lista = [s for s in seminaria_z_repozytorium(korzen) if not tylko or s[0] in tylko]
    if not lista:
        print('Żadne seminarium nie ma osobnego repozytorium — nic do pobrania (strona bez zmian).')
        return {'pobrane': 0}
    pobrane, podsumowanie = 0, []
    for sid, repo, plik in lista:
        try:
            if not REPO_RE.match(repo):
                adnotacja('warning', f'Seminarium {sid}', f'Pole „repozytorium” w {plik.name} ma niepoprawną postać „{repo}” (oczekiwane: właściciel/nazwa). Zostają referaty z głównego repozytorium.')
                podsumowanie.append(f'{sid}: niepoprawna nazwa repozytorium')
                continue
            with tempfile.TemporaryDirectory(prefix=f'sem-{sid.replace("/", "-")}-') as tmp:
                ok, info = klonuj(repo, Path(tmp) / 'repo')
                if ok:
                    referaty, pliki, bledy, uwagi = zbierz(Path(tmp) / 'repo')
                    for b in bledy:
                        adnotacja('warning', f'Referat seminarium {sid} pominięty', f'{repo}: {b}')
                    if uwagi:
                        adnotacja('notice', f'Seminarium {sid} — uwagi', '\n'.join(f'{repo}: {u}' for u in uwagi[:30]))
                    zapisz_stan(cache / sid, referaty, pliki, {'repozytorium': repo, 'commit': info,
                                'pobrano': dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds')})
                    stan = cache / sid
                    zrodlo = f'{repo}@{info}'
                    pobrane += 1
                else:
                    stan = cache / sid
                    opis = json.loads((stan / 'zrodlo.json').read_text()) if (stan / 'zrodlo.json').is_file() else {}
                    if opis.get('repozytorium') == repo:
                        adnotacja('warning', f'Seminarium {sid}: nie udało się pobrać referatów',
                                  f'{repo}: {info}. Używam ostatniego pobranego stanu ({opis.get("commit")}, {opis.get("pobrano")}).')
                        zrodlo = f'{repo}@{opis.get("commit")} (pamięć podręczna)'
                    else:
                        adnotacja('warning', f'Seminarium {sid}: nie udało się pobrać referatów',
                                  f'{repo}: {info}. Brak wcześniej pobranego stanu — zostają referaty z głównego repozytorium (src/content/referaty/{sid}/, jeśli są).')
                        podsumowanie.append(f'{sid}: błąd pobierania, bez zmian')
                        continue
                referaty, pliki = wczytaj_stan(stan)
                stare = wstaw(korzen, sid, referaty, pliki)
            if stare:
                adnotacja('warning', f'Seminarium {sid}: referaty w głównym repozytorium',
                          f'Seminarium ma osobne repozytorium {repo}, a w src/content/referaty/{sid}/ głównego repozytorium są pliki ({len(stare)}): '
                          + ', '.join(stare[:10]) + (' …' if len(stare) > 10 else '')
                          + '. Na stronie są tylko referaty z repozytorium seminarium — przenieś te pliki tam albo usuń je z głównego repozytorium.')
            podsumowanie.append(f'{sid}: {len(referaty)} referatów, {len(pliki)} plików z {zrodlo}')
        except Exception as e:  # jeden zepsuty przypadek nie może zatrzymać pozostałych ani budowania
            adnotacja('warning', f'Seminarium {sid}: nieoczekiwany błąd', f'{e.__class__.__name__}: {e}')
            podsumowanie.append(f'{sid}: nieoczekiwany błąd')
    adnotacja('notice', 'Referaty z repozytoriów seminariów', '\n'.join(podsumowanie))
    return {'pobrane': pobrane}


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('--korzen', default='.', help='katalog główny repozytorium strony (domyślnie bieżący)')
    ap.add_argument('--tylko', nargs='+', metavar='ID', help='tylko te seminaria (nazwy plików z src/content/seminaria)')
    ap.add_argument('--sprawdz', metavar='KATALOG', help='tylko kontrola repozytorium seminarium (kod 1, gdy są błędy)')
    a = ap.parse_args()
    if a.sprawdz:
        referaty, pliki, bledy, uwagi = zbierz(a.sprawdz)
        for u in uwagi:
            adnotacja('warning', 'Uwaga', u)
        for b in bledy:
            adnotacja('error', 'Błąd referatu', b)
        zle = {b.split(':', 1)[0] for b in bledy}
        print(f'Sprawdzono referatów: {len(referaty) + len(zle)} (z błędami: {len(zle)}), plików: {len(pliki)}.')
        sys.exit(1 if bledy else 0)
    wynik = pobierz(a.korzen, a.tylko)
    if os.environ.get('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'], 'a', encoding='utf-8') as f:
            f.write(f'zapisz={"tak" if wynik["pobrane"] else "nie"}\n')


if __name__ == '__main__':
    main()
