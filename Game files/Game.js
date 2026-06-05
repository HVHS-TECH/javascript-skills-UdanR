const fallbackPlanets = [
  { name: 'Earth', gradient: 'radial-gradient(circle at 30% 30%, #7dd3fc 0%, #0ea5e9 35%, #14532d 65%, #052e16 100%)', x: 14, y: 78, distance: 1, radius: 8, mission: 'Home base with a full fuel dock.' },
  { name: 'Moon', gradient: 'radial-gradient(circle at 35% 35%, #f8fafc 0%, #cbd5e1 35%, #94a3b8 70%, #475569 100%)', x: 58, y: 18, distance: 3, radius: 6, mission: 'A quiet crater station for quick refuels.' },
  { name: 'Mars', gradient: 'radial-gradient(circle at 35% 35%, #fecaca 0%, #fb7185 35%, #b91c1c 70%, #7f1d1d 100%)', x: 82, y: 52, distance: 5, radius: 7, mission: 'A dusty red planet with a fuel tower.' },
  { name: 'Jupiter', gradient: 'radial-gradient(circle at 35% 35%, #fde68a 0%, #fbbf24 35%, #a16207 70%, #713f12 100%)', x: 40, y: 72, distance: 7, radius: 9, mission: 'A giant gas world packed with boosters.' },
];

let planets = [...fallbackPlanets];
let gameData = null;

const state = {
  currentPlanet: 'Earth',
  fuel: 100,
  maxFuel: 100,
  trips: 0,
  x: 14,
  y: 78,
  heading: 0,
  velocityX: 0,
  velocityY: 0,
  thrusting: false,
};

const spaceMap = document.getElementById('space-map');
const sceneView = document.getElementById('scene-view');
const rocket = document.getElementById('rocket');
const planetList = document.getElementById('planet-list');
const currentPlanetLabel = document.getElementById('current-planet');
const fuelReadout = document.getElementById('fuel-readout');
const tripCount = document.getElementById('trip-count');
const fuelBar = document.getElementById('fuel-bar');
const missionMessage = document.getElementById('mission-message');

const pressedKeys = new Set();

function getPlanet(name) {
  return planets.find((planet) => planet.name === name) || planets[0];
}

function drawPlanets() {
  spaceMap.querySelectorAll('.planet').forEach((node) => node.remove());

  planets.forEach((planet) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'planet detailed';
    if (planet.name === state.currentPlanet) {
      button.classList.add('planet-current');
    }
    button.style.left = `${planet.x}%`;
    button.style.top = `${planet.y}%`;
    button.style.setProperty('--planet-gradient', planet.gradient || 'radial-gradient(circle at 30% 30%, #38bdf8, #0f172a)');
    button.style.setProperty('--planet-ring', planet.ring || 'rgba(125, 211, 252, 0.15)');
    button.innerHTML = `
      <span class="planet-icon"></span>
      <span class="planet-name">${planet.name}</span>
    `;
    button.title = planet.mission;
    spaceMap.appendChild(button);
  });
}

function drawRoutes() {
  planetList.innerHTML = '';

  planets.forEach((planet) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'planet-btn';
    card.disabled = planet.name === state.currentPlanet;
    card.innerHTML = `
      <strong>${planet.name}</strong>
      <div class="planet-meta">
        <span>Fuel cost: ${planet.distance * 6 + 4}</span>
        <span>Distance: ${planet.distance}</span>
      </div>
    `;

    card.addEventListener('click', () => travelTo(planet.name));
    planetList.appendChild(card);
  });
}

function renderScene() {
  sceneView.innerHTML = '';
  const rocketNode = document.createElement('div');
  rocketNode.className = 'scene-rocket' + (state.thrusting ? ' burning' : '');
  rocketNode.setAttribute('aria-label', 'Rocket');
  sceneView.appendChild(rocketNode);

  planets.forEach((planet) => {
    const dx = planet.x - state.x;
    const dy = planet.y - state.y;
    const left = 50 + dx * 0.8;
    const top = 70 - dy * 0.8;

    const marker = document.createElement('div');
    marker.className = 'scene-planet';
    marker.style.left = `${Math.max(6, Math.min(94, left))}%`;
    marker.style.top = `${Math.max(10, Math.min(88, top))}%`;
    marker.style.setProperty('--planet-gradient', planet.gradient || 'radial-gradient(circle at 30% 30%, #38bdf8, #0f172a)');
    marker.innerHTML = `<span class="scene-planet-icon"></span><span>${planet.name}</span>`;
    sceneView.appendChild(marker);
  });
}

