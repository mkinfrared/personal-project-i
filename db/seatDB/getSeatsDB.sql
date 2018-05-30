SELECT
	scr.id              AS screening_id,
	scr.auditorium_id   AS auditorium_id,
	scr.movie_id        AS movie_id,
	scr.screening_start AS screening_start,
	s.id                AS seat_id,
	s.row               AS row_number,
	s.number            AS seat_number,
	reserved.seat_id    AS reserved_seat_id
FROM screening scr
	FULL OUTER JOIN seat s
		ON scr.auditorium_id = s.auditorium_id
	FULL OUTER JOIN seat_reserved reserved
		ON scr.id = reserved.screening_id
WHERE scr.id = $1;