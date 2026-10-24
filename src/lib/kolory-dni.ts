// Kolory dni („Dzień N” — niebieski, „Dzień P” — pomarańczowy) liczone z src/data/kolory-dni.json.
// Bez zależności od astro:content — działa przy budowaniu i w skrypcie przeglądarki.
//
// Reguła (sprawdzona dzień po dniu na kalendarzach PDF Instytutu z lat 2021/22–2026/27):
// każdy dzień tygodnia (pon–pt) liczymy osobno; dzień, w którym dany dzień tygodnia występuje
// w semestrze po raz nieparzysty (1., 3., 5. …), jest niebieski, po raz parzysty — pomarańczowy.
// Dni wolne (weekendy, święta ustawowe, dni z listy „wolne”) pomijamy, a zamiana
// („w piątek zajęcia środowe”) liczy się jak dzień, którego plan obowiązuje.
// Wyjątek zmienia kolor jednego dnia i nie przesuwa liczenia kolejnych dni.
import dane from '../data/kolory-dni.json';
import { addDays, weekday, dayShort, dayNum, monthShort, longWithDay, type Lang } from './daty';

export type Kolor = 'niebieski' | 'pomaranczowy';

export interface Wolne { od: string; do?: string | null; opis?: string | null; opis_en?: string | null }
export interface Zamiana { data: string; jak_dzien: string }
export interface Wyjatek { data: string; kolor: string }
export interface Semestr {
  nazwa: string;
  nazwa_en?: string | null;
  poczatek: string;
  koniec: string;
  pdf?: string | null;
  uwagi?: string | null;
  uwagi_en?: string | null;
  wolne?: Wolne[] | null;
  zamiany?: Zamiana[] | null;
  wyjatki?: Wyjatek[] | null;
}

export interface Dzien {
  data: string; // RRRR-MM-DD
  dzienTygodnia: number; // 1 = poniedziałek … 7 = niedziela
  kolor: Kolor | null; // null = brak zajęć
  plan: number | null; // 1–5: dzień tygodnia, według którego planu są zajęcia
  ktory: number | null; // który raz ten dzień planu występuje w semestrze
  wolne: { opis: string; opis_en: string; swieto: boolean } | null; // dzień wolny od zajęć (pon–pt)
  zamiana: boolean;
  wyjatek: boolean;
}

export interface DzienSemestru extends Dzien { semestr: Semestr }

