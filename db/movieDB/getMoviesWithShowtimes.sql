SELECT
	m.id,
	m.title,
	m.director,
	m.actors,
	m.writer,
	m.studio,
	m.description,
	m.duration_min,
	m.genre,
	m.mpaa,
	m.tagline,
	m.release_date,
	m.imdb_rating,
	m.poster_pic,
	m.banner_pic,
	m.on_screen
FROM screening s
	RIGHT JOIN movie m
		ON m.id = s.movie_id
WHERE current_timestamp - s.screening_start < '20 minute';