const learnMoreButtons = document.querySelectorAll(".learn-more-button");
const closeModalButtons = document.querySelectorAll(".close-modal-button");

learnMoreButtons.forEach(learnMoreButton => {
    learnMoreButton.addEventListener("click", () => {
        const level = learnMoreButton.dataset.id;
        showModal(level)
    });
});

closeModalButtons.forEach(closeModalButton => {
    closeModalButton.addEventListener("click", () => {
        const level = closeModalButton.dataset.modalId;
        hideModal(level);
    });
});

function showModal(level) {
    const modal = document.querySelector(`#${level}-level-modal`);
    modal.showModal();
}

function hideModal(level) {
    const modal = document.querySelector(`#${level}-level-modal`);
    modal.close();
}

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = Date.now();
}

function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function setTextContent(element, text) {
    if (element) {
        element.innerHTML = text;
    }
}

const fields = [
    "firstname",
    "lastname",
    "email",
    "phone",
    "business-name",
    "timestamp"
];

fields.forEach(field => {
    let text = getParam(field);
    if (field == "timestamp") {
        text = (new Date(Number(text))).toLocaleString();
    }
    setTextContent(document.querySelector(`#${field}`), text);
});
