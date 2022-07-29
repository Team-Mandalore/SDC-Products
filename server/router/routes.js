/*========== EXTERNAL MODULES ==========*/
require('dotenv').config();
const express = require('express');


/*========== INTERNAL MODULES ==========*/
const {retrieveProducts, retrieveProductInfo, retrieveProductStyles} = require('../db');



/*========== ROUTES ==========*/
const findAll = (req, res) => {
  retrieveProducts(req.params.page, req.params.count)
  .then(response => {
    res.json(response)
    res.sendStatus(200);
  })
  .catch(err => console.error(`Unable to get products due to ${err}`))
}

const findProduct = (req, res) => {
  res.json(req.body);
}

const findStyles = (req, res) => {
  res.json(req.body);
}


/*========== EXPORTS ==========*/
module.exports = {
  findAll,
  findProduct,
  findStyles,
}