// API anrop //

// Skapa interface som beskriver vad för data som ska finnas i objeket. ex Interface city {id: string, name:string, population: number} //
const apiKey = "059a654028274c3fae60d5570f66f862";
async function fetchGames() {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
    const result = await response.json();
    console.log(result);
    return result;
    // catch error //
  } catch (error) {
    console.error("Error - Ett fel inträffade", error);
  }
}

// Hamburger Navbar Menu Toggle Function //
//.classList i kombination med toggle för att switcha active //
function toggleMenu() {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
}
