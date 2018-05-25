module.exports = {
	getAuditoriums: (req, res, next) => {
		const db = req.app.get('db');

		db.auditoriumDB.findAuditoriums()
		  .then((auditoriums) => {
			  if (auditoriums.length) {
				  res.status(200).send(auditoriums);
			  } else {
				  res.status(404).send(auditoriums);
			  }
		  })
		  .catch((err) => res.status(500).send(err));
	}
};