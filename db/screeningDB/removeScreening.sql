DELETE FROM screening
WHERE screening_start - CURRENT_TIMESTAMP >  '20 minute'
RETURNING *;