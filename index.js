const apiKey = "059a654028274c3fae60d5570f66f862";
/* Min API-nyckel sparad i konstanten 'apiKey' */

async function fetchFeaturedGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=9&ordering=-rid`;
  try {
    const response = await fetch(url);
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
      gameCard.querySelector(".game-image").src = game.background_image;
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

      /* Skapa en lyssnare som hämtar mer information när användare trycker på ett spel /*

  /*     gameCard.addEventListener("click", () => {
      }); */

      // Lägger till klonen i container-elementet
      gameContainer.appendChild(gameCard);
    });
  } catch (error) {
    console.error("Fel vid hämtning av utvalda spel:", error);
  }
}

fetchFeaturedGames();

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

/* const cardImages = document.getElementsByClassName("card-image");

function cardimageHoverGrow(event) {
  event.target.style.transform = "scale(1.05)";
  event.target.style.transition = "transform 0.3s ease";
}
function cardimageHoverReset(event) {
  event.target.style.transform = "scale(1)";
}

card.addEventListener("mouseover", cardimageHoverGrow);
card.addEventListener("mouseout", cardimageHoverReset);
 */
