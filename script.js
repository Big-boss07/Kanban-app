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
