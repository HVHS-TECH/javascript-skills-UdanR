const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const keys = {};

window.addEventListener("keydown", e=>{
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e=>{
    keys[e.key.toLowerCase()] = false;
});

const rocket = {
    x:0,
    y:0,
    vx:0,
    vy:0,
    angle:0,
    fuel:100,
    thrust:0.15,
    rotationSpeed:0.05
};

const camera = {
    x:0,
    y:0
};

const stars = [];

for(let i=0;i<1000;i++){
    stars.push({
        x:(Math.random()-0.5)*20000,
        y:(Math.random()-0.5)*20000,
        size:Math.random()*2
    });
}

const particles = [];

function createThrusterParticle(){

    particles.push({
        x:rocket.x - Math.cos(rocket.angle)*20,
        y:rocket.y - Math.sin(rocket.angle)*20,
        vx:(Math.random()-0.5)-Math.cos(rocket.angle)*3,
        vy:(Math.random()-0.5)-Math.sin(rocket.angle)*3,
        life:30,
        size:2+Math.random()*3
    });

}

function update(){

    if(keys["a"]){
        rocket.angle -= rocket.rotationSpeed;
    }

    if(keys["d"]){
        rocket.angle += rocket.rotationSpeed;
    }

    if(keys["w"] && rocket.fuel > 0){

        rocket.vx += Math.cos(rocket.angle) * rocket.thrust;
        rocket.vy += Math.sin(rocket.angle) * rocket.thrust;

        rocket.fuel -= 0.03;

        for(let i=0;i<3;i++){
            createThrusterParticle();
        }
    }

    rocket.x += rocket.vx;
    rocket.y += rocket.vy;

    rocket.vx *= 0.999;
    rocket.vy *= 0.999;

    camera.x += (rocket.x-camera.x)*0.08;
    camera.y += (rocket.y-camera.y)*0.08;

    for(let i=particles.length-1;i>=0;i--){

        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.life--;

        if(p.life <= 0){
            particles.splice(i,1);
        }
    }

    const speed =
        Math.sqrt(
            rocket.vx*rocket.vx +
            rocket.vy*rocket.vy
        );

    document.getElementById("fuel").textContent =
        rocket.fuel.toFixed(0);

    document.getElementById("speed").textContent =
        speed.toFixed(1);
}

function drawStars(){

    ctx.fillStyle="white";

    for(const star of stars){

        const sx =
            star.x -
            camera.x +
            canvas.width/2;

        const sy =
            star.y -
            camera.y +
            canvas.height/2;

        ctx.fillRect(
            sx,
            sy,
            star.size,
            star.size
        );
    }
}

function drawParticles(){

    for(const p of particles){

        ctx.beginPath();

        ctx.arc(
            p.x-camera.x+canvas.width/2,
            p.y-camera.y+canvas.height/2,
            p.size,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
            `rgba(255,150,0,${p.life/30})`;

        ctx.fill();
    }
}

function drawRocket(){

    const x =
        rocket.x-camera.x+
        canvas.width/2;

    const y =
        rocket.y-camera.y+
        canvas.height/2;

    ctx.save();

    ctx.translate(x,y);
    ctx.rotate(rocket.angle);

    ctx.fillStyle="#d0d0d0";
    ctx.fillRect(-10,-15,20,30);

    ctx.beginPath();
    ctx.moveTo(0,-30);
    ctx.lineTo(12,-15);
    ctx.lineTo(-12,-15);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle="#999";

    ctx.beginPath();
    ctx.moveTo(-10,10);
    ctx.lineTo(-20,20);
    ctx.lineTo(-10,20);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10,10);
    ctx.lineTo(20,20);
    ctx.lineTo(10,20);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,-5,5,0,Math.PI*2);
    ctx.fillStyle="#4da6ff";
    ctx.fill();

    ctx.restore();
}

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawStars();
    drawParticles();
    drawRocket();
}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();