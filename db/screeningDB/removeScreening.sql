DELETE FROM screening
WHERE  CURRENT_TIMESTAMP - screening_start >  '20 minute'
RETURNING *;