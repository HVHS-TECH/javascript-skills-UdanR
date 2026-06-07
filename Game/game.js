const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/////////////////////////////////////////////////////
// INPUT
/////////////////////////////////////////////////////

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

/////////////////////////////////////////////////////
// ROCKET
/////////////////////////////////////////////////////

const rocket = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,

    fuel: 100,
    thrust: 0.15,
    rotationSpeed: 0.05
};

/////////////////////////////////////////////////////
// CAMERA
/////////////////////////////////////////////////////

const camera = {
    x: 0,
    y: 0
};

/////////////////////////////////////////////////////
// STARS
/////////////////////////////////////////////////////

const stars = [];

for (let i = 0; i < 1200; i++) {
    stars.push({
        x: (Math.random() - 0.5) * 25000,
        y: (Math.random() - 0.5) * 25000,
        size: Math.random() * 2
    });
}

/////////////////////////////////////////////////////
// PARTICLES
/////////////////////////////////////////////////////

const particles = [];

function spawnFlame() {
    particles.push({
        x: rocket.x - Math.cos(rocket.angle) * 25,
        y: rocket.y - Math.sin(rocket.angle) * 25,

        vx: -Math.cos(rocket.angle) * 3 + (Math.random() - 0.5),
        vy: -Math.sin(rocket.angle) * 3 + (Math.random() - 0.5),

        life: 30,
        size: 2 + Math.random() * 3
    });
}

/////////////////////////////////////////////////////
// UPDATE
/////////////////////////////////////////////////////

function update() {

    // rotate
    if (keys["a"]) rocket.angle -= rocket.rotationSpeed;
    if (keys["d"]) rocket.angle += rocket.rotationSpeed;

    // thrust
    if (keys["w"] && rocket.fuel > 0) {

        rocket.vx += Math.cos(rocket.angle) * rocket.thrust;
        rocket.vy += Math.sin(rocket.angle) * rocket.thrust;

        rocket.fuel -= 0.04;

        for (let i = 0; i < 3; i++) spawnFlame();
    }

    // movement
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;

    rocket.vx *= 0.999;
    rocket.vy *= 0.999;

    // camera follow
    camera.x += (rocket.x - camera.x) * 0.08;
    camera.y += (rocket.y - camera.y) * 0.08;

    // particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) particles.splice(i, 1);
    }

    // HUD
    const speed = Math.sqrt(rocket.vx ** 2 + rocket.vy ** 2);

    document.getElementById("fuel").textContent = rocket.fuel.toFixed(0);
    document.getElementById("speed").textContent = speed.toFixed(1);
}

/////////////////////////////////////////////////////
// DRAW STARS
/////////////////////////////////////////////////////

function drawStars() {
    ctx.fillStyle = "white";

    for (const s of stars) {
        const x = s.x - camera.x + canvas.width / 2;
        const y = s.y - camera.y + canvas.height / 2;

        ctx.fillRect(x, y, s.size, s.size);
    }
}

/////////////////////////////////////////////////////
// DRAW PARTICLES
/////////////////////////////////////////////////////

function drawParticles() {
    for (const p of particles) {
        ctx.beginPath();

        ctx.arc(
            p.x - camera.x + canvas.width / 2,
            p.y - camera.y + canvas.height / 2,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,160,0,${p.life / 30})`;
        ctx.fill();
    }
}

/////////////////////////////////////////////////////
// DRAW ROCKET (FIXED ORIENTATION)
/////////////////////////////////////////////////////

function drawRocket() {

    const x = rocket.x - camera.x + canvas.width / 2;
    const y = rocket.y - camera.y + canvas.height / 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rocket.angle);

    // BODY (RIGHT-FACING ROCKET)
    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(-15, -10, 30, 20);

    // NOSE
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(10, -10);
    ctx.lineTo(10, 10);
    ctx.closePath();
    ctx.fill();

    // FINS
    ctx.fillStyle = "#888";

    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(-20, -20);
    ctx.lineTo(-10, -5);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-20, 20);
    ctx.lineTo(-10, 5);
    ctx.fill();

    // WINDOW
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#4da6ff";
    ctx.fill();

    ctx.restore();
}

/////////////////////////////////////////////////////
// DRAW LOOP
/////////////////////////////////////////////////////

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();
    drawParticles();
    drawRocket();
}

/////////////////////////////////////////////////////
// GAME LOOP
/////////////////////////////////////////////////////

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();