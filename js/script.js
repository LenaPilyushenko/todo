'use strict';

const todoControl = document.querySelector('.todo-control'), // форма
    headerInput = document.querySelector('.header-input'),// вводимые данные
    todoList = document.querySelector('.todo-list'), // список дел
    todoCompleted = document.querySelector('.todo-completed'); // выполненные дела
   
let todoData = []; // массив дел

    const render = function() {

        todoList.textContent = '';
        todoCompleted.textContent = '';
        if (localStorage.getItem('todoList') && localStorage.getItem('todoList') !== null) {
            todoData = JSON.parse(localStorage.getItem('todoList')); 
        }
        console.log('todoData ' , todoData);
        todoData.forEach(function(item, i) {

            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.value +'</span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>';

            if (item.completed) {
                todoCompleted.append(li); 
            } else {
             todoList.append(li);
            }

            const bthTodoComplete = li.querySelector('.todo-complete');

            bthTodoComplete.addEventListener('click', function() {
                item.completed = !item.completed;
                localStorage.setItem('todoList', JSON.stringify(todoData));
                render();
            });

            const bthTodoRemove = li.querySelector('.todo-remove');
         
            bthTodoRemove.addEventListener('click' , function() {
                todoData.splice(i, 1);
                localStorage.setItem('todoList', JSON.stringify(todoData));
                render();
            });

        });
        
    };

    todoControl.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (localStorage.getItem('todoList') && localStorage.getItem('todoList') !== null) {
            todoData = JSON.parse(localStorage.getItem('todoList')); 
        }

        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        

        if (headerInput.value.trim() !== '') {
            todoData.push(newTodo);
            localStorage.setItem('todoList', JSON.stringify(todoData));
            render();
        }
        headerInput.value = '';

    });

    render();

    