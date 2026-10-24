// Plan zajęć Instytutu (wyspa React na stronie /studia/plan-zajec, widok src/views/PlanZajec.astro).
// Dane: src/data/plan/plan.json — pobierane automatycznie z USOS (skrypty/plan/pobierz_plan.py,
// workflow .github/workflows/plan-zajec.yml). Widok osadza je w <script type="application/json" id="plan-zajec-dane">,
// a komponent wczytuje je po starcie (dzięki temu dane nie są dublowane w atrybutach wyspy).
// Bez JavaScriptu ta wyspa jest ukryta, a widok pokazuje statyczną listę przedmiotów (.pz-nojs).
// Filtry: semestr, kierunek, rodzaj przedmiotu, typ zajęć, prowadzący, sala, wyszukiwarka.
// Wybór zapisuje się w adresie (?kierunek=SIAD&prowadzacy=…) i w localStorage (klucz „plan-zajec”).
// Widoki: tydzień (siatka pon–pt × godziny; tylko na szerokim ekranie), dni (lista dzień po dniu), przedmioty.
import { Fragment, useEffect, useMemo, useState } from 'react';

type Fragment_ = string | { t: string; a: string };
export interface Zajecie {
  kod: string;
  typ: string;
  grupa?: number | string;
  prowadzacy?: string[];
  dzien?: number;
  od?: string;
  do?: string;
  czestotliwosc?: string;
  sala?: string;
  uwagi?: Fragment_[];
  kierunki?: string[];
}
export interface Przedmiot { kod: string; nazwa: string; nazwa_en?: string; kategoria: string; usos: string; kierunki?: string[] }
export interface Semestr {
  id: string;
  nazwa: string;
  nazwa_en?: string;
  od?: string | null;
  do?: string | null;
  zrodlo?: string | null;
  adres_zrodla?: string | null;
  zaktualizowano?: string | null;
  przedmioty: Przedmiot[];
  zajecia: Zajecie[];
}
export interface DanePlanu {
  semestry: Semestr[];
  typy: Record<string, { pl: string; en: string }>;
  kategorie: { id: string; pl: string; en: string }[];
}
type Lang = 'pl' | 'en';

// ---------------------------------------------------------------- teksty i pomocnicze (używa ich też widok .astro)

export const RODZINY = ['wyk', 'konw', 'cw', 'lab', 'sem', 'war', 'inne'] as const;
export function rodzina(typ: string): string {
  const t = (typ || '').toUpperCase();
  if (t === 'WYK') return 'wyk';
  if (t.startsWith('KONW')) return 'konw';
  if (t.startsWith('CW')) return 'cw';
  if (t === 'LAB' || t === 'PRAC') return 'lab';
  if (t.startsWith('SEM')) return 'sem';
  if (t === 'WAR') return 'war';
  return 'inne';
}

