const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/////////////////////////////////////////////////////
// INPUT
/////////////////////////////////////////////////////

const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
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
    rotationSpeed: 0.05,
    landed: false
};

/////////////////////////////////////////////////////
// CAMERA
/////////////////////////////////////////////////////

const camera = { x: 0, y: 0 };

/////////////////////////////////////////////////////
// PLANETS
/////////////////////////////////////////////////////

const planets = [
    { x: 0, y: 0, r: 90, gravity: 0.08, color: "#3da9ff" },
    { x: 600, y: -350, r: 70, gravity: 0.06, color: "#7CFF7C" },
    { x: -750, y: 450, r: 110, gravity: 0.1, color: "#ff6b6b" }
];

/////////////////////////////////////////////////////
// STARS
/////////////////////////////////////////////////////

const stars = [];

for(let i=0;i<1200;i++){
    stars.push({
        x:(Math.random()-0.5)*20000,
        y:(Math.random()-0.5)*20000,
        size:Math.random()*2
    });
}

/////////////////////////////////////////////////////
// PARTICLES
/////////////////////////////////////////////////////

const particles = [];

function spawnFlame(){
    particles.push({
        x: rocket.x - Math.cos(rocket.angle)*20,
        y: rocket.y - Math.sin(rocket.angle)*20,
        vx: -Math.cos(rocket.angle)*3 + (Math.random()-0.5),
        vy: -Math.sin(rocket.angle)*3 + (Math.random()-0.5),
        life: 30,
        size: 2 + Math.random()*3
    });
}

/////////////////////////////////////////////////////
// GRAVITY + LANDING (FIXED)
/////////////////////////////////////////////////////

function applyGravity(){

    rocket.landed = false;

    for(const p of planets){

        const dx = p.x - rocket.x;
        const dy = p.y - rocket.y;

        const dist = Math.sqrt(dx*dx + dy*dy);

        // avoid division crash
        if(dist < 1) continue;

        // LANDING CHECK (FIXED)
        if(dist < p.r + 10){

            const speed = Math.sqrt(rocket.vx**2 + rocket.vy**2);

            if(speed < 1.2){
                rocket.landed = true;

                rocket.vx *= 0.7;
                rocket.vy *= 0.7;

                rocket.fuel += 0.3;
            }

            continue;
        }

        // GRAVITY FORCE
        const force = p.gravity / (dist * 0.01);

        rocket.vx += (dx / dist) * force;
        rocket.vy += (dy / dist) * force;
    }
}

/////////////////////////////////////////////////////
// UPDATE
/////////////////////////////////////////////////////

function update(){

    // rotation
    if(keys["a"]) rocket.angle -= rocket.rotationSpeed;
    if(keys["d"]) rocket.angle += rocket.rotationSpeed;

    // THRUST (FIXED: always allowed)
    if(keys["w"] && rocket.fuel > 0){

        rocket.vx += Math.cos(rocket.angle) * rocket.thrust;
        rocket.vy += Math.sin(rocket.angle) * rocket.thrust;

        rocket.fuel -= 0.05;

        spawnFlame();
        spawnFlame();
    }

    applyGravity();

    // movement
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;

    rocket.vx *= 0.999;
    rocket.vy *= 0.999;

    // camera
    camera.x += (rocket.x - camera.x) * 0.08;
    camera.y += (rocket.y - camera.y) * 0.08;

    // particles
    for(let i=particles.length-1;i>=0;i--){
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if(p.life <= 0) particles.splice(i,1);
    }

    // HUD
    const speed = Math.sqrt(rocket.vx**2 + rocket.vy**2);

    document.getElementById("fuel").textContent = rocket.fuel.toFixed(0);
    document.getElementById("speed").textContent = speed.toFixed(1);

    document.getElementById("status").textContent =
        rocket.landed ? "LANDED - REFUELING" : "In Space";
}

/////////////////////////////////////////////////////
// DRAW PLANETS
/////////////////////////////////////////////////////

function drawPlanets(){

    for(const p of planets){

        const x = p.x - camera.x + canvas.width/2;
        const y = p.y - camera.y + canvas.height/2;

        ctx.beginPath();
        ctx.arc(x,y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
}

/////////////////////////////////////////////////////
// STARS
/////////////////////////////////////////////////////

function drawStars(){
    ctx.fillStyle = "white";

    for(const s of stars){
        ctx.fillRect(
            s.x - camera.x + canvas.width/2,
            s.y - camera.y + canvas.height/2,
            s.size,
            s.size
        );
    }
}

/////////////////////////////////////////////////////
// PARTICLES
/////////////////////////////////////////////////////

function drawParticles(){
    for(const p of particles){
        ctx.beginPath();
        ctx.arc(
            p.x - camera.x + canvas.width/2,
            p.y - camera.y + canvas.height/2,
            p.size,
            0,
            Math.PI*2
        );

        ctx.fillStyle = `rgba(255,160,0,${p.life/30})`;
        ctx.fill();
    }
}

/////////////////////////////////////////////////////
// ROCKET
/////////////////////////////////////////////////////

function drawRocket(){

    const x = rocket.x - camera.x + canvas.width/2;
    const y = rocket.y - camera.y + canvas.height/2;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(rocket.angle);

    ctx.fillStyle = "#ddd";
    ctx.fillRect(-12,-8,24,16);

    ctx.beginPath();
    ctx.moveTo(18,0);
    ctx.lineTo(8,-8);
    ctx.lineTo(8,8);
    ctx.fill();

    ctx.restore();
}

/////////////////////////////////////////////////////
// DRAW LOOP
/////////////////////////////////////////////////////

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawStars();
    drawPlanets();
    drawParticles();
    drawRocket();
}

/////////////////////////////////////////////////////
// LOOP
/////////////////////////////////////////////////////

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();