const DNI_PL = ['', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
const DNI_PL_JAK = ['', 'w poniedziałek', 'we wtorek', 'w środę', 'w czwartek', 'w piątek', 'w sobotę', 'w niedzielę'];
const DNI_PL_PRZYM = ['', 'poniedziałkowe', 'wtorkowe', 'środowe', 'czwartkowe', 'piątkowe'];
const DNI_EN = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const DNI_SKROT = { pl: ['', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'niedz.'], en: ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };

export const NAZWA_KOLORU: Record<Lang, Record<Kolor, string>> = {
  pl: { niebieski: 'niebieski', pomaranczowy: 'pomarańczowy' },
  en: { niebieski: 'blue', pomaranczowy: 'orange' },
};
// Litera w komórce kalendarza (kolor nie jest jedyną informacją). „N”/„P” jak w PDF-ach Instytutu.
export const LITERA: Record<Lang, Record<Kolor, string>> = {
  pl: { niebieski: 'N', pomaranczowy: 'P' },
  en: { niebieski: 'B', pomaranczowy: 'O' },
};

// ---------- pomocnicze ----------
const dzien = (s: unknown): string => (typeof s === 'string' ? s.trim().slice(0, 10) : '');
const poprawna = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
// 1 = pon … 7 = niedz
export const dzienTygodnia = (data: string) => ((weekday(data) + 6) % 7) + 1;

function numerDnia(s: string): number | null {
  const t = String(s ?? '').trim().toLowerCase();
  if (/^[1-7]$/.test(t)) return Number(t);
  if (/^(pn|pon)/.test(t) || t.startsWith('mon')) return 1;
  if (/^wt/.test(t) || t.startsWith('tue')) return 2;
  if (/^(śr|sr)/.test(t) || t.startsWith('wed')) return 3;
  if (/^cz/.test(t) || t.startsWith('thu')) return 4;
  if (/^pt|^pi/.test(t) || t.startsWith('fri')) return 5;
  if (/^so/.test(t) || t.startsWith('sat')) return 6;
  if (/^n/.test(t) || t.startsWith('sun')) return 7;
  return null;
}

function kolorZTekstu(s: string): Kolor | null {
  const t = String(s ?? '').trim().toLowerCase();
  if (t.startsWith('nie') || t === 'n' || t.startsWith('blue')) return 'niebieski';
  if (t.startsWith('pom') || t === 'p' || t.startsWith('orange')) return 'pomaranczowy';
  return null;
}

// Wielkanoc (algorytm Meeusa/Jonesa/Butchera, kalendarz gregoriański).
function wielkanoc(y: number): string {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mies = Math.floor((h + l - 7 * m + 114) / 31), dz = ((h + l - 7 * m + 114) % 31) + 1;
  return `${y}-${String(mies).padStart(2, '0')}-${String(dz).padStart(2, '0')}`;
}

// Dni ustawowo wolne od pracy w Polsce — uwzględniane automatycznie (nie trzeba ich wpisywać).
export function swietaPanstwowe(rok: number): Map<string, { pl: string; en: string }> {
  const w = wielkanoc(rok);
  const d = (m: number, dz: number) => `${rok}-${String(m).padStart(2, '0')}-${String(dz).padStart(2, '0')}`;
  const s = new Map<string, { pl: string; en: string }>([
    [d(1, 1), { pl: 'Nowy Rok', en: "New Year's Day" }],
    [d(1, 6), { pl: 'Święto Trzech Króli', en: 'Epiphany' }],
    [w, { pl: 'Wielkanoc', en: 'Easter Sunday' }],
    [addDays(w, 1), { pl: 'Poniedziałek Wielkanocny', en: 'Easter Monday' }],
    [d(5, 1), { pl: 'Święto Pracy', en: 'Labour Day' }],
    [d(5, 3), { pl: 'Święto Konstytucji 3 Maja', en: 'Constitution Day' }],
    [addDays(w, 49), { pl: 'Zielone Świątki', en: 'Pentecost' }],
    [addDays(w, 60), { pl: 'Boże Ciało', en: 'Corpus Christi' }],
    [d(8, 15), { pl: 'Wniebowzięcie Najświętszej Maryi Panny', en: 'Assumption Day' }],
    [d(11, 1), { pl: 'Wszystkich Świętych', en: "All Saints' Day" }],
    [d(11, 11), { pl: 'Narodowe Święto Niepodległości', en: 'Independence Day' }],
    [d(12, 25), { pl: 'Boże Narodzenie', en: 'Christmas Day' }],
    [d(12, 26), { pl: 'Drugi dzień Bożego Narodzenia', en: 'Second Day of Christmas' }],
  ]);
  if (rok >= 2025) s.set(d(12, 24), { pl: 'Wigilia Bożego Narodzenia', en: 'Christmas Eve' });
  return s;
}

// ---------- semestry ----------
const SEMESTRY: Semestr[] = (((dane as any).semestry ?? []) as any[])
  .map((s) => ({ ...s, poczatek: dzien(s?.poczatek), koniec: dzien(s?.koniec) }) as Semestr)
  .filter((s) => poprawna(s.poczatek) && poprawna(s.koniec) && s.poczatek <= s.koniec)
  .sort((a, b) => (a.poczatek < b.poczatek ? -1 : 1));

export function semestry(): Semestr[] {
  return SEMESTRY;
}

export function nazwaSemestru(s: Semestr, lang: Lang = 'pl'): string {
  return (lang === 'en' && s.nazwa_en) || s.nazwa;
}

const pamiec = new WeakMap<Semestr, Map<string, Dzien>>();

function oblicz(s: Semestr): Map<string, Dzien> {
  const gotowe = pamiec.get(s);
  if (gotowe) return gotowe;
  const wolne = new Map<string, { opis: string; opis_en: string; swieto: boolean }>();
  for (const rok of new Set([Number(s.poczatek.slice(0, 4)), Number(s.koniec.slice(0, 4))])) {
    for (const [d, n] of swietaPanstwowe(rok)) wolne.set(d, { opis: n.pl, opis_en: n.en, swieto: true });
  }
  for (const w of s.wolne ?? []) {
    const od = dzien(w?.od), d0 = dzien(w?.do);
    if (!poprawna(od)) continue;
    const doD = poprawna(d0) && d0 >= od ? d0 : od;
    for (let d = od; d <= doD; d = addDays(d, 1)) {
      const sw = wolne.get(d);
      wolne.set(d, {
        opis: (w.opis || '').trim() || sw?.opis || 'Dzień wolny od zajęć',
        opis_en: (w.opis_en || '').trim() || sw?.opis_en || (w.opis || '').trim() || 'No classes',
        swieto: !!sw?.swieto,
      });
    }
  }
  const zamiany = new Map<string, number>();
  for (const z of s.zamiany ?? []) {
    const d = dzien(z?.data), n = numerDnia(z?.jak_dzien);
    if (poprawna(d) && n) zamiany.set(d, n);
  }
  const wyjatki = new Map<string, Kolor>();
  for (const w of s.wyjatki ?? []) {
    const d = dzien(w?.data), k = kolorZTekstu(w?.kolor);
    if (poprawna(d) && k) wyjatki.set(d, k);
  }
  const licz = [0, 0, 0, 0, 0, 0, 0, 0];
  const wynik = new Map<string, Dzien>();
  for (let d = s.poczatek; d <= s.koniec; d = addDays(d, 1)) {
    const dt = dzienTygodnia(d);
    let plan: number | null = null;
    let wolny: Dzien['wolne'] = null;
    if (zamiany.has(d)) plan = zamiany.get(d)!;
    else if (dt <= 5) {
      if (wolne.has(d)) wolny = wolne.get(d)!;
      else plan = dt;
    }
    let kolor: Kolor | null = null;
    let ktory: number | null = null;
    if (plan) {
      ktory = ++licz[plan];
      kolor = ktory % 2 === 1 ? 'niebieski' : 'pomaranczowy';
    }
    const wyj = wyjatki.get(d);
    if (wyj) kolor = wyj;
    wynik.set(d, { data: d, dzienTygodnia: dt, kolor, plan, ktory, wolne: wyj ? null : wolny, zamiana: zamiany.has(d), wyjatek: !!wyj });
  }
  pamiec.set(s, wynik);
  return wynik;
}

// Wszystkie dni semestru (od początku do końca zajęć), w kolejności.
export function dniSemestru(s: Semestr): Dzien[] {
  return [...oblicz(s).values()];
}

export function semestrDnia(data: string): Semestr | null {
  const d = dzien(data);
  return SEMESTRY.find((s) => s.poczatek <= d && d <= s.koniec) ?? null;
}

export function infoDnia(data: string): DzienSemestru | null {
  const s = semestrDnia(data);
  if (!s) return null;
  const d = oblicz(s).get(dzien(data));
  return d ? { ...d, semestr: s } : null;
}

// Kolor dnia albo null (brak zajęć lub dzień poza semestrami w danych).
export function kolorDnia(data: string): Kolor | null {
  return infoDnia(data)?.kolor ?? null;
}

// Najbliższy dzień zajęć po podanej dacie (albo od niej, gdy wlacznie = true).
export function najblizszyDzienZajec(data: string, wlacznie = false): DzienSemestru | null {
  const d0 = dzien(data);
  for (const s of SEMESTRY) {
    if (s.koniec < d0) continue;
    for (const d of oblicz(s).values()) {
      if ((wlacznie ? d.data >= d0 : d.data > d0) && d.kolor) return { ...d, semestr: s };
    }
  }
  return null;
}

// Liczba dni zajęć według dnia planu (1–5) — do kontroli (zwykle 15 każdego dnia).
export function statystykiSemestru(s: Semestr) {
  const plan = [0, 0, 0, 0, 0, 0];
  let niebieskie = 0, pomaranczowe = 0;
  for (const d of oblicz(s).values()) {
    if (!d.kolor) continue;
    if (d.plan) plan[d.plan]++;
    if (d.kolor === 'niebieski') niebieskie++;
    else pomaranczowe++;
  }
  return { plan, niebieskie, pomaranczowe, razem: niebieskie + pomaranczowe };
}

// Dni wolne od zajęć (pon–pt) w okresie zajęć, zgrupowane w zakresy (weekendy w środku nie przerywają zakresu).
export function wolneSemestru(s: Semestr): { od: string; do: string; opis: string; opis_en: string }[] {
  const out: { od: string; do: string; opis: string; opis_en: string }[] = [];
  let ost: Dzien | null = null;
  for (const d of oblicz(s).values()) {
    if (d.wolne) {
      const g = out[out.length - 1];
      if (g && ost && ost.wolne && g.opis === d.wolne.opis) g.do = d.data;
      else out.push({ od: d.data, do: d.data, opis: d.wolne.opis, opis_en: d.wolne.opis_en });
      ost = d;
    } else if (d.kolor || d.dzienTygodnia <= 5) {
      ost = null;
    }
  }
  return out;
}

export function zamianySemestru(s: Semestr): Dzien[] {
  return dniSemestru(s).filter((d) => d.zamiana && d.plan);
}

// ---------- napisy ----------
export function nazwaDnia(n: number, lang: Lang = 'pl'): string {
  return lang === 'en' ? DNI_EN[n] : DNI_PL[n];
}

// „zajęcia środowe” / „Wednesday classes”
export function opisZamiany(plan: number, lang: Lang = 'pl'): string {
  return lang === 'en' ? `${DNI_EN[plan]} classes` : `zajęcia ${DNI_PL_PRZYM[plan]}`;
}

// „jak w środę” / „as on Wednesday”
export function jakWDniu(plan: number, lang: Lang = 'pl'): string {
  return lang === 'en' ? `as on ${DNI_EN[plan]}` : `jak ${DNI_PL_JAK[plan]}`;
}

// „pon. 26 paź” / „Mon 26 Oct”
export const krotkaData = (d: string, lang: Lang = 'pl') => `${dayShort(d, lang)} ${dayNum(d)} ${monthShort(d, lang)}`;
const porzadkowy = (n: number) => {
  const r = n % 100;
  return `${n}${r >= 11 && r <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
};

export interface TekstDnia {
  data: string;
  kolor: Kolor | null; // kolor dzisiejszego dnia (null = brak zajęć)
  litera: string; // litera do kółka („N”, „P” albo „–”)
  tytul: string; // np. „Dziś: dzień niebieski”
  opis: string; // krótki dopisek (kafelek)
  opisDlugi: string; // pełne zdanie (strona kolorów dni)
  nastepny: DzienSemestru | null;
  nastepnyKolor: Kolor | null;
}

// Wspólne napisy dla kafelka na stronie głównej i strony /studia/kolory-dni.
export function tekstDnia(data: string, lang: Lang = 'pl'): TekstDnia {
  const T = (pl: string, en: string) => (lang === 'en' ? en : pl);
  const info = infoDnia(data);
  const nastepny = najblizszyDzienZajec(data);
  const nk = nastepny?.kolor ?? null;
  const opisNast = nastepny && nk
    ? T(`Następny dzień zajęć: ${krotkaData(nastepny.data, lang)} — ${NAZWA_KOLORU.pl[nk]}`, `Next class day: ${krotkaData(nastepny.data, lang)} — ${NAZWA_KOLORU.en[nk]}`)
    : '';
  const dlugiNast = nastepny && nk
    ? T(`Następny dzień zajęć: ${longWithDay(nastepny.data, lang)} — dzień ${NAZWA_KOLORU.pl[nk]}`, `Next class day: ${longWithDay(nastepny.data, lang)} — ${NAZWA_KOLORU.en[nk]} day`)
      + (nastepny.zamiana && nastepny.plan ? ` (${opisZamiany(nastepny.plan, lang)})` : '') + '.'
    : '';
  if (info?.kolor) {
    const k = info.kolor;
    const zam = info.zamiana && info.plan ? opisZamiany(info.plan, lang) : '';
    return {
      data, kolor: k, litera: LITERA[lang][k], nastepny, nastepnyKolor: nk,
      tytul: T(`Dziś: dzień ${NAZWA_KOLORU.pl[k]}`, `Today: ${NAZWA_KOLORU.en[k]} day`),
      opis: zam ? `${krotkaData(data, lang)} · ${zam}` : krotkaData(data, lang),
      opisDlugi: [
        info.plan && info.ktory
          ? T(`${nazwaDnia(info.plan, 'pl')[0].toUpperCase()}${nazwaDnia(info.plan, 'pl').slice(1)} występuje w semestrze po raz ${info.ktory}.`, `The ${porzadkowy(info.ktory)} ${nazwaDnia(info.plan, 'en')} of the semester.`)
          : '',
        zam ? T(`Dziś ${zam}.`, `Today: ${zam}.`) : '',
        dlugiNast,
      ].filter(Boolean).join(' '),
    };
  }
  const brak = !nastepny;
  const powod = info?.wolne ? T(info.wolne.opis, info.wolne.opis_en) : '';
  return {
    data, kolor: null, litera: '–', nastepny, nastepnyKolor: nk,
    tytul: brak ? T('Kolory dni', 'Day colours') : T('Dziś brak zajęć', 'No classes today'),
    opis: brak ? T('Brak danych o kolejnym semestrze', 'No data for the next semester') : opisNast,
    opisDlugi: brak
      ? T('Brak danych o kolejnym semestrze.', 'No data for the next semester yet.')
      : [powod ? `${powod}.` : '', dlugiNast].filter(Boolean).join(' '),
  };
}
