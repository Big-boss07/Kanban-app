<<<<<<< HEAD
// ===== SIGNUP =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Save user to localStorage
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful! You can now login.");
    window.location.href = "index.html"; // ✅ redirect to login page
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      window.location.href = "signup.html"; // ✅ redirect to signup
      return;
    }

    if (username === storedUser.username && password === storedUser.password) {
      alert("Login successful!");
      window.location.href = "Kanban.html"; // ✅ redirect to Kanban board
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
}
=======
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
>>>>>>> 439d7c253f4ea0df0203a8a6f703b28cd4d51a96
