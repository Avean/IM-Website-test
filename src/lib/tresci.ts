// Wspólne zapytania do treści: aktualności, wydarzenia, seminaria, obrony.
import { getCollection, type CollectionEntry } from 'astro:content';
import { now, today, weekRange, weekday, addDays, hasTime, plusMinutes, type Lang } from './daty';

export type Aktualnosc = CollectionEntry<'aktualnosci'>;
export type Obrona = CollectionEntry<'obrony'>;
export type Referat = CollectionEntry<'referaty'>;
export type Seminarium = CollectionEntry<'seminaria'>;
export type Konferencja = CollectionEntry<'konferencje'>;
export type Grant = CollectionEntry<'granty'>;
export type Zaklad = CollectionEntry<'zaklady'>;
export type Pracownik = CollectionEntry<'pracownicy'>;

export const opublikowane = <T extends { data: { opublikowany?: boolean } }>(e: T) => e.data.opublikowany !== false;

// Identyfikator wpisu bez rozszerzenia i podfolderów daty.
export const slugOf = (id: string) => id.split('/').pop()!.replace(/\.(md|ya?ml)$/, '');

export async function aktualnosci(wszystkie = false): Promise<Aktualnosc[]> {
  const items = await getCollection('aktualnosci');
  return items
    .filter((e) => wszystkie || opublikowane(e))
    .sort((a, b) => (a.data.data < b.data.data ? 1 : a.data.data > b.data.data ? -1 : 0));
}

export async function obrony(wszystkie = false): Promise<Obrona[]> {
  const items = await getCollection('obrony');
  return items
    .filter((e) => wszystkie || opublikowane(e))
    .sort((a, b) => (a.data.termin < b.data.termin ? 1 : -1));
}

export async function seminaria(wszystkie = false): Promise<Seminarium[]> {
  const items = await getCollection('seminaria');
  return items
    .filter((e) => wszystkie || opublikowane(e))
    .sort((a, b) => a.data.nazwa.localeCompare(b.data.nazwa, 'pl'));
}

export async function konferencje(wszystkie = false): Promise<Konferencja[]> {
  const items = await getCollection('konferencje');
  return items
    .filter((e) => wszystkie || opublikowane(e))
    .sort((a, b) => (a.data.poczatek < b.data.poczatek ? 1 : a.data.poczatek > b.data.poczatek ? -1 : 0));
}

export async function granty(wszystkie = false): Promise<Grant[]> {
  const items = await getCollection('granty');
  return items
    .filter((e) => wszystkie || opublikowane(e))
    .sort((a, b) => (b.data.rok_od ?? 0) - (a.data.rok_od ?? 0) || (b.data.rok_do ?? 0) - (a.data.rok_do ?? 0) || a.data.tytul.localeCompare(b.data.tytul, 'pl'));
}

export async function zaklady(wszystkie = false): Promise<Zaklad[]> {
  const items = await getCollection('zaklady');
  return items.filter((e) => wszystkie || opublikowane(e)).sort((a, b) => a.data.kolejnosc - b.data.kolejnosc || a.data.nazwa.localeCompare(b.data.nazwa, 'pl'));
}

export async function pracownicy(): Promise<Pracownik[]> {
  return (await getCollection('pracownicy')).filter(opublikowane);
}

// Nazwisko z zapisu typu „prof. dr hab. P. Borodulin-Nadzieja” albo „prof. Piotr Biler, prof. Grzegorz Karch” (bierzemy pierwszą osobę).
const nazwiskoZ = (s: string) => {
  const pierwsza = s.split(/[,;]/)[0].trim();
  return pierwsza.split(/\s+/).pop()!.replace(/[^\p{L}-]/gu, '');
};

// Zakład projektu: pole „zakład”, a gdy puste — zakład kierownika znalezionego w spisie pracowników.
export function zakladGrantu(g: Grant, osoby: Pracownik[]): string | undefined {
  if (g.data.zaklad) return g.data.zaklad;
  if (!g.data.kierownik) return undefined;
  const n = nazwiskoZ(g.data.kierownik);
  const pasujace = osoby.filter((o) => o.data.imie_nazwisko.split(/\s+/).pop() === n);
  return pasujace.length === 1 ? pasujace[0].data.zaklad : undefined;
}

// Kolejność na liście składu: profesorowie, doktorzy habilitowani, doktorzy, magistrzy.
export function rangaStopnia(stopien?: string): number {
  const s = (stopien ?? '').toLowerCase();
  if (s.includes('prof. dr hab') || s.startsWith('prof')) return 0;
  if (s.includes('hab')) return 1;
  if (s.startsWith('dr')) return 2;
  if (s.startsWith('mgr')) return 3;
  return 4;
}

