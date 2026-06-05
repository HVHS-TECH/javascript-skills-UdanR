const planets = [
  { name: 'Earth', color: 'linear-gradient(135deg, #38bdf8, #0f766e)', x: 14, y: 78, distance: 1, mission: 'Home base with a full fuel dock.' },
  { name: 'Moon', color: 'linear-gradient(135deg, #e5e7eb, #64748b)', x: 58, y: 18, distance: 3, mission: 'A quiet crater station for quick refuels.' },
  { name: 'Mars', color: 'linear-gradient(135deg, #fb7185, #b91c1c)', x: 82, y: 52, distance: 5, mission: 'A dusty red planet with a fuel tower.' },
  { name: 'Jupiter', color: 'linear-gradient(135deg, #fbbf24, #a16207)', x: 40, y: 72, distance: 7, mission: 'A giant gas world packed with boosters.' },
];

const state = {
  currentPlanet: 'Earth',
  fuel: 100,
  maxFuel: 100,
  trips: 0,
  x: 14,
  y: 78,
};

const spaceMap = document.getElementById('space-map');
const rocket = document.getElementById('rocket');
const planetList = document.getElementById('planet-list');
const currentPlanetLabel = document.getElementById('current-planet');
const fuelReadout = document.getElementById('fuel-readout');
const tripCount = document.getElementById('trip-count');
const fuelBar = document.getElementById('fuel-bar');
const missionMessage = document.getElementById('mission-message');

function getPlanet(name) {
  return planets.find((planet) => planet.name === name);
}

function drawPlanets() {
  spaceMap.querySelectorAll('.planet').forEach((node) => node.remove());

  planets.forEach((planet) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'planet';
    if (planet.name === state.currentPlanet) {
      button.classList.add('planet-current');
    }
    button.style.left = `${planet.x}%`;
    button.style.top = `${planet.y}%`;
    button.innerHTML = `
      <span class="planet-icon" style="background:${planet.color};"></span>
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

function updateStatus() {
  const current = getPlanet(state.currentPlanet);
  const fuelPercent = Math.max(0, state.fuel);

  currentPlanetLabel.textContent = current.name;
  fuelReadout.textContent = `${fuelPercent}%`;
  tripCount.textContent = String(state.trips);
  fuelBar.style.width = `${fuelPercent}%`;

  rocket.style.left = `${state.x}%`;
  rocket.style.top = `${state.y}%`;

  drawPlanets();
  drawRoutes();
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
  setMessage(`Flying from ${current.name} to ${target.name}. Fuel used: ${fuelCost}%.`);
  updateStatus();

  window.setTimeout(() => {
    state.currentPlanet = target.name;
    state.fuel = state.maxFuel;
    setMessage(`Landed on ${target.name}! Your tank is full again. Ready for the next mission.`);
    updateStatus();
  }, 650);
}

function moveRocket(dx, dy) {
  if (state.fuel <= 0) {
    setMessage('Your fuel tank is empty. Land on a planet to refill.');
    return;
  }

  const nextX = Math.min(92, Math.max(8, state.x + dx * 6));
  const nextY = Math.min(88, Math.max(10, state.y + dy * 6));
  const fuelCost = 3;

  if (state.fuel < fuelCost) {
    setMessage('You need more fuel to move. Land on a planet to refill.');
    return;
  }

  state.x = nextX;
  state.y = nextY;
  state.fuel = Math.max(0, state.fuel - fuelCost);
  updateStatus();

  const landedPlanet = planets.find((planet) => Math.hypot(planet.x - state.x, planet.y - state.y) < 10);
  if (landedPlanet && landedPlanet.name !== state.currentPlanet) {
    state.currentPlanet = landedPlanet.name;
    state.fuel = state.maxFuel;
    setMessage(`Landed on ${landedPlanet.name}! Fuel refilled.`);
    updateStatus();
  } else if (state.fuel === 0) {
    setMessage('Fuel is empty. Find a planet to refuel.');
  } else {
    setMessage(`Rocket is moving. Fuel left: ${state.fuel}%.`);
  }
}

window.addEventListener('keydown', (event) => {
  const keyMap = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
  };

  if (!keyMap[event.key]) {
    return;
  }

  event.preventDefault();
  const [dx, dy] = keyMap[event.key];
  moveRocket(dx, dy);
});

updateStatus();
setMessage('Use the arrow keys to steer the rocket. Land on a planet to refill your tank.');
