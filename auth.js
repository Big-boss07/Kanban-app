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

    // Get existing users or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username exists
    if (users.find((u) => u.username === username)) {
      alert("Username already exists. Please choose another.");
      return;
    }

    // Add new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now login.");
    window.location.href = "index.html"; // Go back to login page
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", username); // ✅ FIXED: Save user
      window.location.href = "kanban.html"; // ✅ FIXED: lowercase filename
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
}
