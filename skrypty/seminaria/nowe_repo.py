#!/usr/bin/env python3
"""Automat zakładania repozytoriów seminariów — uruchamia go workflow
.github/workflows/nowe-repo-seminarium.yml (patrz README, „Repozytoria seminariów”).

Dla każdego seminarium src/content/seminaria/<id>.md z `osobne_repozytorium: true` i pustym `repozytorium`:
  1. zakłada repozytorium <WLASCICIEL>/<PREFIKS><id> (token IM_ADMIN_TOKEN),
  2. wgrywa do niego szablon szablony/seminarium/ (z podstawioną nazwą seminarium) razem z referatami
     przeniesionymi z src/content/referaty/<id>/ (pliki dołączone do tych referatów zostają w public/
     głównego repozytorium — ich adresy się nie zmieniają),
  3. ustawia w nim sekret IM_STRONA_TOKEN (wartość z sekretu głównego repozytorium; gdy jej brak,
     zakłada, że to sekret organizacji),
  4. w głównym repozytorium wpisuje `repozytorium: "<właściciel>/<nazwa>"` do pliku seminarium i usuwa
     przeniesione referaty (jeden commit bota), a potem zleca przebudowę strony.
Bez sekretu IM_ADMIN_TOKEN: tylko ostrzeżenie, nic nie robi (kod 0). PROBA=tak: tylko opis planu.
Repozytorium o tej nazwie, które już istnieje, nie jest nadpisywane: jeśli to repozytorium tego
seminarium (jego .pages.yml zawiera /pliki/seminaria/<id>), automat tylko je wpisuje (np. po przerwanym
przebiegu); w przeciwnym razie — ostrzeżenie.

Zmienne środowiskowe:
  IM_ADMIN_TOKEN   token: zakładanie repozytoriów, ich sekrety, wgranie plików z workflow (patrz README)
  IM_STRONA_TOKEN  token kopiowany do repozytorium seminarium (przebudowa strony; opcjonalny)
  GH_TOKEN         token głównego repozytorium (GITHUB_TOKEN) — commit i zlecenie przebudowy
  WLASCICIEL       konto albo organizacja na repozytoria seminariów (domyślnie Avean)
  PREFIKS          początek nazwy repozytorium (domyślnie seminarium-)
  WIDOCZNOSC       public (domyślnie) albo private
  STRONA_REPO      repozytorium strony (domyślnie GITHUB_REPOSITORY)
  GALAZ            gałąź głównego repozytorium (domyślnie main)
  PROBA            „tak” = nic nie zmieniaj, tylko wypisz plan
  GIT_URL_WZOR     (testy) wzór adresu do wgrania szablonu, domyślnie https://github.com/{repo}.git
"""
import base64, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pobierz_referaty import adnotacja, frontmatter  # noqa: E402

KORZEN = Path(__file__).resolve().parents[2]
SZABLON = KORZEN / 'szablony' / 'seminarium'
NAZWA_RE = re.compile(r'^[A-Za-z0-9._-]{1,100}$')


def env(nazwa, domyslnie=''):
    return (os.environ.get(nazwa) or '').strip() or domyslnie


def gh(args, token, wejscie=None):
    """Wywołanie gh z podanym tokenem; zwraca CompletedProcess."""
    e = {**os.environ, 'GH_TOKEN': token, 'GH_PROMPT_DISABLED': '1', 'NO_COLOR': '1'}
    e.pop('GITHUB_TOKEN', None)
    return subprocess.run(['gh', *args], input=wejscie, capture_output=True, text=True, env=e, timeout=120)


def blad(r):
    return ((r.stderr or '') + (r.stdout or '')).strip().splitlines()[-1:] or ['?']


def git(args, cwd, **kw):
    return subprocess.run(['git', *args], cwd=cwd, capture_output=True, text=True, timeout=180, **kw)


def kandydaci():
    """Seminaria do obsłużenia: (id, nazwa, plik)."""
    wynik = []
    baza = KORZEN / 'src' / 'content' / 'seminaria'
    for p in sorted(baza.glob('*.md')):
        try:
            dane, _ = frontmatter(p.read_text(encoding='utf-8'))
        except ValueError as e:
            adnotacja('warning', 'Repozytoria seminariów', f'{p.name}: {e} — pomijam')
            continue
        if dane.get('osobne_repozytorium') is True and not str(dane.get('repozytorium') or '').strip():
            wynik.append((p.stem, str(dane.get('nazwa') or p.stem), p))
    return wynik


