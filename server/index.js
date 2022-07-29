/*========== EXTERNAL MODULES ==========*/
require('dotenv').config();
const express = require('express');


/*========== INTERNAL MODULES ==========*/
const {findAll, findProduct, findStyles} = require('./router/routes');


const app = express();
const {PORT} = process.env;


/*========== MIDDLEWARE ==========*/

app.use(express.json());



/*========== ROUTES ==========*/
app.get('/products', findAll);
app.get('/products/:product_id', findProduct);  // returns all product level information for a specified product id
app.get('/products/:product_id/styles', findStyles);



/*========== EXPORTS ==========*/
// app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));