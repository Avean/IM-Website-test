# Raport kontroli jakości

Gałąź `qa-1`, commit `d76f0f3`, przebieg https://github.com/Avean/IM-Website-test/actions/runs/40108257806

Strony HTML: 259, linki: 29057.

## 1. Linki wewnętrzne (błąd krytyczny)

Brak zepsutych linków wewnętrznych.

### Nieistniejące kotwice (#) — 131

| cel | strony |
|---|---|
| `/en/studia/zajecia#konsultacje` | 129: /en/, /en/aktualnosci/, /en/aktualnosci/2026-04-25-zmiany-w-regulaminie-biblioteki/, /en/aktualnosci/2026-04-30-konkurs-na-stypendium-dla-doktoranta/ (+125) |
| `/studia/matematyka#praktyki-pedagogiczne` | 1: /instytut/zaklady/dydaktyka/ |

## 2. Linki zewnętrzne (ostrzeżenia)

Sprawdzono 400 adresów. Zepsute: 14, niepewne (403/429/5xx/timeout): 26. lychee: `{"total": 400, "successful": 360, "errors": 38, "excludes": 0, "timeouts": 2, "unknown": 0, "redirects": 83}` (kod 2)

### Zepsute

| status | adres | strony |
|---|---|---|
| Network error: Connection failed. Check network connectivity | http://forum2019.math.uni.wroc.pl/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2019-forum-on-partial-differential-equations-xi/, /nauka/konferencje/ (+1) |
| Network error: Connection failed. Check network connectivity | http://magweb.math.uni.wroc.pl/analiza/bedlewo17/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-17th-workshop-non-commutative-probability-levy-processes-and-operator-algebras-w/, /nauka/konferencje/ (+1) |
| 404 | http://math.uni.wroc.pl/~nadav | 4: /en/instytut/zaklady/algebra-i-teoria-modeli/, /en/pracownicy/, /instytut/zaklady/algebra-i-teoria-modeli/ (+1) |
| 404 | http://www.math.uni.wroc.pl/~hebisch/ | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| 404 | http://www.math.uni.wroc.pl/~karch/pattern/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-mathematics-of-pattern-formation/, /nauka/konferencje/ (+1) |
| 404 | https://publichealth.indiana.edu/research/faculty-directory/profile.html?user=harezlak | 4: /en/instytut/zaklady/statystyka/, /en/pracownicy/, /instytut/zaklady/statystyka/ (+1) |
| 404 | http://www.math.uni.wroc.pl/mathbank/preprinty/index.php | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| 404 | http://www.math.uni.wroc.pl/~dbura/dydaktyka/fundacja8.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~dbura/dydaktyka/random_walks.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~dbura/dydaktyka/wizualizacja.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~grzes/dydaktyka13_14/fr_main.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~jdziuban/calki.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~jdziuban/fourier.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~stanczr/semin/semin.html | 2: /en/seminaria/rownania-rozniczkowe/, /seminaria/rownania-rozniczkowe/ |

### Niepewne

