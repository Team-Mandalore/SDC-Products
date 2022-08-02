/*========== DATABASE ==========*/

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE IF NOT EXISTS products (
  id                   SERIAL PRIMARY KEY,
  product_name         VARCHAR(100),
  slogan               TEXT,
  product_description  TEXT,
  category             VARCHAR(20),
  default_price        VARCHAR(10)
);

COPY products
FROM '/home/sbirvin1s/hackreactor/SDC-Products/product.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS features (
  id                   SERIAL PRIMARY KEY,
  product_id           SERIAL REFERENCES products (id),
  feature              VARCHAR(100),
  value                VARCHAR(150)
);

COPY features
FROM '/home/sbirvin1s/hackreactor/SDC-Products/features.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS styles (
  id                   SERIAL PRIMARY KEY,
  product_id           SERIAL REFERENCES products (id),
  name                 VARCHAR(50),
  original_price       VARCHAR(10),
  sale_price           VARCHAR(10),
  "default?"           BOOLEAN
);

COPY styles
FROM '/home/sbirvin1s/hackreactor/SDC-Products/styles.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS photos (
  photo_id             SERIAL PRIMARY KEY,
  style_id             SERIAL REFERENCES styles (id),
  thumbnail_url        TEXT,
  photo_url            TEXT
);

COPY photos
FROM '/home/sbirvin1s/hackreactor/SDC-Products/photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS skus (
  sku_id               SERIAL PRIMARY KEY,
  style_id             SERIAL REFERENCES styles (id),
  size                 VARCHAR(10),
  quantity             INTEGER
);

COPY skus
FROM '/home/sbirvin1s/hackreactor/SDC-Products/skus.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX IF NOT EXISTS features_products ON features (product_id);
CREATE INDEX IF NOT EXISTS styles_products ON styles (product_id);
CREATE INDEX IF NOT EXISTS photos_styles ON photos (style_id);
CREATE INDEX IF NOT EXISTS skus_styles ON skus (style_id);