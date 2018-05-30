SELECT *
FROM seat_reserved
WHERE seat_id = ANY (ARRAY [$1]);