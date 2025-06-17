document.addEventListener("DOMContentLoaded", () => {

    // Display Cards
    async function renderCards() {
        const container = document.querySelector("#card-container");
        const template = document.querySelector("#card-template");
        const data = await getDiscoverData();

        container.innerHTML = "";

        data.forEach((card, index) => {
            const clone = document.importNode(template.content, true);
            const title = clone.querySelector('.title');
            const image = clone.querySelector('.image');
            const imageLarge = clone.querySelector('.image-large');
            const address = clone.querySelector('.address');
            const description = clone.querySelector('.description');

            title.textContent = card.name;
            image.src = `./images/${card.image}`;
            image.alt = `${card.name} Image`;
            imageLarge.srcset = `./images/${card.image.replace(".webp", "_large.webp")}`;
            address.textContent = card.address;
            description.innerHTML = card.description;

            if (index <= 1) {
                image.fetchPriority = "high";
            }
            else {
                image.loading = "lazy";
            }

            container.appendChild(clone);
        });
    }

    async function getDiscoverData() {
        const response = await fetch("data/discover.json");
        const data = response.json();
        return data;
    }

    renderCards();

    // LOCAL STORAGE
    function getLastVisitTimestamp() {
        let lastVisitTimestamp = localStorage.getItem("last-visit-timestamp");
        if (lastVisitTimestamp == null) {
            lastVisitTimestamp = Date.now();
            localStorage.setItem("last-visit-timestamp", lastVisitTimestamp);
            lastVisitTimestamp = localStorage.getItem("last-visit-timestamp");
            return 0;
        }
        return lastVisitTimestamp;
    }

    function getDaysSinceLastVisit() {
        // Test
        // const currentTimestamp = Date.now() + (1000 * 3600 * 0);
        const currentTimestamp = Date.now();
        const lastVisitTimestamp = getLastVisitTimestamp();
        if (lastVisitTimestamp != 0) {
            const difference = currentTimestamp - lastVisitTimestamp;
            const days = difference / 1000 / 3600 / 24;
            return days;
        }
        return 0;
    }

    const days = getDaysSinceLastVisit();
    const alert = document.querySelector(".alert");
    const message = document.querySelector(".message");
    let messageText = "";

    if (days == 0) {
        messageText = "Welcome! Let us know if you have any questions.";
    }
    else if (days < 1) {
        messageText = "Back so soon! Awesome!";
    } else {
        messageText = `You last visited ${days.toFixed(0)} days ago.`;
    }

    message.innerHTML = messageText;
    alert.classList.add("show");

    function hideMessage() {
        alert.classList.remove("show");
    }

    document.querySelector(".close-message").addEventListener("click", () => {
        hideMessage();
    });
});
