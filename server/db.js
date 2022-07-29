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
  // returns one product and all it's features
  return pool.query('SELECT * FROM products WHERE id=($1)', [id])
  .then(res => res.rows)
  .catch(err => `Unable to retrieve the product due to ${err}`)
  // .push(pool.query('SELECT * FROM features WHERE product_id=($1)', [id]))
}

const retrieveProductStyles = () => {
  // returns the product id and a list of all its styles
}

/*========== EXPORTS ==========*/
module.exports = {
  retrieveProducts,
  retrieveProductInfo,
  retrieveProductStyles,
}