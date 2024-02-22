const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// handlebars setup
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// use static
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, resp) => {
	resp.render('index', {
		title: 'Index',
		banner: 'Home',
		nav: 'nav',
	});
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
