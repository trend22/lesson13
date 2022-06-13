'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

const todoData = []

//получаем данные из localStorage
const getDataStorage = function () {
    let i = 0;
    for (let [key, value] of Object.entries(localStorage)) {
        todoData[i] = JSON.parse(value)
        i++
    }

    render()

}

const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    todoData.forEach(function (item, index) {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + '<div class = "todo-buttons">' +
            '<button class = "todo-remove"> </button>' +
            '<button class = "todo-complete"> </button>' + '</div>'

        if (item.completed) {
            todoCompleted.append(li)
        } else todoList.append(li)

        //вешаем событие на кнопку
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            localStorage.setItem(item.text, JSON.stringify(item))
            render()
        })

        //удаляем определённое задание
        li.querySelector('.todo-remove').addEventListener('click', function () {
            todoData.splice(index, 1)
            localStorage.removeItem(item.text)
            render()
        })
    })
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault()

    const newTodo = {
        text: headerInput.value,
        completed: false
    }

    if (newTodo.text.trim() !== '') {
        todoData.push(newTodo)
        localStorage.setItem(newTodo.text, JSON.stringify(newTodo))
    } else {
        alert('ПУстое задание нельзя добавить! Введите текст')
    }

    headerInput.value = ''

    render()
})

//запускаем первоначальную загрузку данных из LocalStorage
getDataStorage()