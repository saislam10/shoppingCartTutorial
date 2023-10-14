DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cart;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT,
    user_id INT,
    item_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(cart_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);