// Min API nyckel//
const apiKey = "059a654028274c3fae60d5570f66f862";
// Gör chart variabeln global i min scrip //
let chart;

// Min URL för att hämta data
let nextPageUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

// API hämtar spel data & skapar Chart JS //
async function updateChart(url) {
  if (!url) return;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const games = data.results;
    nextPageUrl = data.next; // Uppdatera nextPageUrl för nästa sidinladdning

    // Imported Chart.js - Creating two new arrays with .map () //
    const gameTitles = games.map((game) => game.name);
    const gameRatings = games.map((game) => game.rating);

    // Kod för att uppdatera chart med nya spel istället för att skapa en ny chart varje gång vi vill ladda mer spel //
    if (chart) {
      // Tömmer nuvarande chart på labels och data //
      chart.data.labels = [];
      chart.data.datasets[0].data = [];

      // Pushar in labels och data i chart //
      chart.data.labels.push(...gameTitles);
      chart.data.datasets[0].data.push(...gameRatings);
      chart.update();
    } else {
      // Chart default styling //
      Chart.defaults.color = "white";
      Chart.defaults.font.size = 20;
      Chart.defaults.font.family = "monospace";

      // Importera Chart JS Struktur - Grundkoden hämtad från chart js hemsida //
      const ctx = document.getElementById("chart-js").getContext("2d");
      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: gameTitles,
          datasets: [
            {
              label: "Game Ratings",
              data: gameRatings,
              backgroundColor: "rgba(0, 164, 253, 0.79)",
              borderColor: "rgba(0, 134, 216, 0.81)",
              borderWidth: 1,
            },
          ],
        },
        // Nedan kod gör charten responsiv för skärmar mindre än 768 px //
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: window.innerWidth < 768 ? "y" : "x",
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: "white",
                font: { size: 13 },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: "white",
                font: { size: 10 },
              },
            },
          },
        },
      });
    }
  } catch (error) {
    console.error("Error fetching game data", error);
  }
}

// Kör updateChart när sidan laddas in //
updateChart(nextPageUrl);

// Hämtar och lägger till lyssnare för "load more"-knappen //
document.getElementById("load-more").addEventListener("click", () => {
  if (nextPageUrl) {
    updateChart(nextPageUrl);
  } else {
    console.log("No more pages to load.");
  }
});

// Funktion för att hämta och visa ett slumpmässigt spel i spelkortet //
async function displayRandomGameCard(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const games = data.results;

    // Om det finns några spel i games så genereras ett slumpmässigt index som används för att slumpmässigt välja ett spel till displayGameCard //
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length);
      displayGameCard(games[randomIndex]);
    }
  } catch (error) {
    console.error("Error fetching game data", error);
  }
}

// Kör displayRandomGameCard när sidan laddas in
displayRandomGameCard(nextPageUrl);

// ----------------------------------------------//

// Hämtar data genom API förfrågan och hämtar resultat från sökningen //
async function fetchSearchedGame(query) {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching game data", error);
    return [];
  }
}

// Funktion som hanterar och visar resultatet - alert error om användaren försökt söka med tomt fält //
async function displaySearchedGame() {
  const searchInput = document.getElementById("search-bar").value.trim();
  if (!searchInput) {
    alert("Please enter a game name before searching!");
    return;
  }

  // Ropar på funktionen fetchSearchedGame som hämtar data för det spel användaren sökt på.
  const games = await fetchSearchedGame(searchInput);
  // Om  minst ett spel hittas som matchar sökningen, visas det första resultaet [0]
  if (games.length > 0) {
    const selectedGame = games[0]; // Väljer det första spelet från sökningen //
    displayGameCard(games[0]); // Visar spelet som ett kort //
  } else {
    alert("No game found. Please try again!"); // Alert msg om inget hittas //
  }
}

// Array som lagrar användarens favoriter //
let favorites = [];

// Laddar in favorit spel när sidan laddas om från localStorage //
document.addEventListener("DOMContentLoaded", () => {
  let savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    // Omvandlar JSON-strängen > JavaScript-array //
    favorites = JSON.parse(savedFavorites);
  }
});

