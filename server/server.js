require('dotenv').config();

const express       = require('express'),
	  bodyParser    = require('body-parser'),
	  massive       = require('massive'),
	  passport      = require('passport'),
	  session       = require('express-session'),
	  Auth0Strategy = require('passport-auth0');

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
	let db = app.get('db');
	console.log(profile);
	done(null, profile);
}));

passport.serializeUser((profile, done) => {
	done(null, profile);
});

passport.deserializeUser((profile, done) => {
	done(null, profile);
});

app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
	successRedirect: 'http://localhost:3000',
	failureRedirect: 'http:://localhost:3000/login'
}));

app.listen(SERVER_PORT, () => console.log(`Working on port ${SERVER_PORT}`));