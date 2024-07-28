const weatherForm = document.getElementById('weatherForm');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputCity = document.getElementById('weatherInput').value;
    const API_KEY = '139d2b11ede1118bf85eb26f7da5b185';
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&APPID=${API_KEY}`;

    fetch(URL)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const city = document.getElementById('city');
            const icon = document.getElementById('icon');
            const iconCode = data.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
            icon.src = iconURL;
            city.innerHTML = `<span>Город: </span>${data.name}`;
            const temperature = document.getElementById('temperature');
            temperature.innerText = `${parseInt(data.main.temp)}°C`;
            const description = document.getElementById('description');
            description.innerText = data.weather[0].description;
            const pressure = document.getElementById('pressure');
            pressure.innerHTML = `<span>Давление: </span>${data.main.pressure}hPa`;
            const humidity = document.getElementById('humidity');
            humidity.innerHTML = `<span>Влажность: </span>${data.main.humidity}%`;
            const windSpeed = document.getElementById('speed');
            windSpeed.innerHTML = `<span>Скорость ветра: </span>${data.wind.speed}м/с`;
            const windDeg = document.getElementById('deg');
            windDeg.innerHTML = `<span>Направление ветра: </span>${data.wind.deg}°`;

            document.getElementById('infoMain').style.display = "flex";
        })
        .catch(error => {
            alert(`Не удалось получить данные. Убедитесь, что город был введен корректно.`);
            console.error(error);
        });
})

const moreBtn = document.getElementById('more');
let moreBtnText = "Дополнительно";
moreBtn.innerText = moreBtnText;

moreBtn.addEventListener('click', () => {
    const infoAdditional = document.getElementById('infoAdditional');
    infoAdditional.classList.toggle('shown');
    moreBtn.innerText === moreBtnText ? moreBtn.innerText = "Скрыть" : moreBtn.innerText = moreBtnText;
})