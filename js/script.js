const container = document.querySelector('.container')
const containerEdit = document.querySelector('.container-edit')
const containerAdd = document.querySelector('.container-add-list')
const containerSettings = document.querySelector('.container-settings')
const containerTasks = document.querySelector('.container-tasks')
const containerEditList = document.querySelector('.container-edit-list')
const containerLists = document.querySelector('.container-lists')

// CONTAINER SETTINGS
const selLists = document.querySelector('#sel-lists')
const addListButton = document.querySelector('.add-list-btn')
const inputAddTask = document.querySelector('#input-add-task')
const selAddHour = document.querySelector('#sel-add-hour')
const selAddMin = document.querySelector('#sel-add-min')
const addTaskButton = document.querySelector('#add-task-btn')
const inputSearch = document.querySelector('#input-search')
const selFilter = document.querySelector('#sel-filter')

// CONTAINER EDIT
const inputEditTask = document.querySelector('#input-edit-task')
const confirmEditButton = document.querySelector('#edit-task-btn')
const cancelEditButton = document.querySelector('#cancel-edit-btn')

// CONTAINER EDIT LIST
const inputEditList = document.querySelector('#input-edit-list')
const confirmEditListButton = document.querySelector('#confirm-edit-list-btn')
const cancelEditListButton = document.querySelector('#cancel-edit-list-btn')

// CONTAINER ADD LIST
const inputAddList = document.querySelector('#input-add-list')
const confirmAddListButton = document.querySelector('#confirm-add-list-btn')
const cancelAddListButton = document.querySelector('#cancel-list-btn')

// ERROR
const errorNameExist = document.querySelector('.error-name-exist')
const errorListExist = document.querySelector('.error-list-exist')
const errorCreateList = document.querySelector('.error-create-list')
const errorNameTaskExist = document.querySelector('.error-name-task-exist')
const errorNameEmpty = document.querySelector('.error-name-empty')

const lists = JSON.parse(localStorage.getItem('list')) || []
if (lists.length > 0) {
    lists.forEach((item) => {
        addOptionList(item)
    })
    const indexSelected = lists.findIndex((item) => item.name == selLists.value)
    const listSelected = lists[indexSelected].item
    listSelected.forEach(() => {
        createTask(lists[indexSelected])
    })
}

addListButton.addEventListener('click', () => {
    errorNameExist.classList.add('hide')
    hideAndShowLists()
    inputAddList.focus()
})

cancelAddListButton.addEventListener('click', () => {
    hideAndShowLists()
})

confirmAddListButton.addEventListener('click', () => {
    let listName = inputAddList.value
    if (listName === '') {
        errorNameEmpty.classList.remove('hide')
        return
    } else {
        errorNameEmpty.classList.add('hide')
    }
    let nameExist
    if (lists.length > 0) {
        for (let item of lists) {
            if (item.name == listName) {
                errorNameExist.classList.remove('hide')
                nameExist = true
                break
            } else {
                errorNameExist.classList.add('hide')
                nameExist = false
            }
        }
        if (!nameExist) {
            errorCreateList.classList.add('hide')
            createList(listName)
        }
    } else {
        errorCreateList.classList.add('hide')
        createList(listName)
    }
    inputAddList.value = null
    inputAddList.focus()
})

addTaskButton.addEventListener('click', () => {
    let nameTaskExist = false
    if (lists.length == 0) {
        errorCreateList.classList.remove('hide')
    } else {
        if (inputAddTask.value.length > 0) {
            errorCreateList.classList.add('hide')
            let indexList = lists.findIndex((item) => item.name == selLists.value)
        
            if (lists[indexList].item.length > 0) {
                lists[indexList].item.forEach((item) => {
                    if (item === inputAddTask.value) {
                        errorNameTaskExist.classList.remove('hide')
                        nameTaskExist = true
                    }
                })
                
                if (!nameTaskExist) {
                    errorNameTaskExist.classList.add('hide')
                    callCreateTask(indexList)
                }
            } else {
                callCreateTask(indexList)
            }
        }
    }
})

selLists.addEventListener('change', () => {
    let listChange = selLists.value
    let indexListChange = lists.findIndex((item) => item.name == listChange)
    containerTasks.innerHTML = ''
    if (lists[indexListChange].item.length > 0) {
        createTask(lists[indexListChange])
        filter()
    }
})

containerTasks.addEventListener('click', (e) => {
    let targetClick = e.target
    let containerTarget = targetClick.closest('.task')
    let listStatus = selLists.value
    if (targetClick.classList.contains('done-btn') || targetClick.classList.contains('fa-check')) {
        doneTask(containerTarget, listStatus)
    }

    if (targetClick.classList.contains('edit-btn') || targetClick.classList.contains('fa-pen')) {
        let nameEdit = containerTarget.querySelector('.text-task').innerText
        editTask(nameEdit, listStatus)
    }

    if (targetClick.classList.contains('remove-btn') || targetClick.classList.contains('fa-xmark')) {
        removeTask(containerTarget, listStatus)
    }
})

containerLists.addEventListener('click' , (e) => {
    let targetClickEdit = e.target
    if (targetClickEdit.classList.contains('edit-list-btn') || targetClickEdit.classList.contains('fa-pen')) {
        if (selLists.value != '') {
            let indexEditList = lists.findIndex((item) => item.name == selLists.value)
            hideAndShowEditLists()
            editList(indexEditList)
        }
    }

    if (targetClickEdit.classList.contains('remove-list-btn') || targetClickEdit.classList.contains('fa-xmark')) {
        if (selLists.value != '') {
            let indexRemoveList = lists.findIndex((item) => item.name == selLists.value)
            removeList(indexRemoveList)
        }
    }
})

inputSearch.addEventListener('input', filter)
selFilter.addEventListener('change', filter)