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
