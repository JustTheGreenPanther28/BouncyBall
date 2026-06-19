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

setInterval(moveBall, 10);
setInterval(collision,10);

function moveBall() {
    for (let ball of balls) {

        ball.top += ball.addY;
        ball.left += ball.addX;

        if (ball.top <= 0 || ball.top >= window.innerHeight - 45) ball.addY *= -1;
        if (ball.left <= 0 || ball.left >= window.innerWidth - 45) ball.addX *= -1;

        ball.element.style.top = ball.top + "px";
        ball.element.style.left = ball.left + "px";
    }
}

function collision() {

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let x = balls[i].left - balls[j].left;
            let y = balls[i].top - balls[j].top;
            let distance = Math.sqrt(x*x + y*y);
            if (distance <= 40) {                
                let tempX = balls[i].addX;
                let tempY = balls[i].addY;
                balls[i].addX = (balls[j].addX);
                balls[i].addY = (balls[j].addY);
                
                balls[j].addX = tempX;
                balls[j].addY = tempY;
            }
        }
    }
}


//GASP
document.fonts.ready.then(() => {
    let chars = document.getElementById("start").innerText.split("");
    document.getElementById("start").innerHTML = chars
        .map(char => `<span style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

    let spanChars = document.querySelectorAll("#start span");

    gsap.set("#start", { opacity: 1 });

    let tl = gsap.timeline({ repeat: -1 });

    tl.from(spanChars, {
        duration: 1,
        y: 100,
        rotation: 90,
        opacity: 0,
        ease: "elastic",
        stagger: 0.03
    });
});



