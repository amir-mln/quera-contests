-- Section1
  SELECT id FROM users WHERE phone LIKE '%1400%';
-- Section2
  SELECT id FROM trips
  WHERE DATE_PART('hour', started_at) IN (22, 23, 0, 1); 
-- Section3
  SELECT 
  	id,
	name,
	phone,
	trips_length::INTEGER
  FROM users JOIN (
	  SELECT user_id, SUM(
		  DATE_PART('day', finished_at - started_at) * 24 +
		  DATE_PART('hour', finished_at - started_at) +
		  DATE_PART('minute', finished_at - started_at) / 60 +
		  DATE_PART('milliseconds', finished_at - started_at) / 3600000
	  ) AS trips_length
	  FROM trips GROUP BY user_id 
  ) AS twl ON id = user_id
  ORDER BY trips_length DESC, id ASC;
-- Section4
    SELECT id, phone FROM users JOIN (
		SELECT inviter_user_id FROM (
			SELECT 
				inviter_user_id,
				CONCAT( 
					DATE_PART('year', invited_at),
					'-',
					DATE_PART('month', invited_at)
				) AS month_index
			FROM invitations
			GROUP BY inviter_user_id, month_index
			HAVING COUNT(invitee_user_id) >= 3
		) AS with_3_invitee
		GROUP BY inviter_user_id
		HAVING COUNT(*) >= 3
	) AS with_3_months ON id = inviter_user_id;