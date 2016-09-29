var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')))

app.post('/', function(req, res, next){
	console.log(req);
	const err = new Error('something\'s busted');
	const cardType = req.body.command.replace('/','');
	const cardText = req.body.text
	if (!req) next(err);

	res.send('New ' + cardType + ' created: ' + '\"' + cardText + '\"').status(200);

})

app.use(function(err, req, res, next){
	if (err) res.send(err).status(404);
})




app.listen(process.env.PORT || 8080);
console.log("Server is listening. blargh.")