// Funktion som uppdaterar och visar game card med det angivna spelet/data //
function displayGameCard(game) {
  console.log("Show searched game", game);

  // Hämtar container där spelets kort ska visas //
  const gameContainer = document.querySelector(".game-container");

  // Hämtar alla element för spelkortet //
  const gameNameEl = gameContainer.querySelector(".game-name");
  const gameImageEl = gameContainer.querySelector(".game-image");
  const gameRatingEl = gameContainer.querySelector(".game-rating");
  const gameMetaEl = gameContainer.querySelector(".game-meta");
  const gameReleaseEl = gameContainer.querySelector(".game-release");

  // Om elementet finns = Uppdaterar spelets namn  //
  if (gameNameEl) gameNameEl.textContent = game.name;
  // Om elementet finns = Uppdaterar spelets bild med alt-text  //
  if (gameImageEl) {
    gameImageEl.src = game.background_image;
    gameImageEl.alt = game.name;
  }
  // Om elementet finns = Uppdaterar spelets betyg  //
  if (gameRatingEl)
    gameRatingEl.innerHTML = `<i class="bi bi-star-fill"></i> Rating: ${game.rating}`;
  // Om elementet finns = Uppdaterar spelets metabetyg  //
  if (gameMetaEl) {
    gameMetaEl.innerHTML = `<i class="bi bi-bar-chart-fill"></i> Metacritic: ${game.metacritic}`;
  }
  // Om elementet finns = Uppdaterar spelets releasedatum  //
  if (gameReleaseEl) {
    gameReleaseEl.innerHTML = `<i class="bi bi-calendar-event-fill"></i> Release date: ${game.released}`;
  }
  // "Add to favorites"-knapp hämtas. Lägger till knappen längst ner i spelkortet.
  // Knappen använder Bootstrap för utseende och funktionalitet

  let favoriteBtn = gameContainer.querySelector(".favorite-btn");
  if (!favoriteBtn) {
    // Om knappen inte existerar så skapar vi den här //
    favoriteBtn = document.createElement("button");
    favoriteBtn.className = "btn btn-outline-danger favorite-btn mt-3";

    // Kontrollerar om spelet redan är tillagt i favoriter //
    let favoriteTrue = favorites.some((fav) => fav.id === game.id);
    favoriteBtn.innerHTML = favoriteTrue
      ? `<i class="bi bi-heart-fill"></i> Added to Favorites`
      : `<i class="bi bi-heart"></i> Add to Favorites`;
    if (favoriteTrue) {
      favoriteBtn.classList.add("active");
    } else {
      favoriteBtn.classList.remove("active");
    }

    // Lägger till en event listener för "Add to Favorites"-knappen
    favoriteBtn.addEventListener(
      "click",
      (() => {
        // Använder 'current game' för att lagra och hålla det aktuella spelet i minnet //
        const currentGame = game; // Hämtar det korrekta "game" objektet.
        return function () {
          // Växlar aktiv/inaktiv status för favorite button //
          favoriteBtn.classList.toggle("active");
          if (favoriteBtn.classList.contains("active")) {
            favoriteBtn.innerHTML = `<i class="bi bi-heart-fill"></i> Added to Favorites`;
            // Lägger till spelet i favoriter om det inte redan finns
            if (!favorites.some((fav) => fav.id === currentGame.id)) {
              favorites.push(currentGame); // Med `currentGame` kontrollerar vi att det korrekta objektet har pushats in. //

              console.log("Added game to favorites:", currentGame);
            }
          } else {
            favoriteBtn.innerHTML = `<i class="bi bi-heart"></i> Add to Favorites`;
            // Tar bort spelet från listan med favoriter //
            favorites = favorites.filter((fav) => fav.id !== currentGame.id);
            console.log("Removed game from favorites:", currentGame);
          }
          // Sparar uppdaterade favoriter i localStorage
          localStorage.setItem("favorites", JSON.stringify(favorites));
          console.log("Favorites saved to local storage:", favorites);
        };
      })()
    );
    // Lägger till favorite button till spelkortet //
    gameContainer.querySelector(".card").appendChild(favoriteBtn);

    // Console log kontroll //
    console.log("Game object passed to displayGameCard:", game);

    // Visar eller uppdaterar spelkortets innehålls med det relevanta spelets data //
    displayGameCard(game);
  }
}
// När sidan laddas om - Hämta sparade favoriter från localStorage //
document.addEventListener("DOMContentLoaded", () => {
  let savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    // Omvandlar JSON-strängen > Javascript-array //
    favorites = JSON.parse(savedFavorites);
    // Console log kontroll - Loggar hämtade favoriter //
    console.log("Loaded favorites from storage:", favorites);
  }
});
// Lyssnare - När btn-search trycks på så körs displaySearchedGame() //
document
  .getElementById("btn-search")
  .addEventListener("click", displaySearchedGame);
