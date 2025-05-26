// Weather Data
const API_KEY = "6e8cf7352a6562e08a1198dd0970805f";
const LATITUDE = 10.722152;
const LONGITUDE = 122.982101;

async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const temp = data.main.temp;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherIcon = document.querySelector('#weather-icon');
    const weatherTemp = document.querySelector('#weather-temp');
    const weattherDescription = document.querySelector('#weather-description');

    weatherIcon.src = icon;
    weatherTemp.innerHTML = temp;
    weattherDescription.innerHTML = `${data.weather[0].main} ${data.weather[0].description}`;
}

// Weather Forecast
async function getWeatherForecast() {

    const today = new Date();
    const dates = [
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')} 00:00:00`,
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 2).padStart(2, '0')} 00:00:00`,
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 3).padStart(2, '0')} 00:00:00`,
    ];

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&include=daily&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    const forecastedData = data.list.filter(item => {
        if (dates.includes(`${item.dt_txt}`)) {
            return item;
        }
    });

    const forecastedTemp = forecastedData.map(fd => {
        const date = new Date(fd.dt_txt);
        const month = date.toLocaleString('default', {'month': 'short'});
        const day = date.getDate();
        const temp = fd.main.temp;

        return [`${month} ${day}`, temp];
    });

    const forecastedWeather = document.querySelector('#forecasted-weather');

    forecastedTemp.forEach(data => {

        const card = document.createElement('div');
        const temp = document.createElement('div');
        const day = document.createElement('div');

        temp.classList.add('forecasted-temp');
        day.classList.add('forecasted-day');

        temp.innerHTML = `${data[1]} <span class="fr_degree">&deg;C</span>`;
        day.textContent = data[0];

        card.appendChild(temp);
        card.appendChild(day);

        forecastedWeather.appendChild(card);
    });
}

getWeatherData();
getWeatherForecast();

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
