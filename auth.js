// Signup function
function signup() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    alert("User already exists. Please log in.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please log in.");
  document.getElementById("signupName").value = "";
  document.getElementById("signupEmail").value = "";
  document.getElementById("signupPassword").value = "";
}

// Login function
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "Kanban.html";
  } else {
    alert("Invalid email or password.");
  }
}
