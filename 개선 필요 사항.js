// 필요한 HTML 요소들을 선택합니다.
const displayElement = document.querySelector("ul.list");
const btnAdd = document.querySelector("#btnAdd");
// HIGHLIGHT: const form = document.getElementById("todo-form");
// COMMENT: form 요소를 사용하지 않는다면 이 줄은 제거해도 됩니다. 불필요한 변수 선언을 줄입니다.
const form = document.getElementById("todo-form");
let taskInput = document.querySelector("#task");

// 초기 할 일 목록과 로컬 스토리지 관련 코드는 그대로 유지합니다...

// HIGHLIGHT: btnAdd.addEventListener("click", (e) => {
// COMMENT: 이 방식도 충분히 효과적입니다. onclick과 기능적으로 동일하며, 더 현대적인 방식입니다.
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  let taskValue = taskInput.value.trim();
  if (taskValue !== "") {
    listTask.unshift({
      content: taskValue,
      status: "doing",
    });
    addTaskToHTML();
    // HIGHLIGHT: taskValue.value = "";
    // COMMENT: taskValue는 문자열이므로 .value 속성이 없습니다. taskInput.value = ""; 로 수정해야 합니다.
    taskValue.value = "";
    saveLocalStorage();
  }
});

// keypress 이벤트 리스너는 그대로 유지합니다...

function addTaskToHTML() {
  displayElement.innerHTML = "";
  listTask.forEach((task, index) => {
    // HIGHLIGHT: let createLi = document.createElement("li");
    // COMMENT: const를 사용하여 변수 재할당을 방지할 수 있습니다.
    let createLi = document.createElement("li");
    createLi.className = task.status;
    createLi.innerHTML = `
      <div class="complete-icon" onClick="completedTask(${index})">
        <!-- SVG 코드 -->
      </div>
      <div class="content">${task.content}</div>
      <div class="close-icon" onClick="deleteTask(${index})">
        <!-- SVG 코드 -->
      </div>
    `;
    displayElement.appendChild(createLi);
  });
}

// completedTask와 deleteTask 함수는 그대로 유지합니다...

// 페이지 로드 시 할 일 목록을 화면에 표시합니다.
addTaskToHTML();
