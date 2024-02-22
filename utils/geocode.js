const pRequest = require('postman-request');

const geocode = (address, callback) => {
	const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address,
	)}.json?access_token=pk.eyJ1Ijoic2FtLWR1Z2EiLCJhIjoiY2xzdDlyYnNjMG0weTJwbG9idjhhOGVmeCJ9.nG5DIC93mtvIEVyO1VtmuQ&limit=1`;

	pRequest(
		{
			url: mapboxUrl,
			json: true,
		},
		(error, response) => {
			if (error) {
				console.log(error);
				callback('Unable to connect to geocoding service!', undefined);
			} else if (response.body.features.length === 0) {
				callback(
					'No results returned for location. Try a different search term.',
					undefined,
				);
			} else {
				callback(undefined, {
					lat: response.body.features[0].center[1],
					long: response.body.features[0].center[0],
					name: response.body.features[0].place_name,
				});
			}
		},
	);
};

module.exports = geocode;
