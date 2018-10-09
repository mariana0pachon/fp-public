const express = require('express');
const app = express();

// middleware to parse stuff
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// middleware to show that server is secure
const cors = require('cors');
app.use(cors());

const knex = require('knex');

// connection to database
const db = knex({
	client: 'pg',
	connection: {
		host : 'ec2-54-235-252-137.compute-1.amazonaws.com',
		user : 'bymtywrwitycyg',
		password : '24eedcd18e2e1fcc9b8616e89d9ec6c9a1c2e44bea6bfe6e62a558d4bb55d308',
		database : 'de4b8h0ha6mqqa',
		ssl: true
	}
});

db.select('*').from('songs');


// post request save a song in the database
app.post('/save', (req, res) => {
	const {name, drums, synth, bass} = req.body;

	db('songs').returning('*')
		.insert({
			name: name, 
			drums: drums,
			synth: synth, 
			bass: bass
		})
		.then(songs => {
			console.log(songs[0]);
			res.json(songs[0]);
		})
		// could be case where the song name already exists
		.catch(err => res.status(400).json(err))
})


// post request to load a song from the database
app.post('/load', (req, res) => {
	
	const {name} = req.body;

	db.select('*').from('songs')
		.where('name', '=', name)
		.then(data => {
			if (data.length < 1){res.json('no such song')}
			else res.json(data[0]);
		})
		.catch(err => res.status(400).json(err))
})


app.listen(3000, (res)=> {console.log("app running on port 3000")})
// app.listen(process.env.PORT || 3000, () => {
// 	console.log(`app running on port ${process.env.PORT}`);
// })