// Spotlight
async function renderSpotlights() {
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
    const members = await response.json();
    const spotlights = members.filter(member => member.membership_level == "Gold" || member.membership_level == "Silver");
    const randomMembers = spotlights.sort(() => 0.5 - Math.random());
    return randomMembers.slice(0, 3);
}

renderSpotlights();