| status | adres | strony |
|---|---|---|
| 400 | https://www.facebook.com/IMUWr | 259: /, /404.html, /aktualnosci/ (+256) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/20-19thworkshop | 6: /en/nauka/konferencje/, /en/nauka/konferencje/2020-19th-workshop-noncommutative-probability-noncommucative-harmonic-analysis-and-re/, /en/nauka/konferencje/2021-19th-workshop-noncommutative-probability-noncommucative-harmonic-analysis-and-re/ (+3) |
| 502 | http://bcc.impan.pl/13Levy/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2013-7th-international-conference-on-levy-processes-theory-and-applications/, /nauka/konferencje/ (+1) |
| 502 | http://bcc.impan.pl/14PAHA/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-probabilistic-aspect-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| 502 | http://bcc.impan.pl/14Young/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-7th-young-set-theory-workshop/, /nauka/konferencje/ (+1) |
| 502 | http://bcc.impan.pl/16PAHA/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-probabilistic-aspect-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| Timeout | http://www.iam.fmph.uniba.sk/institute/quittner/bedlewo/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-7th-euro-japanese-workshop-on-blow-up/, /nauka/konferencje/ (+1) |
| Timeout | http://www.iam.fmph.uniba.sk/institute/quittner/bedlewo20/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2020-9th-euro-japanese-workshop-on-blow-up/, /nauka/konferencje/ (+1) |
| 403 | http://www.impan.pl/~set_theory/Workshop2013/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2013-workshop-on-set-theoretic-methods-in-compact-spaces-and-banach-spaces/, /nauka/konferencje/ (+1) |
| 403 | http://www.impan.pl/~set_theory/dmvptm14/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-workshop-in-set-theory/, /nauka/konferencje/ (+1) |
| 403 | http://www.math.uni.wroc.pl/ivmrt2014 | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-integration-vector-measures-and-related-topics/, /nauka/konferencje/ (+1) |
| 403 | https://combandgroups.wordpress.com/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-combinatorics-and-groups/, /nauka/konferencje/ (+1) |
| 503 | https://panda.pwr.edu.pl/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2022-probability-and-analysis-2022/, /nauka/konferencje/ (+1) |
| 302 | https://usosweb.uwr.edu.pl/kontroler.php?_action=katalog2%2Fprzedmioty%2FszukajPrzedmiotu&_pattern=&_prz_kod_pattern=28-MT | 4: /en/studia/matematyka/, /en/studia/zajecia/, /studia/matematyka/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/17-modeltheory | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2017-model-theory-conference/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/18-paha | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2018-probabilistic-aspects-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/18-workshop18 | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2018-18th-workshop-noncommutative-probability-operators-algebras-random-matrices-and/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/20-probabilistic | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2020-probabilistic-aspects-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/20-random | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2020-random-models/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/22-19thworkshop | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2022-19th-workshop-noncommutative-probability-noncommucative-harmonic-analysis-and-re/, /nauka/konferencje/ (+1) |
| 403 | https://erc.europa.eu/ | 2: /en/nauka/granty/, /nauka/granty/ |
| 302 | https://usosweb.uwr.edu.pl/kontroler.php?_action=news/rejestracje/rejJednostki&jed_org_kod=28 | 2: /en/studia/zajecia/, /studia/zajecia/ |
| 400 | https://www.facebook.com/KNZM.UWr/ | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| 400 | https://www.facebook.com/WRSSWMI/ | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| 400 | https://www.facebook.com/knmtuwr | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| 503 | https://www.ptm.org.pl/konkursy/wyklady-im-waclawa-sierpinskiego | 2: /aktualnosci/2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza/, /en/aktualnosci/2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza/ |

## 3. Dług migracyjny — linki do math.uni.wroc.pl

| zakres | rodzaj | wystąpienia | adresy | strony |
|---|---|---|---|---|
| wszystko | **razem** | 2893 | 287 | 259 |
| wszystko | pliki | 226 | 111 | 36 |
| wszystko | strony | 1689 | 44 | 259 |
| wszystko | strony domowe (~, /users/) | 978 | 132 | 259 |
| w treści (PL+EN) | **razem** | 782 | 283 | 102 |
| w treści (PL+EN) | pliki | 226 | 111 | 36 |
| w treści (PL+EN) | strony | 96 | 41 | 36 |
| w treści (PL+EN) | strony domowe (~, /users/) | 460 | 131 | 56 |
| w treści, tylko PL | **razem** | 391 | 283 | 51 |
| w treści, tylko PL | pliki | 113 | 111 | 18 |
| w treści, tylko PL | strony | 48 | 41 | 18 |
| w treści, tylko PL | strony domowe (~, /users/) | 230 | 131 | 28 |

W szablonie (menu/stopka, na ≥50% stron): http://www.math.uni.wroc.pl/~jwr/trapez/, https://www.math.uni.wroc.pl/, https://www.math.uni.wroc.pl/studia/plany_zajec/planZ.php, https://www.math.uni.wroc.pl/sukcesy

Wg sekcji (tylko PL, bez szablonu): `/instytut/` 99, `/pracownicy/` 95, `/studia/` 95, `/nauka/` 64, `/obrony-doktorskie/` 36, `/seminaria/` 2

### 15 najczęstszych adresów w treści (liczba stron PL+EN)

