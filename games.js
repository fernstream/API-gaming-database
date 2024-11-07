const apiKey = "059a654028274c3fae60d5570f66f862";
/* Min API-nyckel sparad i konstanten 'apiKey' */

async function fetchGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const games = data.results;

    console.log(data);
    console.log(games);
    // Hämtar önskad data och skapar nya Arrays med ".map()" -funktionen //

    const gameTitles = games.map((games) => games.name);
    const gameRatings = games.map((games) => games.rating);

    // Chart Javascript //

    Chart.defaults.color = "white";
    Chart.defaults.font.size = 20;
    Chart.defaults.font.family = "monospace";

    const ctx = document.getElementById("chart-js").getContext("2d");

    const isMobileDevice = window.innerWidth < 768; // For screens less than 768 px
    const isINdexAxis = isMobileDevice ? "y" : "x";
    // If isMobileDevice is true, the axis will be y-based, if false it will be x-based //

    new Chart(ctx, {
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

      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: "white",
        font: { size: 16 },
        indexAxis: isINdexAxis,
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
  } catch (error) {
    console.error("Error when trying to fetch games", error);
  }
}

fetchGames();

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
