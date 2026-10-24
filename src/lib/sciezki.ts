// Listy adresów do wygenerowania (getStaticPaths) — wspólne dla wersji PL i EN.
import { getCollection } from 'astro:content';
import { aktualnosci, obrony, seminaria, slugOf, opublikowane } from './tresci';

export async function sciezkiAktualnosci() {
  const wszystkie = await aktualnosci(true);
  const pub = wszystkie.filter(opublikowane);
  return wszystkie.map((wpis) => {
    const i = pub.indexOf(wpis);
    return {
      params: { slug: slugOf(wpis.id) },
      props: { wpis, nowszy: i > 0 ? pub[i - 1] : undefined, starszy: i >= 0 && i < pub.length - 1 ? pub[i + 1] : undefined },
    };
  });
}

export async function sciezkiStron() {
  const strony = await getCollection('strony');
  return strony.map((strona) => ({ params: { slug: strona.id }, props: { strona } }));
}

export async function sciezkiSeminariow() {
  const sem = await seminaria(true);
  return sem.map((s) => ({ params: { slug: s.id }, props: { seminarium: s } }));
}

export async function sciezkiObron() {
  const ob = await obrony(true);
  return ob.map((o) => ({ params: { slug: slugOf(o.id) }, props: { obrona: o } }));
}
