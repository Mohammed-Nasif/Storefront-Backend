/* Replace with your SQL commands */

/*CREATE USERS TABLE*/
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(100) NOT NULL, 
    password VARCHAR(150) NOT NULL
);