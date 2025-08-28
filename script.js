<<<<<<< HEAD
// Redirect if not logged in
const currentUser = localStorage.getItem("loggedInUser");
if (!currentUser) {
  window.location.href = "index.html";
}

// Storage helpers
const key = `${currentUser}_tasks`;
const getData = () =>
  JSON.parse(
    localStorage.getItem(key) || '{"todo":[],"inprogress":[],"done":[]}'
  );
const setData = (obj) => localStorage.setItem(key, JSON.stringify(obj));

let tasks = getData();

// Controls
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  };
}

function render() {
  ["todo", "inprogress", "done"].forEach((col) => {
    const list = document.getElementById(col);
    list.innerHTML = "";
    tasks[col].forEach((text, idx) => {
      const el = document.createElement("div");
      el.className = "task";
      el.draggable = true;
      el.ondragstart = (ev) => drag(ev, col, idx);
      el.innerHTML = `
        <span>${text}</span>
        <div class="btns">
          <button class="edit" onclick="editTask('${col}', ${idx})">✏️</button>
          <button class="del"  onclick="deleteTask('${col}', ${idx})">🗑️</button>
        </div>
      `;
      list.appendChild(el);
    });
  });
}

function addTask(column) {
  const input = document.getElementById(column + "Input");
  const text = input.value.trim();
  if (!text) return;
  tasks[column].push(text);
  setData(tasks);
  input.value = "";
  render();
}

function editTask(column, idx) {
  const current = tasks[column][idx];
  const updated = prompt("Edit task:", current);
  if (updated && updated.trim()) {
    tasks[column][idx] = updated.trim();
    setData(tasks);
    render();
  }
}

function deleteTask(column, idx) {
  if (!confirm("Delete this task?")) return;
  tasks[column].splice(idx, 1);
  setData(tasks);
  render();
}

// DnD
function drag(ev, col, idx) {
  ev.dataTransfer.setData("text/plain", JSON.stringify({ col, idx }));
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drop(ev, newCol) {
  ev.preventDefault();
  const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
  const item = tasks[data.col][data.idx];
  tasks[data.col].splice(data.idx, 1);
  tasks[newCol].push(item);
  setData(tasks);
  render();
}

// Enter-to-add
["todo", "inprogress", "done"].forEach((col) => {
  const input = document.getElementById(col + "Input");
  if (input)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addTask(col);
    });
});

render();
=======
// Get current user
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) window.location.href = "index.html";

// Load tasks for this user
let tasks = JSON.parse(localStorage.getItem(currentUser.email + "_tasks")) || {
  todo: [],
  inprogress: [],
  done: [],
};

function saveTasks() {
  localStorage.setItem(currentUser.email + "_tasks", JSON.stringify(tasks));
}

function renderTasks() {
  ["todo", "inprogress", "done"].forEach((col) => {
    const colDiv = document.getElementById(col);
    colDiv.innerHTML = "";
    tasks[col].forEach((task, index) => {
      const div = document.createElement("div");
      div.className = "task";
      div.draggable = true;
      div.ondragstart = (e) => drag(e, col, index);
      div.innerHTML = `
        <span>${task}</span>
        <div class="task-buttons">
          <button class="edit" onclick="editTask('${col}', ${index})">✏️</button>
          <button class="delete" onclick="deleteTask('${col}', ${index})">❌</button>
        </div>
      `;
      colDiv.appendChild(div);
    });
  });
}

function addTask(column) {
  const input = document.getElementById(column + "Input");
  const task = input.value.trim();
  if (task) {
    tasks[column].push(task);
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

function editTask(column, index) {
  const newTask = prompt("Edit task:", tasks[column][index]);
  if (newTask && newTask.trim() !== "") {
    tasks[column][index] = newTask;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(column, index) {
  if (confirm("Delete this task?")) {
    tasks[column].splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function drag(ev, col, index) {
  ev.dataTransfer.setData("text", JSON.stringify({ col, index }));
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev, newCol) {
  ev.preventDefault();
  const data = JSON.parse(ev.dataTransfer.getData("text"));
  const task = tasks[data.col][data.index];
  tasks[data.col].splice(data.index, 1);
  tasks[newCol].push(task);
  saveTasks();
  renderTasks();
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

renderTasks();
>>>>>>> 439d7c253f4ea0df0203a8a6f703b28cd4d51a96
