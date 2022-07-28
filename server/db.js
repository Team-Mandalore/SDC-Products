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
const retrieve = () => {

}

/*========== EXPORTS ==========*/
module.exports = {
  retrieve,
}