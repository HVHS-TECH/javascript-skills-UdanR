const planets = [
  { name: 'Earth', icon: '🌍', x: 14, y: 74, distance: 1, mission: 'Home base with a full fuel dock.' },
  { name: 'Moon', icon: '🌙', x: 58, y: 18, distance: 3, mission: 'A quiet crater station for quick refuels.' },
  { name: 'Mars', icon: '🔴', x: 82, y: 52, distance: 5, mission: 'A dusty red planet with a fuel tower.' },
  { name: 'Jupiter', icon: '🪐', x: 40, y: 72, distance: 7, mission: 'A giant gas world packed with boosters.' },
];

const state = {
  currentPlanet: 'Earth',
  fuel: 100,
  maxFuel: 100,
  trips: 0,
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
    button.innerHTML = `<span class="planet-icon">${planet.icon}</span><span>${planet.name}</span>`;
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

  rocket.style.left = `${current.x}%`;
  rocket.style.top = `${current.y}%`;

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

  const fuelCost = target.distance * 6 + 4;

  if (state.fuel < fuelCost) {
    setMessage(`Not enough fuel to reach ${target.name}. You need ${fuelCost}% more fuel.`);
    return;
  }

  state.fuel -= fuelCost;
  state.trips += 1;
  setMessage(`Launching from ${current.name} to ${target.name}. Fuel used: ${fuelCost}%.`);
  updateStatus();

  window.setTimeout(() => {
    state.currentPlanet = target.name;
    state.fuel = state.maxFuel;
    setMessage(`Landed on ${target.name}! Your tank is full again. Ready for the next mission.`);
    updateStatus();
  }, 900);
}

updateStatus();
setMessage('Choose a planet to launch. Every landing refuels your tank.');