// Folder referatu = identyfikator seminarium (np. referaty/statystyka/2026-10-13-x.md).
export const seminariumReferatu = (r: Referat) => r.id.split('/')[0];

export async function referaty(wszystkie = false): Promise<Referat[]> {
  const items = await getCollection('referaty');
  return items
    .filter((e) => wszystkie || opublikowane(e))
    .sort((a, b) => (a.data.termin < b.data.termin ? -1 : 1));
}

// "605" → "sala 605"; dłuższe opisy miejsca zostają bez zmian.
export function sala(s: string | undefined, lang: Lang = 'pl'): string | undefined {
  if (!s) return undefined;
  return /^[\w.\-]{1,6}$/.test(s) ? `${lang === 'en' ? 'room' : 'sala'} ${s}` : s;
}

// Wspólny format pozycji kalendarza.
export interface Wydarzenie {
  rodzaj: 'wydarzenie' | 'obrona' | 'referat' | 'konferencja';
  tytul: string;
  podtytul?: string;
  poczatek: string;
  // koniec podany przez redaktora (wyświetlany na stronie)
  koniec?: string;
  // koniec do kalendarza .ics i do ustalania, czy wydarzenie trwa (domyślnie +2 h / +1,5 h)
  koniecIcs?: string;
  miejsce?: string;
  href: string;
  uid: string;
  opis?: string;
}

const koniecDomyslny = (start: string, minuty: number) => (hasTime(start) ? plusMinutes(start, minuty) : undefined);

export async function wszystkieWydarzenia(lang: Lang = 'pl'): Promise<Wydarzenie[]> {
  const [akt, obr, ref, sem, konf] = await Promise.all([aktualnosci(), obrony(), referaty(), seminaria(), konferencje()]);
  const nazwy = new Map(sem.map((s) => [s.id, (lang === 'en' && s.data.nazwa_en) || s.data.nazwa]));
  const out: Wydarzenie[] = [];
  for (const a of akt) {
    if (!a.data.wydarzenie_poczatek) continue;
    out.push({
      rodzaj: 'wydarzenie', tytul: (lang === 'en' && a.data.tytul_en) || a.data.tytul, poczatek: a.data.wydarzenie_poczatek,
      koniec: a.data.wydarzenie_koniec, koniecIcs: a.data.wydarzenie_koniec || koniecDomyslny(a.data.wydarzenie_poczatek, 120),
      miejsce: a.data.wydarzenie_miejsce, href: `/aktualnosci/${slugOf(a.id)}`, uid: `akt-${slugOf(a.id)}`, opis: (lang === 'en' && a.data.zajawka_en) || a.data.zajawka,
    });
  }
  for (const o of obr) {
    out.push({
      rodzaj: 'obrona', tytul: `${lang === 'en' ? 'PhD defence' : 'Obrona doktoratu'}: ${o.data.kandydat}`, podtytul: o.data.tytul_rozprawy, poczatek: o.data.termin,
      koniecIcs: koniecDomyslny(o.data.termin, 120), miejsce: o.data.miejsce, href: `/obrony-doktorskie/${slugOf(o.id)}`, uid: `obr-${slugOf(o.id)}`,
    });
  }
  for (const k of konf) {
    if (k.data.odwolana) continue;
    out.push({
      rodzaj: 'konferencja', tytul: (lang === 'en' && k.data.tytul_en) || k.data.tytul, poczatek: k.data.poczatek, koniec: k.data.koniec,
      miejsce: k.data.miejsce, href: `/nauka/konferencje/${slugOf(k.id)}`, uid: `konf-${slugOf(k.id)}`,
    });
  }
  for (const r of ref) {
    const semId = seminariumReferatu(r);
    if (!nazwy.has(semId)) continue;
    out.push({
      rodzaj: 'referat', tytul: r.data.tytul, podtytul: `${r.data.prelegent}${r.data.afiliacja ? ` (${r.data.afiliacja})` : ''}`,
      poczatek: r.data.termin, koniecIcs: koniecDomyslny(r.data.termin, 90), miejsce: sala(r.data.sala, lang),
      href: `/seminaria/${semId}#${slugOf(r.id)}`, uid: `ref-${semId}-${slugOf(r.id)}`, opis: `${lang === 'en' ? 'Seminar' : 'Seminarium'}: ${nazwy.get(semId)}`,
    });
  }
  return out.sort((a, b) => (a.poczatek < b.poczatek ? -1 : 1));
}

// Czy wydarzenie jeszcze się nie skończyło.
export function trwaLubBedzie(w: { poczatek: string; koniec?: string; koniecIcs?: string }): boolean {
  const n = now();
  const end = w.koniec || w.koniecIcs || w.poczatek;
  return hasTime(end) ? end >= n : end >= today();
}

