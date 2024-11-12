const apiKey = "059a654028274c3fae60d5570f66f862"; // My API Key
let chart; // This makes the chart variable global in my Javascript //

// API Data games fetch & Create Chart //
async function gamesChart() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const games = data.results;

    // Imported Chart.js - Creating two new arrays with .map () //
    const ctx = document.getElementById("chart-js").getContext("2d");
    const gameTitles = games.map((game) => game.name);
    const gameRatings = games.map((game) => game.rating);

    // Chart style //
    Chart.defaults.color = "white";
    Chart.defaults.font.size = 20;
    Chart.defaults.font.family = "monospace";

    // Chart Structure //
    const chart = new Chart(ctx, {
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
      // Adding responsiveness to chart depending on screen sizes //
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: window.innerWidth < 768 ? "y" : "x",
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: "white",
              font: { size: 16 },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
              font: { size: 8 },
            },
          },
        },
      },
    });
    // Pass in game into displayGameCard //
    displayGameCard(games[0]);
  } catch (error) {
    console.error("Error fetching game data", error);
  }
}
gamesChart();

// Fetch games based on user's search result //
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

// The game from user's search in the search bar //
async function displaySearchedGame() {
  const searchInput = document.getElementById("search-bar").value.trim();
  if (!searchInput) {
    alert("Please enter a game name before searching!");
    return;
  }

  const games = await fetchSearchedGame(searchInput);
  if (games.length > 0) {
    displayGameCard(games[0]);
  } else {
    alert("No game found. Please try again!");
  }
}

// Array to store user's favorite games //
let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
  let savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
  }
});

// Function to display the game card with fetched data //
function displayGameCard(game) {
  const gameContainer = document.querySelector(".game-container");

  // Establish Game Elements for the Game Card //
  const gameNameEl = gameContainer.querySelector(".game-name");
  const gameImageEl = gameContainer.querySelector(".game-image");

  const gameRatingEl = gameContainer.querySelector(".game-rating");
  const gameMetaEl = gameContainer.querySelector(".game-meta");
  const gameReleaseEl = gameContainer.querySelector(".game-release");

  if (gameNameEl) gameNameEl.textContent = game.name;
  if (gameImageEl) {
    gameImageEl.src = game.background_image;
    gameImageEl.alt = game.name;
  }
  if (gameRatingEl)
    gameRatingEl.innerHTML = `<i class="bi bi-star-fill"></i> Rating: ${game.rating}`;
  if (gameMetaEl) {
    gameMetaEl.innerHTML = `<i class="bi bi-bar-chart-fill"></i> Metacritic: ${game.metacritic}`;
  }
  if (gameReleaseEl) {
    gameReleaseEl.innerHTML = `<i class="bi bi-calendar-event-fill"></i> Release date: ${game.released}`;
  }

  // "Add to favorites" -button added in the bottom of the game card w Bootstrap //

  let favoriteBtn = gameContainer.querySelector(".favorite-btn");
  if (!favoriteBtn) {
    favoriteBtn = document.createElement("button");
    favoriteBtn.className = "btn btn-outline-danger favorite-btn mt-3";

    // Checking if game is already added to favorites and adjust heart to that //
    let favoriteTrue = favorites.some((fav) => fav.id === game.id);
    favoriteBtn.innerHTML = favoriteTrue
      ? `<i class="bi bi-heart-fill"></i> Added to Favorites`
      : `<i class="bi bi-heart"></i> Add to Favorites`;
    if (favoriteTrue) {
      favoriteBtn.classList.add("active");
    }

    // Event Listener - Favorite Button //

    favoriteBtn.addEventListener("click", () => {
      favoriteBtn.classList.toggle("active");
      if (favoriteBtn.classList.contains("active")) {
        favoriteBtn.innerHTML = `<i class="bi bi-heart-fill"></i> Added to Favorites`;
        // Push game to 'favorites' if added //
        if (!favorites.some((fav) => fav.id === game.id)) {
          favorites.push(game);
        }
      } // Else remove game id from favorites //
      else {
        favoriteBtn.innerHTML = `<i class="bi bi-heart"></i> Add to Favorites`;
        favorites = favorites.filter((fav) => fav.id !== game.id);
      }
      // Save added favorite games to Local Storage //
      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
    // Append favorite button to game card //
    gameContainer.querySelector(".card").appendChild(favoriteBtn);
  }
}
// On page load - Load saved favorites from local storage //
document.addEventListener("DOMContentLoaded", () => {
  let savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
  }
});
document
  .getElementById("btn-search")
  .addEventListener("click", displaySearchedGame);

// Hamburger Navbar Menu Toggle Function //

function toggleMenu() {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// När användaren scrollar ner på sidan så ska navbaren bli starkare //

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
