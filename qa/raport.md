# Raport kontroli jakości

Gałąź `qa-1`, commit `ca7fd7d`, przebieg https://github.com/Avean/IM-Website-test/actions/runs/40107155665

Strony HTML: 259, linki: 29057.

## 1. Linki wewnętrzne (błąd krytyczny)

Brak zepsutych linków wewnętrznych.

### Nieistniejące kotwice (#) — 131

| cel | strony |
|---|---|
| `/en/studia/zajecia#konsultacje` | 130: /en/, /en/, /en/aktualnosci/, /en/aktualnosci/2026-04-25-zmiany-w-regulaminie-biblioteki/ (+126) |
| `/studia/matematyka#praktyki-pedagogiczne` | 1: /instytut/zaklady/dydaktyka/ |

## 2. Linki zewnętrzne (ostrzeżenia)

Sprawdzono 443 adresów. Zepsute: 234, niepewne (403/429/5xx/timeout): 17. lychee: `{"total": 443, "successful": 192, "errors": 245, "excludes": 0, "timeouts": 6, "unknown": 0, "redirects": 90}` (kod 2)

### Zepsute

| status | adres | strony |
|---|---|---|
| 400 | https://www.facebook.com/IMUWr | 259: /, /404.html, /aktualnosci/ (+256) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/ | 259: /, /404.html, /aktualnosci/ (+256) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/studia/plany_zajec/planZ.php | 259: /, /404.html, /aktualnosci/ (+256) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sukcesy | 259: /, /404.html, /aktualnosci/ (+256) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/20-19thworkshop | 6: /en/nauka/konferencje/, /en/nauka/konferencje/2020-19th-workshop-noncommutative-probability-noncommucative-harmonic-analysis-and-re/, /en/nauka/konferencje/2021-19th-workshop-noncommutative-probability-noncommucative-harmonic-analysis-and-re/ (+3) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/wylupek | 6: /en/instytut/wladze/, /en/instytut/zaklady/statystyka/, /en/pracownicy/ (+3) |
| Network error: Connection failed. Check network connectivity | http://forum2019.math.uni.wroc.pl/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2019-forum-on-partial-differential-equations-xi/, /nauka/konferencje/ (+1) |
| Network error: Connection failed. Check network connectivity | http://magweb.math.uni.wroc.pl/analiza/bedlewo17/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-17th-workshop-non-commutative-probability-levy-processes-and-operator-algebras-w/, /nauka/konferencje/ (+1) |
| 404 | http://math.uni.wroc.pl/~nadav | 4: /en/instytut/zaklady/algebra-i-teoria-modeli/, /en/pracownicy/, /instytut/zaklady/algebra-i-teoria-modeli/ (+1) |
| 404 | http://www.math.uni.wroc.pl/~hebisch/ | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| 404 | http://www.math.uni.wroc.pl/~karch/pattern/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-mathematics-of-pattern-formation/, /nauka/konferencje/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://prac.im.pwr.edu.pl/~twowlc/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2024-second-wroclaw-logic-conference/, /nauka/konferencje/ (+1) |
| 404 | https://publichealth.indiana.edu/research/faculty-directory/profile.html?user=harezlak | 4: /en/instytut/zaklady/statystyka/, /en/pracownicy/, /instytut/zaklady/statystyka/ (+1) |
| 302 | https://usosweb.uwr.edu.pl/kontroler.php?_action=katalog2%2Fprzedmioty%2FszukajPrzedmiotu&_pattern=&_prz_kod_pattern=28-MT | 4: /en/studia/matematyka/, /en/studia/zajecia/, /studia/matematyka/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/17-modeltheory | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2017-model-theory-conference/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/18-paha | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2018-probabilistic-aspects-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/18-workshop18 | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2018-18th-workshop-noncommutative-probability-operators-algebras-random-matrices-and/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/20-probabilistic | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2020-probabilistic-aspects-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/20-random | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2020-random-models/, /nauka/konferencje/ (+1) |
| 302 | https://www.impan.pl/en/activities/banach-center/conferences/22-19thworkshop | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2022-19th-workshop-noncommutative-probability-noncommucative-harmonic-analysis-and-re/, /nauka/konferencje/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/studia/plany_zajec/planL.php | 4: /en/studia/rok-akademicki/, /en/studia/zajecia/, /studia/rok-akademicki/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/bendikov | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/duda | 4: /en/instytut/zaklady/teoria-mnogosci-i-topologia/, /en/pracownicy/, /instytut/zaklady/teoria-mnogosci-i-topologia/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/gappo | 4: /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/hajduk | 4: /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/karrer | 4: /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/mikrupski | 4: /en/instytut/zaklady/teoria-mnogosci-i-topologia/, /en/pracownicy/, /instytut/zaklady/teoria-mnogosci-i-topologia/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/pawlikowski | 4: /en/instytut/zaklady/teoria-mnogosci-i-topologia/, /en/pracownicy/, /instytut/zaklady/teoria-mnogosci-i-topologia/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/slomian | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/sullivan | 4: /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/szarek | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/tjan | 4: /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/valiunas | 4: /en/instytut/zaklady/geometria/, /en/pracownicy/, /instytut/zaklady/geometria/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/zhang | 4: /en/instytut/zaklady/algebra-i-teoria-modeli/, /en/pracownicy/, /instytut/zaklady/algebra-i-teoria-modeli/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~lorek/bedlewo2018/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2018-stochastic-models-vi/, /nauka/konferencje/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~lorek/bedlewo2023/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2023-stochastic-models-vii/, /nauka/konferencje/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~mirek | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~pkowa/conf23.html | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2023-model-theory-conference/, /nauka/konferencje/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~pkowa/work23.html | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2023-model-theory-workshop/, /nauka/konferencje/ (+1) |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~wrobel/ | 4: /en/instytut/zaklady/analiza-funkcjonalna/, /en/pracownicy/, /instytut/zaklady/analiza-funkcjonalna/ (+1) |
| 404 | http://www.math.uni.wroc.pl/mathbank/preprinty/index.php | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| 404 | http://www.math.uni.wroc.pl/~dbura/dydaktyka/fundacja8.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~dbura/dydaktyka/random_walks.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~dbura/dydaktyka/wizualizacja.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~grzes/dydaktyka13_14/fr_main.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~jdziuban/calki.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| 404 | http://www.math.uni.wroc.pl/~jdziuban/fourier.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | http://www.math.uni.wroc.pl/~pms/ | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| 404 | http://www.math.uni.wroc.pl/~stanczr/semin/semin.html | 2: /en/seminaria/rownania-rozniczkowe/, /seminaria/rownania-rozniczkowe/ |
| 302 | https://usosweb.uwr.edu.pl/kontroler.php?_action=news/rejestracje/rejJednostki&jed_org_kod=28 | 2: /en/studia/zajecia/, /studia/zajecia/ |
| 400 | https://www.facebook.com/KNZM.UWr/ | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| 400 | https://www.facebook.com/WRSSWMI/ | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| 400 | https://www.facebook.com/knmtuwr | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/archiwalne-programy-studiow-na-kierunku-matematyka | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/dostep-do-sieci-bezprzewodowej | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/godziny-otwarcia-laboratorium-komputerowego | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/kolegium-doktorskie-matematyki-dokumenty | 2: /en/studia/szkola-doktorska/, /studia/szkola-doktorska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/kolegium-doktorskie-matematyki-informacje-ogolne | 2: /en/studia/szkola-doktorska/, /studia/szkola-doktorska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/kolegium-doktorskie-matematyki-rekrutacja | 2: /en/studia/szkola-doktorska/, /studia/szkola-doktorska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/kolegium-doktorskie-matematyki-stypendia-i-granty | 2: /en/studia/szkola-doktorska/, /studia/szkola-doktorska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/kwalifikacyjne-studia-podyplomowe-nauczanie-matematyki | 2: /en/studia/podyplomowe/, /studia/podyplomowe/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/oferty-pracy | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/postepowania-w-sprawie-nadania-stopnia-doktora-w-instytucie-matematycznym | 2: /en/obrony-doktorskie/, /obrony-doktorskie/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2003 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2004 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2005 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2006 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2007 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2008 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2009 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2010 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2011 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2012 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2013 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/prace-opublikowane-w-roku-2014 | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/program-most | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/programy-dostepne-dla-studentow-i-pracownikow | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/programy-dostepne-w-pracowniach-komputerowych | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/46-2017.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/abstract_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/abstract_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/abstract_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/abstract_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/abstract_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/adapt2026_matematyka.pdf | 2: /en/studia/pierwszy-rok/, /studia/pierwszy-rok/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/adapt2026_siad.pdf | 2: /en/studia/pierwszy-rok/, /studia/pierwszy-rok/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/arkusz_oceny_kompetencji_2015.docx | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/arkusz_oceny_kompetencji_2015.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/ckp.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/decyzje1rok1sem.pdf | 2: /en/studia/pierwszy-rok/, /studia/pierwszy-rok/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/decyzje1rok2sem.pdf | 2: /en/studia/pierwszy-rok/, /studia/pierwszy-rok/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/doktorat_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/doktorat_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/doktorat_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/doktorat_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/doktorat_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/e-learnings.pdf | 2: /en/studia/zajecia/, /studia/zajecia/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/egzlic_zagadnienia.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/komentarz_do_wytycznych_dla_prac_dyplomowych.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/krupski.dvi | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/krupski.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/krupski.ps | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/mgr21-ad-zakres.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/mgr21-af-zakres.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/mgr21-ek-zakres.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/mgr21-st-zakres.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/mgr21-te-zakres.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/mgr22-na-zakres.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/momentw.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/plan_26_27z_popr3.pdf | 2: /en/studia/pierwszy-rok/, /studia/pierwszy-rok/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/poradnik_26_27.pdf | 2: /en/studia/pierwszy-rok/, /studia/pierwszy-rok/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/praktyka.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/przewodnik-mt-lic.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/przewodnik-mt-mgr.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2015.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2016.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2017.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2018.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2019.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2020.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2021.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2022.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2023.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2024.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/publikacje_2025.pdf | 2: /en/nauka/publikacje/, /nauka/publikacje/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_akwela_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_awreid_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_izezula_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_jkakol_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_leigentler_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_lsmaga_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_mbochenski_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_mhrusak_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_mwilczynski_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_okalenda_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_pmucha_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_pzakrzewski_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_spetrovskiy_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_tkania_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/recenzja_tmaszczyk_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/registering-at-hasselt-university.pdf | 2: /en/studia/zajecia/, /studia/zajecia/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/regulamin-praktyk-nauczycielskich-2026.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/repet.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/repetii.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/sesja2027luty.pdf | 2: /en/studia/zajecia/, /studia/zajecia/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/sesja_poprawkowa2027luty.pdf | 2: /en/studia/zajecia/, /studia/zajecia/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/siec_im_dla_pracownikow_i_doktorantow.pdf | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/siec_studencka_i_laboratoria_komputerowe.pdf | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skrypt_af.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skrypt_al1.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skrypt_al2.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skrypt_rr1.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skrypt_rrcz.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skrypt_symstoch.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skryptn.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/skryptn.ps | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/spec-matematyka-nauczycielska.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/spec-matematyka-stosowana.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/spec-matematyka-teoretyczna.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/stary-program-mt-mgr.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/streszczenie_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/streszczenie_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/streszczenie_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/streszczenie_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/streszczenie_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/szkolna_karta_zaliczenia_praktyki_2015.docx | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/szkolna_karta_zaliczenia_praktyki_2015.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/tem7.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/wdsl.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/wdsl.ps | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/wykaz_kdinf_2025_2026.docx | 2: /en/studia/szkola-doktorska/, /studia/szkola-doktorska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/wykaz_kdmat_2025_2026.pdf | 2: /en/studia/szkola-doktorska/, /studia/szkola-doktorska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/wytyczne_prace_dyplomowe.pdf | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxx.program2.pdf | 2: /en/nauka/konferencje/2016-xxx-konferencja-z-historii-matematyki/, /nauka/konferencje/2016-xxx-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxxi_histmat_info.pdf | 2: /en/nauka/konferencje/2017-xxxi-konferencja-z-historii-matematyki/, /nauka/konferencje/2017-xxxi-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxxi_histmat_program2.pdf | 2: /en/nauka/konferencje/2017-xxxi-konferencja-z-historii-matematyki/, /nauka/konferencje/2017-xxxi-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxxii_konferencja_z_historii_matematyki_2018.pdf | 2: /en/nauka/konferencje/2018-xxxii-konferencja-z-historii-matematyki/, /nauka/konferencje/2018-xxxii-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxxii_konferencja_z_historii_matematyki_2018_program.pdf | 2: /en/nauka/konferencje/2018-xxxii-konferencja-z-historii-matematyki/, /nauka/konferencje/2018-xxxii-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxxiii_khm_info.pdf | 2: /en/nauka/konferencje/2019-xxxiii-konferencja-z-historii-matematyki/, /nauka/konferencje/2019-xxxiii-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/xxxiii_khm_program.pdf | 2: /en/nauka/konferencje/2019-xxxiii-konferencja-z-historii-matematyki/, /nauka/konferencje/2019-xxxiii-konferencja-z-historii-matematyki/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zasady-rejestracji.pdf | 2: /en/studia/zajecia/, /studia/zajecia/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zawiadomienie_antasik.pdf | 2: /en/obrony-doktorskie/2026-06-19-aleksander-antasik/, /obrony-doktorskie/2026-06-19-aleksander-antasik/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zawiadomienie_korpalski.pdf | 2: /en/obrony-doktorskie/2026-06-18-maciej-korpalski/, /obrony-doktorskie/2026-06-18-maciej-korpalski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zawiadomienie_mrowinska.pdf | 2: /en/obrony-doktorskie/2026-10-27-malwina-mrowinska/, /obrony-doktorskie/2026-10-27-malwina-mrowinska/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zawiadomienie_tadej.pdf | 2: /en/obrony-doktorskie/2026-10-20-maciej-tadej/, /obrony-doktorskie/2026-10-20-maciej-tadej/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zawiadomienie_zuchowski.pdf | 2: /en/obrony-doktorskie/2026-09-21-tomasz-zuchowski/, /obrony-doktorskie/2026-09-21-tomasz-zuchowski/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/sites/default/files/zmiany2026.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/tablica-interaktywna | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/terminy | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/diakow | 2: /en/pracownicy/, /pracownicy/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/kkowa | 2: /en/pracownicy/, /pracownicy/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/miklos | 2: /en/pracownicy/, /pracownicy/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/wswiatkowski | 2: /en/pracownicy/, /pracownicy/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/users/zaitseva | 2: /en/pracownicy/, /pracownicy/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/zadania-z-egzaminow-licencjackich | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/zadania-z-egzaminow-magisterskich | 2: /en/studia/egzaminy-i-dyplom/, /studia/egzaminy-i-dyplom/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/zajecia-w-im | 2: /en/studia/zajecia/, /studia/zajecia/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~sgal/szkola/Kombinatoryka/Zbior_zadan_z_kombinatoryki.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~szekli/documents/mumio/mumio-16-trans/skrypt-16.pdf | 2: /en/studia/skrypty/, /studia/skrypty/ |
| Network error: SSL certificate not trusted. Use --insecure i | https://www.math.uni.wroc.pl/~valiunas/erasmus/ | 2: /en/studia/sprawy-studenckie/, /studia/sprawy-studenckie/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-04-25-zmiany-w-regulaminie-biblioteki | 1: /aktualnosci/2026-04-25-zmiany-w-regulaminie-biblioteki/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-04-30-konkurs-na-stypendium-dla-doktoranta | 1: /aktualnosci/2026-04-30-konkurs-na-stypendium-dla-doktoranta/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-05-21-nagroda-kuratowskiego-dla-macieja-kucharskiego | 1: /aktualnosci/2026-05-21-nagroda-kuratowskiego-dla-macieja-kucharskiego/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-05-22-mirek-i-wrobel-frontiers-of-science-award | 1: /aktualnosci/2026-05-22-mirek-i-wrobel-frontiers-of-science-award/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-05-29-lvzhou-chen-laureatem-nagrody-im-kamila-duszenki | 1: /aktualnosci/2026-05-29-lvzhou-chen-laureatem-nagrody-im-kamila-duszenki/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza | 1: /aktualnosci/2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-06-09-ankiety-ewaluacyjne | 1: /aktualnosci/2026-06-09-ankiety-ewaluacyjne/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-06-16-nagroda-im-andrzeja-hulanickiego | 1: /aktualnosci/2026-06-16-nagroda-im-andrzeja-hulanickiego/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-06-16-seminarium-wydzialowe | 1: /aktualnosci/2026-06-16-seminarium-wydzialowe/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-06-19-seminarium-ze-statystyki | 1: /aktualnosci/2026-06-19-seminarium-ze-statystyki/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-07-14-szkola-baby-steps-beyond-the-horizon | 1: /aktualnosci/2026-07-14-szkola-baby-steps-beyond-the-horizon/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-08-03-kategoria-naukowa-a-plus | 1: /aktualnosci/2026-08-03-kategoria-naukowa-a-plus/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-09-10-wyklad-prof-uwe-franza | 1: /aktualnosci/2026-09-10-wyklad-prof-uwe-franza/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-09-20-kurs-dla-studentow-pierwszego-roku | 1: /aktualnosci/2026-09-20-kurs-dla-studentow-pierwszego-roku/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-09-23-2-kongres-mlodych-odkrywcow | 1: /aktualnosci/2026-09-23-2-kongres-mlodych-odkrywcow/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-10-01-witamy-studentow-pierwszego-roku | 1: /aktualnosci/2026-10-01-witamy-studentow-pierwszego-roku/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Faktualnosci%2F2026-10-17-rusza-tutornia | 1: /aktualnosci/2026-10-17-rusza-tutornia/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-04-25-zmiany-w-regulaminie-biblioteki | 1: /en/aktualnosci/2026-04-25-zmiany-w-regulaminie-biblioteki/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-04-30-konkurs-na-stypendium-dla-doktoranta | 1: /en/aktualnosci/2026-04-30-konkurs-na-stypendium-dla-doktoranta/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-05-21-nagroda-kuratowskiego-dla-macieja-kucharskiego | 1: /en/aktualnosci/2026-05-21-nagroda-kuratowskiego-dla-macieja-kucharskiego/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-05-22-mirek-i-wrobel-frontiers-of-science-award | 1: /en/aktualnosci/2026-05-22-mirek-i-wrobel-frontiers-of-science-award/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-05-29-lvzhou-chen-laureatem-nagrody-im-kamila-duszenki | 1: /en/aktualnosci/2026-05-29-lvzhou-chen-laureatem-nagrody-im-kamila-duszenki/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza | 1: /en/aktualnosci/2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-06-09-ankiety-ewaluacyjne | 1: /en/aktualnosci/2026-06-09-ankiety-ewaluacyjne/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-06-16-nagroda-im-andrzeja-hulanickiego | 1: /en/aktualnosci/2026-06-16-nagroda-im-andrzeja-hulanickiego/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-06-16-seminarium-wydzialowe | 1: /en/aktualnosci/2026-06-16-seminarium-wydzialowe/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-06-19-seminarium-ze-statystyki | 1: /en/aktualnosci/2026-06-19-seminarium-ze-statystyki/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-07-14-szkola-baby-steps-beyond-the-horizon | 1: /en/aktualnosci/2026-07-14-szkola-baby-steps-beyond-the-horizon/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-08-03-kategoria-naukowa-a-plus | 1: /en/aktualnosci/2026-08-03-kategoria-naukowa-a-plus/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-09-10-wyklad-prof-uwe-franza | 1: /en/aktualnosci/2026-09-10-wyklad-prof-uwe-franza/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-09-20-kurs-dla-studentow-pierwszego-roku | 1: /en/aktualnosci/2026-09-20-kurs-dla-studentow-pierwszego-roku/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-09-23-2-kongres-mlodych-odkrywcow | 1: /en/aktualnosci/2026-09-23-2-kongres-mlodych-odkrywcow/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-10-01-witamy-studentow-pierwszego-roku | 1: /en/aktualnosci/2026-10-01-witamy-studentow-pierwszego-roku/ |
| 400 | https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fen%2Faktualnosci%2F2026-10-17-rusza-tutornia | 1: /en/aktualnosci/2026-10-17-rusza-tutornia/ |

