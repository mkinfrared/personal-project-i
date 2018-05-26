UPDATE screening
SET
	movie_id        = $2,
	auditorium_id   = $3,
	screening_start = $4
WHERE id = $1;