CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO users (name,email)
VALUES ('Dang', 'dang@test.com')