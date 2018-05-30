SELECT
	seat.number,
	seat.row,
	a.name,
	scr.screening_start,
	m.title,
	sr.reservation_id
FROM seat
	JOIN auditorium a ON seat.auditorium_id = a.id
	JOIN screening scr ON seat.auditorium_id = scr.auditorium_id
	JOIN movie m ON scr.movie_id = m.id
	JOIN seat_reserved sr on seat.id = sr.seat_id
	WHERE sr.reservation_id = $1;