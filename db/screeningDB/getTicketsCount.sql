WITH tickets AS (
		SELECT *
		FROM seat_reserved sr
			JOIN screening s
				ON sr.screening_id = s.id
			JOIN movie m
				ON m.id = s.movie_id
		WHERE (current_timestamp - s.screening_start) <= '1 week' AND (current_timestamp - s.screening_start) < '2 week'
)
SELECT
	title,
	count(*) AS total_tickets_sold
FROM tickets
GROUP BY title;