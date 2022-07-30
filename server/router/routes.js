/*========== EXTERNAL MODULES ==========*/
require('dotenv').config();
const express = require('express');


/*========== INTERNAL MODULES ==========*/
const {retrieveProducts, retrieveProductInfo, retrieveProductStyles} = require('../db');



/*========== ROUTES ==========*/
const findAll = (req, res) => {
  retrieveProducts(req.query.page, req.query.count)
  .then(response => res.json(response))
  .catch(err => console.error(`Unable to get products due to ${err}`))
}

const findInfo = (req, res) => {
  retrieveProductInfo(req.params.product_id)
  .then(response => res.json(response))
  .catch(err => console.error(`Unable to get products due to ${err}`))
}

const findStyles = (req, res) => {
  res.json(req.body);
}


/*========== EXPORTS ==========*/
module.exports = {
  findAll,
  findInfo,
  findStyles,
}