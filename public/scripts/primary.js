const navOpen = document.querySelector('.nav-open')
const navbarMini = document.querySelector('.navbar-mini')
navOpen.addEventListener('click', () => {
    navOpen.classList.toggle('nav-open-active')
    navbarMini.classList.toggle('nav-active')
})

let accountWrapper = document.querySelector('.account-wrapper')
let accountContainer = document.querySelector('.account-container')

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