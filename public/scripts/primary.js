// Loader

let loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    loader.classList.toggle('loader-show')
    setTimeout(() => {
        loader.style.display = 'none'
    }, 500)
})

const navOpen = document.querySelector('.nav-open')
const navbarMini = document.querySelector('.navbar-mini')
navOpen.addEventListener('click', () => {
    navOpen.classList.toggle('nav-open-active')
    navbarMini.classList.toggle('nav-active')
})

let accountWrapper = document.querySelector('.account-wrapper')
let accountContainer = document.querySelector('.account-container')

//Account

if (accountWrapper) {
    accountWrapper.addEventListener('click', (e) => {
        e.stopPropagation()
        accountWrapper.classList.toggle('account-btn-toggle')
        accountContainer.classList.toggle('account-box-toggle')
    })
    document.addEventListener('click', e => {
        if (!(accountContainer.contains(e.target) && accountWrapper.contains(e.target))) {
            if (accountWrapper.classList.contains('account-btn-toggle')) {accountWrapper.classList.remove('account-btn-toggle')}
            if (accountContainer.classList.contains('account-box-toggle')) {accountContainer.classList.remove('account-box-toggle')}
        }
    })
}

let oneFocus = (colls) => {
    colls.forEach(coll => {
        coll.addEventListener('mouseenter', () => {
            colls.forEach(col => {
                col.style.color = 'var(--color-4)'
                col.style.filter = 'blur(1px)'
            })
            coll.style.color = 'var(--color-9)'
            coll.style.filter = 'blur(0px)'
        })

        coll.addEventListener('mouseleave', () => {
            colls.forEach(col => {
                col.style.color = 'var(--color-9)'
                col.style.filter = 'blur(0px)'
            })
        })
    })
}

let fsmais = document.querySelectorAll('.footer-social-media a ion-icon')
oneFocus(fsmais)

let footerLinks = document.querySelectorAll('.footer-link a')
oneFocus(footerLinks)

//Back to top

document.querySelector('.footer-backtotop').addEventListener('click', () => {
    window.scrollTo({
        top: 0
    })
})