// 3차 개선

// 현재 문제점: 글씨를 입력해도 입력한 글자가 안지워짐
// 내용 입력하면 하단에 들어가긴 함

// 필요한 HTML 요소들을 선택합니다.
const displayElement = document.querySelector("ul.list");
const btnAdd = document.querySelector("#btnAdd");
const form = document.getElementById("todo-form");
let taskInput = document.querySelector("#task");

// 초기 할 일 목록을 설정합니다.
let listTask = [
  {
    content: "content task 1",
    status: "doing",
  },
  {
    content: "content task 2",
    status: "complete",
  },
];

// 로컬 스토리지에서 데이터를 불러오는 로직이 개선되었습니다.
if (localStorage.getItem("listTask") != null) {
  listTask = JSON.parse(localStorage.getItem("listTask"));
}

function saveLocalStorage() {
  localStorage.setItem("listTask", JSON.stringify(listTask));
}

// function inputDetected(e) {
//   // TODO: 이벤트 객체 'e'를 매개변수로 받아야 합니다.
//   // 힌트: function inputDetected(e) { ... }와 같이 수정하세요.
//   e.preventDefault();
//   let taskValue = taskInput.value.trim();
//   if (taskValue !== "") {
//     // TODO: 'content' 대신 'taskValue'를 사용해야 합니다.
//     listTask.unshift({
//       content: taskValue,
//       status: "doing",
//     });
//     addTaskToHTML();
//     taskValue = "";
//     saveLocalStorage();
//   }
// }

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  let taskValue = taskInput.value.trim();
  if (taskValue !== "") {
    // TODO: 'content' 대신 'taskValue'를 사용해야 합니다.
    listTask.unshift({
      content: taskValue,
      status: "doing",
    });
    addTaskToHTML();
    taskInput.value = "";
    saveLocalStorage();
  }
});

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    let taskValue = taskInput.value.trim();
    if (taskValue !== "") {
      // TODO: 'content' 대신 'taskValue'를 사용해야 합니다.
      listTask.unshift({
        content: taskValue,
        status: "doing",
      });
      addTaskToHTML();
      taskInput.value = "";
      saveLocalStorage();
    }
  }
});

function addTaskToHTML() {
  displayElement.innerHTML = "";
  listTask.forEach((task, index) => {
    let createLi = document.createElement("li");
    // TODO: 중첩된 <li> 태그를 제거하고, task.status를 사용하여 클래스를 동적으로 설정하세요.
    // 힌트: createLi.className = task.status;
    createLi.classList.add(task.status);
    createLi.innerHTML = `
        <div class="complete-icon" onClick="completedTask(${index})">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div class="content">${task.content}</div>
        <div class="close-icon" onClick="deleteTask(${index})">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </div>
      </li>
      `;
    displayElement.appendChild(createLi);
  });
}

function completedTask(index) {
  listTask[index].status =
    listTask[index].status === "doing" ? "complete" : "doing";
  addTaskToHTML();
  saveLocalStorage();
}

function deleteTask(index) {
  // TODO: 필터 조건을 수정하세요.
  // 힌트: (_, i) => i !== index와 같은 형태로 수정할 수 있습니다.
  listTask = listTask.filter((_, indexs) => indexs !== index);
  addTaskToHTML();
  saveLocalStorage();
}

// 페이지 로드 시 할 일 목록을 화면에 표시합니다.
addTaskToHTML();