### Niepewne

| status | adres | strony |
|---|---|---|
| 403 | http://www.matematyka.wroc.pl/ | 259: /, /404.html, /aktualnosci/ (+256) |
| 502 | http://bcc.impan.pl/13Levy/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2013-7th-international-conference-on-levy-processes-theory-and-applications/, /nauka/konferencje/ (+1) |
| 502 | http://bcc.impan.pl/14PAHA/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-probabilistic-aspect-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| 502 | http://bcc.impan.pl/14Young/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-7th-young-set-theory-workshop/, /nauka/konferencje/ (+1) |
| 502 | http://bcc.impan.pl/16PAHA/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-probabilistic-aspect-of-harmonic-analysis/, /nauka/konferencje/ (+1) |
| Timeout | http://www.iam.fmph.uniba.sk/institute/quittner/bedlewo/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2016-7th-euro-japanese-workshop-on-blow-up/, /nauka/konferencje/ (+1) |
| Timeout | http://www.iam.fmph.uniba.sk/institute/quittner/bedlewo20/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2020-9th-euro-japanese-workshop-on-blow-up/, /nauka/konferencje/ (+1) |
| 403 | http://www.impan.pl/~set_theory/Workshop2013/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2013-workshop-on-set-theoretic-methods-in-compact-spaces-and-banach-spaces/, /nauka/konferencje/ (+1) |
| 403 | http://www.impan.pl/~set_theory/dmvptm14/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-workshop-in-set-theory/, /nauka/konferencje/ (+1) |
| 403 | http://www.math.uni.wroc.pl/ivmrt2014 | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2014-integration-vector-measures-and-related-topics/, /nauka/konferencje/ (+1) |
| 503 | https://panda.pwr.edu.pl/ | 4: /en/nauka/konferencje/, /en/nauka/konferencje/2022-probability-and-analysis-2022/, /nauka/konferencje/ (+1) |
| Timeout | https://www.math.uni.wroc.pl/users/hecht | 4: /en/instytut/zaklady/rownania-rozniczkowe/, /en/pracownicy/, /instytut/zaklady/rownania-rozniczkowe/ (+1) |
| 403 | https://erc.europa.eu/ | 2: /en/nauka/granty/, /nauka/granty/ |
| Timeout | https://www.math.uni.wroc.pl/regulamin-lokalnej-sieci-komputerowej-instytutu-matematycznego | 2: /en/instytut/infrastruktura-informatyczna/, /instytut/infrastruktura-informatyczna/ |
| Timeout | https://www.math.uni.wroc.pl/sites/default/files/2026-27z-oznaczenia.pdf | 2: /en/studia/rok-akademicki/, /studia/rok-akademicki/ |
| Timeout | https://www.math.uni.wroc.pl/sites/default/files/stary-program-mt-lic.pdf | 2: /en/studia/matematyka/, /studia/matematyka/ |
| 503 | https://www.ptm.org.pl/konkursy/wyklady-im-waclawa-sierpinskiego | 2: /aktualnosci/2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza/, /en/aktualnosci/2026-05-29-medal-sierpinskiego-dla-prof-tadeusza-januszkiewicza/ |

