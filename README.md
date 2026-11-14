# Den hemmelige skattejagt

Fire spørgsmål, ingen login og en festlig finale med enhjørning.

## Udgiv på Vercel
1. Upload projektets indhold til et nyt GitHub-repository.
2. Importér repository i Vercel (Next.js).
3. Deploy. Ingen Supabase eller Environment Variables kræves.

## Ændr spørgsmål
Rediger QUESTIONS i `app/page.js`. Fritekstsvar ligger i `answers`-listerne.

## Gemte fremskridt
Fremskridt gemmes i browserens localStorage. Samme browser og enhed husker fremskridtet, men andre enheder gør ikke. Ryd browserens webstedsdata for at starte forfra.

## Bemærk
Denne lette version validerer svar i browseren. En teknisk bruger kan se dem i kildekoden. Ønskes skjulte svar og fremskridt på tværs af enheder, kræver det en backend.

Finalen viser 86 ♥ LOVE ♥ YOU ♥ 82; enhjørningen starter først efter klik.
