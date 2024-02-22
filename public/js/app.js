const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const locationDiplay = document.querySelector('#locationDisplay');
const windDisplay = document.querySelector('#windDisplay');
const errorDisplay = document.querySelector('#errorDisplay');

const iconDisplay = document.getElementById('iconDisplay');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	locationDisplay.textContent = 'Searching...';

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				errorDisplay.textContent = data.error;
			} else {
				locationDiplay.textContent = `In ${data.location}, it is currently ${data.forecastData.description}. 
					The temperature is ${data.forecastData.currentTemp}° F, and it feels like ${data.forecastData.feelsLike}° F`;

				windDisplay.textContent = `The wind is currently ${data.forecastData.windSpeed}mph, 
					coming from ${data.forecastData.windDirection}`;

				iconDisplay.src = data.forecastData.icon;
			}
		});
	});
});
