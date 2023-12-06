function addOptionList(list) {
    option = document.createElement('option')
    option.classList.add('option-list')
    option.value = list.name
    option.innerText = list.name

    selLists.appendChild(option)
}

function createList(name) {
    const list = {
        name: name,
        item: [],
        min: [],
        hour: [],
        done: []
    }

    lists.push(list)
    localStorage.setItem('list', JSON.stringify(lists))
    addOptionList(list)
    hideAndShowLists()
}