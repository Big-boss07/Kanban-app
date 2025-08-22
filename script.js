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
