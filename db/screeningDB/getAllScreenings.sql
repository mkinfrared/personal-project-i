SELECT
scr.id,
m.title,
scr.screening_start,
a.name
FROM screening scr
JOIN movie m ON scr.movie_id = m.id
JOIN auditorium a on scr.auditorium_id = a.id
ORDER BY screening_start ASC;
