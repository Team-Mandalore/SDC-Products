/*========== EXTERNAL MODULES ==========*/
require('dotenv').config();
const express = require('express');


/*========== INTERNAL MODULES ==========*/
const {findAll, findInfo, findStyles} = require('./router/routes');


const app = express();
const {PORT} = process.env;


/*========== MIDDLEWARE ==========*/

app.use(express.json());



/*========== ROUTES ==========*/
app.get('/products', findAll);
app.get('/products/:product_id', findInfo);
app.get('/products/:product_id/styles', findStyles);



/*========== EXPORTS ==========*/
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));