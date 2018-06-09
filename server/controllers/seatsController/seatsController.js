module.exports = {
	getSeats: (req, res, next) => {
		const db = req.app.get('db');

		const {screening_id} = req.params;

		db.seatDB.getSeatsDB([screening_id])
		  .then((resp) => {
			  if (resp.length) {
				  res.status(200).send(resp);
			  } else {
				  res.status(404).send('Nothing found');
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	},

	buyTickets: (req, res, next) => {
		const db = req.app.get('db');

		const {screening_id} = req.params,
			  {seatsWanted}  = req.body;

		db.seatDB.createTicket([screening_id, seatsWanted])
		  .then((resp) => {
			  if (resp.length) {
				  res.status(200).send(resp);
			  } else {
				  res.status(401).send('Sorry the ticket(s) you requested no longer available');
			  }
		  })
		  .catch((err) => {
			  res.status(500).send(err);
			  console.error(err);
		  });
	},

	getTicketInfo: (req, res, next) => {
		const db = req.app.get('db');

		const {reservation_id} = req.params;

		db.seatDB.getTicket([reservation_id])
		  .then((ticket) => res.status(200).send(ticket))
		  .catch((err) => res.status(500).send(err));
	}
};