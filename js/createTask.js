function callCreateTask(indexList) {
    lists[indexList].done.push(false)
    lists[indexList].item.push(inputAddTask.value)
    lists[indexList].hour.push(selAddHour.value)
    lists[indexList].min.push(selAddMin.value)
    localStorage.setItem('list', JSON.stringify(lists))
    createTask(lists[indexList])
    selAddHour.value = '00'
    selAddMin.value = '00'
    inputAddTask.value = ''
    inputAddTask.focus()
}

function createTask(list) {
    console.log('Fui chamado')
    containerTasks.innerHTML = ''
    if (list.item.length > 0) {
        list.item.forEach((item, index) => {
            const containerTask = document.createElement('section')
            containerTask.classList.add('task')

            if (list.done[index]) {
                setDone(containerTask)
            } else {
                list.done[index] = false
            }

            const paragraphTask = document.createElement('p')
            paragraphTask.classList.add('text-task')
            paragraphTask.innerText = item

            const containerHour = createContainerHour(list.hour[index], list.min[index])
            const containerTaskSettings = createContainerSettings()

            containerTask.appendChild(containerHour)
            containerTask.appendChild(paragraphTask)
            containerTask.appendChild(containerTaskSettings)
            containerTasks.appendChild(containerTask)
            filter()
        })
    }
}

function createContainerHour(hour, min) {
    const containerHour = document.createElement('section')
    containerHour.classList.add('hour')

    const selHour = document.createElement('select')
    selHour.classList.add('sel-hour')
    const optionHour = document.createElement('option')
    optionHour.innerText = hour
    optionHour.value = hour
    selHour.appendChild(optionHour)

    const selMin = document.createElement('select')
    selMin.classList.add('sel-min')
    const optionMin = document.createElement('option')
    optionMin.innerText = min
    optionMin.value = min
    selMin.appendChild(optionMin)

    const points = document.createElement('p')
    points.innerText = ':'

    containerHour.appendChild(selHour)
    containerHour.appendChild(points)
    containerHour.appendChild(selMin)

    return containerHour
}

function createContainerSettings() {
    const containerSettings = document.createElement('section')
    containerSettings.classList.add('task-settings')

    const doneButton = document.createElement('button')
    doneButton.classList.add('done-btn')
    doneButton.innerHTML = `<i class="fa-solid fa-check"></i>`

    const editButton = document.createElement('button')
    editButton.classList.add('edit-btn')
    editButton.innerHTML = `<i class="fa-solid fa-pen"></i>`

    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-btn')
    removeButton.innerHTML = `<i class="fa-solid fa-xmark">`

    containerSettings.appendChild(doneButton)
    containerSettings.appendChild(editButton)
    containerSettings.appendChild(removeButton)

    return containerSettings
}