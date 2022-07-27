/*========== EXTERNAL MODULES ==========*/
const {Pool} = require('pg');
require('dotenv').config();

/*========== INTERNAL MODULES ==========*/


const {USER, PASSWORD, DATABASE, HOST} = process.env;


/*========== DATABASE CONNECTION ==========*/
const pool = new Pool({
  user: {USER},
  password: {PASSWORD},
  host: {HOST},
  database: {DATABASE},
})

pool.connect((err) => {
  if (err) {
    console.error(`Unable to connect due to ERROR: ${err}`);
  }
  console.log('Postgres is connected!');
})


/*========== DATABASE ==========*/

CREATE TABLE IF NOT EXISTS products ('
  id              SERIAL PRIMARY KEY, \
  product_name    VARCHAR(20), \
  slogan          VARCHAR(20), \
  description     VARCHAR(150), \
  categorty       VARCHAR(20), \
  default_price   VARCHAR(10); \
');

CREATE TABLE IF NOT EXISTS features ('
  id              SERIAL PRIMARY KEY, \
  product_id      VARCAHR(20) REFERENCES products (id), \
  feature         VARCAHR(20), \
  value           VARCAHR(150); \
');

CREATE TABLE IF NOT EXISTS styles ('
  id              SERIAL PRIMARY KEY, \
  product_id      VARCAHR(20) REFERENCES products (id), \
  style_name      VARCAHR(20), \
  original_price  VARCAHR(10), \
  sale_price      VARCAHR(10), \
  default         BOOLEAN; \
');

CREATE TABLE IF NOT EXISTS photos ('
  photo_id        SERIAL PRIMARY KEY, \
  style_id        VARCHAR(20) REFERENCES styles, \
  thumbnail_url   VARCHAR(100), \
  url             VARCHAR(100); \
');

CREATE TABLE IF NOT EXISTS skus ('
  sku_id        SERIAL PRIMARY KEY, \
  style_id      VARCHAR(20) REFERENCES styles, \
  quantity      INTEGER, \
  size          VARCHAR(5); \
');

/*========== DATABASE METHODS ==========*/
const retrieve = () => {

}

const

/*========== EXPORTS ==========*/
module.exports = {

}