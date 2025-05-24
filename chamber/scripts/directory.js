// Member List
async function renderMemberList() {
    const memberList = document.querySelector("#member-list");
    const template = document.querySelector("#member-template");
    const memberData = await getMemberData();

    memberList.innerHTML = "";

    memberData.forEach(member => {
        const clone = document.importNode(template.content, true);
        const memberName = clone.querySelector(".member-name");
        const memberImage = clone.querySelector(".member-image");
        const memberImageMedium = clone.querySelector(".member-image-medium");
        const memberImageLarge = clone.querySelector(".member-image-large");
        const memberEmail = clone.querySelector(".member-email");
        const memberPhone = clone.querySelector(".member-phone");
        const memberUrl = clone.querySelector(".member-url");
        const memberAddress = clone.querySelector(".member-address");
        const memberLevel = clone.querySelector(".member-level");

        memberName.textContent = member.name;
        memberImage.src = `images/${member.image}_medium.webp`;
        memberImage.alt = member.name;
        memberImageMedium.srcset = `images/${member.image}_medium.webp`;
        memberImageLarge.srcset = `images/${member.image}_large.webp`;
        memberEmail.href = `mailto:${member.email}`;
        memberEmail.textContent = member.email;
        memberPhone.href = `tel:${member.phone}`;
        memberPhone.textContent = member.phone;
        memberUrl.textContent = member.website;
        memberUrl.href = member.website;
        memberAddress.textContent = member.address;
        memberLevel.textContent = `${member.membership_level} Member`;

        memberList.appendChild(clone);
    });
}

async function getMemberData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
}

renderMemberList();

// Grid/List
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

gridButton.addEventListener("click", () => {
    switchView("grid");
});

listButton.addEventListener("click", () => {
    switchView("list");
});

function switchView(view) {
    const memberList = document.querySelector("#member-list");
    const button = document.querySelector(`#${view}-button`);
    const otherButton = document.querySelector(`#${view === "grid" ? "list" : "grid"}-button`);
    const memberImage = document.querySelectorAll(".member-image");
    button.classList.add("active");
    otherButton.classList.remove("active");
    if (view === "grid") {
        memberList.classList.remove("list-view");
        memberList.classList.add("grid-view");
        memberImage.forEach(image => {
            image.setAttribute("width", "567");
        });
    } else if (view === "list") {
        memberList.classList.remove("grid-view");
        memberList.classList.add("list-view");
    }
    localStorage.setItem("view", view);
}

const view = localStorage.getItem("view") || "grid";

switchView(view);
