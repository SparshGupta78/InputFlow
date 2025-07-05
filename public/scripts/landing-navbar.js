const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
    let y = window.scrollY
    if (y > 250) {
        navbar.style.background = 'var(--color-2)'
        navbar.style.boxShadow = 'var(--box-shadow-1)'
    } else {
        navbar.style.background = 'transparent'
        navbar.style.boxShadow = 'none'
    }
})

window.addEventListener('wheel', (e) => {
    let dy = e.deltaY
    let sy = window.scrollY
    if (dy > 0 && sy > 250) {
        setTimeout(() => {navbar.style.transform = 'translateY(-100%)'}, 300)
    } else {
        setTimeout(() => {navbar.style.transform = 'translateY(0%)'}, 300)
    }
})