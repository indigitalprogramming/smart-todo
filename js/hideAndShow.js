function hideAndShowLists() {
    containerAdd.classList.toggle('hide')
    containerSettings.classList.toggle('hide')
    containerTasks.classList.toggle('hide')
}

function hideAndShowEdit() {
    containerEdit.classList.toggle('hide')
    containerSettings.classList.toggle('hide')
    containerTasks.classList.toggle('hide')
    cancelEditButton.removeEventListener('click', hideAndShowEdit)
}

function hideAndShowEditLists() {
    containerEditList.classList.toggle('hide')
    containerSettings.classList.toggle('hide')
    containerTasks.classList.toggle('hide')
    cancelEditListButton.removeEventListener('click', hideAndShowEditLists)
}