# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: localhost:3020/products
- Show: localhost:3020/products/products/:id
- Create [token required]: localhost:3020/products

#### Users

- Index [token required]: localhost:3020/users
- Show [token required]: localhost:3020/users/:id
- Create N[token required]: localhost:3020/users

#### Orders

- Current Order by user (args: user id)[token required]:localhost:3020/orders

## Data Shapes

#### Product

    - id SERIAL PRIMARY KEY
    - name VARCHAR(255) NOT NULL
    - price integer NOT NULL

#### User

    - id SERIAL PRIMARY KEY
    - email VARCHAR(50) UNIQUE
    - first_name VARCHAR(50) NOT NULL
    - last_name VARCHAR(50) NOT NULL
    - username VARCHAR(100) NOT NULL
    - password VARCHAR(150) NOT NULL

#### Orders

    - id SERIAL PRIMARY KEY
    - status VARCHAR(50) NOT NULL
    - user_id bigint REFERENCES users(id) NOT NULL

#### Orders-Products

    - id SERIAL PRIMARY KEY
    - quantity integer NOT NULL
    - user_id bigint REFERENCES users(id) NOT NULL
    - order_id bigint REFERENCES orders(id) NOT NULL
    - product_id bigint REFERENCES products(id) NOT NULL
