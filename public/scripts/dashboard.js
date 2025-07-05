let myFormsContent = document.querySelector('.myforms-content')
let formContentOpen = false
document.querySelector('.form-expand-btn').addEventListener('click', () => {
    myFormsContent.classList.toggle('form-content-close')
    if (formContentOpen){
        formContentOpen = false
        document.querySelector('.form-expand-btn').innerHTML = '<span class="material-symbols-rounded">expand_content</span>'
    } else {
        formContentOpen = true
        document.querySelector('.form-expand-btn').innerHTML = '<span class="material-symbols-rounded">collapse_content</span>'
    }
})

document.addEventListener('click', (e) => {
    document.querySelectorAll('.form-vwanj3').forEach((popup) => {
        if (!popup.contains(e.target)) {
            popup.classList.remove('form-vwanj3-show')
        }
    })
})

document.querySelectorAll('.form-bwsc3w').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation()
        document.querySelectorAll('.form-vwanj3').forEach(popup => {
            if (popup != btn.nextElementSibling) popup.classList.remove('form-vwanj3-show')
        })
        btn.nextElementSibling.classList.toggle('form-vwanj3-show')
    })
})

let formViewTile = false
let formViewBtn = document.querySelector('.form-view-btn')
formViewBtn.addEventListener('click', () => {
    if (formViewTile) {
        formViewBtn.innerHTML = '<span class="material-symbols-rounded">data_table</span>'
        document.querySelectorAll('.form-container').forEach(formCont => formCont.style.display = 'flex')        
        document.querySelectorAll('.form-container-tiles').forEach(formCont => formCont.style.display = 'none')
        formViewTile = false
    } else {
        formViewBtn.innerHTML = '<span class="material-symbols-rounded">dataset</span>'
        document.querySelectorAll('.form-container').forEach(formCont => formCont.style.display = 'none')
        document.querySelectorAll('.form-container-tiles').forEach(formCont => formCont.style.display = 'flex')
        formViewTile = true
    }
})