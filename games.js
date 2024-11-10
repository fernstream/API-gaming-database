// Constants
const apiKey = "059a654028274c3fae60d5570f66f862";
let chart; // Define chart variable globally to allow reuse

// Function to fetch game data from API
async function fetchGames(searchQuery = "") {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
    searchQuery
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

// Function to fetch and display game data based on search input
async function searchGame() {
  const searchInput = document.getElementById("search-bar").value.trim();
  if (!searchInput) {
    alert("Please enter a game name to search.");
    return;
  }

  const games = await fetchGames(searchInput);
  if (games.length > 0) {
    displayGameCard(games[0]);
    updateChart(games[0].name, games[0].rating); // Update chart with fetched game
  } else {
    alert("No game found. Please try a different name.");
  }
}

// Function to display the game card with fetched data
function displayGameCard(game) {
  const gameTemplate = document.getElementById("game-template");
  const gameContainer = document.querySelector(".game-container");

  // Clone gameTemplate and insert game data from user search result
  const gameCard = gameTemplate.cloneNode(true);
  gameCard.style.display = "block";
  gameCard.querySelector(".game-name").textContent = game.name;
  gameCard.querySelector(".game-image").src = game.background_image;
  gameCard.querySelector(".game-image").alt = game.name;
  gameCard.querySelector(".game-rating").textContent = `Rating: ${game.rating}`;
  gameCard.querySelector(
    ".game-meta"
  ).textContent = `Metacritic: ${game.metacritic}`;
  gameCard.querySelector(
    ".game-release"
  ).textContent = `Release date: ${game.released}`;

  // Clone the existing rating form and add it to the game card
  const originalRatingForm = document.getElementById("rating-form");
  const ratingFormClone = originalRatingForm.cloneNode(true);
  ratingFormClone.style.display = "block";
  ratingFormClone.id = ""; // Remove duplicate ID

  gameCard.appendChild(ratingFormClone);
  // Clear previous game cards and append the new one
  gameContainer.innerHTML = "";
  gameContainer.appendChild(gameCard);
}

// Event listener for the search button
document.getElementById("btn-search").addEventListener("click", searchGame);

// Function to update the chart after a user rating
function updateChart(gameName, userRating) {
  const ctx = document.getElementById("chart-js").getContext("2d");

  if (!chart) {
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [gameName],
        datasets: [
          {
            label: "User Ratings",
            data: [userRating],
            backgroundColor: "rgba(0, 164, 253, 0.79)",
            borderColor: "rgba(0, 134, 216, 0.81)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
              font: { size: 16 },
            },
          },
        },
      },
    });
  } else {
    // Update existing chart data
    chart.data.labels.push(gameName);
    chart.data.datasets[0].data.push(userRating);
    chart.update();
  }
}

// Event listener for the rating form
document.getElementById("rating-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const userRating = parseFloat(document.getElementById("user-rating").value);
  const gameName = document.querySelector(".game-name").textContent;

  if (!gameName) {
    alert("Please search for a game before submitting a rating.");
    return;
  }

  if (userRating < 1 || userRating > 5) {
    alert("Please enter a rating between 1 and 5.");
    return;
  }

  updateChart(gameName, userRating);
});

// Function to update the chart based on filtered games
/* function updateChart(filteredGames) {
  chart.data.labels = filteredGames.map((game) => game.name);
  chart.data.datasets[0].data = filteredGames.map((game) => game.rating);
  chart.update();
} */

// När användaren scrollar ner på sidan så ska navbaren bli starkare //
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// Hamburger Navbar Menu Toggle Function //

function toggleMenu() {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
}
