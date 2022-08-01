/*========== EXTERNAL MODULES ==========*/
const {Pool} = require('pg');
require('dotenv').config();

/*========== INTERNAL MODULES ==========*/


/*========== DATABASE CONNECTION ==========*/
const {DB_USER, DB_PASS, DATABASE, HOST} = process.env;
const pool = new Pool({
  user: DB_USER,
  host: HOST,
  password: DB_PASS,
  database: DATABASE,
})

pool.connect()
.then(res => console.log('Postgres is connected!'))
.catch(err => console.error(`Unable to connect due to ${err}`))

/*========== DATABASE METHODS ==========*/
const retrieveProducts = (page = 1, count = 5) => {
  let offset = page - 1;
  if (offset < 0) {
    offset = 0;
  } else if (offset > 0) {
    offset = offset * count;
  }

  return pool.query('SELECT * FROM products OFFSET ($1) ROWS LIMIT ($2)', [offset, count])
  .then(res => res.rows)
  .catch(err => `Unable to retrieve the product due to ${err}`)
}

const retrieveProductInfo = (id) => {
  let product = {};
  /* return pool.query(
    'SELECT row_to_json(prod) AS product FROM (
      SELECT *, (
        SELECT json_agg(features) FROM (
          SELECT feature, feature_value AS value FROM features WHERE product_id=p.id
        ) features
      ) AS features FROM products p
    ) prod WHERE id=($1)', [id]
  ) */

  // .then(res => res.rows[0])
  return pool.query('SELECT * FROM products WHERE id=($1)', [id])
  .then(res => product = res.rows[0])
  .then(() => pool.query('SELECT feature, feature_value as value FROM features WHERE product_id=($1)', [id]))
  .then(res => {
      product.features = res.rows;
      return product;
    })
  .catch(err => `Unable to retrieve the product due to ${err}`);
}

const retrieveProductStyles = (id) => {
  let product = {};
  return pool.query('SELECT row_to_json(prod) AS product FROM ( \
    SELECT id AS product_id, ( \
      SELECT json_agg(styles) FROM ( \
        SELECT id AS style_id, name, original_price, "default?", ( \
          SELECT json_agg(photos) FROM ( \
            SELECT thumbnail_url, photo_url AS url FROM photos WHERE style_id = s.id \
          ) photos \
        ) AS photos, ( \
            SELECT json_object_agg(sku_id, ( \
              SELECT row_to_json(sku_info) FROM ( \
                SELECT quantity, size WHERE style_id = s.id \
              ) sku_info \
            )) sku_id FROM skus WHERE style_id = s.id\
        ) AS skus FROM styles s WHERE s.id = product_id \
      ) styles \
    ) AS results FROM products p \
  ) prod WHERE product_id=($1)', [id])
  .then((res) => product = res.rows[0].product)
  .catch(err => `Unable to retrieve the product due to ${err}`);
}

/*========== EXPORTS ==========*/
module.exports = {
  retrieveProducts,
  retrieveProductInfo,
  retrieveProductStyles,
}