export const TEKSTY = {
  pl: {
    dni: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
    dniKrotko: ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'niedz.'],
    rodziny: { wyk: 'Wykład', konw: 'Konwersatorium', cw: 'Ćwiczenia', lab: 'Laboratorium', sem: 'Seminarium', war: 'Warsztat', inne: 'Inne' } as Record<string, string>,
    krotko: { wyk: 'wyk.', konw: 'konw.', cw: 'ćw.', lab: 'lab.', sem: 'sem.', war: 'war.', inne: '' } as Record<string, string>,
    czestotliwosc: { co_tydzien: '', nieparzyste: 'tygodnie nieparzyste', parzyste: 'tygodnie parzyste', co_dwa_tygodnie: 'co dwa tygodnie', co_miesiac: 'raz w miesiącu', raz: 'jednorazowo', inna: 'inna częstotliwość' } as Record<string, string>,
    semestr: 'Semestr',
    szukaj: 'Szukaj: przedmiot, kod, prowadzący, uwagi…',
    kierunek: 'Kierunek',
    wszystkieKierunki: 'Wszystkie kierunki',
    kategoria: 'Rodzaj przedmiotu',
    wszystkieKategorie: 'Wszystkie przedmioty',
    typ: 'Typ zajęć',
    wszystkieTypy: 'Wszystkie typy zajęć',
    prowadzacy: 'Prowadzący',
    wszyscyProwadzacy: 'Wszyscy prowadzący',
    sala: 'Sala',
    wszystkieSale: 'Wszystkie sale',
    widok: 'Widok',
    tydzien: 'Tydzień',
    widokDni: 'Dzień po dniu',
    widokPrzedmioty: 'Przedmioty',
    wyczysc: 'Wyczyść filtry',
    drukuj: 'Drukuj',
    zajec: 'Zajęć',
    gr: 'gr.',
    s: 'sala',
    bezTerminu: 'Bez stałego terminu w planie',
    bezTerminuOpis: 'Termin ustala prowadzący albo podaje go USOS (np. zajęcia zdalne, egzaminy, grupy 99).',
    brakDanych: 'Plan zajęć nie został jeszcze pobrany z USOS.',
    brakPlanu: 'Plan na ten semestr nie jest jeszcze dostępny w USOS.',
    brakWynikow: 'Żadne zajęcia nie pasują do wybranych filtrów.',
    wczytywanie: 'Wczytywanie planu zajęć…',
    aktualizacja: 'Ostatnia zmiana danych w USOS',
    zrodlo: 'Źródło: USOS UWr',
    zrodloApi: 'Źródło: USOS API (bez uwag do zajęć)',
    kierunekPodpowiedz: 'Filtr kierunku opiera się na oznaczeniach w USOS (np. „tylko dla SIAD”, kody i nazwy przedmiotów). Zajęcia bez takich oznaczeń są widoczne po wybraniu „Wszystkie kierunki”.',
    wskazowka: 'Wskazówka: wybierz kierunek, prowadzącego albo salę, aby siatka tygodnia była czytelniejsza.',
    legenda: 'Kolory typów zajęć',
    otworzUsos: 'opis przedmiotu w USOSweb',
    kod: 'kod',
    od: 'od',
    do: 'do',
    filtry: 'Filtry planu',
    filtryPrzycisk: 'Filtry',
    zima: 'Zima',
    lato: 'Lato',
  },
  en: {
    dni: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dniKrotko: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rodziny: { wyk: 'Lecture', konw: 'Conversatorium', cw: 'Class', lab: 'Lab', sem: 'Seminar', war: 'Workshop', inne: 'Other' } as Record<string, string>,
    krotko: { wyk: 'lecture', konw: 'conv.', cw: 'class', lab: 'lab', sem: 'sem.', war: 'workshop', inne: '' } as Record<string, string>,
    czestotliwosc: { co_tydzien: '', nieparzyste: 'odd weeks', parzyste: 'even weeks', co_dwa_tygodnie: 'every two weeks', co_miesiac: 'once a month', raz: 'once', inna: 'irregular' } as Record<string, string>,
    semestr: 'Semester',
    szukaj: 'Search: course, code, teacher, notes…',
    kierunek: 'Programme',
    wszystkieKierunki: 'All programmes',
    kategoria: 'Course type',
    wszystkieKategorie: 'All courses',
    typ: 'Class type',
    wszystkieTypy: 'All class types',
    prowadzacy: 'Teacher',
    wszyscyProwadzacy: 'All teachers',
    sala: 'Room',
    wszystkieSale: 'All rooms',
    widok: 'View',
    tydzien: 'Week',
    widokDni: 'Day by day',
    widokPrzedmioty: 'Courses',
    wyczysc: 'Clear filters',
    drukuj: 'Print',
    zajec: 'Classes',
    gr: 'gr.',
    s: 'room',
    bezTerminu: 'No fixed time in the timetable',
    bezTerminuOpis: 'The time is set by the teacher or given in USOS (e.g. online classes, exams, groups 99).',
    brakDanych: 'The timetable has not been downloaded from USOS yet.',
    brakPlanu: 'The timetable for this semester is not available in USOS yet.',
    brakWynikow: 'No classes match the selected filters.',
    wczytywanie: 'Loading the timetable…',
    aktualizacja: 'Last change of the data in USOS',
    zrodlo: 'Source: USOS, University of Wrocław',
    zrodloApi: 'Source: USOS API (without class notes)',
    kierunekPodpowiedz: 'The programme filter relies on markings in USOS (e.g. “tylko dla SIAD”, course codes and names). Classes without such markings are shown when “All programmes” is selected.',
    wskazowka: 'Tip: choose a programme, teacher or room to make the weekly grid easier to read.',
    legenda: 'Class type colours',
    otworzUsos: 'course description in USOSweb',
    kod: 'code',
    od: 'from',
    do: 'to',
    filtry: 'Timetable filters',
    filtryPrzycisk: 'Filters',
    zima: 'Winter',
    lato: 'Summer',
  },
};

