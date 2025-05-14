const inputSection = document.getElementById("input-section");
const formElement = inputSection.parentElement;
const todoSection = inputSection.nextElementSibling;
const todoList = todoSection.firstElementChild;
const input = inputSection.firstElementChild;
const addButton = inputSection.lastElementChild;

addButton.addEventListener('click', (event) => addTodo(event, ''));

let todos = JSON.parse(localStorage.getItem('todos')) || [];
if(todos.length > 0){
    todos.forEach((todoItem) => {
        addTodo('', todoItem);
    });
}

function addTodo(event, todoItem){
    if(todoItem === '')
        event.preventDefault();

    if(todoItem === '' && input.value.trim() === '')
        return;
    const newElement = document.createElement('li');
    newElement.setAttribute('class', 'todo-item');
    todoItem?.complete ? newElement.classList.add('complete') :newElement.classList.remove('complete');
    newElement.setAttribute('id', todoItem.id || Date.now().toString());

    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('class', 'todo-complete');
    newCheckbox.addEventListener('click', (event) => toggleComplete(event, todoItem.complete, newElement));
    newCheckbox.checked = Boolean(todoItem?.complete);

    const text = document.createTextNode(input.value.trim() || String(todoItem?.todoText));

    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'remove-todo-item');
    newButton.appendChild(document.createTextNode('🗑️'));
    newButton.addEventListener('click', (event) => removeTodo(event, todoItem?.id || newElement.getAttribute('id')));

    newElement.appendChild(newCheckbox);
    newElement.appendChild(text);
    newElement.appendChild(newButton);
    
    if(todoItem === ''){
        const newTodo = {
            id: String(newElement.getAttribute('id')),
            todoText: input.value.trim(),
            complete: false
        }
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    todoList.appendChild(newElement);
    input.value = '';   
}

function removeTodo(event, id){
    event.preventDefault();

    todoList.removeChild(event.target.parentElement);

    todos = todos.filter(todo => todo.id !== id);
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleComplete(event, complete, element){
    const todoId = element.getAttribute('id');
    const isChecked = event.target.checked;

    isChecked ? element.classList.add('complete'):element.classList.remove('complete');

    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return {...todo, complete: isChecked};
        }
        return todo;
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}