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

// Function to display the game card with fetched data //
function displayGameCard(game) {
  const gameContainer = document.querySelector(".game-container");

  // Establish Game Elements for the Game Card //
  const gameNameEl = gameContainer.querySelector(".game-name");
  const gameImageEl = gameContainer.querySelector(".game-image");

  const gameRatingEl = gameContainer.querySelector(".game-rating");
  const gameMetaEl = gameContainer.querySelector(".game-meta");
  const gameReleaseEl = gameContainer.querySelector(".game-release");
  const gameUserRatingEl = gameContainer.querySelector(".game-user-rating");

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
  if (gameUserRatingEl) {
    gameUserRatingEl.innerHTML = `<i class="bi bi-star-fill"></i> User Rating: Not rated yet`;
    gameContainer.appendChild(gameUserRatingEl);
  }

  // User Rating Form //
  let ratingFormContainer = gameContainer.querySelector(
    ".rating-form-container"
  );
  if (!ratingFormContainer) {
    ratingFormContainer = document.createElement("div");
    ratingFormContainer.className = "rating-form-container mt-3";
    ratingFormContainer.innerHTML = `
     <label for="user-rating" class="form-label"><i class="bi bi-star"></i> Your Rating (1-5):</label>
        <div class="input-group mb-3">
          <input type="number" class="form-control" id="user-rating" min="1" max="5" placeholder="Enter your rating">
          <button class="btn btn-primary" id="submit-rating" type="button">Submit Rating</button>
        </div>
      `;
    gameContainer.appendChild(ratingFormContainer);
  }
  // Event listener for rating button > submit rating //
  ratingFormContainer
    .querySelector("#submit-rating")
    .addEventListener("click", () => {
      let userRating = parseFloat(userRatingInput.value);
      if (userRating >= 1 && userRating <= 5) {
        if (gameUserRatingEl) {
          gameUserRatingEl.innerHTML = `<i class="bi bi-star-fill"></i> User Rating: ${userRating}`;
        }
        alert(`You rated "${game.name}" with a rating of ${userRating}`);
      } else {
        alert("Please enter a rating between 1 and 5!");
      }
    });
}

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
