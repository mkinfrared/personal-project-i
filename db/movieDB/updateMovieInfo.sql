UPDATE movie
SET
	title        = $2,
	director     = $3,
	actors       = $4,
	writer       = $5,
	studio       = $6,
	description  = $7,
	duration_min = $8,
	genre        = $9,
	mpaa         = $10,
	tagline      = $11,
	release_date = $12,
	imdb_rating  = $13,
	poster_pic   = $14,
	banner_pic   = $15
WHERE id = $1
RETURNING *;