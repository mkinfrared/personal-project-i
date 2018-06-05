SELECT
scr.id,
m.id AS movie_id,
m.title,
m.poster_pic,
scr.screening_start,
a.name,
a.id AS aud_id
FROM screening scr
JOIN movie m ON scr.movie_id = m.id
JOIN auditorium a on scr.auditorium_id = a.id
ORDER BY screening_start ASC;
