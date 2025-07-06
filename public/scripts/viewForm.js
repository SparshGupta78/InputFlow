let main_b3qa = document.querySelector('.main-b3qa')

if (main_b3qa) {
    const navBtns = main_b3qa.querySelectorAll('.main-nav-btn')
    navBtns.forEach(mainNavBtn => {
        mainNavBtn.addEventListener('click', () => {
            navBtns.forEach(btn => btn.classList.remove('main-nav-btn-active'))
            mainNavBtn.classList.add('main-nav-btn-active')

            if (mainNavBtn.classList.contains('view-form-nav-btn')) {
                document.querySelector('.main-a2eD5').style.display = 'flex'
                document.querySelector('.main-feszs').style.display = 'none'
            } else {
                document.querySelector('.main-a2eD5').style.display = 'none'
                document.querySelector('.main-feszs').style.display = 'flex'
            }
        })
    })
}

let autoResizeTextareas = (textarea) => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
    })
}

document.querySelectorAll('textarea').forEach(autoResizeTextareas)

document.querySelectorAll('.content-box').forEach(contentBox => {
    let clearSelection = contentBox.querySelector('.clear-selection')
    if (clearSelection) {
        clearSelection.addEventListener('click', () => {
            if (contentBox.dataset.fieldType === 'single-choice' || contentBox.dataset.fieldType === 'multi-choice') {
                contentBox.querySelectorAll('.content-click-btn').forEach(clickBtn => clickBtn.checked = false)
            }
        })
    }
})

let responseBoxes = document.querySelectorAll('.response-box')
let responseBoxCounter = document.querySelector('.response-box-counter')
let responseBoxLeft = document.querySelector('.response-box-left')
let responseBoxRight = document.querySelector('.response-box-right')

let currentIndex = 0

if (responseBoxes.length > 0) {
    responseBoxes[0].classList.add('response-box-active')
    responseBoxCounter.innerHTML = '1'
    responseBoxLeft.disabled = true
    responseBoxRight.disabled = responseBoxes.length === 1
}

responseBoxRight.addEventListener('click', () => {
    if (currentIndex < responseBoxes.length - 1) {
        responseBoxes[currentIndex].classList.remove('response-box-active')
        currentIndex++
        responseBoxes[currentIndex].classList.add('response-box-active')
        responseBoxCounter.innerHTML = `${currentIndex + 1}`
    }
    responseBoxLeft.disabled = currentIndex === 0
    responseBoxRight.disabled = currentIndex === responseBoxes.length - 1
})

responseBoxLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        responseBoxes[currentIndex].classList.remove('response-box-active')
        currentIndex--
        responseBoxes[currentIndex].classList.add('response-box-active')
        responseBoxCounter.innerHTML = `${currentIndex + 1}`
    }
    responseBoxLeft.disabled = currentIndex === 0
    responseBoxRight.disabled = currentIndex === responseBoxes.length - 1
})