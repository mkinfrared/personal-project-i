module.exports = {

	addMovie: (req, res, next) => {
		const db = req.app.get('db');

		console.log(req.body);

		let {
				title, director, actors: actors, writer, studio,
				description, duration_min, genre, mpaa,
				tagline, release_date, imdb_rating,
				poster_pic, banner_pic
			} = req.body;

		duration_min = parseInt(duration_min);

		db.movieDB.addMovieToDB([title, director, actors, writer, studio,
								 description, duration_min, genre, mpaa,
								 tagline, release_date, imdb_rating,
								 poster_pic, banner_pic])
		  .then((movie) => res.status(200).send(movie))
		  .catch((err) => res.status(500).send(err));
	},

	updateMovie: (req, res, next) => {
		const db = req.app.get('db');

		let {
				id, title, director, actors, writer, studio,
				description, duration_min, genre, mpaa,
				tagline, release_date, imdb_rating,
				poster_pic, banner_pic, on_screen
			} = req.body;

		duration_min = parseInt(duration_min);

		db.movieDB.updateMovieInfo([id, title, director, actors, writer, studio,
									description, duration_min, genre, mpaa,
									tagline, release_date, imdb_rating,
									poster_pic, banner_pic, on_screen])
		  .then((movie) => {
			  if (movie.length) {
				  res.status(200).send(movie);
			  } else {
				  res.status(404).send('Movie not found');
			  }
		  })
		  .catch((err) => {
			  res.status(500).send(err);
			  console.error(err);
		  });
	},

	deleteMovie: (req, res, next) => {
		const db = req.app.get('db');

		const {id} = req.body;

		db.movieDB.deleteMovieFromDB([id])
		  .then((movie) => {
			  if (movie.length) {
				  res.status(200).send(movie)
			  } else {
				  res.status(404).send('Movie not found');
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	},

	getMovie: (req, res, next) => {
		const db = req.app.get('db');

		const {movie_id} = req.params;

		db.movieDB.findMovie([movie_id])
		  .then((movie) => {
			  if (movie.length) {
				  res.status(200).send(movie);
			  } else {
				  res.status(404).send('Movie not found');
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	},

	getAllMovies: (req, res, next) => {
		const db = req.app.get('db');

		db.movieDB.findAllMovies()
		  .then((movieList) => {
			  if (movieList.length) {
				  res.status(200).send(movieList);
			  } else {
				  res.status(404).send('Nothing found');
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	},

	getMoviesOnScreen: (req, res, next) => {
		const db = req.app.get('db');

		db.movieDB.moviesOnScreen()
		  .then((movieList) => {
			  if (movieList.length) {
				  res.status(200).send(movieList);
			  } else {
				  res.status(404).send('Nothing found');
			  }
		  })
		  .catch((err) => {
			  console.log(err);
			  res.status(500).send(err);
		  });
	}
};