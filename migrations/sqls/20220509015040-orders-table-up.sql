/* Replace with your SQL commands */

/*CREATE ORDERS TABLE*/
CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    status VARCHAR(50) NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL
);