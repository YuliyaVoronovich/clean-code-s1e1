var taskInput = document.getElementById("new-task");//Add a new task.
var addButton = document.getElementsByClassName("section__button")[0];//first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.className = "section__item";
  label.innerText = taskString;
  label.className ='section__label';

  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  editInput.type = "text";
  editInput.className = "section__input";

  editButton.innerText = "Edit";  
  editButton.className = "section__button section__button-edit";
 
  deleteButton.className = "section__button section__button-delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete task';
  deleteButtonImg.className = 'section__button-img';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function() {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.section__input');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".section__button-edit");
  var containsClass = listItem.classList.contains("edit-item");

  if(containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-item");
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  var checkBox=taskListItem.querySelector(".checkbox");
  var editButton=taskListItem.querySelector("button.section__button-edit");
  var deleteButton=taskListItem.querySelector("button.section__button-delete");

  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i +=1 ) {
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}