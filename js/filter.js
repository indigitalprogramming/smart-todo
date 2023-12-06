function filter() {
    const tasksFilter = document.querySelectorAll('.task')
    if (selFilter.value ==='all') {
        if (inputSearch.value.length > 0) {
            tasksFilter.forEach((item) => {
                search(item)
            })
        } else {
            tasksFilter.forEach(item => item.classList.remove('hide'))
        }
    } else if (selFilter.value === 'done') {
        if (inputSearch.value.length > 0) {
            tasksFilter.forEach((item) => {
                if (item.classList.contains('done')) {
                    search(item)
                } else {
                    item.classList.add('hide')
                }
            })
        } else {
            tasksFilter.forEach((item) => {
                if (item.classList.contains('done')) {
                    item.classList.remove('hide')
                } else {
                    item.classList.add('hide')
                }
            })
        }
    } else if (selFilter.value === 'to-do') {
        if (inputSearch.value.length > 0) {
            tasksFilter.forEach((item) => {
                if (!(item.classList.contains('done'))) {
                    search(item)
                } else {
                    item.classList.add('hide')
                }
            })
        } else {
            tasksFilter.forEach((item) => {
                if (item.classList.contains('done')) {
                    item.classList.add('hide')
                } else {
                    item.classList.remove('hide')
                }
            })
        }
    }
}

function search(item) {
    let nameTask = item.querySelector('.text-task').innerText
    let nameTaskFormatted = nameTask.toLowerCase()
    let textComp = inputSearch.value.toLowerCase()
    let comp = nameTaskFormatted.substring(0, textComp.length)
    if (!(comp == textComp)) {
        item.classList.add('hide')
    } else {
        item.classList.remove('hide')
    }
}