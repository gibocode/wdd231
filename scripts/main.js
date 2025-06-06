// import Navigation from "./navigation.js";
import Course from "./course.js";

// Navigation Menu Items
// const navigationItems = [
//     new Navigation("Home", "index.html", true),
//     new Navigation("Chamber", "#"),
//     new Navigation("Final", "#"),
//     new Navigation("Github Profile", "#"),
//     new Navigation("LinkedIn", "https://ph.linkedin.com/in/giboprogrammer"),
// ];

// const navContainer = document.querySelector("#nav-container");

// navContainer.innerHTML = "";

// navigationItems.forEach(item => {
// 	navContainer.innerHTML += item.render();
// });

// Navigation Menu
const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#nav");

menuButton.addEventListener("click", () => {
	nav.classList.toggle("hide");
});


// Current Year
const currentYear = document.querySelector("#currentyear");
const date = new Date();

currentYear.innerHTML = `&copy;${date.getFullYear()}`;

// Last Modified
const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last modified: ${document.lastModified}`;

// Courses
const courses = [
	new Course("CSE", 110, 2, true),
	new Course("WDD", 130, 2, true),
	new Course("CSE", 111, 2, true),
	new Course("CSE", 210, 2, true),
	new Course("WDD", 131, 2, true),
	new Course("WDD", 231, 2),
];

const courseContainer = document.querySelector(".course-container");
const totalCreditsDiv = document.querySelector("#total-credits");

function init() {
	let filteredCourses = [];
	filteredCourses = filterCourses("all", courses);
	filteredCourses.forEach(course => {
		courseContainer.innerHTML += course.render();
	});
}

init();

function filterCourses(type, courses) {
	let filteredCourses = courses.filter(course => {
		if (type == "cse") {
			return course.group == "CSE";
		}
		else if (type == "wdd") {
			return course.group == "WDD";
		}
		return true;
	});
	let totalCredits = filteredCourses.map(course => course.credits).reduce(getTotalCredits, 0);
	totalCreditsDiv.innerHTML = `Total Credits: ${totalCredits}`;
	return filteredCourses;
}

function getTotalCredits(total, credit) {
	return total + credit;
}

// Filter Courses
const allCoursesButton = document.querySelector("#all-courses");
const cseCoursesButton = document.querySelector("#cse-courses");
const wddCoursesButton = document.querySelector("#wdd-courses");

allCoursesButton.addEventListener("click", () => {
	courseContainer.innerHTML = "";
	let filteredCourses = filterCourses("all", courses);
	filteredCourses.forEach(course => {
		courseContainer.innerHTML += course.render();
	});
	initModal();
});

cseCoursesButton.addEventListener("click", () => {
	courseContainer.innerHTML = "";
	let filteredCourses = filterCourses("cse", courses);
	filteredCourses.forEach(course => {
		courseContainer.innerHTML += course.render();
	});
	initModal();
});

wddCoursesButton.addEventListener("click", () => {
	courseContainer.innerHTML = "";
	let filteredCourses = filterCourses("wdd", courses);
	filteredCourses.forEach(course => {
		courseContainer.innerHTML += course.render();
	});
	initModal();
});

function initModal() {

	const courseItems = document.querySelectorAll('.course');
	const modal = document.querySelector("#course-details");
	const closeModalButton = document.querySelector("#close-modal-button");

	courseItems.forEach(course => {
		course.addEventListener("click", async function () {
			const parts = this.textContent.split(" ");
			const subject = parts[0];
			const number = parts[1];
			const response = await fetch("data/courses.json");
			const courses = await response.json();
			const course = courses.filter(course => course.subject == subject && course.number == number)[0];

			document.querySelector("#course-name").textContent = `${subject} ${number}`;
			document.querySelector("#course-title").textContent = course.title;
			document.querySelector("#course-credits").textContent = `${course.credits} Credits`;
			document.querySelector("#course-certificate").textContent = `Certificate: ${course.certificate}`;
			document.querySelector("#course-description").textContent = course.description;
			document.querySelector("#course-technology").textContent = `Technology: ${course.technology.join(", ")}`;

			modal.showModal();
		});
	});

	closeModalButton.addEventListener("click", () => modal.close());
}

initModal();
