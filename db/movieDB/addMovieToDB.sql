INSERT INTO movie
(title, director, actors, writer, studio,
 description, duration_min, genre, mpaa,
 tagline, release_date, imdb_rating, poster_pic, banner_pic)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *;