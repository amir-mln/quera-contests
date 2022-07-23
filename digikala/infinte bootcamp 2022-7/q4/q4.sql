-- Section1
    UPDATE products AS prs
    JOIN (
		SELECT product_id, SUM(price * quantity) AS correct_profit FROM order_details
        JOIN products ON products.id = product_id
        GROUP BY product_id
    ) AS cprs ON product_id = prs.id
    SET total_profit = correct_profit
    WHERE total_profit != correct_profit;
-- Section2
	SELECT delivery_center_id FROM deliveries
	WHERE delivered_at IS NOT NULL
    GROUP BY delivery_center_id
    ORDER BY AVG(timestampdiff(SECOND, received_at, delivered_at)) ASC
    LIMIT 5;
-- Section3
	SELECT od.product_id FROM products AS p
	JOIN order_details AS od ON od.product_id = p.id
	JOIN orders ON od.order_id = orders.id
	WHERE timestampdiff(DAY, p.created_at, orders.created_at) <= 7
	GROUP BY od.product_id
	HAVING COUNT(od.order_id) < 10;