-- Section1
SELECT id AS order_id FROM orders WHERE status = 'warehouse' ORDER BY id DESC;
-- Section2
SELECT customers.name AS customer_name, customers.id AS customer_id FROM customers
LEFT JOIN orders ON orders.customer_id = customers.id 
WHERE orders.customer_id IS NULL
ORDER BY customers.name ASC;
-- Section3
WITH good_customers_orders AS (
	SELECT orders.id AS order_id, customer_id, created_at, status  FROM customers
	JOIN orders ON orders.customer_id = customers.id 
	WHERE is_blocked != 1
)
SELECT 
	gco.created_at AS date, 
	FORMAT( 
			COUNT(gco.order_id) * 100 / 
			( 
				SELECT COUNT(order_id) FROM good_customers_orders 
				GROUP BY good_customers_orders.created_at
			)
	, 2)  AS cancellation_rate 
FROM good_customers_orders as gco
WHERE gco.status = 'canceled'
GROUP BY gco.created_at;