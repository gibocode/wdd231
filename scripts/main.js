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
	new Course("CSE", 110, true),
	new Course("WDD", 130, true),
	new Course("CSE", 111, true),
	new Course("CSE", 210, true),
	new Course("WDD", 131, true),
	new Course("WDD", 231),
];

const courseContainer = document.querySelector(".course-container");

let filteredCourses = [];

filteredCourses = filterCourses("all", courses);

filteredCourses.forEach(course => {
	courseContainer.innerHTML += course.render();
});

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
	return filteredCourses;
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
});

cseCoursesButton.addEventListener("click", () => {
	courseContainer.innerHTML = "";
	filteredCourses = filterCourses("cse", courses);
	filteredCourses.forEach(course => {
		courseContainer.innerHTML += course.render();
	});
});

wddCoursesButton.addEventListener("click", () => {
	courseContainer.innerHTML = "";
	filteredCourses = filterCourses("wdd", courses);
	filteredCourses.forEach(course => {
		courseContainer.innerHTML += course.render();
	});
});
