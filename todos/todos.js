import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    console.log('hi');
    e.preventDefault();

    const formData = new FormData(todoForm);

    const todo = formData.get('todo');

    await createTodo(todo);

    todoForm.reset();
    await displayTodos();
});

async function displayTodos() {
    const todos = await getTodos();

    todosEl.textContent = '';

    for (let todo of todos) {
        const todoEl = renderTodo(todo);

        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id);

            await displayTodos();
        });

        todosEl.append(todoEl);
    }
}
// displayTodos();

window.addEventListener('load', async () => {
    displayTodos();
});

logoutButton.addEventListener('click', async () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    await deleteAllTodos();

    displayTodos();
});
