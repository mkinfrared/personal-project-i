SELECT *
FROM movie m
WHERE exists(SELECT id
						 FROM screening s
						 WHERE s.movie_id = m.id);