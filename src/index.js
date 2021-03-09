import { format, parseISO } from 'date-fns';

let toDoObjects = [];
listDOM();

//generate new to-do objects
function toDoObject(title, details, date, checked) {
  //still needs to grab data
  return {title, details, date, checked};
};

function getToDoData() {
  const title = document.getElementById('task-title').value;
  const details = document.getElementById('task-details').value;
  const date = format(parseISO(document.getElementById('task-date').value),'MM/dd/yyyy');
  const checked = false;
  return toDoObject(title, details, date, checked);
};

function editToDoData(index) {
  const title = document.getElementById('edit-task-title').value;
  const details = document.getElementById('edit-task-details').value;
  const date = format(parseISO(document.getElementById('edit-task-date').value),'MM/dd/yyyy');
  const checked = toDoObjects[index].checked;
  return toDoObject(title, details, date, checked);
};

function pushList(toDo) {
  toDoObjects.push(toDo);
};

function unshiftList(toDo) {
  toDoObjects.unshift(toDo);
};

//adds task button to list
function addTaskButton() {
  const toDoList = document.querySelector('.list');
  const container = document.createElement('div');
  container.classList.add('todo-item-container','cursor-pointer');
  const addTaskIcon = document.createElement('i');
  addTaskIcon.classList.add('material-icons', 'todo-icon');
  addTaskIcon.textContent = 'add_circle_outline';
  const addTask = document.createElement('div');
  addTask.classList.add('todo-item');
  addTask.textContent = "Add Task";
  const addTaskFiller = document.createElement('div');
  addTaskFiller.classList.add('add-task-filler');
  container.appendChild(addTaskIcon);
  container.appendChild(addTask);
  container.appendChild(addTaskFiller);
  toDoList.appendChild(container);
  container.addEventListener('click', (()=>{showAddTaskPage(makeTaskForm())}));
};

function makeTaskForm() {
  const taskForm = document.createElement('form');
  const taskPage = document.createElement('div');
  taskPage.classList.add('add-task-page');
  taskForm.id = 'add-task-form';
  addTaskTitle(taskPage);
  addTaskDetails(taskPage);
  addTaskDate(taskPage);
  addTaskConfirm(taskPage);
  addTaskCancel(taskPage);
  taskForm.appendChild(taskPage);
  return taskForm;
};

function showAddTaskPage(taskPage) {
  const body = document.querySelector('body');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.id = 'overlay';
  body.appendChild(overlay);
  body.appendChild(taskPage);
};

function addTaskTitle(popup) {
  const taskTitle = document.createElement('textarea');
  taskTitle.classList.add('add-task-title');
  taskTitle.id = 'task-title';
  taskTitle.setAttribute('name','task-title');
  taskTitle.setAttribute('autofocus','true');
  taskTitle.setAttribute('placeholder','Title: Open Jar');
  taskTitle.setAttribute('maxlength','50');
  popup.appendChild(taskTitle);
}

function addTaskDetails(popup) {
  const taskDetails = document.createElement('textarea');
  taskDetails.classList.add('add-task-details');
  taskDetails.id = 'task-details';
  taskDetails.setAttribute('name','task-details');
  taskDetails.setAttribute('placeholder','Details: First, get a jar. Now, take the lid off the jar. Just relax. Lift your hand. Now put it on the lid.');
  taskDetails.setAttribute('maxlength','400');
  taskDetails.setAttribute('required','false');
  popup.appendChild(taskDetails);
};

function addTaskDate(popup) {
  const pickDate = document.createElement('input');
  pickDate.classList.add('add-task-date', 'cursor-pointer');
  pickDate.setAttribute('type', 'date');
  pickDate.id = 'task-date';
  let tempDate = new Date();
  tempDate.setDate(tempDate.getDate()-1);
  pickDate.valueAsDate = tempDate;
  popup.appendChild(pickDate);
};

function addTaskConfirm(popup) {
  const confirmButton = document.createElement('i');
  confirmButton.textContent = 'check';
  confirmButton.classList.add('add-task-confirm', 'material-icons');
  confirmButton.addEventListener('click', function() {
    const title = document.getElementById('task-title');
    if (!title.value) {
      title.setAttribute('placeholder','THE LID! (title required)');
      title.classList.add('red-placeholder');
    } else {
      pushList(getToDoData());
      showList();
      closeAddTaskPopup();
    }
  });
  popup.appendChild(confirmButton);
};

function addTaskCancel(popup) {
  const closeButton = document.createElement('i');
  closeButton.textContent = 'close';
  closeButton.classList.add('add-task-cancel', 'material-icons');
  closeButton.addEventListener('click', closeAddTaskPopup);
  popup.appendChild(closeButton);
};

function closeAddTaskPopup() {
  const body = document.querySelector('body');
  body.removeChild(document.getElementById('overlay'));
  body.removeChild(document.getElementById('add-task-form'));
}

