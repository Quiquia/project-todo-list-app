const $inputTask = document.querySelector("input");
const $btnAdd = document.getElementById("btn-add");
const $ul = document.querySelector("ul");
const $empty = document.querySelector(".empty");
const $deleteBtn = document.querySelector(".icon-delete");
let tasks = [];
let selectIdTask;

/*------------------ delete task -----------------*/

$btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const task = $inputTask.value;

  if (task !== "") {
    // crear un objeto y luego agregar a un array
    const newTask = {
      id: new Date().toISOString(),
      state: "pendiente",
      text: task,
    };
    tasks.push(newTask);

    printTasks();

    $inputTask.value = "";
    $empty.style.display = "none";
  }
});

/*------------------ delete node task -----------------*/

function deleteTask(taskId) {
  if (taskId) {
    const id = document.getElementById(taskId);
    id.remove();
    tasks = tasks.filter((task) => task.id !== taskId);
  }
}

/*------------------ edit node task -----------------*/

const $modalEditContainer = document.querySelector(".edit-container");
const $inputEdit = document.querySelector(".edit-input input");

function editTask(id) {
  $modalEditContainer.classList.add("show");
  selectIdTask = id;

  const $textContent = document.querySelector(`li[id ='${id}'] .item-content`);
  $inputEdit.value = $textContent.innerHTML;
}

function closeModalTask() {
  $modalEditContainer.classList.remove("show");
}

/*------------------ saveChange node task -----------------*/

function saveChangeTask() {
  /*const $textContent = document.querySelector(
    `li[id ='${selectIdTask}'] .item-content`
  ); 
   $textContent.innerHTML = $inputEdit.value; */

  const selectTask = tasks.find((elemt) => elemt.id === selectIdTask);
  selectTask.text = $inputEdit.value;

  printTasks();

  $modalEditContainer.classList.remove("show");
}

/*------------------ cheked node task -----------------*/

function changeCheckTask(id, event) {
  const $textContent = document.querySelector(`li[id ='${id}'] .item-content`);
  const stateTask = event.target.checked;
  stateTask
    ? ($textContent.style.textDecoration = "line-through")
    : ($textContent.style.textDecoration = "none");
}

/*------------------ chekedAll node tasks -----------------*/

function checkedAllTask() {
  const $inputsCheckbox = document.querySelectorAll(
    "li input[type='checkbox']"
  );
  const $textContentAll = document.querySelectorAll("li .item-content");

  for (let i = 0; i < $inputsCheckbox.length; i++) {
    $inputsCheckbox[i].checked = true;
    $textContentAll[i].style.textDecoration = "line-through";
  }
}

function deleteAllTask() {
  const $listItemAll = document.querySelectorAll(".list-item");

  for (let i = 0; i < $listItemAll.length; i++) {
    $listItemAll[i].remove();
  }
  tasks = [];
}

/*------------------ create node task -----------------*/

function createNodeTask(task) {
  const nodeTask = document.createElement("li");

  nodeTask.setAttribute("class", "list-item");
  nodeTask.setAttribute("id", `${task.id}`);

  nodeTask.innerHTML = `<p class="item-content" >${task.text}</p>
            <div class="list-item-icons">
              <input class="icon-check" type="checkbox" name="chk" onchange="changeCheckTask('${task.id}', event)"/>
              <button class="icon-edit icon" onclick="editTask('${task.id}')" >
                <i class="fa-solid fa-pen-to-square" ></i>
              </button>
              <button class="icon-delete icon"  onclick="deleteTask('${task.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>`;

  return nodeTask;
}

/*function createNodeStrTaskV2(task) {
  const nodeStrTask = `<li class="list-item"><p>${task.text}</p>
            <div class="list-item-icons">
              <input class="icon-check" type="checkbox"  id=${task.id}/>
              <button class="icon-edit icon" id=${task.id}>
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="icon-delete icon" id=${task.id} onclick="deleteTask()">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div></li>`;

  return nodeStrTask;
} */

/*------------------ imprimir la lista de node task -----------------*/

/*function printTasksV2() {
  const nodeTasks = [];

  tasks.forEach((task) => {
    const nodeTask = createNodeStrTaskV2(task);

    nodeTasks.push(nodeTask);
  });
  $ul.innerHTML = nodeTasks.join("");
} */

function printTasks() {
  const nodeTasks = [];

  tasks.forEach((task) => {
    const nodeTask = createNodeTask(task);

    nodeTasks.push(nodeTask);
  });
  $ul.innerHTML = "";
  $ul.append(...nodeTasks);
}