## 3. Dług migracyjny — linki do math.uni.wroc.pl

Razem 2893 wystąpień, 287 różnych adresów, na 259 stronach.

| rodzaj | wystąpienia | adresy | strony |
|---|---|---|---|
| pliki | 226 | 111 | 36 |
| strony | 1769 | 67 | 259 |
| strony domowe (~) | 898 | 109 | 259 |

W szablonie (na ≥50% stron): https://www.math.uni.wroc.pl/sukcesy, https://www.math.uni.wroc.pl/studia/plany_zajec/planZ.php, http://www.math.uni.wroc.pl/~jwr/trapez/, https://www.math.uni.wroc.pl/

Wg sekcji (wystąpienia): `/en/nauka/` 576, `/nauka/` 576, `/en/studia/` 237, `/studia/` 237, `/en/instytut/` 206, `/instytut/` 206, `/aktualnosci/` 145, `/en/aktualnosci/` 145, `/en/pracownicy/` 103, `/pracownicy/` 103, `/en/obrony-doktorskie/` 84, `/obrony-doktorskie/` 84, `/en/seminaria/` 50, `/seminaria/` 50, `/404.html/` 9, `/en/` 9, `/` 9, `/deklaracja-dostepnosci/` 8, `/en/deklaracja-dostepnosci/` 8, `/en/kalendarz/` 8, `/en/polityka-prywatnosci/` 8, `/en/szukaj/` 8, `/kalendarz/` 8, `/polityka-prywatnosci/` 8, `/szukaj/` 8

