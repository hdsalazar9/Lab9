//Héctor David Salazar Schz A01207471
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const express= require('express');
const app = express();
const mongoose = require('mongoose');
const blogsRouter = require('./blog-post-router');
//Mongoose for connect to a mongo DB
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./blog-post-config');
app.use(express.static('public'));

app.use('/blogposts/api', jsonParser, blogsRouter);

//Configuration of the setting for the server for the DB
let server;

function runServer(port, databaseUrl){
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl,
		err => {
			if(err)
				return reject(err);
			else {
				server = app.listen(port, () => {
					console.log("Your app is running in port " + port);
					resolve();
				})
				.on("error", err => {
					mongoose.disconnect();
					return reject(err);
				});
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve,reject) => {
				console.log("Closing the server");
				server.close(err => {
					if(err) {
						return reject(err);
					} else {
						resolve();
					}
				});
			});
		});
}

runServer(PORT,DATABASE_URL)
	.catch(err => console.log(err));

module.exports = {
  app,
  runServer,
  closeServer
};