//takes todo object returned by makeToDo and creates DOM element
function listDOM() {
  for (let i=0; i<toDoObjects.length; i++) {
    const toDoList = document.querySelector('.list');
    const toDoItemContainer = document.createElement('div');
    toDoItemContainer.setAttribute('data-key',i);
    toDoItemContainer.classList.add('todo-item-container');
    const toDoItem = document.createElement('div');
    toDoItem.classList.add('todo-item');
    toDoItem.textContent = toDoObjects[i].title;
    const toDoDate = document.createElement('div');
    toDoDate.classList.add('todo-date');
    toDoDate.textContent = toDoObjects[i].date;
      //editButton.addEventListener
    checkBox(toDoItemContainer);
    toDoItemContainer.appendChild(toDoItem);
    toDoItemContainer.appendChild(toDoDate);
    editButton(toDoItemContainer);
    deleteButton(toDoItemContainer);
    toDoList.appendChild(toDoItemContainer);
  }
  addTaskButton();
};

function checkBox(toDoContainer) {
  const checkBox = document.createElement('i');
  toDoContainer.appendChild(checkBox);
  checkBox.classList.add('material-icons', 'todo-icon');
  let index = checkBox.parentNode.getAttribute('data-key');
  if (toDoObjects[index].checked == false) {
    checkBox.textContent = 'check_box_outline_blank';
  } else if (toDoObjects[index].checked == true) {
    checkBox.textContent = 'check_box_outline';
    toDoContainer.classList.add('check-true');
  }
  checkBox.addEventListener('click', function() {
    let index = checkBox.parentNode.getAttribute('data-key');
    console.log(toDoObjects[index].title, toDoObjects[index].details, toDoObjects[index].date, toDoObjects[index].checked);
    if (toDoObjects[index].checked == false){
      toDoContainer.classList.add('check-true');
      checkBox.textContent = 'check_box_outline';
      toDoObjects[index].checked = true;
    } else if (toDoObjects[index].checked == true) {
      toDoContainer.classList.remove('check-true');
      checkBox.textContent = 'check_box_outline_blank';
      toDoObjects[index].checked = false;
    }
  });
};

function editButton(toDoContainer) {
  const editButton = document.createElement('i');
  editButton.classList.add('material-icons', 'todo-icon', 'edit');
  editButton.textContent = 'edit';
  editButton.addEventListener('click', function() {
    let index = editButton.parentNode.getAttribute('data-key');
    showAddTaskPage(editPage(index));
  });
  toDoContainer.appendChild(editButton);
};

function editPage(index) {
  const taskForm = document.createElement('form');
  const taskPage = document.createElement('div');
  taskPage.classList.add('add-task-page');
  taskForm.id = 'add-task-form';
  editTaskTitle(taskPage, index);
  editTaskDetails(taskPage, index);
  editTaskDate(taskPage, index);
  editTaskConfirm(taskPage, index);
  addTaskCancel(taskPage);
  taskForm.appendChild(taskPage);
  return taskForm;
};

function editTaskTitle(popup, index) {
  const taskTitle = document.createElement('textarea');
  taskTitle.classList.add('add-task-title');
  taskTitle.id = 'edit-task-title';
  taskTitle.setAttribute('name','task-title');
  taskTitle.setAttribute('autofocus','true');
  taskTitle.textContent = toDoObjects[index].title;
  taskTitle.setAttribute('maxlength','50');
  popup.appendChild(taskTitle);
}

function editTaskDetails(popup, index) {
  const taskDetails = document.createElement('textarea');
  taskDetails.classList.add('add-task-details');
  taskDetails.id = 'edit-task-details';
  taskDetails.setAttribute('name','task-details');
  taskDetails.textContent = toDoObjects[index].details;
  taskDetails.setAttribute('maxlength','400');
  taskDetails.setAttribute('required','false');
  popup.appendChild(taskDetails);
};

function editTaskDate(popup, index) {
  const pickDate = document.createElement('input');
  pickDate.classList.add('add-task-date', 'cursor-pointer');
  pickDate.setAttribute('type', 'date');
  pickDate.id = 'edit-task-date';
  pickDate.valueAsDate = new Date(toDoObjects[index].date);
  popup.appendChild(pickDate);
};

function editTaskConfirm(popup, index) {
  const confirmButton = document.createElement('i');
  confirmButton.textContent = 'check';
  confirmButton.classList.add('add-task-confirm', 'material-icons');
  confirmButton.addEventListener('click', function() {
    const title = document.getElementById('edit-task-title');
    if (!title.value) {
      title.setAttribute('placeholder','THE LID! (title required)');
      title.classList.add('red-placeholder');
    } else {
      let tempObject = editToDoData(index);
      toDoObjects.splice(index,1, tempObject);
      showList();
      closeAddTaskPopup();
    }
  });
  popup.appendChild(confirmButton);
};

function deleteButton(toDoContainer) {
  const deleteButton = document.createElement('i');
  deleteButton.classList.add('material-icons', 'todo-icon', 'delete');
  deleteButton.textContent = 'delete';
  deleteButton.addEventListener('click', function() {
    let index = deleteButton.parentNode.getAttribute('data-key');
    toDoObjects.splice(index,1);
    showList();
  });
  toDoContainer.appendChild(deleteButton);
};

function showList() {
  const toDoList = document.querySelector('.list');
  removeChilds(toDoList);
  listDOM();
}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};
