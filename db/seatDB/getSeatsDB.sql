SELECT
	scr.id              AS screening_id,
	scr.auditorium_id   AS auditorium_id,
	a.name              AS auditorium_name,
	scr.movie_id        AS movie_id,
	m2.title            AS movie_title,
	scr.screening_start AS screening_start,
	s.id                AS seat_id,
	s.row               AS row_number,
	s.number            AS seat_number,
	sr.seat_id          AS reserved_seat_id,
	sr.screening_id     AS reserved_screening
FROM screening scr
	FULL OUTER JOIN seat s
		ON scr.auditorium_id = s.auditorium_id
	FULL OUTER JOIN seat_reserved sr
		ON s.id = sr.seat_id AND sr.screening_id = scr.id
	FULL OUTER JOIN auditorium a
		ON s.auditorium_id = a.id
	FULL OUTER JOIN movie m2
		ON scr.movie_id = m2.id
WHERE scr.id = $1;