//jshint esversion:6

const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;