//FormId generetor

const randomIdGenerator = (len) => {
    const randomBox = []

    for (let i = 48; i <= 57; i++) {randomBox.push(String.fromCharCode(i))}
    for (let i = 97; i <= 122; i++) {randomBox.push(String.fromCharCode(i))}
    for (let i = 65; i <= 90; i++) {randomBox.push(String.fromCharCode(i))}

    let randomId = ''

    for (let i = 1; i <= len; i++) {randomId += randomBox[Math.floor(Math.random() * randomBox.length)]}

    return randomId
}

//toaster

let toasterBox = document.querySelector('.toaster-box')

let createToaster = (toasterData, toasterColor) => {
    let toaster = document.createElement('div')
    toaster.classList.add('toaster')
    let toasterinner = `
        <div class="toaster-data" style="color: ${toasterColor}">
            ${toasterData}
        </div>
        <div class="toaster-close" onclick="this.parentNode.remove()">
            <span class="material-symbols-rounded" style="color: ${toasterColor}">close</span>
        </div>
        <div class="toaster-timeliner" style="background-color: ${toasterColor}"></div>
    `
    toaster.innerHTML = toasterinner
    setTimeout(() => {
        toaster.remove()
    }, 3000)
    return toasterBox.prepend(toaster)
}

//creating and routing data

let submitData = () => {

    let formContainer = document.querySelector('.form-container')

    let body = {}
    
    body.formId = randomIdGenerator(25)

    if (formContainer.querySelector('.form-title').value.trim() == '') {
        return [false, 'Title can\'t be empty']
    } else {
        body.title = formContainer.querySelector('.form-title').value.trim()
    }

    if (formContainer.querySelector('.form-description').value.trim() != '') {
        body.description = formContainer.querySelector('.form-description').value.trim()
    }

    body.formData = []

    const contentBoxes = formContainer.querySelectorAll('.content-box')

    if (contentBoxes.length === 0) {
        return [false, 'At least one question is required']
    }

    for (let contentBox of contentBoxes) {

        let questionId = randomIdGenerator(8)

        const required = contentBox.querySelector('.content-required-toggle').checked

        const type = contentBox.dataset.fieldType

        const question = contentBox.querySelector('.question-box').value.trim()
        if (question == '') return [false, 'Question can\'t be empty']

        if (type == 'single-choice' || type == 'multi-choice') {
            const optionTextareas = contentBox.querySelectorAll('.answer-section .option textarea')

            if (optionTextareas.length == 0) {
                return [false, 'No option found to a question']
            }

            const options = []
            optionTextareas.forEach(opt => {
                if (opt.value.trim()) {
                    options.push(opt.value.trim())
                }
            })

            if (options.length === 0) {
                return [false, 'Option can\'t be empty']
            }

            body.formData.push({ required, type, questionId, question, options })
        } else {
            body.formData.push({ required, type, questionId, question })
        }
    }
    
    return [true, body]
}

document.querySelectorAll('.submit-btn').forEach((submitBtn) => {
    submitBtn.addEventListener('click', async (e) => {

        e.preventDefault()

        submitBtn.innerHTML = '<div><span class="material-symbols-rounded">progress_activity</span></div>'
        submitBtn.disabled = true

        let [submitStatus, submitResultData] = submitData()

        if (submitStatus) {
            try {
                await fetch('/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(submitResultData)
                })
                .then(() => {
                    window.location.href = `/create-save?formId=${submitResultData.formId}`
                })
            }
            catch (err) {
                createToaster('Error publishing form', 'red')
            }

        } else {
            createToaster(submitResultData, 'red')
        }

        submitBtn.innerHTML = 'Create'
        submitBtn.disabled = false
    })
})