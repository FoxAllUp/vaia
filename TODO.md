🦊 FELADAT 7 — AZ „E” BETŰ ÉLETRE KEL (ELSŐ VALÓDI AI-HUROK)

Most összekötjük mindent, amit eddig építettünk.

🎯 Cél

Egy script.js fájlban:

gombra kattintáskor:

beolvassuk a felhasználó szövegét

megszámoljuk benne az „e” és „E” betűket

ebből kiszámolunk egy energiaértéket (0–100)

ebből meghatározzuk VAIA állapotát

generálunk egy választ

megjelenítjük a válasz <p id="response"> elemben

📌 Szabályok (szigorú)

vanilla JS

nincs framework

nincs backend

nincs LLM

minden, amit használsz, már megvan tőlünk

nem kell tökéletes skálázás

🔧 Technikai segítség (csak irány)

addEventListener("click", ...)

string.length

string.match(/e/gi) vagy hasonló

a korábbi:

decideState(...)

generateResponse(...)

✔️ Ellenőrizhető kimenet

Ha sok „e”-t írsz → VAIA elszabadul

Ha kevés „e”-t → VAIA hallgatag

A felhasználó nem lát számokat, csak viselkedést

Leadandó

a script.js teljes tartalma

semmi magyarázat

Ha ez megvan:
👉 VAIA ténylegesen működik
👉 következő lépés: publikus link (GitHub Pages)