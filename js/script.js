$(document).ready((event)=>{
    let taskListKey = 'task-list',
    ul = $('ul.task-list'),
    deleteBtn = $('.delete-item-btn'),
    addTaskBtn = $('.add-task'),
    taskIdElement = $('.task-id'),
    exitBtn = $('.exit-btn'),
    taskDetailTableElement = $('.task-detail'),
    taskDetailWrapperElement = $('.task-detail-wrapper');
    
    let list = getTasks(taskListKey)
    if(localStorage.hasOwnProperty(taskListKey) == false) {
        setKeyValue(taskListKey, '[]')
    }
    loadTasks(list, ul)
    
    addTaskBtn.click((e)=>{
        e.preventDefault()
        let task = new Task($('#task_input').val(), $('#date_input').val(), $('#time_input').val())
        if(task.task == '' || task.date == '' || task.time == '') {
            alert('Fill all the form!')
            return
        }
        list = addTask(task, list)
        saveTasks(list, taskListKey)
        loadTask(task, ul, list)
        $('input').val('')
    })

    
})

function setClick(el, el1, list) {
    el.unbind('click')
    el.click((e)=>{
        let this_target = e.target.closest('.delete-item-btn')
        if(this_target != null) return
        let target = e.target.closest('.item')
        if(target.closest('.item') == null) return
        openTaskDetail(parseInt(target.closest('.item').id), $('.task-detail'), list)
    })
    el1.unbind('click')
    el1.click((e)=>{
        let target = e.target.closest('.item')
        if(target == null) return
        saveTasks(deleteTask(parseInt(target.closest('.item').id), target,  list), 'task-list')
    })
}

class Task {
    constructor(task, date, time) {
        this.id = Date.now()
        this.task = task
        this.date = date
        this.time = time
    }
}

const KeyExists = (key) => {
    return (localStorage.hasOwnProperty(key))
}

const setKeyValue = (key, val) => {
    localStorage.setItem(key, val)
}

const getKeyValue = (key) => { return localStorage.getItem(key) }

const deleteKey = (key) => { return localStorage.removeItem(key) }

const itemHTMLTemplateFactory = (item) => {
    return `<li class="item text-slate-700 rounded-md hover:shadow" id="${item.id}">
                    <span class="task-name truncate nr">${item.task}</span>
                    <button class="delete delete-item-btn rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </li>`
}

const taskDetailTemplateFactory = (task) => {
    return `<table class="mt-2 d-table">
                <caption class="font-bold underline">Task Details</caption>
                <tr class="border-b">
                    <td class="font-bold">Task:</td>
                    <td class="font-[500] t-name text-right">${task.task}</td>
                </tr>
                <tr class="border-b">
                    <td class="font-bold">Date:</td>
                    <td class="font-[500] t-date text-right">${task.date}</td>
                </tr>
                <tr class="border-b">
                    <td class="font-bold">Time:</td>
                    <td class="font-[500] text-right">${task.time}</td>
                </tr>
            </table>`
}

const openTaskDetail = (id, table, list) => {
    if(list.length == 0) return
    let counter = 0
    list.forEach(task => {
        if(task.id == id) {
            table.html('')
            $('.task-id').text(task.id)
            table.append(taskDetailTemplateFactory(task))
        }
        counter++
    })
}

const getTasks = (key) => {
    return JSON.parse(getKeyValue(key))
}

const loadTask = (task, ul, list) => {
    if(task == null) return
    ul.prepend(itemHTMLTemplateFactory(task))
    setClick($('.item'), $('.delete'), list)
}

const loadTasks = (list, ul) => {
    if(list.length == 0) return
    list.forEach(item => {
        ul.prepend(itemHTMLTemplateFactory(item))
    })
    setClick($('.item'), $('.delete'), list)
}

const addTask = (task, list) => {
    if(task == null) {
        alert('Not of type Task')
        return
    }
    list.push(task)
    return list
}

const updateTask = (task, list) => {
    if(task == null) {
        alert('Not of type Task')
        return
    }
    let counter = 0
    list.forEach(task => {
        if(task.id == id) {
            titem.task = task.task
            item.date = task.date
            item.time = task.time
        }
        counter++
    })
    return list
}

const deleteTask = (id, element, list) => {
    let counter = 0
    list.forEach(task => {
        if(task.id == id) {
            list.splice(counter, 1)
            element.remove()
        }
        counter++
    })
    return list
}

const saveTasks = (list, key) => {
    setKeyValue(key, JSON.stringify(list))
}