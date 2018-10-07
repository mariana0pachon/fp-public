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
		host:'127.0.0.1', 
		user: 'mariana0pachon', 
		password: '', 
		database: 'sequencer'
	}
})

db.select('*').from('songs');


// post request save a song in the database
app.post('/save', (req, res) => {
	const {title, drums, bass, synth} = req.body;

	db('songs').returning('*')
		.insert({
			title: title, 
			drums: drums,
			bass: bass, 
			synth: synth,
		})
		.then(song => {
			res.json(song[0])
		})
		// could be case where the song name already exists
		.catch(err => res.status(400).json(err))
})


// post request to load a song from the database
app.post('/load', (req, res) => {
	const {title} = req.body;

	db.select('*').from('songs')
		.where('title', '=', title)
		.then(data => {
			res.json(data);
		})
})



app.listen(process.env.PORT || 3000, () => {
	console.log(`app running on port ${process.env.PORT}`);
})