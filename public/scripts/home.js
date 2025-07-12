let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function animate() {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    document.querySelector('.x-box').innerHTML = Math.round(currentX);
    document.querySelector('.y-box').innerHTML = Math.round(currentY);

    requestAnimationFrame(animate);
}

animate();