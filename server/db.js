/*========== EXTERNAL MODULES ==========*/
const {Client} = require('pg');
require('dotenv').config();

/*========== INTERNAL MODULES ==========*/
const {USER, PASSWORD} = require('../.env');


const client = new Client({
  user: {USER},
  password: {PASSWORD}.
  database: 'products',
})

client.connect((err) => {
  if (err) throw err;
})


/*========== DATABASE ==========*/

CREATE TABLE IF NOT EXISTS products ('
  id              num PRIMARY KEY AUTO_INCRIMIENT NOT NULL, \
  name            varchar(20), \
  slogan          varchar(20), \
  description     varchar(150), \
  categorty       varchar(20), \
  default_price   varchar(10); \
');

CREATE TABLE IF NOT EXISTS features ('
  id              num PRIMARY KEY AUTO_INCRIMIENT NOT NULL, \
  product_id      varchar(20) FORIEGN KEY FROM products(id), \
  feature         varchar(20), \
  value           varchar(150); \
');

CREATE TABLE IF NOT EXISTS styles ('
  id              num PRIMARY KEY AUTO_INCRIMIENT NOT NULL, \
  product_id      varchar(20) FORIEGN KEY FROM products(id), \
  name            varchar(20), \
  original_price  varchar(10), \
  sale_price      varcahr(10), \
  default         boolean; \
');

CREATE TABLE IF NOT EXISTS photos ('
  photo_id        num PRIMARY KEY AUTO_INCRIMIENT NOT NULL, \
  style_id        varchar(20) FORIEGN KEY FROM styles(id), \
  thumbnail_url   varchar(100), \
  url             varchar(100); \
');

CREATE TABLE IF NOT EXISTS skus ('
  sku_id        num PRIMARY KEY AUTO_INCRIMIENT NOT NULL, \
  style_id      varchar(20) FORIEGN KEY FROM styles(id), \
  quantity      num, \
  size          varchar(5); \
');

/*========== DATABASE FUNCTIONS ==========*/



/*========== EXPORTS ==========*/