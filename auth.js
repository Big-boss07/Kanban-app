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
