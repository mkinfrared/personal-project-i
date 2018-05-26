WITH previous_screening AS (
    SELECT * FROM demo_movies m
    JOIN demo_screenings s
    ON m.id = s.movie_id
    WHERE start_time <= 'May 26, 2018 9:30pm'
    ORDER BY start_time DESC
    LIMIT 1
), next_screening AS (
    SELECT * FROM demo_movies m
    JOIN demo_screenings s
    ON m.id = s.movie_id
    WHERE start_time >= 'May 26, 2018 9:30pm'
    ORDER BY start_time DESC
    LIMIT 1
)
SELECT
p.start_time AS prev_start,
n.start_time AS next_start
FROM previous_screening p
FULL OUTER JOIN next_screening n
ON  p.aud_id = n.aud_id;
-- SELECT start_time + (duration + 30) * INTERVAL '1 minute' FROM previous_screening;