export async function najblizszeWydarzenia(limit = 4, lang: Lang = 'pl'): Promise<Wydarzenie[]> {
  const all = await wszystkieWydarzenia(lang);
  return all.filter((w) => w.rodzaj !== 'referat' && trwaLubBedzie(w)).slice(0, limit);
}

// Tydzień pokazywany na stronie głównej: bieżący, a od soboty — następny.
export function tydzienSeminariow(): { od: string; do: string; przyszly: boolean } {
  const d = today();
  const wd = weekday(d);
  const przyszly = wd === 6 || wd === 0;
  const [od, doDnia] = weekRange(przyszly ? addDays(d, 3) : d);
  return { od, do: doDnia, przyszly };
}

export interface ReferatWLiscie { termin: string; sala?: string; seminarium: string; seminariumId: string; tytul: string; prelegent: string; href: string }

export async function referatyWTygodniu(lang: Lang = 'pl'): Promise<ReferatWLiscie[]> {
  const [ref, sem] = await Promise.all([referaty(), seminaria()]);
  const nazwy = new Map(sem.map((s) => [s.id, (lang === 'en' && s.data.nazwa_en) || s.data.nazwa]));
  const { od, do: doDnia } = tydzienSeminariow();
  return ref
    .filter((r) => r.data.termin.slice(0, 10) >= od && r.data.termin.slice(0, 10) <= doDnia && nazwy.has(seminariumReferatu(r)))
    .map((r) => {
      const semId = seminariumReferatu(r);
      return {
        termin: r.data.termin, sala: r.data.sala, seminarium: nazwy.get(semId)!, seminariumId: semId, tytul: r.data.tytul,
        prelegent: r.data.prelegent, href: `/seminaria/${semId}#${slugOf(r.id)}`,
      };
    });
}

// Pozycja listy aktualności (aktualność albo obrona doktorska).
export interface PozycjaListy {
  rodzaj: string;
  tytul: string;
  data: string;
  zajawka?: string;
  zdjecie?: string;
  zdjecie_opis?: string;
  dla: string[];
  href: string;
  wydarzenie?: string;
  wyroznij_do?: string;
  id: string;
}

export async function listaAktualnosci(lang: Lang = 'pl'): Promise<PozycjaListy[]> {
  const [akt, obr] = await Promise.all([aktualnosci(), obrony()]);
  const items: PozycjaListy[] = akt.map((a) => ({
    rodzaj: a.data.rodzaj, tytul: (lang === 'en' && a.data.tytul_en) || a.data.tytul, data: a.data.data,
    zajawka: (lang === 'en' && a.data.zajawka_en) || a.data.zajawka, zdjecie: a.data.zdjecie,
    zdjecie_opis: a.data.zdjecie_opis, dla: a.data.dla, href: `/aktualnosci/${slugOf(a.id)}`, wydarzenie: a.data.wydarzenie_poczatek,
    wyroznij_do: a.data.wyroznij_do, id: `akt-${slugOf(a.id)}`,
  }));
  for (const o of obr) {
    if (o.data.w_aktualnosciach === false) continue;
    items.push({
      rodzaj: 'obrona', tytul: `${lang === 'en' ? 'PhD defence' : 'Obrona doktoratu'}: ${o.data.kandydat}`, data: o.data.data_ogloszenia || o.data.termin.slice(0, 10),
      zajawka: o.data.tytul_rozprawy, dla: [], href: `/obrony-doktorskie/${slugOf(o.id)}`, wydarzenie: o.data.termin, id: `obr-${slugOf(o.id)}`,
    });
  }
  return items.sort((a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : 0));
}

// Strona główna: wyróżnione na górze, potem chronologicznie; bez dubli z "Najbliższymi wydarzeniami".
export async function aktualnosciNaGlowna(limit = 6, lang: Lang = 'pl', wNajblizszych: string[] = []): Promise<PozycjaListy[]> {
  const lista = await listaAktualnosci(lang);
  const pominiete = new Set(wNajblizszych);
  const d = today();
  const wyroznione = lista.filter((p) => p.wyroznij_do && p.wyroznij_do >= d);
  const reszta = lista.filter((p) => !(p.wyroznij_do && p.wyroznij_do >= d) && !pominiete.has(p.href));
  return [...wyroznione, ...reszta].slice(0, limit);
}

export async function wyroznionaAktualnosc(lang: Lang = 'pl'): Promise<PozycjaListy | undefined> {
  const lista = await listaAktualnosci(lang);
  const d = today();
  return lista.find((p) => p.wyroznij_do && p.wyroznij_do >= d);
}
