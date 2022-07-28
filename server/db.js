/*========== EXTERNAL MODULES ==========*/
const {Pool} = require('pg');
require('dotenv').config();

/*========== INTERNAL MODULES ==========*/


const {USER, PASSWORD, DATABASE, HOST} = process.env;


/*========== DATABASE CONNECTION ==========*/
const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
})

pool.connect((err) => {
  if (err) {
    console.error(`Unable to connect due to ${err}`);
  } else {
    console.log('Postgres is connected!');
  }
})


/*========== DATABASE METHODS ==========*/
const retrieveProduct = () => {
  // will take a page and count limit
  // SELECT * FROM <products> WHERE id='?'
  // if page and count limit is provided, insert as a limit to the SELECT query
  // possible need for joins to add photos and other information
}

const retrieveProductInfo = () => {
  // returns one product and all it's features
}

const retrieveProductStyles = () => {
  // returns the product id and a list of all its styles
}

/*========== EXPORTS ==========*/
module.exports = {
  retrieveProduct,
  retrieveProductInfo,
  retrieveProductStyles,
}