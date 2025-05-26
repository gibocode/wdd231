// Navigation Menu
const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#nav");

menuButton.addEventListener("click", () => {
	nav.classList.toggle("show");
});

// Footer
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");
const currentDate = new Date();

currentYear.innerHTML = currentDate.getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
