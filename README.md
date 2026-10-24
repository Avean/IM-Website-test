# Strona Instytutu Matematycznego UWr

Nowa strona Instytutu Matematycznego Uniwersytetu Wrocławskiego — wersja testowa.

- **Podgląd:** https://avean.github.io/IM-Website-test/
- **Technologia:** [Astro](https://astro.build) (strona statyczna, jeden plik HTML na podstronę) + komponenty React (tabela pracowników, galeria zdjęć)
- **Treści:** pliki Markdown/YAML w `src/content`, edytowane w [Pages CMS](https://app.pagescms.org)
- **Wzory:** LaTeX w treściach (`$...$` i `$$...$$`), wyświetlany przez KaTeX
- **Publikacja:** GitHub Actions → GitHub Pages, po każdym commicie i dwa razy dziennie

## Dla redaktorów (Pages CMS)

1. Wejdź na https://app.pagescms.org i zaloguj się kontem GitHub (albo przez link z zaproszenia e-mailowego).
2. Wybierz repozytorium `Avean/IM-Website-test`.
3. Edytuj treści w sekcjach po lewej: **Aktualności**, **Obrony doktorskie**, **Seminaria**, **Referaty seminaryjne**, **Pracownicy**, **Strony stałe**, **Ustawienia strony**.
4. Po zapisaniu strona przebuduje się sama w ok. 2–3 minuty.

Wskazówki:

- **Opublikowany** — odznacz, żeby zrobić podgląd: strona ma swój adres, ale nie pojawia się na listach, w wyszukiwarce ani w Google.
- **Wydarzenie** — wpis w Aktualnościach z wypełnionym polem *Wydarzenie: początek* trafia do „Najbliższych wydarzeń” i do kalendarza (.ics).
- **Wyróżnij do…** — wpis pokazuje się w żółtym pasku nad nazwą Instytutu na stronie głównej i znika sam po tej dacie.
- **Referaty** — dodawaj w folderze właściwego seminarium. Streszczenia piszemy w Markdown, wzory w `$...$`.
- **Wersja angielska** — pola „EN: …”. Jeśli są puste, angielska wersja strony pokaże tekst polski z odpowiednią informacją.
- **Linki wewnętrzne** zaczynaj od `/`, np. `/studia/matematyka` albo `/pliki/aktualnosci/plakat.pdf`.

## Struktura repozytorium

```
src/content/aktualnosci/   aktualności (RRRR-MM-DD-tytul.md)
src/content/obrony/        obrony doktorskie
src/content/seminaria/     opisy seminariów (nazwa pliku = adres /seminaria/<nazwa>)
src/content/referaty/      referaty, w folderach o nazwie seminarium
src/content/pracownicy/    jedna osoba = jeden plik .yml
src/content/strony/        strony stałe (ścieżka pliku = adres strony)
src/data/                  menu, stopka, kafelki „Na skróty”, ustawienia strony głównej
public/pliki/              zdjęcia i dokumenty
src/styles/global.css      kolory (tokeny na górze pliku), typografia, układ
src/views, src/components  szablony stron
.pages.yml                 konfiguracja panelu Pages CMS
```

Kolory i zaokrąglenia zmienia się w jednym miejscu — w zmiennych na początku `src/styles/global.css` (tryb jasny i ciemny).

## Praca lokalna

Wymagany Node.js 20 lub nowszy.

```bash
npm install
npm run dev        # podgląd na http://localhost:4321/IM-Website-test/
npm run build      # pełna wersja do katalogu dist/ (z wyszukiwarką)
npm run preview
```

## Kalendarz

- `/kalendarz/wszystko.ics` — wydarzenia, obrony i referaty
- `/kalendarz/wydarzenia.ics` — bez seminariów
- `/kalendarz/seminarium-<nazwa>.ics` — jedno seminarium

## Repozytoria seminariów (plan)

Każde seminarium może mieć osobne repozytorium z własnym Pages CMS. Po zmianie w takim repozytorium jego workflow wysyła do tego repozytorium zdarzenie `repository_dispatch` typu `seminaria`, które uruchamia przebudowę strony:

```bash
gh api repos/Avean/IM-Website-test/dispatches -f event_type=seminaria
```

## Domena UWr

Po przydzieleniu domeny: Settings → Pages → Custom domain. Adres i ścieżkę bazową workflow pobiera automatycznie z ustawień Pages, więc w kodzie nic nie trzeba zmieniać.
