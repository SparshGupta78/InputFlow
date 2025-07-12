const animateBlocks = document.querySelectorAll('.animate-block')

if (animateBlocks.length > 0) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.toggle('animate-block-show')
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            threshold: 0.5
        }
    )
    animateBlocks.forEach(animateBlock => observer.observe(animateBlock))
}