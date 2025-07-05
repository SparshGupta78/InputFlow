//RandomIdGenerator

const randomIdGenerator1 = (len) => {
    const randomBox = []

    for (let i = 48; i <= 57; i++) {randomBox.push(String.fromCharCode(i))}
    for (let i = 97; i <= 122; i++) {randomBox.push(String.fromCharCode(i))}
    for (let i = 65; i <= 90; i++) {randomBox.push(String.fromCharCode(i))}

    let randomId = ''

    for (let i = 1; i <= len; i++) {randomId += randomBox[Math.floor(Math.random() * randomBox.length)]}

    return randomId
}

//Adjustable height textarea

let autoResizeTextareas = (textarea) => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
    })
}

document.querySelectorAll('textarea').forEach(autoResizeTextareas)

//HTMLs

let RadioHTML = `
    <div class="option">
        <input name="" type="radio" class="fake-btn" disabled>
        <textarea name="" placeholder="Option" rows="1"></textarea>
        <span class="material-symbols-rounded del-option-btn" onclick="this.parentNode.remove()">close</span>
    </div>
`
let RadioBtnHTML = `
    <button type="button" class="add-option add-radio">
        <span class="material-symbols-rounded del-option-btn">add</span>
        Add option
    </button>
`
let CheckHTML = `
    <div class="option">
        <input name="" type="checkbox" class="fake-btn" disabled>
        <textarea name="" placeholder="Option" rows="1"></textarea>
        <span class="material-symbols-rounded" onclick="this.parentNode.remove()">close</span>
    </div>
`
let CheckBtnHTML = `
    <button type="button" class="add-option add-check">
        <span class="material-symbols-rounded del-option-btn">add</span>
        Add option
    </button>
`
let SingleLineHTML = `
    <input name="" type="text" class="single-line-ans-input" placeholder="Answer" />
`
let MultiLineHTML = `
    <textarea name="" placeholder="Answer" rows="2"></textarea>
`

let addByField = (fieldType) => {
    if (fieldType == 'single-choice') {
            formContainer.insertAdjacentHTML('beforeend', contentBoxHTML(fieldType, RadioHTML, RadioBtnHTML))
        }
        else if (fieldType == 'multi-choice') {
            formContainer.insertAdjacentHTML('beforeend', contentBoxHTML(fieldType, CheckHTML, CheckBtnHTML))
        }
        else if (fieldType == 'single-line') {
            formContainer.insertAdjacentHTML('beforeend', contentBoxHTML(fieldType, SingleLineHTML))
        }
        else if (fieldType == 'multi-line') {
            formContainer.insertAdjacentHTML('beforeend', contentBoxHTML(fieldType, MultiLineHTML))
        }
        formContainer.lastElementChild.querySelectorAll('textarea').forEach(autoResizeTextareas)
        panel_V5adk3_control(formContainer.lastElementChild)
}

//panel-V5adk3 controls

let panel_V5adk3_control = (contentBox) => {

    let answerSection = contentBox.querySelector('.answer-section')

    let panel_V5adk3 = contentBox.querySelector('.panel-V5adk3')

    if (panel_V5adk3.querySelector('.add-radio')) {
        panel_V5adk3.querySelector('.add-radio').addEventListener('click', () => {
            answerSection.insertAdjacentHTML('beforeend', RadioHTML)
            autoResizeTextareas(answerSection.lastElementChild.querySelector('textarea'))
        })
    }

    else if (panel_V5adk3.querySelector('.add-check')) {
        panel_V5adk3.querySelector('.add-check').addEventListener('click', () => {
            answerSection.insertAdjacentHTML('beforeend', CheckHTML)
            autoResizeTextareas(answerSection.lastElementChild.querySelector('textarea'))
        })
    }

}

document.querySelectorAll('.content-box').forEach(panel_V5adk3_control)

//Adding new question controls

let contentBoxHTML = (fieldType, answerBody = '', panel_V5adk3_body = '') => {
    const toggleId = randomIdGenerator(4)
    return `
        <div class="content-box" data-field-type="${fieldType}">
            <textarea name="" class="question-box" rows="1" placeholder="Question"></textarea>
            <div class="answer-section">
                ${answerBody}
            </div>
            <div class="content-control-panel">
                <div class="panel-V5adk3">
                    ${panel_V5adk3_body}
                </div>
                <div class="panel-esf3W">
                    <div class="panel-3wfes">
                        <div class="toggle-wrapper">
                            <input type="checkbox" id="toggle-${toggleId}" class="toggle content-required-toggle">
                            <label for="toggle-${toggleId}" class="toggle-label"></label>
                        </div>
                        Required
                    </div>
                    <button type="button" class="delete-content-box" onclick="this.parentNode.parentNode.parentNode.remove()">
                        <span class="material-symbols-rounded delete-content-btn">delete</span>
                    </button>
                </div>
            </div>
        </div>
    `
}
let formContainer =  document.querySelector('.form-container')
let controlBoxes = document.querySelectorAll('.control-box')

for (let controlBox of controlBoxes) {
    
    if (controlBox.classList.contains('question-adder-box')) {
        controlBox.querySelector('.question-add').addEventListener('click', () => {
            let fieldType = controlBox.querySelector('.question-select').value
            addByField(fieldType)
        })
    }

}

const questionAddMiniToggle = document.querySelector('.question-add-mini-toggle')
const controlMiniFloatBox = document.querySelector('.control-mini-float-box')
const questionAddMini = document.querySelector('.question-add-mini')
const questionSelectMini = document.querySelector('.question-select-mini')

if (questionAddMiniToggle && controlMiniFloatBox && questionAddMini && questionSelectMini) {
    questionAddMiniToggle.addEventListener('click', e => {
        e.stopPropagation()
        controlMiniFloatBox.classList.toggle('cmfb-show')
        questionAddMiniToggle.classList.toggle('cmb-show')
    })

    questionAddMini.addEventListener('click', e => {
        e.stopPropagation()
        const fieldType = questionSelectMini.value
        addByField(fieldType)
        controlMiniFloatBox.classList.remove('cmfb-show')
        questionAddMiniToggle.classList.remove('cmb-show')
    })

    document.addEventListener('click', e => {
        if (
            !controlMiniFloatBox.contains(e.target) &&
            !questionAddMiniToggle.contains(e.target)
        ) {
            controlMiniFloatBox.classList.remove('cmfb-show')
            questionAddMiniToggle.classList.remove('cmb-show')
        }
    })
}