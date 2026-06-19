let count = 0;
let leftDistance;
let topDistance;
let balls = [];
document.addEventListener('click', () => {
    leftDistance = event.clientX;
    topDistance = event.clientY;
    if (leftDistance <= 10 || leftDistance >= window.innerWidth - 55 || topDistance <= 10 || topDistance >= window.innerHeight - 55) {
        alert("Can't spawn the balls on edges");
    }
    else {
        count++;
        createCircle(topDistance, leftDistance);
    }
});

function createCircle(topDistance, leftDistance) {

    let whole_body = document.getElementById('body');
    let newBall = document.createElement('div');

    newBall.classList.add('ball');
    newBall.id = "div" + count;
    newBall.style.top = `${topDistance}px`;
    newBall.style.left = `${leftDistance}px`;
    let colors = generateColor();
    newBall.style.borderColor = `rgb(${colors[0]["red"]}, ${colors[0]["green"]}, ${colors[0]["blue"]})`;
    whole_body.appendChild(newBall);

    balls.push({
        element: newBall,
        top: topDistance,
        left: leftDistance,
        addX: Math.random() * 10,
        addY: Math.random() * 10
    });
}

setInterval(moveBall, 10);
setInterval(collision, 10);

function moveBall() {
    for (let ball of balls) {

        ball.top += ball.addY;
        ball.left += ball.addX;
        let size = ball.element.offsetWidth;
        if (ball.top <= 0 || ball.top >= window.innerHeight - size) ball.addY *= -1;
        if (ball.left <= 0 || ball.left >= window.innerWidth - size) ball.addX *= -1;

        ball.element.style.top = ball.top + "px";
        ball.element.style.left = ball.left + "px";
    }
}

function collision() {
    balls = balls.filter(b => b !== null);
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let x = balls[i].left - balls[j].left;
            let y = balls[i].top - balls[j].top;
            let distance = Math.sqrt(x * x + y * y);
            if (distance <= 40) {
                let tempX = balls[i].addX;
                let tempY = balls[i].addY;

                let element1 = balls[i].element;
                let element2 = balls[j].element;

                balls[i].addX = (balls[j].addX);
                balls[i].addY = (balls[j].addY);

                balls[j].addX = tempX;
                balls[j].addY = tempY;

                if (element1.offsetWidth >= element2.offsetWidth) {
                    element1.style.width = parseInt(element1.offsetWidth) + parseInt(element2.offsetWidth) * 0.5 + 'px';
                    element1.style.height = parseInt(element1.offsetHeight) + parseInt(element2.offsetHeight) * 0.5 + 'px';
                    balls[j] = null;
                    element2.remove();
                }
                else {
                    element2.style.width = parseInt(element1.offsetWidth) * 0.5 + parseInt(element2.offsetWidth) + 'px';
                    element2.style.height = parseInt(element1.offsetHeight) * 0.5 + parseInt(element2.offsetHeight) + 'px';
                    balls[i] = null;
                    element1.remove();
                }
            }
        }
    }
}




function generateColor() {
    let colors = [];
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors.push({
        "red": r,
        "green": g,
        "blue": b
    })
    return colors;
}