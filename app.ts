import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';

let options = {
	key: fs.readFileSync(`${__dirname}/certs/dev.key`),
	cert: fs.readFileSync(`${__dirname}/certs/dev.crt`),
	requestCert: false,
	rejectUnauthorized: false
};

let app = express();

app.set('view engine', 'pug');

app.get('/favicon.ico', (req, res) => {
	res.sendStatus(200);
});

app.get('/', function (req, res) {
	res.render('index', { title: 'Home', message: 'Hello!' });
});

for (let char of 'abcdefghijklmnopqrstuvwxyz') {
	app.get('/' + char, function (req, res) {
		setTimeout(() => {
			res.redirect('/data_' + char);
		}, 1000);
	});
}

for (let char of 'abcdefghijklmnopqrstuvwxyz') {
	app.get('/data_' + char, function (req, res) {
		setTimeout(() => {
			res.redirect('/data2_' + char);
		}, 1000);
	});
}

for (let char of 'abcdefghijklmnopqrstuvwxyz') {
	app.get('/data2_' + char, function (req, res) {
		setTimeout(() => {
			res.send('Data!');
		}, 3000);
	});
}

https.createServer(options, app).listen(3000, () => {
	console.log('Listening on 3000.');
});