### 15 najczęstszych adresów (liczba stron)

- 259 × http://www.math.uni.wroc.pl/~jwr/trapez/ (np. /, /404.html, /aktualnosci/)
- 259 × https://www.math.uni.wroc.pl/ (np. /, /404.html, /aktualnosci/)
- 259 × https://www.math.uni.wroc.pl/studia/plany_zajec/planZ.php (np. /, /404.html, /aktualnosci/)
- 259 × https://www.math.uni.wroc.pl/sukcesy (np. /, /404.html, /aktualnosci/)
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

Inne serwisy `*.math.uni.wroc.pl` (nie liczone jako dług): fmw.math.uni.wroc.pl (520), ptm.math.uni.wroc.pl (518), kamil.math.uni.wroc.pl (4), hulanickiaward.math.uni.wroc.pl (4), akula.math.uni.wroc.pl (4), krawczyk.math.uni.wroc.pl (4), korpalski.math.uni.wroc.pl (4), magweb.math.uni.wroc.pl (4), forum2019.math.uni.wroc.pl (4), odkrywcy.math.uni.wroc.pl (2), karolak.math.uni.wroc.pl (2)

## 4. Dostępność (pa11y-ci: axe + HTML_CodeSniffer, WCAG 2 AA)

Przetestowano 47 adresów, problemów: 52, reguł: 4.

