# Den hemmelige skattejagt

Statisk hjemmeside uden login, Supabase eller Node.js. Klar til Vercel.

## Opsætning

1. Upload `index.html`, `style.css`, `script.js` til roden af et nyt GitHub-repository.
2. Importér repository i Vercel. Vælg **Other** som Framework Preset, og lad Root Directory være `./`.
3. Deploy. Ingen environment variables er nødvendige.

## Funktion

- Første besøg viser velkomst og krav om at acceptere reglen om ingen mobiltelefoner.
- Fire fritekstspørgsmål. Svar accepteres uden hensyn til store/små bogstaver.
- Progression gemmes i browserens localStorage og huskes på samme browser/enhed.
- På finalen starter enhjørningen først efter klik. Den går fortsat frem og tilbage, men slipper kun 14 regnbuebunker (inklusive hjerter som ordmellemrum) én gang med teksten `86 ♥ LOVE ♥ YOU ♥ 82`.
- For at teste fra begyndelsen: åbn browserens udviklerværktøjer og kør `localStorage.removeItem('hemmelig-skattejagt-v1')`, og genindlæs siden. Alternativt brug et privat vindue.

## Redigering

Spørgsmål og svar ligger øverst i `script.js`. Velkomst og finaletekst findes i `render()` i samme fil.

## Bemærk

Dette er en hyggeskatttejagt, ikke et sikkert login-system. Svarene kan findes i browserens JavaScript-kildekode.
