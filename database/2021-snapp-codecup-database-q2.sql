-- Section1
   ALTER TABLE orders ADD INDEX index1 (created_at);
-- Section2
   CREATE INDEX index2 ON orders (user_id);
-- Section3