| runner | reguła | wpływ | wystąpienia | strony | pliki (podpowiedź) | opis |
|---|---|---|---|---|---|---|
| htmlcs | `WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2` | error | 31 | 31: /kalendarz/, /deklaracja-dostepnosci/, /, /aktualnosci/ (+27) | src/components/Naglowek.astro | This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with |
| axe | `color-contrast` | serious | 11 | 5: /, /studia/procedura-dyplomowania/, /en/, /?qa=ciemny (+1) | src/layouts/Baza.astro | Elements must meet minimum color contrast ratio thresholds |
| axe | `aria-allowed-attr` | critical | 9 | 3: /en/studia/matematyka/, /studia/matematyka/?qa=ciemny, /studia/matematyka/?qa=telefon | src/components/TabelaPracownikow.tsx, src/views/Kalendarz.astro, src/views/Kierunek.astro (+3) | Elements must only use supported ARIA attributes |
| axe | `label-title-only` | serious | 1 | 1: /szukaj/ | src/views/Szukaj.astro | Form elements should have a visible label |

### Przykłady

**[htmlcs] WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2** — This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with type attribute "submit" or "image", or 
- `/kalendarz/` `html > body > header > div > div > form` — This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard. Submit buttons are INPUT elements with type attribute "submit" or "image", or 
  - `<form class="hdr-search" role="search" action="/szukaj" method="get"> <svg class="ico " style="width...</form>`

