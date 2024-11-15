// Javascript shared between the pages //

// Hamburger Navbar Menu Toggle Function //
function toggleMenu() {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// När användaren scrollar ner på sidan så ska navbaren bli starkare i opacitet //

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ______________________________________________ //

// Visa inloggat användarnamn istället för inloggningsfält //
const authButton = document.getElementById("authButton");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const formLabel = document.querySelectorAll(".form-label");
const signUpButton = document.getElementById("signUpButton");
const welcomeMessage = document.getElementById("welcomeMessage");

// Inloggat läge //
function loggedInUserUI(user) {
  authButton.textContent = "Sign out";
  authButton.classList.add("signedOut");
  authButton.classList.remove("signedIn");

  // Dölj usernanme, password och sign up //

  document.getElementById("usernameInput").style.display = "none";
  document.getElementById("passwordInput").style.display = "none";
  document.getElementById("signUpButton").style.display = "none";
  document.querySelector('label[for="usernameInput"]').style.display = "none";
  document.querySelector('label[for="passwordInput"]').style.display = "none";

  // Visar det inloggade användarnamnet, samt lyssnare för Logga ut //
  const usernameDisplay = document.createElement("div");
  welcomeMessage.innerHTML = `<i class="fas fa-user-circle"></i>${user.name}`;
  usernameDisplay.className = "usernameDisplay";
  welcomeMessage.appendChild(usernameDisplay);

  // removeEvent - tar bort eventuell tidigare lyssnare innan signOut appliceras på knappen //
  authButton.removeEventListener("click", signIn); // Tar bort //
  authButton.addEventListener("click", signOut); // Lägger till //
}

// Utloggat läge //
function loggedOutUserUI() {
  welcomeMessage.innerHTML = "";
  authButton.textContent = "Log In";
  authButton.classList.add("signedIn");
  authButton.classList.remove("signedOut");

  usernameInput.style.display = "block";
  passwordInput.style.display = "block";
  signUpButton.style.display = "block";

  // Lyssnare för authButton//
  authButton.removeEventListener("click", signOut); // Tar bort //
  authButton.addEventListener("click", signIn); // Lägger till //
}

// Funktion - Logga Ut //
function signOut() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}

// Funktion - Logga in //
function signIn() {
  const userName = usernameInput.value.trim(); // Användarnamn
  const password = passwordInput.value.trim(); // Lösenord

  // Rensa tidigare felmeddelanden
  const existingErrors = document.querySelectorAll(".error-message");
  existingErrors.forEach((error) => error.remove());

  // Felmeddelande - Kontrollerar så fälten inte är tomma //
  if (!userName || !password) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = "Please enter both username and password!";
    // Avbryt om inmatningen är ogiltig
    usernameInput.parentNode.insertBefore(
      errorMessage,
      usernameInput.nextSibling
    );
    return;
  }

  // Hämta användaren från localStorage
  const storedUser = JSON.parse(localStorage.getItem(userName));
  if (storedUser && storedUser.password === password) {
    // Sätt inloggad användare i localStorage
    localStorage.setItem("loggedInUser", userName);
    loggedInUserUI(storedUser);
  } else {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = storedUser
      ? "Incorrect username or password!"
      : "User not registered! Please sign up below";
    usernameInput.parentNode.insertBefore(
      errorMessage,
      usernameInput.nextSibling
    );
  }
}
// Kontrollerar om användaren redan är inloggad vid sidladdning eller ej //
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
  const user = JSON.parse(localStorage.getItem(loggedInUser));
  if (user) {
    loggedInUserUI(user);
  }
} else {
  loggedOutUserUI();
}
