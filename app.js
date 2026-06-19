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

        if (ball.top <= 0 || ball.top >= window.innerHeight - 40) ball.addY *= -1;
        if (ball.left <= 0 || ball.left >= window.innerWidth - 40) ball.addX *= -1;

        ball.element.style.top = ball.top + "px";
        ball.element.style.left = ball.left + "px";
    }
}

function collision(){
    for(let ball of balls){
        for(let otherBall of balls){
            if(ball!=otherBall){
                //operation
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

    document.addEventListener("click", () => {
        gsap.to(spanChars, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            stagger: 0.02,
            ease: "power2.in",
            onComplete: () => {
                document.getElementById("start").style.display = "none";
            }
        });
    });
});



