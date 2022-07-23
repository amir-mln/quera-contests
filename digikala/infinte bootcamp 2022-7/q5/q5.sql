-- Section1
   CREATE INDEX users_name_idx ON  users (name);
-- Section2
   CREATE INDEX products_price_categ_idx ON products (price, category_id);