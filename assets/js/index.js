const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const apodImg = document.getElementById("apod-image");
const apodDate = document.getElementById("apod-date");
const apodDateInput = document.getElementById("apod-date-input");
const apodDateInputSpan = document.querySelector("#apod-date-input+span");
const todayApodBtn = document.getElementById("today-apod-btn");
const apodLoading = document.getElementById("apod-loading");
const apodTitle = document.getElementById("apod-title");
const apodDateDetail = document.getElementById("apod-date-detail");
const apodExplanation = document.getElementById("apod-explanation");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");
const planetsCards = document.querySelectorAll(".planet-card");
const planetDetailImage = document.getElementById("planet-detail-image");
const planetDetailName = document.getElementById("planet-detail-name");
const planetDetailDescription = document.getElementById(
  "planet-detail-description",
);
const planetDetailDistance = document.getElementById("planet-distance");
const planetDetailRadius = document.getElementById("planet-radius");
const planetDetailMass = document.getElementById("planet-mass");
const planetDetailDensity = document.getElementById("planet-density");
const planetDetailOrbitalPeriod = document.getElementById(
  "planet-orbital-period",
);
const planetDetailRotation = document.getElementById("planet-rotation");
const planetDetailMoons = document.getElementById("planet-moons");
const planetDetailGravity = document.getElementById("planet-gravity");
const planetDetailDiscoverer = document.getElementById("planet-discoverer");
const planetDetailDiscoveryDate = document.getElementById(
  "planet-discovery-date",
);
const planetDetailBodyType = document.getElementById("planet-body-type");
const planetDetailVolume = document.getElementById("planet-volume");
const planetPerihelion = document.getElementById("planet-perihelion");
const planetAphelion = document.getElementById("planet-aphelion");
const planetEccentricity = document.getElementById("planet-eccentricity");
const planetInclination = document.getElementById("planet-inclination");
const planetAxialTilt = document.getElementById("planet-axial-tilt");
const planetTemp = document.getElementById("planet-temp");
const planetEscape = document.getElementById("planet-escape");
const planetFacts = document.querySelectorAll("#planet-facts li span");
async function todayNews(today = "notToday") {
  apodLoading.classList.remove("hidden");
  apodImg.classList.add("hidden");
  apodDate.innerHTML = "Astronomy Picture of the Day - Loading...";
  apodTitle.innerHTML = "Loading...";
  apodExplanation.innerHTML = "Loading...";
  apodDateDetail.innerHTML = "Loading...";
  apodDateInfo.innerHTML = "Loading...";
  apodMediaType.innerHTML = "Loading...";

  try {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=oCqGxwF1pb2AHD0SjEY9KGL4tUa1Gi7BQY2E0Xfa${
        today === "notToday" && apodDateInput.value
          ? "&date=" + apodDateInput.value
          : ""
      }`,
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const apiDate = data.date;
    const [year, month, day] = apiDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    apodDateInputSpan.innerHTML = data.date;
    apodDateInput.value = data.date;
    apodLoading.classList.add("hidden");
    apodImg.classList.remove("hidden");
    apodImg.setAttribute("src", data.url);
    apodDate.innerHTML = `Astronomy Picture of the Day - ${formattedDate}`;
    apodTitle.innerHTML = data.title;
    apodExplanation.innerHTML = data.explanation;
    apodDateDetail.innerHTML = formattedDate;
    apodDateInfo.innerHTML = formattedDate;
    apodMediaType.innerHTML = data.media_type;
  } catch (error) {
    console.log(error.message);
  }
}
async function getPlanet(planetName) {
  try {
    const res = await fetch(
      `https://solar-system-opendata-proxy.vercel.app/api/planets`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const planets = data.bodies;
    const planet = planets.find(
      (planet) => planet.englishName.toLowerCase() === planetName,
    );
    planetDetailName.innerHTML = planet.englishName;
    planetDetailImage.src = planet.image;
    planetDetailDescription.innerHTML = planet.description;

    planetDetailDistance.innerHTML = `${planet.semimajorAxis.toLocaleString()} km`;

    planetDetailRadius.innerHTML = `${planet.meanRadius.toLocaleString()} km`;

    planetDetailMass.innerHTML = `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;

    planetDetailDensity.innerHTML = `${planet.density} g/cm³`;

    planetDetailOrbitalPeriod.innerHTML = `${planet.sideralOrbit.toLocaleString()} days`;

    planetDetailRotation.innerHTML = `${planet.sideralRotation} hours`;

    planetDetailMoons.innerHTML = planet.moons ? planet.moons.length : 0;

    planetDetailGravity.innerHTML = `${planet.gravity} m/s²`;

    planetDetailDiscoverer.innerHTML =
      planet.discoveredBy || "Known since antiquity";

    planetDetailDiscoveryDate.innerHTML = planet.discoveryDate || "Ancient";

    planetDetailBodyType.innerHTML = planet.bodyType;

    planetDetailVolume.innerHTML = `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`;

    planetPerihelion.innerHTML = `${planet.perihelion.toLocaleString()} km`;

    planetAphelion.innerHTML = `${planet.aphelion.toLocaleString()} km`;

    planetEccentricity.innerHTML = planet.eccentricity;

    planetInclination.innerHTML = `${planet.inclination}°`;

    planetAxialTilt.innerHTML = `${planet.axialTilt}°`;

    planetTemp.innerHTML = `${(planet.avgTemp - 273.15).toFixed(0)}°C`;

    planetEscape.innerHTML = `${(planet.escape / 1000).toFixed(2)} km/s`;

    planetFacts[0].innerHTML = `Mass: ${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;

    planetFacts[1].innerHTML = `Surface gravity: ${planet.gravity} m/s²`;

    planetFacts[2].innerHTML = `Density: ${planet.density} g/cm³`;

    planetFacts[3].innerHTML = `Axial tilt: ${planet.axialTilt}°`;
  } catch (error) {
    console.log(error.message);
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    sidebar.classList.remove("sidebar-open");
    document.querySelector(".sidebar-overlay")?.remove();

    navLinks.forEach((link) => {
      if (link === e.currentTarget) {
        e.currentTarget.classList.add("bg-blue-500/10", "text-blue-400");
        e.currentTarget.classList.remove(
          "text-slate-300",
          "hover:bg-slate-800",
        );
      } else {
        link.classList.remove("bg-blue-500/10", "text-blue-400");
        link.classList.add("text-slate-300", "hover:bg-slate-800");
      }
    });

    sections.forEach((section) => {
      if (section.dataset.section == e.currentTarget.dataset.section) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
  });
});

apodDateInput.addEventListener("change", () => {
  todayNews();
  apodDateInputSpan.innerHTML = "Loading...";
});
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-open");
  const div = document.createElement("div");
  div.classList.add("sidebar-overlay");
  div.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
    div.remove();
  });
  document.body.appendChild(div);
});
todayApodBtn.addEventListener("click", () => {
  todayNews("today");

  apodDateInputSpan.innerHTML = "Loading...";
});
planetsCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    getPlanet(e.currentTarget.dataset.planetId);
  });
});

todayNews("today");
