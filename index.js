const apiKey = "059a654028274c3fae60d5570f66f862";
/* Min API-nyckel sparad i konstanten 'apiKey' */

let currentPage = 1;
const pageSize = 9;
// ______________________________________________ //

async function fetchFeaturedGames() {
  const urlGamesById = `https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&page=${currentPage}&ordering=-rid`;
  try {
    const response = await fetch(urlGamesById);
    const data = await response.json();
    const games = data.results;

    const gameContainer = document.querySelector(".game-container");
    const gameTemplate = document.getElementById("game-template");

    games.forEach((game) => {
      // Itererar genom arrayen "games" från API:t med 'forEach'-funktionen.
      const gameCard = gameTemplate.cloneNode(true);
      gameCard.style.display = "block";
      gameCard.removeAttribute("id"); // Tar bort ID-attributet för klonen eftersom ID:n ska vara unika

      // Fyller data i klonade elementen

      gameCard.querySelector(".game-name").textContent = game.name;
      const imageElement = gameCard.querySelector(".game-image");
      if (imageElement) {
        imageElement.src = game.background_image
          ? game.background_image
          : "images/default-image.jpg";
        imageElement.alt = game.name;
      } else {
        console.warn("Image element not found for game:", game.name);
      }
      gameCard.querySelector(".game-image").alt = game.name;
      gameCard.querySelector(
        ".game-rating"
      ).textContent = `Betyg: ${game.rating}`;
      gameCard.querySelector(
        ".game-meta"
      ).textContent = `Metacritic: ${game.metacritic}`;
      gameCard.querySelector(
        ".game-release"
      ).textContent = `Release date: ${game.released}`;

      // Bootstrap styling för datan i Game Cards //

      gameCard.querySelector(
        ".game-rating"
      ).innerHTML = `<i class="bi bi-star-fill"></i> Rating: ${game.rating}`;

      gameCard.querySelector(
        ".game-meta"
      ).innerHTML = `<i class="bi bi-bar-chart-fill"></i> Metacritic: ${game.metacritic}`;

      gameCard.querySelector(
        ".game-release"
      ).innerHTML = `<i class="bi bi-calendar-event-fill"></i> Release date: ${game.released}`;

      const placeholderImage = "images/default-image.jpg";
      imageElement.src = game.background_image || placeholderImage;

      // Lägger till klonen i container-elementet
      gameContainer.appendChild(gameCard);
    });

    // Ändrar display status på "Load More Games" -knappen beroende på om det finns mer spel att hämta eller ej //
    const loadGamesBtn = document.getElementById("load-more-button");
    if (data.next) {
      loadGamesBtn.style.display = "block";
    } else {
      loadGamesBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Fel vid hämtning av utvalda spel:", error);
  }
}

// ______________________________________________ //

// Funktion för att ladda in nya spel //
function loadMoreGames() {
  const loadingAnimation = document.getElementById("loading-animation");
  loadingAnimation.style.display = "block";

  // Ökar game page med nya spel //
  currentPage++;
  // Anropar funktionen för att hämta nya spel - När spelen hämtats döljs animationen //
  fetchFeaturedGames().then(() => {
    loadingAnimation.style.display = "none";
  });
}

// Anropar funktionen för att hämta första spelen när sidan laddas in //
fetchFeaturedGames();

// Lyssnare för "Load more games" -knappen //
const loadMoreButton = document.getElementById("load-more-button");
loadMoreButton.addEventListener("click", loadMoreGames);

// ______________________________________________ //
