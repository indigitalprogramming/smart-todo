function editList(index) {
    errorListExist.classList.add('hide')
    let list = lists[index].name
    inputEditList.value = list
    inputEditList.focus()

    function confirmEdit() {
        let listExist = lists.findIndex((item) => item.name == inputEditList.value)
        if (listExist == -1) {
            lists[index].name = inputEditList.value
            localStorage.setItem('list', JSON.stringify(lists))

            let listsEdit = document.querySelectorAll('.option-list')
            for (listOpt of listsEdit) {
                let listEdit = listOpt.value == selLists.value
                if (listEdit) {
                    listOpt.innerText = inputEditList.value
                    listOpt.value = inputEditList.value
                }
            }
        hideAndShowEditLists()
        confirmEditListButton.removeEventListener('click', confirmEdit)
        } else {
            errorListExist.classList.remove('hide')
        }
    }

    confirmEditListButton.addEventListener('click', confirmEdit)
    cancelEditListButton.addEventListener('click', hideAndShowEditLists)
}

function removeList(index) {
    lists.splice(index, 1)
    localStorage.setItem('list', JSON.stringify(lists))
    let arrayListRemove = document.querySelectorAll('.option-list')
    for (let listRemove of arrayListRemove) {
        if (listRemove.value == selLists.value) {
            listRemove.remove()
            break
        }
    }

    if (lists.length > 0) {
        let listCreate = lists.findIndex((item) => item.name == selLists.value)
        createTask(lists[listCreate])
    } else {
        containerTasks.innerHTML = null
    }
}