**[axe] color-contrast** — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
- `/` `#tresc > section:nth-child(1) > figure > figcaption` — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
  - `<figcaption>Fot. fotopolska.eu</figcaption>`
- `/` `#h1-glowna` — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
  - `<h1 id="h1-glowna">Instytut Matematyczny</h1>`
- `/studia/procedura-dyplomowania/` `#tresc > div:nth-child(2) > div > div > ul:nth-child(36) > li:nth-child(1) > span > span:nth-child(2) > span:nth-child(1) > span:nth-child(2) > span:nth-child(2) > span > span:nth-child(1) > span:nth-` — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
  - `<span class="mord">4</span>`
- `/studia/procedura-dyplomowania/` `#tresc > div:nth-child(2) > div > div > ul:nth-child(36) > li:nth-child(1) > span > span:nth-child(2) > span:nth-child(2) > span:nth-child(2) > span:nth-child(2) > span > span:nth-child(1) > span:nth-` — Elements must meet minimum color contrast ratio thresholds (https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=axeAPI)
  - `<span class="mord">8</span>`

**[axe] aria-allowed-attr** — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
- `/en/studia/matematyka/` `#tab-0` — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
  - `<button type="button" role="tab" class="chip" id="tab-0" aria-controls="prog-0" aria-selected="true" aria-pressed="true" data-od="2026" data-do="2100" tabindex="0">New curriculum (from 2026/27)</butto`
