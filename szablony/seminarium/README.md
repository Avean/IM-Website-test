# Referaty seminarium „__NAZWA__”

To repozytorium zawiera **tylko referaty** seminarium „__NAZWA__”. Strona Instytutu Matematycznego UWr
(repozytorium `__STRONA_REPO__`) pobiera je przy każdym budowaniu i pokazuje na stronie seminarium,
w „Seminariach w tym tygodniu”, w kalendarzu (.ics) i w powiadomieniach e-mail.

## Jak dodać referat

1. Wejdź na https://app.pagescms.org — przez link z zaproszenia e-mailowego albo kontem GitHub.
2. Wybierz repozytorium `__REPOZYTORIUM__` → **Referaty** → **Add an entry** (dodaj wpis).
3. Wypełnij: tytuł, prelegent, afiliacja, termin (data i godzina), sala, ewentualnie pliki (slajdy) i streszczenie.
   Streszczenie piszemy w Markdown, wzory w `$...$` (np. `$\int_0^1 f(x)\,dx$`).
4. Zapisz (**Save**). Po ok. 3–5 minutach referat będzie na stronie Instytutu.

Wskazówki:

- **Opublikowany** — odznacz, żeby referat nie pojawiał się na listach (np. szkic).
- Pliki (slajdy itp.) wgrywaj przyciskiem w polu **Plik**: dozwolone są m.in. PDF, obrazy (PNG, JPG), prezentacje
  i dokumenty biurowe, archiwa ZIP, pliki TeX. Inne typy (np. HTML, SVG) strona pomija.
- Opis seminarium, koordynatorów i kontakt zmienia redakcja strony Instytutu — napisz do niej.

## Jak to działa

- `referaty/` — jeden referat = jeden plik Markdown (nazwa `RRRR-MM-DD-tytul.md`, nadaje ją panel).
- `pliki/` — pliki dołączone do referatów (na stronie pod adresem `/pliki/seminaria/__SEMINARIUM__/…`).
- `.github/workflows/powiadom-strone.yml` — po każdej zmianie prosi stronę Instytutu o przebudowę
  i sprawdza, czy referaty mają wymagane pola (referat z błędem strona pomija).
- `.pages.yml` — konfiguracja panelu Pages CMS (pola takie same jak na stronie Instytutu).

Nie zmieniaj nazwy repozytorium ani folderów `referaty/` i `pliki/` — strona szuka referatów właśnie tam.
