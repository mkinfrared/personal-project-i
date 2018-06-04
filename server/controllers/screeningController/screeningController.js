module.exports = {
	addScreening: (req, res, next) => {
		const db = req.app.get('db');

// TODO Check for array desctructuring

		let {movie_id, auditorium_id, screening_start, duration_min} = req.body;

		movie_id      = parseInt(movie_id);
		auditorium_id = parseInt(auditorium_id);
		duration_min  = parseInt(duration_min);

		db.screeningDB.checkAvailability([screening_start, auditorium_id])
		  .then((resp) => {
			  if (resp.length) {
				  let {prev_start, prev_duration, next_start} = resp[0];

				  (next_start) ? next_start : next_start = new Date('12/21/2599');

				  const screening_break = 19 * 60 * 1000;
				  const prev_end        = new Date(prev_start).getTime() + (prev_duration * 60 * 1000) + screening_break;
				  const curr_end        = new Date(screening_start).getTime() + (duration_min * 60 * 1000) + screening_break;

				  const a = prev_end < new Date(screening_start).getTime();
				  const b = curr_end < new Date(next_start).getTime();

				  if (a && b) {
					  db.screeningDB.createScreening([movie_id, auditorium_id, screening_start])
						.then((screening) => res.status(200).send(screening))
						.catch((err) => res.status(500).send(err));
				  } else {
					  res.status(403).send('TIMEFRAME IS ALREADY OCCUPIED. PLEASE CHOOSE ANOTHER TIME SLOT');
				  }
			  } else {
				  db.screeningDB.createScreening([movie_id, auditorium_id, screening_start])
					.then((screening) => res.status(200).send(screening))
					.catch((err) => res.status(500).send(err));
			  }
		  })
		  .catch((err) => {
			  res.status(500).send(err);
			  console.log(err);
		  });
	},

	deleteScreening: (req, res, next) => {
		const db   = req.app.get('db');
		const {id} = req.params;

		db.screeningDB.deleteScreeningFromDB([id])
		  .then((resp) => {
			  if (resp.length) {
				  res.status(200).send(resp);
			  } else {
				  res.status(404).send('Screening not found');
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	},

	updateScreening: (req, res, next) => {
		const db = req.app.get('db');

		const {id, movie_id, auditorium_id, screening_start} = req.body;

		db.screeningDB.checkAvailability(screening_start, auditorium_id)
		  .then((resp) => {
			  if (resp.length) {
				  const {prev_start, prev_duration, next_start} = resp[0];

				  const screening_break = 19 * 60 * 1000;
				  const prev_end        = new Date(prev_start) + (prev_duration * 60 * 1000) + screening_break;
				  const curr_end        = new Date(screening_start) + (duration_min * 60 * 1000) + screening_break;

				  const a = prev_end < screening_start;
				  const b = curr_end < next_start;

				  if (!resp.length || a && b) {
					  db.screeningDB.createScreening([id, movie_id, auditorium_id, screening_start])
						.then((screening) => res.status(200).send(screening))
						.catch((err) => res.status(500).send(err));
				  } else {
					  res.status(403).send('TIMEFRAME IS ALREADY OCCUPIED. PLEASE CHOOSE ANOTHER TIME SLOT');
				  }
			  } else {
				  db.screeningDB.createScreening([movie_id, auditorium_id, screening_start])
					.then((screening) => res.status(200).send(screening))
					.catch((err) => res.status(500).send(err));
			  }
		  })
		  .catch((err) => {
			  res.status(500).send(err);
			  console.log(err);
		  });
	},

	getScreenings: (req, res, next) => {
		const db = req.app.get('db');

		db.screeningDB.getAllScreenings()
		  .then((screeningsList) => res.status(200).send(screeningsList))
		  .catch((err) => res.status(500).send(err));
	},

	getScreening: (req, res, next) => {
		const db = req.app.get('db');

		db.screeningDB.getScreeningByID([id])
		  .then((screening) => {
			  if (screening.length) {
				  res.status(200).send(screening);
			  } else {
				  res.status(404).send('SCREENING NOT FOUND');
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	}
};