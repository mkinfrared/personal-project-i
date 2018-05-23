INSERT INTO users
(id, username, first_name, last_name, email, gender, picture)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;