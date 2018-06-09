SELECT
	s.number,
	s.row,
	a.name,
	scr.screening_start,
	m.title,
	sr.reservation_id
FROM seat_reserved sr
	JOIN seat s ON sr.seat_id = s.id
	JOIN auditorium a ON s.auditorium_id = a.id
	JOIN screening scr ON sr.screening_id = scr.id
	JOIN movie m ON scr.movie_id = m.id
WHERE sr.reservation_id = $1;