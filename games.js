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
    const ctx = document.getElementById("chart-js").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: gameTitles,
        datasets: [
          {
            label: "Game Ratings",
            data: gameRatings,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