- 6 × http://www.math.uni.wroc.pl/~pkowa/ln20.html (np. /en/nauka/konferencje/, /en/nauka/konferencje/2020-model-theory-conference/, /en/nauka/konferencje/2022-model-theory-conference-in-celebration-of-ludomir-newelski-s-60th-birthday/)
- 6 × https://www.math.uni.wroc.pl/users/wylupek (np. /en/instytut/wladze/, /en/instytut/zaklady/statystyka/, /en/pracownicy/)
- 4 × http://math.uni.wroc.pl/analysis2017/ (np. /en/nauka/konferencje/, /en/nauka/konferencje/2017-analysis-and-applications-in-honor-of-professor-elias-m-stein/, /nauka/konferencje/)
- 4 × http://math.uni.wroc.pl/~hejna/ (np. /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/)
- 4 × http://math.uni.wroc.pl/~kkrystecki (np. /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/)
- 4 × http://math.uni.wroc.pl/~mbogdan/ (np. /en/instytut/zaklady/statystyka/, /en/pracownicy/, /instytut/zaklady/statystyka/)
- 4 × http://math.uni.wroc.pl/~nadav (np. /en/instytut/zaklady/algebra-i-teoria-modeli/, /en/pracownicy/, /instytut/zaklady/algebra-i-teoria-modeli/)
- 4 × http://www.math.uni.wroc.pl/analiza/2014_Hartman/ (np. /en/nauka/konferencje/, /en/nauka/konferencje/2014-sesja-poswiecona-100-leciu-urodzin-profesora-stanislawa-hartmana/, /nauka/konferencje/)
- 4 × http://www.math.uni.wroc.pl/analiza/bedlewo16 (np. /en/nauka/konferencje/, /en/nauka/konferencje/2014-16th-workshop-non-commutative-harmonic-analysis/, /nauka/konferencje/)
- 4 × http://www.math.uni.wroc.pl/ggt/ (np. /en/nauka/konferencje/, /en/nauka/konferencje/2015-conference-on-geometric-group-theory/, /nauka/konferencje/)
- 4 × http://www.math.uni.wroc.pl/ivmrt2014 (np. /en/nauka/konferencje/, /en/nauka/konferencje/2014-integration-vector-measures-and-related-topics/, /nauka/konferencje/)
- 4 × http://www.math.uni.wroc.pl/sesja_Urbanik (np. /en/nauka/konferencje/, /en/nauka/konferencje/2015-kazimierz-urbanik-1930-2005/, /nauka/konferencje/)
- 4 × http://www.math.uni.wroc.pl/users/staniak (np. /en/instytut/zaklady/statystyka/, /en/pracownicy/, /instytut/zaklady/statystyka/)
- 4 × http://www.math.uni.wroc.pl/~aracz/ (np. /en/instytut/zaklady/rownania-rozniczkowe/, /en/pracownicy/, /instytut/zaklady/rownania-rozniczkowe/)
- 4 × http://www.math.uni.wroc.pl/~biler/ (np. /en/instytut/zaklady/rownania-rozniczkowe/, /en/pracownicy/, /instytut/zaklady/rownania-rozniczkowe/)

Inne serwisy `*.math.uni.wroc.pl` (nie liczone jako dług): fmw.math.uni.wroc.pl (520), ptm.math.uni.wroc.pl (518), kamil.math.uni.wroc.pl (4), hulanickiaward.math.uni.wroc.pl (4), akula.math.uni.wroc.pl (4), krawczyk.math.uni.wroc.pl (4), korpalski.math.uni.wroc.pl (4), magweb.math.uni.wroc.pl (4), forum2019.math.uni.wroc.pl (4), odkrywcy.math.uni.wroc.pl (2), karolak.math.uni.wroc.pl (2)

## 4. Dostępność (pa11y-ci: axe + HTML_CodeSniffer, WCAG 2 AA)

Przetestowano 47 adresów, problemów: 67, reguł: 4.

| runner | reguła | wpływ | wystąpienia | strony | pliki (podpowiedź) | opis |
|---|---|---|---|---|---|---|
| htmlcs | `WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2` | error | 47 | 47: /, /aktualnosci/, /deklaracja-dostepnosci/, /kalendarz/ (+43) | src/components/Naglowek.astro | This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with |
| axe | `aria-allowed-attr` | critical | 12 | 4: /studia/matematyka/, /en/studia/matematyka/, /studia/matematyka/?qa=ciemny, /studia/matematyka/?qa=telefon | src/components/TabelaPracownikow.tsx, src/views/Kalendarz.astro, src/views/Kierunek.astro (+3) | Elements must only use supported ARIA attributes |
| axe | `color-contrast` | serious | 7 | 4: /, /en/, /?qa=ciemny, /?qa=telefon | src/layouts/Baza.astro | Elements must meet minimum color contrast ratio thresholds |
| axe | `label-title-only` | serious | 1 | 1: /szukaj/ | src/views/Szukaj.astro | Form elements should have a visible label |

