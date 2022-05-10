/* Replace with your SQL commands */

/*CREATE ORDERED PRODUCTS TABLE*/
CREATE TABLE ordered_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL,
    order_id bigint REFERENCES orders(id) NOT NULL,
    product_id bigint REFERENCES products(id) NOT NULL
);