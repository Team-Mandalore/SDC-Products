/*========== EXTERNAL MODULES ==========*/
require('dotenv').config();
const express = require('express');


/*========== INTERNAL MODULES ==========*/
const {find,} = require('./router/routes');


const app = express();
const {PORT} = process.env;


/*========== MIDDLEWARE ==========*/

app.use(express.json());



/*========== ROUTES ==========*/
app.get('/', find);



/*========== EXPORTS ==========*/
// app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));