### Przykłady

**[htmlcs] WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2** — This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with type attribute "submit" or "image", or 
- `/` `html > body > header > div > div > form` — This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with type attribute "submit" or "image", or 
  - `<form class="hdr-search" role="search" action="/szukaj" method="get"> <svg class="ico " style="width...</form>`

**[axe] aria-allowed-attr** — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
- `/studia/matematyka/` `#tab-0` — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
  - `<button type="button" role="tab" class="chip" id="tab-0" aria-controls="prog-0" aria-selected="true" aria-pressed="true" data-od="2026" data-do="2100" tabindex="0">Nowy program (od 2026/27)</button>`
- `/studia/matematyka/` `#tab-1` — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
  - `<button type="button" role="tab" class="chip" id="tab-1" aria-controls="prog-1" aria-selected="false" aria-pressed="false" data-od="2022" data-do="2025" tabindex="-1">Stary program (2022–2025/26)</but`
- `/studia/matematyka/` `#tab-2` — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
  - `<button type="button" role="tab" class="chip" id="tab-2" aria-controls="prog-2" aria-selected="false" aria-pressed="false" data-od="1990" data-do="2021" tabindex="-1">Programy archiwalne (przed 2022..`

**[axe] color-contrast** — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
- `/` `#tresc > section:nth-child(1) > figure > figcaption` — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
  - `<figcaption>Fot. fotopolska.eu</figcaption>`
  - kontrast: NIE potwierdzone ponownym pomiarem axe-core po pełnym załadowaniu (prawdopodobnie fałszywy alarm — sprawdzić ręcznie)
- `/` `#h1-glowna` — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
  - `<h1 id="h1-glowna">Instytut Matematyczny</h1>`
  - kontrast: NIE potwierdzone ponownym pomiarem axe-core po pełnym załadowaniu (prawdopodobnie fałszywy alarm — sprawdzić ręcznie)

**[axe] label-title-only** — Form elements should have a visible label (https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=axeAPI)
- `/szukaj/` `#szukajka > div > form > input` — Form elements should have a visible label (https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=axeAPI)
  - `<input class="pagefind-ui__search-input svelte-e9gkc3" type="text" placeholder="Szukaj na stronie" title="Szukaj na stronie" autocapitalize="none" enterkeyhint="search" autofocus="">`

### Liczba problemów na stronę

`/studia/matematyka/` 4, `/en/studia/matematyka/` 4, `/studia/matematyka/?qa=ciemny` 4, `/studia/matematyka/?qa=telefon` 4, `/` 3, `/en/` 3, `/?qa=ciemny` 3, `/szukaj/` 2, `/?qa=telefon` 2, `/aktualnosci/` 1, `/deklaracja-dostepnosci/` 1, `/kalendarz/` 1, `/obrony-doktorskie/` 1, `/polityka-prywatnosci/` 1, `/pracownicy/` 1, `/seminaria/` 1, `/aktualnosci/2026-10-17-rusza-tutornia/` 1, `/instytut/wladze/` 1, `/instytut/zaklady/teoria-prawdopodobienstwa/` 1, `/nauka/granty/` 1, `/nauka/konferencje/` 1, `/nauka/publikacje/` 1, `/nauka/konferencje/2026-discrete-random-structures-ii/` 1, `/obrony-doktorskie/2026-10-27-malwina-mrowinska/` 1, `/seminaria/statystyka/` 1, `/studia/zajecia/` 1, `/studia/matematyka/matematyka-teoretyczna/` 1, `/instytut/infrastruktura-informatyczna/` 1, `/instytut/kontakt/` 1, `/studia/egzaminy-i-dyplom/` 1, `/studia/pierwszy-rok/` 1, `/studia/podyplomowe/` 1, `/studia/procedura-dyplomowania/` 1, `/studia/rok-akademicki/` 1, `/studia/siad/` 1, `/studia/skrypty/` 1, `/studia/sprawy-studenckie/` 1, `/studia/szkola-doktorska/` 1, `/en/aktualnosci/` 1, `/en/instytut/kontakt/` 1, `/en/pracownicy/` 1, `/404.html` 1, `/aktualnosci/?qa=ciemny` 1, `/pracownicy/?qa=ciemny` 1, `/seminaria/?qa=ciemny` 1, `/instytut/zaklady/teoria-prawdopodobienstwa/?qa=ciemny` 1, `/pracownicy/?qa=telefon` 1
