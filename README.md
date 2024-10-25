[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/JhGs4o0z)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16761756&assignment_repo_type=AssignmentRepo)
Labb 2: Dynamisk Webbutveckling med JavaScript, HTML och CSS

Mål:

Uppgiften går ut på att använda JavaScript, HTML och CSS för att skapa en dynamisk  **RESPONSIV**  webbplats som hämtar och visar information från en webbtjänst via API-anrop.
För VG krävs ytterligare funktionalitet och datavisualisering.

Krav för G (Godkänt):

1. Webbtjänst och Data (G):
- Cities tjänsten är ej tillåtet!
- Välj en webbtjänst från en källa som listas, eller godkänd av din instruktör, för att hämta JSON-data.
- Ni kan även skapa en egen JSON fil med egen data att utgå ifrån..

- Använd JavaScript (fetch, Axios eller liknande) för att hämta och visa minst tio värden från den valda webbtjänsten. Säkerställ att du kan hämta data från webbtjänsten (inga CORS-problem).

- Data som hämtas ska vara meningsfull och användbar för din webbplats.

2. Webbplats Layout (G):

- Skapa en webbplats med minst två olika HTML-sidor (Samma design och med ett tydligt tema)

- Använd HTML och CSS för att skapa en layout för din webbplats. Du kan använda ett CSS-ramverk som Bootstrap eller Flexbox/Grid Layout om så önskas, men även egen CSS-kod ska ingå.

- Lägg till navigationslänkar mellan dina webbsidor.

3. Dynamisk Uppdatering (G):

- Använd JavaScript och händelselyssnare för att uppdatera din webbplats dynamiskt när data hämtas från webbtjänsten. Visa de hämtade värdena på din webbplats.

4. Övriga förväntningar (G):

Hela syftet med en Laboration och ett slutprojekt är för att bekräfta att vi behärskar alla de moment vi gått igenom och att lösa ett sammansatt problem med detta.
Några saker som jag verkligen ni ska ta mer er från denna kursen och som jag förväntar mig att ni kan och lämnar in förutom ovanstånde punkterna 1,2,3 är följande:

- Funktioner och parametrar
- Sammanslagning av text med backticks
- Använda if sats eller liknande med conditon
- Loopa igenom innehåll med hjälp av for, while eller liknande
- Arbeta med returvärden
- Arbeta med noder, skapa eller manipulera
- Arbeta med storage av något slag
- Arbeta med events av något slag




5. Redovisning (G):

- Du måste redovisa ditt projekt genom en webbläsardemonstration. Presentationen ska vara 5-10 minuter lång och inkludera:

- Demonstration av webbplatsen via webbläsaren.

- Demonstration av JSON-data via Insomnia eller liknande verktyg.


6. Inlämning (G):

- Ni kommer tilldelas uppgiften via github classroom. -



Krav för VG (Väl Godkänt):

För att uppnå betyget VG (Väl Godkänt) måste du uppfylla följande ytterligare krav:

1. Avancerad Funktionalitet (VG):

- Implementera funktionalitet för att visa (ngår redan i G), lägga till, och ta bort data från webbtjänsten (ej Cities-tjänsten). Detta ska utföras med hjälp av ett webbformulär som är kopplat till POST och DELETE-anrop via API.
- Ni kan använda ett paket som heter JSON server för att skapa en egen server för att hantera JSON objekt.
https://www.npmjs.com/package/json-server

- Använd Web Storage för att lagra och återanvända minst ett värde mellan sidbelastningar, som inte är kopplat till Cities-tjänsten.

2. Datavisualisering (VG):

- Använd ett datavisualiseringsbibliotek som Chart.js eller liknande för att visualisera data från webbtjänsten på din webbplats.

3. Enhetsformaterad Kod (VG):

- Se till att din JavaScript-kod är enhetligt formaterad och följer kodningsstandarder.
