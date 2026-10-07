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

todayNews("today");
