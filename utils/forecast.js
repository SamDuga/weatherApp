const pRequest = require('postman-request');

const forecast = (lat, long, callback) => {
	const weatherstackUrl = `http://api.weatherstack.com/current?access_key=a1e8f3141694f15d23bb6601103463eb&query=${lat},${long}&units=f`;

	pRequest(
		{
			url: weatherstackUrl,
			json: true,
		},
		(err, resp) => {
			if (err) {
				callback('Unable to connect to weather service!', undefined);
			} else if (resp.body.error) {
				callback('Unable to find location', undefined);
			} else {
				callback(undefined, {
					description: resp.body.current.weather_descriptions[0],
					currentTemp: resp.body.current.temperature,
					feelsLike: resp.body.current.feelslike,
				});
			}
		},
	);
};

module.exports = forecast;