def ustaw_repozytorium(tekst, repo):
    """Wpisuje `repozytorium: "<repo>"` do frontmattera (zamienia pustą linię albo dopisuje na końcu)."""
    m = re.match(r'^(---[ \t]*\n)(.*?\n)(---[ \t]*(?:\n|$))', tekst, re.S)
    if not m:
        raise ValueError('brak frontmattera')
    fm, linia = m.group(2), f'repozytorium: "{repo}"\n'
    if re.search(r'^repozytorium:.*\n', fm, re.M):
        fm = re.sub(r'^repozytorium:.*\n', lambda _: linia, fm, count=1, flags=re.M)
    else:
        fm += linia
    nowy = m.group(1) + fm + tekst[m.end(2):]
    if frontmatter(nowy)[0].get('repozytorium') != repo:
        raise ValueError('nie udało się wpisać pola repozytorium')
    return nowy


def referaty_do_przeniesienia(sid):
    folder = KORZEN / 'src' / 'content' / 'referaty' / sid
    r = git(['ls-files', '-z', '--', f'src/content/referaty/{sid}/'], KORZEN)
    sciezki = [KORZEN / x for x in r.stdout.split('\0') if x.endswith('.md')] if r.returncode == 0 else list(folder.rglob('*.md'))
    return sorted((p, p.relative_to(folder).as_posix()) for p in sciezki if p.is_file())


