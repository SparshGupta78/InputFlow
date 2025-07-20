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

let main_nbraes = document.querySelectorAll('.main-nbrae')

if (main_nbraes.length > 0) {
    for (let main_nbrae of main_nbraes) {
        main_nbrae.addEventListener('click', () => {
            main_nbrae.classList.toggle('main-nbrae-active')
            main_nbrae.nextElementSibling.classList.toggle('main-hnjub-active')

            if (main_nbrae.dataset.field === 'share' && main_nbrae.nextElementSibling.querySelector('.main-hbkmy')) {
                main_nbrae.nextElementSibling.querySelector('.main-hbkmy').innerHTML = window.location.href
            }
        })
    }
}

let main_nbdf = document.querySelector('.main-nbdf')
if (main_nbdf) {
    main_nbdf.addEventListener('click', () => {
        main_nbdf.disabled = true
        main_nbdf.innerHTML = '<span class="material-symbols-rounded">check</span>Copied'
        navigator.clipboard.writeText(document.querySelector('.main-hbkmy').innerText)
        setTimeout(() => {
            main_nbdf.innerHTML = '<span class="material-symbols-rounded">content_copy</span>Copy link'
            main_nbdf.disabled = false
        }, 3000)
    })
}

document.addEventListener('click', e => {
    document.querySelectorAll('.main-hnjub').forEach(popup => {
        const toggleBtn = popup.previousElementSibling
        if (!popup.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleBtn.classList.remove('main-nbrae-active')
            popup.classList.remove('main-hnjub-active')
        }
    })
})

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