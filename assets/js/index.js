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
const featuredLaunch = document.getElementById("featured-launch");
const upcomingLaunchsGrid = document.getElementById("launches-grid");
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
async function launches() {
  try {
    const res = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const featuredLaunchData = data.results[0];
    const upcomingLunchData = data.results.slice(1);

    featuredLaunchShowHandle(featuredLaunchData);
    upcomingLunchShowHandle(upcomingLunchData);
  } catch (error) {
    console.log(error.message);
  }
}

function featuredLaunchShowHandle(launch) {
  const placeholder = `
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>
`;

  const date = new Date(launch.net);
  const now = new Date();
  const diff = date - now;
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  const launchDate = new Date(launch.net).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const launchTime = new Date(launch.net).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
  featuredLaunch.innerHTML = `
                <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${launch.status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launch.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launch.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launch.name.split("|")[0]}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${daysLeft}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${launchDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${launchTime} UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launch.pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launch.pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${launch.mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    id="featured-launch-image-container"
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                      <img
                        id="featured-launch-image"
                        src="${launch.image?.image_url || ""}"
                        alt="${launch.name}"
                        class="w-full h-full object-cover"
                      />
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
    `;
  const imageContainer = document.getElementById(
    "featured-launch-image-container",
  );
  const image = document.getElementById("featured-launch-image");
  image.onerror = () => {
    imageContainer.innerHTML = placeholder;
  };

  if (!launch.image?.image_url) {
    imageContainer.innerHTML = placeholder;
  }
}
function upcomingLunchShowHandle(launches) {
  const placeholder = `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`;
  let temp = "";
  launches.forEach((launch) => {
    const launchDate = new Date(launch.net).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    const launchTime = new Date(launch.net).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    temp += `
                <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
              ${
                launch.image?.image_url
                  ? `
                                      <img
                        src="${launch.image.image_url}"
                        alt="${launch.name}"
                        class="w-full h-full object-cover"
                        onerror = "this.outerHTML = '<i class=&quot;fas fa-space-shuttle text-5xl text-slate-700&quot;></i>'"
                      />
                `
                  : placeholder
              }

                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                                            ${launch.status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                      ${launch.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    SpaceX
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchTime} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launch.name.split("|")[0]}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launch.pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
    `;
  });
  upcomingLaunchsGrid.innerHTML = temp;
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

launches();
