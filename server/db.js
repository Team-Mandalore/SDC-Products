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
const retrieveProducts = (page = 0, count = 5) => {
  if (page > 0){
    page = page * count;
  }

  return pool.query('SELECT * FROM products OFFSET ($1) ROWS LIMIT ($2)', [page, count])
  .then(res => res.rows)
  .catch(err => `Unable to retrieve the product due to ${err}`)
}

const retrieveProductInfo = (id) => {
  let product = {};
  // return pool.query('SELECT row_to_json(prod) AS product FROM (SELECT *, (SELECT json_agg(features) FROM (SELECT feature, feature_value AS value FROM features WHERE product_id=p.id) features) AS features FROM products p) prod WHERE id=($1)', [id])
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
  .then(res => product = res.row[0])
  .then(() => pool.query('SELECT style_id, name, original_price, sale_price, styles_default as default? FROM styles WHERE product_id=($1)', [id]))
  .then(res => product.features = res.rows)
  .then(() => pool.query('SELECT thumbnail_url, photo_url as url FROM photos WHERE style_id=($1)', [id]))
  .then(res => product.features.photos = res.rows)
  .then(() => pool.query('SELECT '))
  .catch(err => `Unable to retrieve the product due to ${err}`);
}

/*========== EXPORTS ==========*/
module.exports = {
  retrieveProducts,
  retrieveProductInfo,
  retrieveProductStyles,
}