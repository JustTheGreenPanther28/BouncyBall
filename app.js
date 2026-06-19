let topDistance;
let leftDistance;
document.addEventListener('click', () => {
    leftDistance = event.clientX;
    topDistance = event.clientY;
    createCircle(topDistance, leftDistance);
})
balls = [];
function createCircle(topDistance, leftDistance) {
    let whole_body = document.getElementById('body');
    let newBall = document.createElement('div');
    newBall.classList.add('ball');
    newBall.style.top = `${topDistance}px`;
    newBall.style.left = `${leftDistance}px`;
    whole_body.appendChild(newBall);

    balls.push({
        element: newBall,
        top: topDistance,
        left: leftDistance,
        addX: Math.random() * 10,
        addY: Math.random() * 10
    });
}

setInterval(moveBall, 20)

function moveBall() {
    for (let ball of balls) {

        ball.top += ball.addY;
        ball.left += ball.addX;

        if (ball.top <= 0 || ball.top >= window.innerHeight - 30) ball.addY *= -1;
        if (ball.left <= 0 || ball.left >= window.innerWidth - 30) ball.addX *= -1;

        ball.element.style.top = ball.top + "px";
        ball.element.style.left = ball.left + "px";
    }
}

