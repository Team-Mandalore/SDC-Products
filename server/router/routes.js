/*========== EXTERNAL MODULES ==========*/
require('dotenv').config();
const express = require('express');


/*========== INTERNAL MODULES ==========*/
const {retrieve} = require('../db');



/*========== ROUTES ==========*/
const find = (req, res) => {
  res.json(req.body);
}



/*========== EXPORTS ==========*/
module.exports = {
  find,
}