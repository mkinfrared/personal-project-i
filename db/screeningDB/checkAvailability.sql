WITH previous_screening AS (
    SELECT * FROM movie m
    JOIN screening s
    ON m.id = s.movie_id
    WHERE screening_start <= $1 AND auditorium_id = $2
    ORDER BY screening_start DESC
    LIMIT 1
), next_screening AS (
    SELECT * FROM movie m
    JOIN screening s
    ON m.id = s.movie_id
    WHERE screening_start >= $1 AND auditorium_id = $2
    ORDER BY screening_start DESC
    LIMIT 1
)
SELECT
p.screening_start AS prev_start,
p.duration_min AS prev_duration,
n.screening_start AS next_start
FROM previous_screening p
FULL OUTER JOIN next_screening n
ON  p.auditorium_id = n.auditorium_id;
-- SELECT start_time + (duration + 30) * INTERVAL '1 minute' FROM previous_screening;