const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const port = process.env.PORT || 3000;

const app = express();

// handlebars setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// use static
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, resp) => {
	resp.render('index', {
		title: 'Weather',
		name: 'Sam Duga',
	});
});

app.get('/about', (req, resp) => {
	resp.render('about', {
		title: 'About',
		name: 'Sam Duga',
	});
});

app.get('/help', (req, resp) => {
	resp.render('help', {
		message: 'Welcome to the help page',
		title: 'Help',
		name: 'Sam Duga',
	});
});

app.get('/weather', (req, resp) => {
	if (!req.query.address) {
		return resp.send({
			error: 'No address provided',
		});
	}

	geocode(req.query.address, (err, { lat, long, name } = {}) => {
		if (err) {
			return resp.send({
				error,
			});
		}
		forecast(lat, long, (error, forecastData) => {
			if (error) {
				return resp.send({
					error,
				});
			}

			return resp.send({
				location: name,
				forecastData: forecastData,
				address: req.query.address,
			});
		});
	});
});

app.get('/products', (req, resp) => {
	if (!req.query.search) {
		return resp.send({
			error: 'No search term provided',
		});
	}

	resp.send({
		products: [],
	});
});

app.get('/help/*', (req, resp) => {
	resp.render('error', {
		title: '404',
		message: 'Help page not found',
		name: 'Sam Duga',
	});
});

app.get('*', (req, resp) => {
	resp.render('error', {
		title: '404',
		message: 'Page not found',
		name: 'Sam Duga',
	});
});

app.listen(port, () => {
	console.log('Server running on port 3000');
});
