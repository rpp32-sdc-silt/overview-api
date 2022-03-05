CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  slogan VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  default_price NUMERIC NOT NULL
);

COPY product(id, name, slogan, description, category, default_price)
FROM '/mnt/c/Users/mende/Downloads/product.csv'
CSV HEADER;

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT,
  feature VARCHAR(40) NOT NULL,
  value VARCHAR(40),
  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
      REFERENCES product(id)
);

COPY features(id, product_id, feature, value)
FROM '/mnt/c/Users/mende/Downloads/features.csv'
NULL 'null'
CSV HEADER;

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  productId INT,
  name VARCHAR(40) NOT NULL,
  sale_price NUMERIC,
  original_price NUMERIC NOT NULL,
  default_style SMALLINT,
  CONSTRAINT fk_product
    FOREIGN KEY (productId)
      REFERENCES product(id)
);

COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/mnt/c/Users/mende/Downloads/styles.csv'
NULL 'null'
CSV HEADER;

ALTER TABLE styles ALTER COLUMN default_style DROP DEFAULT;
ALTER TABLE styles ALTER default_style TYPE bool USING CASE WHEN default_style=0 THEN FALSE ELSE TRUE END;
ALTER TABLE styles ALTER COLUMN default_style SET DEFAULT FALSE;


CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INT,
  size VARCHAR(20),
  quantity SMALLINT,
  CONSTRAINT fk_styles
    FOREIGN KEY (styleId)
      REFERENCES styles(id)
);

COPY skus(id, styleId, size, quantity)
FROM '/mnt/c/Users/mende/Downloads/skus.csv'
NULL 'null'
CSV HEADER;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleId INT,
  thumbnail_url VARCHAR(500),
  url VARCHAR(500),
  CONSTRAINT fk_styles
    FOREIGN KEY (styleId)
      REFERENCES styles(id)
);

-- COPY photos(id, styleId, thumbnail_url, url)
-- FROM '/mnt/c/Users/mende/Downloads/photos.csv'
-- QUOTE E'\b'
-- NULL 'null'
-- CSV HEADER;

COPY photos(id, styleId, thumbnail_url, url)
FROM '/mnt/c/Users/mende/Downloads/photosCleaned.csv'
NULL 'null'
CSV HEADER;

-- Performance Optimization - indexing
CREATE INDEX features_product_id_index on features (product_id);
CREATE INDEX styles_product_id_index on styles (productId);
CREATE INDEX skus_style_id_index on skus (styleId);
CREATE INDEX photos_style_id_index on photos (styleId);