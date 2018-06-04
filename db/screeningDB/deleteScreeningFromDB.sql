DELETE FROM screening s
WHERE id = $1
RETURNING *;