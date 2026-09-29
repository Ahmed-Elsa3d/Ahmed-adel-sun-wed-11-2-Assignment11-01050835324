const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

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
