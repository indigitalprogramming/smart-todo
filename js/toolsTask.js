function doneTask(container, list) {
    itemName = container.querySelector('.text-task').innerText
    indexDone = lists.findIndex((item) => item.name == list)
    indexTask = lists[indexDone].item.findIndex((item) => item == itemName)
    
    if (!(lists[indexDone].done[indexTask])) {
        lists[indexDone].done[indexTask] = true
        localStorage.setItem('list', JSON.stringify(lists))
    } else {
        lists[indexDone].done[indexTask] = false
        localStorage.setItem('list', JSON.stringify(lists))
    }

    if (lists[indexDone].done[indexTask]) {
        container.classList.add('done')
        localStorage.setItem('list', JSON.stringify(lists))
        filter()
    } else {
        container.classList.remove('done')
        localStorage.setItem('list', JSON.stringify(lists))
        filter()
    }
}

function setDone(container) {
    container.classList.add('done')
}

function editTask(nameTask, list) {
    hideAndShowEdit()
    taskNameEdit = nameTask
    indexListEdit = lists.findIndex((item) => item.name == list)
    indexTaskEdit = lists[indexListEdit].item.findIndex((item) => item == taskNameEdit)

    inputEditTask.value = nameTask
    inputEditTask.focus()

    confirmEditButton.addEventListener('click', confirmEdit)

    function confirmEdit() {
        let newText = inputEditTask.value
        lists[indexListEdit].item[indexTaskEdit] = newText

        localStorage.setItem('list', JSON.stringify(lists))
        createTask(lists[indexListEdit])
        hideAndShowEdit()
        confirmEditButton.removeEventListener('click', confirmEdit)
        filter()
    }

    cancelEditButton.addEventListener('click', hideAndShowEdit)
}

function removeTask(container, list) {
    itemRemove = container.querySelector('.text-task').innerText
    indexRemoveList = lists.findIndex((item) => item.name == list)
    indexRemoveItem = lists[indexRemoveList].item.findIndex((item) => item == itemRemove)
    lists[indexRemoveList].item.splice(indexRemoveItem, 1)
    lists[indexRemoveList].hour.splice(indexRemoveItem, 1)
    lists[indexRemoveList].min.splice(indexRemoveItem, 1)
    lists[indexRemoveList].done.splice(indexRemoveItem, 1)
    localStorage.setItem('list', JSON.stringify(lists))
    container.remove()
}