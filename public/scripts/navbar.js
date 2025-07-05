const navbar = document.querySelector('.navbar')

navbar.style.background = 'var(--color-2)'
navbar.style.boxShadow = 'var(--box-shadow-1)'

window.addEventListener('wheel', (e) => {
    let dy = e.deltaY
    let sy = window.scrollY
    if (dy > 0 && sy > 10) {
        setTimeout(() => {navbar.style.transform = 'translateY(-100%)'}, 300)
    } else {
        setTimeout(() => {navbar.style.transform = 'translateY(0%)'}, 300)
    }
})