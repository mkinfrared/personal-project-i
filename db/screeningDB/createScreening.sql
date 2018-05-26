INSERT INTO screening
(movie_id, auditorium_id, screening_start)
VALUES ($1, $2, $3)
RETURNING *;

-- SELECT * from screening s join movie m ON s.movie_id = m.id
-- WHERE
-- INSERT INTO screening
-- (movie_id, auditorium_id, screening_start)
-- VALUES ($1, $2, $3)
-- RETURNING *;
