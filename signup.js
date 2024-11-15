document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Hämtar alla värden från registreringsformuläret //
  let personName = document.getElementById("name").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  // Kontroll om användarnamnet redan existerar i localStorage
  if (localStorage.getItem(username)) {
    alert("Username is already taken. Please choose another one.");
    return;
  }

  // Kontrollerar så lösenorden matchar //
  if (password !== confirmPassword) {
    alert("Password do not match!");
    return;
  }

  // Kod från ett forum (stackoverflow.com) - Lösenordskrav som behöver uppfyllas //
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must include: Minimum eight characters, at least one letter, one number, and one special character."
    );
    return;
  }
  // Skapar objektet user som lagrar användarens data //
  const user = {
    name: personName,
    username: username,
    password: password, // Lagrar lösenordet i klartext (ej säkert) //
  };

  // Spara användaren i localStorage //

  localStorage.setItem(username, JSON.stringify(user));
  alert("Registration succesful! Please log in.");
  window.location.href = "index.html";
});
