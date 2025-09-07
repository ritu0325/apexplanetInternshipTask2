let tasks = [];

const form = document.querySelector("form");
const input = document.querySelector("input");
const taskList = document.getElementById("taskList");
const numbers = document.getElementById("numbers");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  if (tasks.some(task => task.text === taskText)) {
    alert("Duplicate task not allowed.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  showTasks();
});

function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "taskItem";

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);

    const actionDiv = document.createElement("div");
    actionDiv.className = "taskActions";

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editIcon.onclick = () => editTask(index);
    if (task.completed) {
      editIcon.classList.add("edit-disabled");
      checkAllCompleted();
    }

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.onclick = () => deleteTask(index);

    actionDiv.appendChild(editIcon);
    actionDiv.appendChild(deleteIcon);

    li.appendChild(taskDiv);
    li.appendChild(actionDiv);
    taskList.appendChild(li);
  });

  updateProgress();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

function editTask(index) {
  input.value = tasks[index].text;
  tasks.splice(index, 1);
  showTasks();
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(task => task.completed).length;
  numbers.textContent = `${done}/${total}`;
  const progressBar = document.getElementById("progress");
  const percentage = total === 0 ? 0 : (done / total) * 100;
  progressBar.style.width = `${percentage}%`;
}

function checkAllCompleted() {
  const total = tasks.length;
  const done = tasks.filter(task => task.completed).length;

  if (total > 0 && total === done) {
    confetti();
    const interval = setInterval(confetti, 500);
    setTimeout(() => {
      clearInterval(interval);
    }, 1700);
  }
}