export function tekstUwag(uwagi?: Fragment_[]): string {
  return (uwagi || []).map((f) => (typeof f === 'string' ? f : f.t)).join('');
}

export function nazwaPrzedmiotu(p: Przedmiot | undefined, kod: string, lang: Lang): string {
  if (!p) return kod;
  return (lang === 'en' && p.nazwa_en) || p.nazwa;
}

export function data(iso: string | null | undefined, lang: Lang, zGodzina = false): string {
  if (!iso) return '';
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!m) return iso;
  const miesiace = lang === 'en'
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  const d = `${+m[3]} ${miesiace[+m[2] - 1]} ${m[1]}`;
  return zGodzina && m[4] ? `${d}, ${m[4]}:${m[5]}` : d;
}

export function Uwagi({ uwagi }: { uwagi?: Fragment_[] }) {
  if (!uwagi || !uwagi.length) return null;
  return (
    <span className="pz-uwagi">
      {uwagi.map((f, i) => (typeof f === 'string' ? <Fragment key={i}>{f}</Fragment> : <a key={i} href={f.a}>{f.t}</a>))}
    </span>
  );
}

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
const minuty = (s?: string) => (s ? +s.slice(0, 2) * 60 + +s.slice(3, 5) : 0);
const nazwisko = (s: string) => s.trim().split(/\s+/).pop() ?? s;

// Domyślny semestr: trwający, a gdy żaden nie trwa — najbliższy przyszły, w ostatniej kolejności pierwszy z listy.
function domyslnySemestr(semestry: Semestr[]): string {
  const dzis = new Date();
  const d = `${dzis.getFullYear()}-${String(dzis.getMonth() + 1).padStart(2, '0')}-${String(dzis.getDate()).padStart(2, '0')}`;
  const trwa = semestry.find((s) => s.od && s.do && s.od <= d && d <= s.do);
  const przyszly = semestry.filter((s) => s.od && s.od > d).sort((a, b) => (a.od! < b.od! ? -1 : 1))[0];
  return (trwa || przyszly || semestry[0])?.id ?? '';
}

interface Filtry { semestr: string; kierunek: string; kategoria: string; typ: string; prowadzacy: string; sala: string; q: string; widok: string }
const PUSTE: Filtry = { semestr: '', kierunek: '', kategoria: '', typ: '', prowadzacy: '', sala: '', q: '', widok: '' };
const POLA = Object.keys(PUSTE) as (keyof Filtry)[];
const KLUCZ = 'plan-zajec';
const WIDOKI = ['tydzien', 'dni', 'przedmioty'];

interface Props {
  lang: Lang;
  kierunki: { id: string; nazwa: string; href: string }[];
  daneId: string;
}

