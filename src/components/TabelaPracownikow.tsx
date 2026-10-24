// Tabela pracowników z wyszukiwarką i filtrem grup (działa też bez JavaScriptu — wtedy pokazuje całość).
import { useMemo, useState } from 'react';

export interface Osoba {
  id: string;
  imie_nazwisko: string;
  stopien?: string;
  grupa: string;
  funkcja?: string;
  zaklad?: string;
  rok_studiow?: number;
  email?: string;
  telefon?: string;
  pokoj?: string;
  strona?: string;
}

interface Props {
  osoby: Osoba[];
  grupy: { id: string; nazwa: string }[];
  zaklady: { id: string; nazwa: string; href: string }[];
  napisy: Record<string, string>;
}

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');

export default function TabelaPracownikow({ osoby, grupy, zaklady, napisy }: Props) {
  const [q, setQ] = useState('');
  const [grupa, setGrupa] = useState('');
  const [zaklad, setZaklad] = useState('');
  const nazwyZakladow = useMemo(() => Object.fromEntries(zaklady.map((z) => [z.id, z.nazwa])), [zaklady]);
  const linkiZakladow = useMemo(() => Object.fromEntries(zaklady.map((z) => [z.id, z.href])), [zaklady]);

  const widoczne = useMemo(() => {
    const nq = norm(q.trim());
    return osoby.filter(
      (o) =>
        (!grupa || o.grupa === grupa) &&
        (!zaklad || o.zaklad === zaklad) &&
        (!nq || norm([o.imie_nazwisko, o.stopien, o.funkcja, o.zaklad && nazwyZakladow[o.zaklad], o.email, o.pokoj].filter(Boolean).join(' ')).includes(nq))
    );
  }, [osoby, q, grupa, zaklad, nazwyZakladow]);

  const sekcje = grupy
    .map((g) => ({ ...g, osoby: widoczne.filter((o) => o.grupa === g.id) }))
    .filter((g) => g.osoby.length > 0);

  return (
    <div>
      <div className="staff-tools">
        <label className="search">
          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ width: 18, height: 18 }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.6-3.6" />
          </svg>
          <span className="sr-only">{napisy.szukaj}</span>
          <input type="search" value={q} placeholder={napisy.szukaj} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label className="search" style={{ minWidth: 0 }}>
          <span className="sr-only">{napisy.zaklad}</span>
          <select value={zaklad} onChange={(e) => setZaklad(e.target.value)} style={{ border: 0, background: 'transparent', font: 'inherit', fontSize: 15, color: 'var(--ink)', outline: 'none', maxWidth: 260 }}>
            <option value="">{napisy.wszystkieZaklady}</option>
            {zaklady.map((z) => (
              <option key={z.id} value={z.id}>{z.nazwa}</option>
            ))}
          </select>
        </label>
        <div className="chips" role="group" aria-label={napisy.grupa} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button type="button" className="chip" aria-pressed={grupa === ''} onClick={() => setGrupa('')}>
            {napisy.wszyscy}
          </button>
          {grupy.map((g) => (
            <button key={g.id} type="button" className="chip" aria-pressed={grupa === g.id} onClick={() => setGrupa(g.id)}>
              {g.nazwa}
            </button>
          ))}
        </div>
      </div>

      <p className="count" aria-live="polite" style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--muted)' }}>
        {napisy.osob}: {widoczne.length}
      </p>

      {sekcje.map((g) => (
        <section key={g.id} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, margin: '18px 0 8px' }}>{g.nazwa}</h2>
          <table className="staff">
            <thead>
              <tr>
                <th scope="col">{napisy.imie}</th>
                {g.id === 'doktorant' && <th scope="col">{napisy.rok}</th>}
                <th scope="col">{napisy.email}</th>
                <th scope="col">{napisy.telefon}</th>
                <th scope="col">{napisy.pokoj}</th>
                <th scope="col">{napisy.strona}</th>
              </tr>
            </thead>
            <tbody>
              {g.osoby.map((o) => (
                <tr key={o.id}>
                  <td className="n" data-l={napisy.imie}>
                    {o.stopien ? `${o.stopien} ` : ''}
                    {o.imie_nazwisko}
                    {(o.funkcja || o.zaklad) && (
                      <small>
                        {o.funkcja}
                        {o.funkcja && o.zaklad && ' · '}
                        {o.zaklad && linkiZakladow[o.zaklad] && <a href={linkiZakladow[o.zaklad]} style={{ color: 'inherit' }}>{nazwyZakladow[o.zaklad]}</a>}
                      </small>
                    )}
                  </td>
                  {g.id === 'doktorant' && <td data-l={napisy.rok}>{o.rok_studiow ?? ''}</td>}
                  <td data-l={napisy.email}>{o.email ? <a href={`mailto:${o.email}`}>{o.email}</a> : ''}</td>
                  <td data-l={napisy.telefon}>{o.telefon ? <a href={`tel:+48${o.telefon.replace(/\s/g, '')}`}>{o.telefon}</a> : ''}</td>
                  <td data-l={napisy.pokoj}>{o.pokoj ?? ''}</td>
                  <td data-l={napisy.strona}>
                    {o.strona ? (
                      <a href={o.strona} aria-label={`${napisy.strona}: ${o.imie_nazwisko}`}>
                        {napisy.link}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
      {widoczne.length === 0 && <p style={{ color: 'var(--muted)' }}>{napisy.brak}</p>}
    </div>
  );
}
