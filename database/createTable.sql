CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  slogan VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  default_price INTEGER NOT NULL
);