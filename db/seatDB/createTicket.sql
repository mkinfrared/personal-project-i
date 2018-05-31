WITH reserve_ins AS (
	INSERT INTO demo_reservation
	(screening_id, reserved, paid, active)
	VALUES
		($1, TRUE, TRUE, FALSE)
	RETURNING id
), seat_res_ins AS (
	INSERT INTO demo_seat_reserved
	(seat_id, reservation_id, screening_id)
		SELECT
			unnest(ARRAY [$2]),
			id,
			$1
		FROM reserve_ins
		WHERE NOT EXISTS(SELECT id
										 FROM demo_seat_reserved
										 WHERE seat_id = ANY (ARRAY [$2]) AND screening_id = $1)
		LIMIT 1
	RETURNING seat_id AS reserved_seat, reservation_id)
SELECT
	seat.number,
	seat.row,
	seat.auditorium_id,
	a.name AS auditorium_name,
	scr.screening_start,
	m.title,
	reserved.reservation_id
FROM seat
	FULL OUTER JOIN seat_res_ins reserved ON seat.id = reserved.reserved_seat
	JOIN auditorium a ON seat.auditorium_id = a.id
	JOIN screening scr ON seat.auditorium_id = scr.auditorium_id
	JOIN movie m ON scr.movie_id = m.id
WHERE seat.id = ANY (SELECT reserved_seat
										 FROM seat_res_ins);