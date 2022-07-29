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
  // will take a page and count limit
  // SELECT * FROM <products> WHERE id='?'
  // if page and count limit is provided, insert as a limit to the SELECT query
  // possible need for joins to add photos and other information

  // if page is greater than 0
    // set the value of page to equal page multiplied by the value of count
  if (page > 0){
    page = page * count;
  }

  return pool.query('SELECT * FROM products OFFSET ($1) ROWS LIMIT ($2)', [page, count])
  .then(res => res.rows)
  .catch(err => `Unable to retrieve the product due to ${err}`)
}

const retrieveProductInfo = () => {
  // returns one product and all it's features
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