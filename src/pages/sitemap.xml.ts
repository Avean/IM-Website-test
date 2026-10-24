// Mapa strony dla wyszukiwarek (tylko opublikowane treści, obie wersje językowe).
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { aktualnosci, obrony, seminaria, slugOf } from '../lib/tresci';
import { absolute } from '../lib/url';
import { wJezyku } from '../lib/i18n';

export async function GET(context: APIContext) {
  const sciezki: string[] = ['/', '/aktualnosci', '/kalendarz', '/seminaria', '/pracownicy', '/obrony-doktorskie'];
  for (const a of await aktualnosci()) sciezki.push(`/aktualnosci/${slugOf(a.id)}`);
  for (const o of await obrony()) sciezki.push(`/obrony-doktorskie/${slugOf(o.id)}`);
  for (const s of await seminaria()) sciezki.push(`/seminaria/${s.id}`);
  for (const s of await getCollection('strony')) if (s.data.opublikowany !== false) sciezki.push(`/${s.id}`);
  const url = (p: string) => absolute(p, context.site);
  const wpisy = sciezki
    .map((p) => {
      const pl = url(p);
      const en = url(wJezyku(p, 'en'));
      const alt = `<xhtml:link rel="alternate" hreflang="pl" href="${pl}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
      return `<url><loc>${pl}</loc>${alt}</url><url><loc>${en}</loc>${alt}</url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${wpisy}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