- `/en/studia/matematyka/` `#tab-1` — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
  - `<button type="button" role="tab" class="chip" id="tab-1" aria-controls="prog-1" aria-selected="false" aria-pressed="false" data-od="2022" data-do="2025" tabindex="-1">Previous curriculum (2022–2025/..`
- `/en/studia/matematyka/` `#tab-2` — Elements must only use supported ARIA attributes (https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=axeAPI)
  - `<button type="button" role="tab" class="chip" id="tab-2" aria-controls="prog-2" aria-selected="false" aria-pressed="false" data-od="1990" data-do="2021" tabindex="-1">Archived curricula (before 2022..`

**[axe] label-title-only** — Form elements should have a visible label (https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=axeAPI)
- `/szukaj/` `#szukajka > div > form > input` — Form elements should have a visible label (https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=axeAPI)
  - `<input class="pagefind-ui__search-input svelte-e9gkc3" type="text" placeholder="Szukaj na stronie" title="Szukaj na stronie" autocapitalize="none" enterkeyhint="search" autofocus="">`

### Nie udało się przetestować
- `/polityka-prywatnosci/`: Protocol error (Target.closeTarget): No target with given id found
- `/seminaria/`: Protocol error (Target.closeTarget): No target with given id found
- `/aktualnosci/2026-10-17-rusza-tutornia/`: Protocol error (Target.closeTarget): No target with given id found
- `/instytut/zaklady/teoria-prawdopodobienstwa/`: Protocol error (Target.closeTarget): No target with given id found
- `/nauka/konferencje/`: Protocol error (Target.closeTarget): No target with given id found
- `/nauka/publikacje/`: Protocol error (Target.closeTarget): No target with given id found
- `/obrony-doktorskie/2026-10-27-malwina-mrowinska/`: Protocol error (Target.closeTarget): No target with given id found
- `/studia/matematyka/`: Protocol error (Target.closeTarget): No target with given id found
- `/instytut/infrastruktura-informatyczna/`: Protocol error (Target.closeTarget): No target with given id found
- `/studia/egzaminy-i-dyplom/`: Protocol error (Target.closeTarget): No target with given id found
- `/studia/podyplomowe/`: Protocol error (Target.closeTarget): No target with given id found
- `/obrony-doktorskie/`: Timed out after waiting 30000ms
- `/en/pracownicy/`: Protocol error (Target.closeTarget): No target with given id found
- `/404.html`: Protocol error (Target.closeTarget): No target with given id found
- `/studia/zajecia/`: Timed out after waiting 30000ms
- `/studia/siad/`: Timed out after waiting 30000ms