function updateStatus() {
  const current = getPlanet(state.currentPlanet);
  const fuelPercent = Math.max(0, state.fuel);

  currentPlanetLabel.textContent = current.name;
  fuelReadout.textContent = `${fuelPercent.toFixed(0)}%`;
  tripCount.textContent = String(state.trips);
  fuelBar.style.width = `${fuelPercent}%`;

  rocket.style.left = `${state.x}%`;
  rocket.style.top = `${state.y}%`;
  rocket.style.transform = `translate(-50%, -50%) rotate(${state.heading}deg)`;
  rocket.classList.toggle('flaming', state.thrusting && state.fuel > 0);

  drawPlanets();
  drawRoutes();
  renderScene();
}

function setMessage(text) {
  missionMessage.textContent = text;
}

function travelTo(targetName) {
  const target = getPlanet(targetName);
  const current = getPlanet(state.currentPlanet);

  if (!target || target.name === current.name) {
    setMessage('You are already on that planet. Choose a new destination.');
    return;
  }

  const distance = Math.hypot(target.x - state.x, target.y - state.y);
  const fuelCost = Math.max(6, Math.ceil(distance * 0.9) + 2);

  if (state.fuel < fuelCost) {
    setMessage(`Not enough fuel to reach ${target.name}. You need ${fuelCost - state.fuel}% more fuel.`);
    return;
  }

  state.fuel -= fuelCost;
  state.trips += 1;
  state.x = target.x;
  state.y = target.y;
  state.velocityX = 0;
  state.velocityY = 0;
  setMessage(`Flying from ${current.name} to ${target.name}. Fuel used: ${fuelCost}%.`);
  updateStatus();

  window.setTimeout(() => {
    state.currentPlanet = target.name;
    state.fuel = state.maxFuel;
    setMessage(`Landed on ${target.name}! Your tank is full again. Ready for the next mission.`);
    updateStatus();
  }, 650);
}

function getLandingRadius(planet) {
  return planet.radius || 8;
}

function tryLandOnPlanet() {
  const nearest = planets
    .map((planet) => ({
      planet,
      distance: Math.hypot(planet.x - state.x, planet.y - state.y),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (!nearest) {
    return false;
  }

  if (nearest.distance <= getLandingRadius(nearest.planet) + 4) {
    state.currentPlanet = nearest.planet.name;
    state.fuel = Math.min(state.maxFuel, state.fuel + 18);
    state.velocityX *= 0.2;
    state.velocityY *= 0.2;
    setMessage(`Landed on ${nearest.planet.name}! Fuel refilled. Try another route.`);
    return true;
  }

  return false;
}

function tickPhysics() {
  const turningPower = 2.2;
  const thrustPower = 0.18;

  if (pressedKeys.has('ArrowLeft')) {
    state.heading -= turningPower;
  }
  if (pressedKeys.has('ArrowRight')) {
    state.heading += turningPower;
  }

  state.thrusting = pressedKeys.has('ArrowUp');

  if (state.thrusting && state.fuel > 0) {
    const radians = (state.heading * Math.PI) / 180;
    state.velocityX += Math.cos(radians) * thrustPower;
    state.velocityY += Math.sin(radians) * thrustPower;
    state.fuel = Math.max(0, state.fuel - 0.35);
  }

  if (pressedKeys.has('ArrowDown')) {
    state.velocityX *= 0.88;
    state.velocityY *= 0.88;
  }

  state.velocityX *= 0.94;
  state.velocityY *= 0.94;
  state.x = Math.min(92, Math.max(8, state.x + state.velocityX));
  state.y = Math.min(88, Math.max(10, state.y + state.velocityY));

  if (tryLandOnPlanet()) {
    updateStatus();
    return;
  }

  if (state.fuel <= 0) {
    setMessage('Fuel is empty. Land on a planet to refuel.');
  }

  updateStatus();
}

function loadGameData(data) {
  gameData = data;
  planets = Array.isArray(data.planets) && data.planets.length ? data.planets : [...fallbackPlanets];
  state.currentPlanet = planets[0].name;
  state.x = planets[0].x;
  state.y = planets[0].y;
  updateStatus();
}

window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    pressedKeys.add(event.key);
  }
});

window.addEventListener('keyup', (event) => {
  pressedKeys.delete(event.key);
});

fetch('Game.json')
  .then((response) => response.json())
  .then(loadGameData)
  .catch(() => {
    loadGameData({ planets: fallbackPlanets });
    setMessage('Using built-in graphics because the JSON data is not available yet.');
  });

setInterval(tickPhysics, 80);
updateStatus();
setMessage('Use Up to thrust, Left/Right to steer, and land on planets to refill fuel.');
