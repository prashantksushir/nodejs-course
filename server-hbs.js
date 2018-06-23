// you can start nodemon with -e flag : which will watch the changes made to file extentions provided in command
// ex nodemon server-hbs.js -e js,hbs // this means watch the changes made to js file as well as hbs files

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// this will help to use common code in different html files
hbs.registerPartials(__dirname + '/views/partials');

// configuring express to use hbs to render html pages
app.set('view engine', 'hbs');

// express middleware
// this will intercept the existing functinality and add something inbetween it
// the below middleware will intercept the request response and logs the request method
// and request url into server.log file
app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now} : ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n');
	next();
});

// this middleware can be used when your server is under maintainance and whenever anybody access
// your server user should get the message as server is under maintainance
app.use((request, response, next)=>{
	return response.render('maintainance.hbs');
});

// making files in public directory as static so I can access files in them as
// localhost:3000/help.html
app.use(express.static(__dirname + '/public'));;

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text)=>{
	return text.toUpperCase();
});

// register an handler using following
app.get('/', (request, response)=>{
	response.render('home.hbs', {
		pageTitle : 'Home Page',
		welcomeMessage : 'Welcome to my Website'
	});
});

app.get('/about', (request, response)=>{
	response.render('about.hbs', {
		pageTitle : 'About Page',
	});
});

app.get('/movies', (request, response)=>{
	response.send({
		bollywood : ['Meri Sulu', 'Dangal'],
		hollywood : ['Troy', 'Stranger Things']
	});
});

app.listen(3000, ()=>{
	console.log('Server is up on port 3000');
});