### Liczba problemów na stronę

`/studia/procedura-dyplomowania/` 5, `/en/studia/matematyka/` 4, `/studia/matematyka/?qa=ciemny` 4, `/studia/matematyka/?qa=telefon` 4, `/` 3, `/en/` 3, `/?qa=ciemny` 3, `/szukaj/` 2, `/?qa=telefon` 2, `/kalendarz/` 1, `/deklaracja-dostepnosci/` 1, `/aktualnosci/` 1, `/pracownicy/` 1, `/instytut/wladze/` 1, `/nauka/konferencje/2026-discrete-random-structures-ii/` 1, `/nauka/granty/` 1, `/seminaria/statystyka/` 1, `/studia/matematyka/matematyka-teoretyczna/` 1, `/instytut/kontakt/` 1, `/studia/pierwszy-rok/` 1, `/studia/rok-akademicki/` 1, `/studia/skrypty/` 1, `/studia/sprawy-studenckie/` 1, `/studia/szkola-doktorska/` 1, `/en/aktualnosci/` 1, `/en/instytut/kontakt/` 1, `/aktualnosci/?qa=ciemny` 1, `/pracownicy/?qa=ciemny` 1, `/seminaria/?qa=ciemny` 1, `/instytut/zaklady/teoria-prawdopodobienstwa/?qa=ciemny` 1, `/pracownicy/?qa=telefon` 1, `/polityka-prywatnosci/` 0, `/seminaria/` 0, `/aktualnosci/2026-10-17-rusza-tutornia/` 0, `/instytut/zaklady/teoria-prawdopodobienstwa/` 0, `/nauka/konferencje/` 0, `/nauka/publikacje/` 0, `/obrony-doktorskie/2026-10-27-malwina-mrowinska/` 0, `/studia/matematyka/` 0, `/instytut/infrastruktura-informatyczna/` 0, `/studia/egzaminy-i-dyplom/` 0, `/studia/podyplomowe/` 0, `/obrony-doktorskie/` 0, `/en/pracownicy/` 0, `/404.html` 0, `/studia/zajecia/` 0, `/studia/siad/` 0
