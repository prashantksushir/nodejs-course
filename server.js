const express = require('express');

var app = express();

// register an handler using following
app.get('/', (request, response)=>{
	//response.send('Hello Express!');
	response.send({
		name : 'Prashant',
		age : 28,
		likes : [
			'Coding',
			'Watching Movies'
		]
	});
});

app.get('/about', (request, response)=>{
	response.send('About Page');
});

app.get('/movies', (request, response)=>{
	response.send({
		bollywood : ['Meri Sulu', 'Dangal'],
		hollywood : ['Troy', 'Stranger Things']
	});
});

app.listen(3000);