def przygotuj(cel, sid, nazwa, repo, strona_repo, referaty):
    """Katalog z zawartością nowego repozytorium: szablon z podstawieniami + przenoszone referaty."""
    shutil.copytree(SZABLON, cel)
    zamiany = {
        '__NAZWA__': nazwa.replace('"', '”').replace('\\', ''),
        '__SEMINARIUM__': sid,
        '__STRONA_REPO__': strona_repo,
        '__REPOZYTORIUM__': repo,
    }
    for p in cel.rglob('*'):
        if p.is_file() and p.suffix in ('.yml', '.yaml', '.md'):
            t = p.read_text(encoding='utf-8')
            for k, v in zamiany.items():
                t = t.replace(k, v)
            p.write_text(t, encoding='utf-8')
    for zrodlo, rel in referaty:
        (cel / 'referaty' / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(zrodlo, cel / 'referaty' / rel)


def wgraj(cel, repo, token, nazwa):
    url = env('GIT_URL_WZOR', 'https://github.com/{repo}.git').replace('{repo}', repo)
    naglowek = 'AUTHORIZATION: basic ' + base64.b64encode(f'x-access-token:{token}'.encode()).decode()
    kroki = [
        ['init', '-q', '-b', 'main'],
        ['add', '-A'],
        ['-c', 'user.name=github-actions[bot]', '-c', 'user.email=41898282+github-actions[bot]@users.noreply.github.com',
         'commit', '-q', '-m', f'Repozytorium referatów seminarium „{nazwa}” (automat strony Instytutu)'],
        ['-c', 'http.https://github.com/.extraheader=', '-c', f'http.extraheader={naglowek}', 'push', '-q', url, 'HEAD:main'],
    ]
    for k in kroki:
        r = git(k, cel, env={**os.environ, 'GIT_TERMINAL_PROMPT': '0'})
        if r.returncode != 0:
            return (r.stderr.strip().splitlines() or ['?'])[-1].replace(token, '***')
    return None


def nasze_repozytorium(repo, sid, token):
    """Czy istniejące repozytorium to repozytorium tego seminarium (założone wcześniej przez automat)?"""
    r = gh(['api', f'repos/{repo}/contents/.pages.yml', '--jq', '.content'], token)
    if r.returncode != 0:
        return False
    try:
        return f'/pliki/seminaria/{sid}' in base64.b64decode(r.stdout.strip()).decode('utf-8', 'replace')
    except ValueError:
        return False


def main():
    proba = env('PROBA').lower() in ('tak', 'true', '1', 'yes')
    lista = kandydaci()
    if not lista:
        print('Żadne seminarium nie czeka na osobne repozytorium — nic do zrobienia.')
        return 0
    wlasciciel = env('WLASCICIEL', 'Avean')
    prefiks = env('PREFIKS', 'seminarium-')
    prywatne = env('WIDOCZNOSC', 'public').lower() == 'private'
    strona_repo = env('STRONA_REPO', env('GITHUB_REPOSITORY', 'Avean/IM-Website-test'))
    galaz = env('GALAZ', 'main')
    admin, strona_token = env('IM_ADMIN_TOKEN'), env('IM_STRONA_TOKEN')
    plan = [(sid, nazwa, plik, f'{wlasciciel}/{prefiks}{sid}') for sid, nazwa, plik in lista]

    if proba or not admin:
        opis = '\n'.join(f'{sid} („{nazwa}”) → {repo}' + (f'{" (prywatne)" if prywatne else ""}, przeniesione referaty: '
                         f'{len(referaty_do_przeniesienia(sid))}') for sid, nazwa, _, repo in plan)
        if proba:
            opis += (f'\nSekret IM_ADMIN_TOKEN: {"jest" if admin else "BRAK"}; '
                     f'IM_STRONA_TOKEN: {"jest" if strona_token else "brak (zakładam sekret organizacji)"}.')
            adnotacja('notice', 'Repozytoria seminariów — próba (nic nie zmieniono)', opis)
        else:
            adnotacja('warning', 'Repozytoria seminariów — brak sekretu IM_ADMIN_TOKEN',
                      'Seminaria czekają na osobne repozytorium, ale automat nie ma tokenu — nic nie zrobiono. '
                      'Ustaw sekret IM_ADMIN_TOKEN (README, „Repozytoria seminariów”) i uruchom workflow ponownie.\n' + opis)
        return 0

    r = gh(['api', f'users/{wlasciciel}', '--jq', '.type'], admin)
    if r.returncode != 0:
        adnotacja('warning', 'Repozytoria seminariów', f'Nie mogę sprawdzić konta {wlasciciel}: {blad(r)[0]} (token nieważny?). Nic nie zrobiono.')
        return 0
    organizacja = r.stdout.strip() == 'Organization'
    if not organizacja:
        r = gh(['api', 'user', '--jq', '.login'], admin)
        if r.returncode != 0 or r.stdout.strip().lower() != wlasciciel.lower():
            adnotacja('warning', 'Repozytoria seminariów', f'Token IM_ADMIN_TOKEN należy do konta „{r.stdout.strip()}”, a repozytoria '
                      f'mają powstać na koncie „{wlasciciel}” (zmienna IM_SEMINARIA_WLASCICIEL). Nic nie zrobiono.')
            return 0

    zrobione = []
    for sid, nazwa, plik, repo in plan:
        nazwa_repo = repo.split('/', 1)[1]
        if not NAZWA_RE.match(nazwa_repo):
            adnotacja('warning', f'Seminarium {sid}', f'Niepoprawna nazwa repozytorium „{repo}” — pomijam.')
            continue
        referaty = referaty_do_przeniesienia(sid)
        przyjete = False
        r = gh(['api', f'repos/{repo}', '--jq', '.full_name'], admin)
        if r.returncode == 0:
            if nasze_repozytorium(repo, sid, admin):
                przyjete, referaty = True, []
                adnotacja('notice', f'Seminarium {sid}', f'Repozytorium {repo} już istnieje i jest repozytorium tego seminarium — wpisuję je. '
                          f'Referaty w src/content/referaty/{sid}/ zostają bez zmian (usuń je, jeśli są już w {repo}).')
            else:
                adnotacja('warning', f'Seminarium {sid}: repozytorium {repo} już istnieje',
                          'Nie nadpisuję go. Jeśli to właściwe repozytorium seminarium, wpisz je w pole „Repozytorium” ręcznie; '
                          'w przeciwnym razie zmień jego nazwę albo zmienną IM_SEMINARIA_PREFIKS.')
                continue
        elif 'HTTP 404' not in (r.stderr + r.stdout) and 'Not Found' not in (r.stderr + r.stdout):
            adnotacja('warning', f'Seminarium {sid}', f'Nie mogę sprawdzić, czy {repo} istnieje: {blad(r)[0]} — pomijam.')
            continue
        if not przyjete:
            r = gh(['api', '-X', 'POST', f'orgs/{wlasciciel}/repos' if organizacja else 'user/repos',
                    '-f', f'name={nazwa_repo}', '-f', f'description=Referaty seminarium „{nazwa}” — strona Instytutu Matematycznego UWr',
                    '-F', f'private={"true" if prywatne else "false"}', '-F', 'has_issues=false', '-F', 'has_wiki=false',
                    '-F', 'has_projects=false', '--jq', '.full_name'], admin)
            if r.returncode != 0:
                adnotacja('warning', f'Seminarium {sid}: nie udało się założyć {repo}', f'{blad(r)[0]} — sprawdź uprawnienia tokenu IM_ADMIN_TOKEN.')
                continue
            with tempfile.TemporaryDirectory(prefix='nowe-repo-') as tmp:
                cel = Path(tmp) / 'repo'
                przygotuj(cel, sid, nazwa, repo, strona_repo, referaty)
                problem = wgraj(cel, repo, admin, nazwa)
            if problem:
                adnotacja('warning', f'Seminarium {sid}: {repo} założone, ale bez plików',
                          f'Wgranie szablonu nie powiodło się ({problem}). Usuń puste repozytorium {repo} i uruchom workflow ponownie '
                          '(token potrzebuje też uprawnienia „Workflows: write”). Seminarium działa dalej z głównego repozytorium.')
                continue
        if strona_token:
            r = gh(['secret', 'set', 'IM_STRONA_TOKEN', '--repo', repo], admin, wejscie=strona_token)
            if r.returncode != 0:
                adnotacja('warning', f'Seminarium {sid}: brak sekretu w {repo}',
                          f'Nie udało się ustawić sekretu IM_STRONA_TOKEN ({blad(r)[0]}). Ustaw go ręcznie: Settings → Secrets and variables → Actions.')
        else:
            adnotacja('notice', f'Seminarium {sid}', f'Sekret IM_STRONA_TOKEN nie jest ustawiony w głównym repozytorium — zakładam, '
                      f'że jest sekretem organizacji dostępnym dla {repo}. Inaczej ustaw go ręcznie w {repo}.')
        plik.write_text(ustaw_repozytorium(plik.read_text(encoding='utf-8'), repo), encoding='utf-8')
        # folder seminarium znika z głównego repozytorium (i z listy folderów w głównym CMS); przy przyjęciu
        # istniejącego repozytorium referaty zostają (ostrzeżenie przy budowaniu przypomni o porządkach)
        if not przyjete and git(['ls-files', '--', f'src/content/referaty/{sid}/'], KORZEN).stdout.strip():
            git(['rm', '-r', '-q', '--', f'src/content/referaty/{sid}'], KORZEN)
        zrobione.append(f'{sid} → {repo}' + (f' (przeniesione referaty: {len(referaty)})' if referaty else ''))

    if not zrobione:
        return 0
    git(['add', '-A', '--', 'src/content/seminaria', 'src/content/referaty'], KORZEN)
    tozsamosc = ['-c', 'user.name=github-actions[bot]', '-c', 'user.email=41898282+github-actions[bot]@users.noreply.github.com']
    r = git([*tozsamosc, 'commit', '-q', '-m', 'Seminaria: osobne repozytoria (automat)\n\n' + '\n'.join(zrobione)], KORZEN)
    if r.returncode != 0:
        adnotacja('error', 'Repozytoria seminariów', f'Commit w głównym repozytorium nie powiódł się: {r.stderr.strip()}')
        return 1
    for _ in range(3):
        if git(['push', '-q', 'origin', f'HEAD:{galaz}'], KORZEN).returncode == 0:
            break
        git([*tozsamosc, 'pull', '-q', '--rebase', 'origin', galaz], KORZEN)
    else:
        adnotacja('error', 'Repozytoria seminariów', 'Repozytoria założone, ale nie udało się zapisać pola „Repozytorium” w głównym repozytorium. '
                  'Uruchom workflow ponownie — rozpozna założone repozytoria i tylko je wpisze.\n' + '\n'.join(zrobione))
        return 1
    r = gh(['api', f'repos/{strona_repo}/dispatches', '-f', 'event_type=przebuduj'], env('GH_TOKEN'))
    if r.returncode != 0:
        adnotacja('warning', 'Repozytoria seminariów', 'Nie udało się zlecić przebudowy — strona odświeży się przy najbliższym planowym budowaniu.')
    adnotacja('notice', 'Repozytoria seminariów — gotowe', '\n'.join(zrobione) +
              '\nTeraz zaproś organizatora w Pages CMS (README, „Repozytoria seminariów”).')
    return 0


if __name__ == '__main__':
    sys.exit(main())
