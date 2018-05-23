require('dotenv').config();

const express       = require('express'),
	  bodyParser    = require('body-parser'),
	  massive       = require('massive'),
	  passport      = require('passport'),
	  session       = require('express-session'),
	  Auth0Strategy = require('passport-auth0'),
	  mc            = require('./controllers/moviesController/moviesControllers');

const {
		  CONNECTION_STRING,
		  SERVER_PORT,
		  SESSION_SECRET,
		  DOMAIN,
		  CLIENT_ID,
		  CLIENT_SECRET,
		  CALLBACK_URL
	  } = process.env;

const app = express();

app.use(bodyParser.json());

// CONNECTING DATABASE
massive(CONNECTION_STRING)
	.then((db) => {
		console.log('SUCCESSFULLY CONNECTED TO THE DATABASE');
		app.set('db', db);
	})
	.catch((err) => console.error('FAILED TO CONNECT TO DATABASE', err));

app.use(session({
	secret           : SESSION_SECRET,
	resave           : false,
	saveUninitialized: true
}));

// SETTING UP AUTHORIZATION
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
	domain      : DOMAIN,
	clientID    : CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	callbackURL : CALLBACK_URL,
	scope       : 'openid profile email'
}, (accessToken, refreshToken, extraParams, profile, done) => {
	const db = app.get('db');

	const {sub, nickname, given_name, family_name, email, gender, picture} = profile._json;

	db.userDB.findUser([sub]).then((user) => {
		if (user[0]) {
			done(null, user[0].id);
		} else {
			db.userDB.addUser([sub, nickname, given_name, family_name, email, gender, picture])
			  .then((user) => {
				  done(null, user[0].id);
			  })
			  .catch((err) => console.error(err));
		}
	});
}));

passport.serializeUser((profile, done) => {
	done(null, profile);
});

passport.deserializeUser((profile, done) => {
	done(null, profile);
});

app.get('/login', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
	successRedirect: 'http://localhost:3000/#/',
	failureRedirect: 'http:://localhost:3000/login'
}));

app.get('/auth/me', (req, res) => {
	if (req.user) {
		res.status(200).send(req.user);
	} else {
		res.status(401).send('Nice try suckkkkaaa');
	}
});

// MOVIE CONTROLLERS

app.post('/api/movie/add_movie', mc.addMovie);
app.put('/api/movie/update_movie', mc.updateMovie);
app.delete('/api/movie/delete_movie', mc.deleteMovie);
app.get('/api/movie/:movie_id', mc.getMovie);
app.get('/api/movies', mc.getAllMovies);

app.listen(SERVER_PORT, () => console.log(`Working on port ${SERVER_PORT}`));