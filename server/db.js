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
  // returns the product id and a list of all its styles
  let product = {};
  return pool.query('SELECT id as product_id FROM products WHERE id=($1)', [id])
  .then(res => product = res.rows[0])
  .then(() => pool.query('SELECT id, style_name AS name, original_price, sale_price, "default?" FROM styles WHERE product_id=($1)', [id]))
  .then(res => product.results = res.rows)
  .then(() => pool.query('SELECT thumbnail_url, photo_url as url FROM photos WHERE style_id=($1)', [id]))
  .then(res => {
    product.results.photos = res.rows;
    return product;
  })
  // .then(() => pool.query('SELECT '))

  return pool.query('SELECT row_to_json(prod) AS product FROM ( \
    SELECT id AS product_id, ( \
      SELECT json_agg(styles) FROM ( \
        SELECT id AS style_id, style_name AS name, original_price, "default?", ( \
          SELECT json_agg(photos) FROM ( \
            SELECT thumbnail_url, photo_url AS url FROM photos WHERE style_id = s.id \
          ) photos \
        ) AS photos, ( \
          SELECT json_agg(skus) FROM ( \
            SELECT json_object_agg(sku_id, ( \
              SELECT json_agg(skus) FROM ( \
                SELECT quantity, size WHERE style_id = s.id \
              ) AS sku_quant \
            )) AS sku_info \
          ) skus \
        ) AS skus FROM styles s \
      ) AS results WHERE s.style_id = p.id \
    ) prod WHERE id=($1)', [id]
  )


  SELECT row_to_json(prod) AS product FROM (
    SELECT *, (
      SELECT json_agg(features) FROM (
        SELECT feature, feature_value AS value FROM features WHERE product_id=p.id
      ) features
    ) AS features FROM products p
  ) prod WHERE id=($1), [id]


// SQL query code for retrieveProductStyles
  SELECT row_to_json(prod) AS product FROM (
    SELECT id AS product_id, (
      SELECT json_agg(styles) FROM (
        SELECT id AS style_id, style_name AS name, original_price, "default?", (
          SELECT json_agg(photos) FROM (
            SELECT thumbnail_url, photo_url AS url FROM photos WHERE style_id = s.id
          ) photos
        ) AS photos, (
          SELECT json_agg(sku_list) FROM (
            SELECT json_build_object(sku_id, (
              SELECT row_to_json(skus) FROM (
                SELECT quantity, size WHERE style_id = s.id
              ) AS sku_quant
            )) FROM skus
          ) sku_list
        ) AS skus FROM styles s WHERE s.id = product_id
      ) styles
    ) AS results FROM products p
  ) prod WHERE product_id=('3');


  .catch(err => `Unable to retrieve the product due to ${err}`);
}

/*========== EXPORTS ==========*/
module.exports = {
  retrieveProducts,
  retrieveProductInfo,
  retrieveProductStyles,
}