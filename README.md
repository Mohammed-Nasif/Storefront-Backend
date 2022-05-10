# Udacity - Storefront Backend

**Version 1.0.0**

This project aims to Build a Storefront Backend With the use of the following libraries [TypeScript, Postgres Database, Node/ExpressJS, dotenv, Jasmine Unit Test, Supertest, bcrypt for hashing Password, db-migrate, jsonwebtoken].This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

---

## Table of Contents

- [Project Title](#Udacity-|-Storefront-Backend)

- [Instructions](#instructions)

- [Table of contents](#table-of-contents)

- [Installation](#installation)

- [Usage](#usage)

- [Development](#development)

- [Contribute](#contribute)

- [License](#License-&-Copyright)

---

## Instructions

[(Back to top)](#table-of-contents)

### Database Setup

**in your CMD run the Following:**

- psql -U postgres
- CREATE USER nasif_udacity WITH PASSWORD 'nasif123';
- [Create Main DB] CREATE DATABASE nasif_store;
- [Create Test DB] CREATE DATABASE nasif_store_test;
- GRANT ALL PRIVILEGES ON DATABASE nasif_store TO nasif_udacity;
- GRANT ALL PRIVILEGES ON DATABASE nasif_store_test TO nasif_udacity;

**Ports:**
The Database running Port: 5432
The Store Backend running Port: 3020

---

## Installation

[(Back to top)](#table-of-contents)

You can Install this project to your PC using clone the repo to your github account then Download It as a ZIP File to your PC.

or Clone it using GIT `git clone` if you access it from GITHUB.

---

# Usage

[(Back to top)](#table-of-contents)

- After The Installation you can now use the project files by UnZip the file and open it on any Code Text Editor (VS Code).

- You Must First install packages (dependencies): open Project-File in terminal and npm i.

- Then npm run start to start the server.

---

# Development

[(Back to top)](#table-of-contents)

### The Project Contains :

#### build

#### migrations

#### node_modules (Or .gitignore.txt)

#### spec

#### src

#### .env (deleted on GITHUB)

#### database.json

#### package.json

#### package-lock.json

#### README.md

#### REQUIREMENTS.md

#### tsconfig.json

##### Each file contains it's modifications and comment above each step of modify.

#### Don't make any modifications on Package.json or node_modules Folder.

### Scripts

- Install The Pacakges if node_module File not attached: `npm i`
- Run unit tests with Jasmine: `npm run test-Win` for Windows or `npm run test-Mac` for Mac
- Start server: `npm run start`

### create .env file (IF you Access This Project From GITHUB):

• PORT=3020
• ENV=dev
• POSTGRES_HOST=localhost
• POSTGRES_PORT=DB_Port
• POSTGRES_DB=DB_Name
• POSTGRES_DB_TEST=Test_DB_Name
• POSTGRES_USER=yourUN
• POSTGRES_PASSWORD=yourPass
• BCRYPT_PASSWORD = user-secret-password
• SALT_ROUND=10
• TOKEN_SECRET=user-secret-token

# Contribute

[(Back to top)](#table-of-contents)

**- Udacity**

**- EgFwd**

---

# License & Copyright

[(Back to top)](#table-of-contents)

**© Udacity And Mohammed Nasif.**