export default function PlanZajec({ lang, kierunki, daneId }: Props) {
  const T = TEKSTY[lang];
  const [dane, setDane] = useState<DanePlanu | null>(null);
  const [f, setF] = useState<Filtry>(PUSTE);
  const [domyslny, setDomyslny] = useState('');
  const [waski, setWaski] = useState(false);
  const [filtryOtwarte, setFiltryOtwarte] = useState(false);

  // start: dane z <script type="application/json">, filtry z adresu albo z localStorage
  useEffect(() => {
    let d: DanePlanu = { semestry: [], typy: {}, kategorie: [] };
    try {
      d = JSON.parse(document.getElementById(daneId)?.textContent || '{}');
      d.semestry = d.semestry || [];
    } catch (e) {}
    const dom = domyslnySemestr(d.semestry);
    let start: Filtry = { ...PUSTE };
    const p = new URLSearchParams(window.location.search);
    if (POLA.some((k) => p.has(k))) {
      POLA.forEach((k) => { start[k] = p.get(k) || ''; });
    } else {
      try {
        const z = JSON.parse(localStorage.getItem(KLUCZ) || 'null');
        if (z && typeof z === 'object') POLA.forEach((k) => { if (typeof z[k] === 'string') start[k] = z[k]; });
      } catch (e) {}
    }
    if (!d.semestry.some((s) => s.id === start.semestr)) start.semestr = '';
    if (!WIDOKI.includes(start.widok)) start.widok = '';
    setDomyslny(dom);
    setDane(d);
    setF(start);
    const mq = window.matchMedia('(max-width: 760px)');
    const zmiana = () => setWaski(mq.matches);
    zmiana();
    mq.addEventListener?.('change', zmiana);
    return () => mq.removeEventListener?.('change', zmiana);
  }, [daneId]);

  // zapis wyboru w adresie i w localStorage
  useEffect(() => {
    if (!dane) return;
    const p = new URLSearchParams(window.location.search);
    POLA.forEach((k) => {
      const v = f[k];
      if (v && !(k === 'semestr' && v === domyslny)) p.set(k, v);
      else p.delete(k);
    });
    const qs = p.toString();
    const adres = window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
    if (adres !== window.location.pathname + window.location.search + window.location.hash) {
      try { window.history.replaceState(null, '', adres); } catch (e) {}
    }
    try { localStorage.setItem(KLUCZ, JSON.stringify(f)); } catch (e) {}
  }, [f, dane, domyslny]);

  const semId = f.semestr || domyslny;
  const sem = dane?.semestry.find((s) => s.id === semId);
  const przedmioty = useMemo(() => Object.fromEntries((sem?.przedmioty || []).map((p) => [p.kod, p])), [sem]);

  // opcje filtrów (z całego semestru)
  const opcje = useMemo(() => {
    const zaj = sem?.zajecia || [];
    const kier = new Set<string>();
    const kat = new Set<string>();
    const ryp = new Set<string>();
    const osoby = new Set<string>();
    const sale = new Set<string>();
    zaj.forEach((z) => {
      (z.kierunki || []).forEach((k) => kier.add(k));
      kat.add(przedmioty[z.kod]?.kategoria || 'inne');
      ryp.add(rodzina(z.typ));
      (z.prowadzacy || []).forEach((o) => osoby.add(o));
      if (z.sala) sale.add(z.sala);
    });
    return {
      kierunki: kierunki.filter((k) => kier.has(k.id)),
      kategorie: (dane?.kategorie || []).filter((k) => kat.has(k.id)),
      rodziny: RODZINY.filter((r) => ryp.has(r)),
      prowadzacy: [...osoby].sort((a, b) => nazwisko(a).localeCompare(nazwisko(b), 'pl') || a.localeCompare(b, 'pl')),
      sale: [...sale].sort((a, b) => a.localeCompare(b, 'pl', { numeric: true })),
    };
  }, [sem, przedmioty, kierunki, dane]);

  // po zmianie semestru: wyczyść wybory, których w nim nie ma
  useEffect(() => {
    if (!dane || !sem) return;
    const popraw: Partial<Filtry> = {};
    if (f.kierunek && !opcje.kierunki.some((k) => k.id === f.kierunek)) popraw.kierunek = '';
    if (f.kategoria && !opcje.kategorie.some((k) => k.id === f.kategoria)) popraw.kategoria = '';
    if (f.typ && !opcje.rodziny.includes(f.typ as any)) popraw.typ = '';
    if (f.prowadzacy && !opcje.prowadzacy.includes(f.prowadzacy)) popraw.prowadzacy = '';
    if (f.sala && !opcje.sale.includes(f.sala)) popraw.sala = '';
    if (Object.keys(popraw).length) setF((s) => ({ ...s, ...popraw }));
  }, [opcje]); // eslint-disable-line react-hooks/exhaustive-deps

  const widoczne = useMemo(() => {
    const nq = norm(f.q.trim());
    return (sem?.zajecia || []).filter((z) => {
      const p = przedmioty[z.kod];
      if (f.kierunek && !(z.kierunki || []).includes(f.kierunek)) return false;
      if (f.kategoria && (p?.kategoria || 'inne') !== f.kategoria) return false;
      if (f.typ && rodzina(z.typ) !== f.typ) return false;
      if (f.prowadzacy && !(z.prowadzacy || []).includes(f.prowadzacy)) return false;
      if (f.sala && z.sala !== f.sala) return false;
      if (nq) {
        const tekst = [p?.nazwa, p?.nazwa_en, z.kod, (z.prowadzacy || []).join(' '), z.sala, tekstUwag(z.uwagi), dane?.typy?.[z.typ]?.[lang], z.grupa != null ? `${T.gr} ${z.grupa}` : ''].join(' ');
        if (!norm(tekst).includes(nq)) return false;
      }
      return true;
    });
  }, [sem, przedmioty, f, dane, lang, T]);

  // numer grupy pokazujemy, gdy typ zajęć ma w przedmiocie kilka grup (albo nie jest wykładem)
  const wieleGrup = useMemo(() => {
    const ile: Record<string, Set<string>> = {};
    (sem?.zajecia || []).forEach((z) => { (ile[`${z.kod}|${z.typ}`] ||= new Set()).add(String(z.grupa ?? '')); });
    return (z: Zajecie) => z.grupa != null && z.grupa !== '' && (rodzina(z.typ) !== 'wyk' || (ile[`${z.kod}|${z.typ}`]?.size ?? 0) > 1);
  }, [sem]);

  if (!dane) return <p className="pz-stan">{T.wczytywanie}</p>;
  if (!dane.semestry.length) return <p className="pz-stan">{T.brakDanych}</p>;

  const ustaw = (k: keyof Filtry, v: string) => setF((s) => ({ ...s, [k]: v }));
  const aktywne = !!(f.kierunek || f.kategoria || f.typ || f.prowadzacy || f.sala || f.q);
  const ileFiltrow = [f.kierunek, f.kategoria, f.typ, f.prowadzacy, f.sala].filter(Boolean).length;
  const krotkaNazwa = (id: string) => { const m = id.match(/^(\d{4})\/(\d{2})-([ZL])$/); return m ? `${m[3] === 'Z' ? T.zima : T.lato} ${m[1]}/${m[2]}` : id; };
  const widok = f.widok || (waski ? 'dni' : 'tydzien');
  const efektywny = waski && widok === 'tydzien' ? 'dni' : widok;
  const typNazwa = (typ: string) => dane.typy?.[typ]?.[lang] || typ;
  const kier = (z: Zajecie) => opcje.kierunki.filter((k) => (z.kierunki || []).includes(k.id));

  const wiersz = (z: Zajecie, klucz: number, zDniem?: boolean) => {
    const p = przedmioty[z.kod];
    const r = rodzina(z.typ);
    const czest = z.czestotliwosc ? T.czestotliwosc[z.czestotliwosc] ?? z.czestotliwosc : '';
    return (
      <li key={klucz} className={`pz-wiersz pz-${r}`}>
        <div className="pz-czas">
          {z.dzien != null && z.od ? (
            <>
              {zDniem && <span className="pz-dzien">{T.dniKrotko[z.dzien]}</span>}
              <span>{z.od}–{z.do}</span>
            </>
          ) : (
            <span className="muted">—</span>
          )}
        </div>
        <div className="pz-tresc">
          <div className="pz-tytul">
            <a href={p?.usos} title={T.otworzUsos}>{nazwaPrzedmiotu(p, z.kod, lang)}</a>
            <span className="pz-typ">{typNazwa(z.typ)}{wieleGrup(z) ? `, ${T.gr} ${z.grupa}` : ''}</span>
          </div>
          <div className="pz-meta">
            {(z.prowadzacy || []).length > 0 && <span>{(z.prowadzacy || []).join(', ')}</span>}
            {z.sala && <span>{T.s} {z.sala}</span>}
            {czest && <span className="pz-czest">{czest}</span>}
            {kier(z).map((k) => <span key={k.id} className="pz-kier">{k.id}</span>)}
          </div>
          <Uwagi uwagi={z.uwagi} />
        </div>
      </li>
    );
  };

  const bezTerminu = widoczne.filter((z) => z.dzien == null || !z.od);
  const sekcjaBezTerminu = () =>
    bezTerminu.length ? (
      <section className="pz-sekcja">
        <h3 className="pz-dzien-tytul">{T.bezTerminu}</h3>
        <p className="pz-opis">{T.bezTerminuOpis}</p>
        <ul className="pz-lista" role="list">
          {bezTerminu.map((z, i) => wiersz(z, i))}
        </ul>
      </section>
    ) : null;

  // ---------------------------------------------------------------- widok tygodnia
  const tydzien = () => {
    const zt = widoczne.filter((z) => z.dzien != null && z.od && z.do);
    const dni = [0, 1, 2, 3, 4].concat([5, 6].filter((d) => zt.some((z) => z.dzien === d)));
    const t0 = Math.floor(Math.min(8 * 60, ...zt.map((z) => minuty(z.od))) / 60) * 60;
    const t1 = Math.ceil(Math.max(16 * 60, ...zt.map((z) => minuty(z.do))) / 60) * 60;
    const PX = 1.15; // pikseli na minutę
    // równoległe grupy tego samego przedmiotu i typu (ten sam dzień i godziny) → jeden blok
    interface Blok { klucz: string; dzien: number; od: string; do: string; zaj: Zajecie[]; pas: number; pasow: number }
    const bloki: Blok[] = [];
    const wgKlucza: Record<string, Blok> = {};
    zt.forEach((z) => {
      const klucz = `${z.kod}|${z.typ}|${z.dzien}|${z.od}|${z.do}|${z.czestotliwosc ?? ''}`;
      if (!wgKlucza[klucz]) bloki.push((wgKlucza[klucz] = { klucz, dzien: z.dzien!, od: z.od!, do: z.do!, zaj: [], pas: 0, pasow: 1 }));
      wgKlucza[klucz].zaj.push(z);
    });
    const pasowDnia: Record<number, number> = {};
    for (const d of dni) {
      const lista = bloki.filter((b) => b.dzien === d).sort((a, b) => minuty(a.od) - minuty(b.od) || minuty(b.do) - minuty(a.do));
      let klaster: Blok[] = [];
      let konce: number[] = [];
      let koniec = -1;
      const zamknij = () => {
        klaster.forEach((b) => { b.pasow = konce.length; });
        pasowDnia[d] = Math.max(pasowDnia[d] || 1, konce.length);
        klaster = [];
        konce = [];
        koniec = -1;
      };
      for (const b of lista) {
        const s = minuty(b.od);
        const e = minuty(b.do);
        if (klaster.length && s >= koniec) zamknij();
        let pas = konce.findIndex((k) => k <= s);
        if (pas < 0) { pas = konce.length; konce.push(e); } else konce[pas] = e;
        b.pas = pas;
        klaster.push(b);
        koniec = Math.max(koniec, e);
      }
      if (klaster.length) zamknij();
    }
    const godziny: number[] = [];
    for (let h = t0 / 60; h <= t1 / 60; h++) godziny.push(h);
    const wys = (t1 - t0) * PX;
    const kolumny = `3.4rem ${dni.map((d) => `minmax(${Math.max(130, (pasowDnia[d] || 1) * 76)}px, 1fr)`).join(' ')}`;
    const unikalne = (a: (string | undefined)[]) => [...new Set(a.filter(Boolean) as string[])];
    return (
      <div className="pz-tydzien" style={{ ['--godz' as any]: `${60 * PX}px` }}>
        {!aktywne && zt.length > 60 && <p className="pz-opis pz-wskazowka">{T.wskazowka}</p>}
        <div className="pz-siatka-ramka">
          <div className="pz-siatka" style={{ gridTemplateColumns: kolumny, ['--dni' as any]: dni.length }}>
            <div className="pz-rog" aria-hidden="true" />
            {dni.map((d) => <div key={`n${d}`} className="pz-naglowek-dnia">{T.dni[d]}</div>)}
            <div className="pz-os" style={{ height: wys }} aria-hidden="true">
              {godziny.map((h) => <span key={h} style={{ top: (h * 60 - t0) * PX }}>{h}:00</span>)}
            </div>
            {dni.map((d) => (
              <div key={`k${d}`} className="pz-kolumna" style={{ height: wys }}>
                {bloki.filter((b) => b.dzien === d).map((b) => {
                  const z = b.zaj[0];
                  const p = przedmioty[z.kod];
                  const r = rodzina(z.typ);
                  const czest = z.czestotliwosc ? T.czestotliwosc[z.czestotliwosc] : '';
                  const grupy = b.zaj.filter(wieleGrup).map((x) => x.grupa);
                  const typ = r === 'inne' ? typNazwa(z.typ) : T.krotko[r];
                  const sale = unikalne(b.zaj.map((x) => x.sala));
                  const uwagi = unikalne(b.zaj.map((x) => tekstUwag(x.uwagi)));
                  return (
                    <a
                      key={b.klucz}
                      href={p?.usos}
                      className={`pz-blok pz-${r}`}
                      style={{
                        top: (minuty(b.od) - t0) * PX,
                        ['--hh' as any]: `${Math.max((minuty(b.do) - minuty(b.od)) * PX - 3, 20)}px`,
                        left: `calc(${(b.pas / b.pasow) * 100}% + 1px)`,
                        width: `calc(${100 / b.pasow}% - 3px)`,
                      }}
                    >
                      <span className="sr-only">{T.dni[d]} {b.od}–{b.do}: </span>
                      <strong>{nazwaPrzedmiotu(p, z.kod, lang)}</strong>
                      <span className="pz-blok-linia">
                        {typ}{grupy.length ? ` ${T.gr} ${grupy.join(', ')}` : ''}{sale.length ? ` · ${sale.join(', ')}` : ''}
                      </span>
                      <span className="pz-blok-linia pz-blok-czas">{b.od}–{b.do}{czest ? ` · ${czest}` : ''}</span>
                      {b.zaj.length === 1 ? (
                        (z.prowadzacy || []).length > 0 && <span className="pz-blok-linia pz-blok-osoby">{(z.prowadzacy || []).join(', ')}</span>
                      ) : (
                        b.zaj.map((x, i) => (
                          <span key={i} className="pz-blok-linia pz-blok-grupa">
                            {x.grupa != null ? `${T.gr} ${x.grupa}: ` : ''}{(x.prowadzacy || []).join(', ') || '—'}{x.sala ? ` · ${x.sala}` : ''}
                          </span>
                        ))
                      )}
                      {uwagi.map((t, i) => <span key={`u${i}`} className="pz-blok-linia pz-blok-uwagi">{t}</span>)}
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {sekcjaBezTerminu()}
      </div>
    );
  };

  // ---------------------------------------------------------------- dzień po dniu
  const dniWidok = () => {
    const zt = widoczne.filter((z) => z.dzien != null && z.od);
    const dni = [0, 1, 2, 3, 4, 5, 6].filter((d) => zt.some((z) => z.dzien === d));
    return (
      <div>
        {dni.map((d) => (
          <section key={d} className="pz-sekcja">
            <h3 className="pz-dzien-tytul">{T.dni[d]}</h3>
            <ul className="pz-lista" role="list">
              {zt
                .filter((z) => z.dzien === d)
                .sort((a, b) => minuty(a.od) - minuty(b.od) || minuty(a.do) - minuty(b.do) || nazwaPrzedmiotu(przedmioty[a.kod], a.kod, lang).localeCompare(nazwaPrzedmiotu(przedmioty[b.kod], b.kod, lang), 'pl'))
                .map((z, i) => wiersz(z, i))}
            </ul>
          </section>
        ))}
        {sekcjaBezTerminu()}
      </div>
    );
  };

  // ---------------------------------------------------------------- według przedmiotów (jak dawny plan)
  const przedmiotyWidok = () => {
    const kody = [...new Set(widoczne.map((z) => z.kod))];
    const kolejnosc = (sem?.przedmioty || []).map((p) => p.kod);
    kody.sort((a, b) => kolejnosc.indexOf(a) - kolejnosc.indexOf(b));
    const kategorie = dane.kategorie.filter((k) => kody.some((kod) => (przedmioty[kod]?.kategoria || 'inne') === k.id));
    return (
      <div>
        {kategorie.map((k) => (
          <section key={k.id} className="pz-sekcja">
            <h3 className="pz-dzien-tytul">{lang === 'en' ? k.en : k.pl}</h3>
            {kody
              .filter((kod) => (przedmioty[kod]?.kategoria || 'inne') === k.id)
              .map((kod) => {
                const p = przedmioty[kod];
                return (
                  <article key={kod} className="pz-przedmiot">
                    <h4>
                      <a href={p?.usos}>{nazwaPrzedmiotu(p, kod, lang)}</a> <span className="pz-kod">{kod}</span>
                    </h4>
                    <ul className="pz-lista" role="list">
                      {widoczne.filter((z) => z.kod === kod).map((z, i) => wiersz(z, i, true))}
                    </ul>
                  </article>
                );
              })}
          </section>
        ))}
      </div>
    );
  };

  const wybor = (pole: keyof Filtry, etykieta: string, wszystkie: string, lista: { v: string; t: string }[]) => (
    <label className="pz-pole">
      <span className="pz-etykieta">{etykieta}</span>
      <select value={f[pole]} onChange={(e) => ustaw(pole, e.target.value)}>
        <option value="">{wszystkie}</option>
        {lista.map((o) => <option key={o.v} value={o.v}>{o.t}</option>)}
      </select>
    </label>
  );

  const rodzinyWidoczne = RODZINY.filter((r) => widoczne.some((z) => rodzina(z.typ) === r));

  return (
    <div className="pz-app-wnetrze">
      <div className="pz-narzedzia" role="search" aria-label={T.filtry}>
        <div className="chips pz-semestry" role="group" aria-label={T.semestr}>
          {dane.semestry.map((s) => (
            <button key={s.id} type="button" className="chip" aria-pressed={s.id === semId} onClick={() => ustaw('semestr', s.id === domyslny ? '' : s.id)}>
              <span className="pz-pelna">{(lang === 'en' && s.nazwa_en) || s.nazwa}</span>
              <span className="pz-krotka" aria-hidden="true">{krotkaNazwa(s.id)}</span>
            </button>
          ))}
        </div>
        <label className="search pz-szukaj">
          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ width: 18, height: 18 }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.6-3.6" />
          </svg>
          <span className="sr-only">{T.szukaj}</span>
          <input type="search" value={f.q} placeholder={T.szukaj} onChange={(e) => ustaw('q', e.target.value)} />
        </label>
        {waski && (
          <button type="button" className="btn btn-small pz-przelacz" aria-expanded={filtryOtwarte} aria-controls="pz-pola" onClick={() => setFiltryOtwarte((o) => !o)}>
            {T.filtryPrzycisk}{ileFiltrow ? ` (${ileFiltrow})` : ''}
          </button>
        )}
        <div className="pz-pola" id="pz-pola" hidden={waski && !filtryOtwarte}>
          {opcje.kierunki.length > 0 && (
            wybor('kierunek', T.kierunek, T.wszystkieKierunki, opcje.kierunki.map((k) => ({ v: k.id, t: k.nazwa })))
          )}
          {wybor('kategoria', T.kategoria, T.wszystkieKategorie, opcje.kategorie.map((k) => ({ v: k.id, t: lang === 'en' ? k.en : k.pl })))}
          {wybor('typ', T.typ, T.wszystkieTypy, opcje.rodziny.map((r) => ({ v: r, t: T.rodziny[r] })))}
          {wybor('prowadzacy', T.prowadzacy, T.wszyscyProwadzacy, opcje.prowadzacy.map((o) => ({ v: o, t: o })))}
          {wybor('sala', T.sala, T.wszystkieSale, opcje.sale.map((s) => ({ v: s, t: s })))}
        </div>
        {f.kierunek && <p className="pz-opis">{T.kierunekPodpowiedz}</p>}
        <div className="pz-pasek">
          <div className="chips pz-widoki" role="group" aria-label={T.widok}>
            {!waski && (
              <button type="button" className="chip" aria-pressed={efektywny === 'tydzien'} onClick={() => ustaw('widok', 'tydzien')}>{T.tydzien}</button>
            )}
            <button type="button" className="chip" aria-pressed={efektywny === 'dni'} onClick={() => ustaw('widok', 'dni')}>{T.widokDni}</button>
            <button type="button" className="chip" aria-pressed={efektywny === 'przedmioty'} onClick={() => ustaw('widok', 'przedmioty')}>{T.widokPrzedmioty}</button>
          </div>
          <div className="pz-akcje">
            <span className="pz-licznik" aria-live="polite">{T.zajec}: {widoczne.length}</span>
            {aktywne && (
              <button type="button" className="btn btn-small" onClick={() => setF((s) => ({ ...PUSTE, semestr: s.semestr, widok: s.widok }))}>{T.wyczysc}</button>
            )}
            <button type="button" className="btn btn-small" onClick={() => window.print()}>{T.drukuj}</button>
          </div>
        </div>
      </div>

      {sem && (
        <p className="pz-info">
          <strong>{(lang === 'en' && sem.nazwa_en) || sem.nazwa}</strong>
          {sem.od && sem.do && <> · {data(sem.od, lang)} – {data(sem.do, lang)}</>}
          {sem.zaktualizowano && <> · {T.aktualizacja}: {data(sem.zaktualizowano, lang, true)}</>}
          {sem.zrodlo && <> · {sem.zrodlo === 'usos-api' ? T.zrodloApi : T.zrodlo}</>}
        </p>
      )}

      {rodzinyWidoczne.length > 0 && efektywny === 'tydzien' && (
        <ul className="pz-legenda" aria-label={T.legenda}>
          {rodzinyWidoczne.map((r) => <li key={r} className={`pz-${r}`}>{T.rodziny[r]}</li>)}
        </ul>
      )}

      {!sem || !sem.zajecia.length ? (
        <p className="pz-stan">{T.brakPlanu}</p>
      ) : !widoczne.length ? (
        <p className="pz-stan">{T.brakWynikow}</p>
      ) : efektywny === 'tydzien' ? (
        tydzien()
      ) : efektywny === 'przedmioty' ? (
        przedmiotyWidok()
      ) : (
        dniWidok()
      )}
    </div>
  );
}
