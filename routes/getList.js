var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development'])

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('request records')
    knex
        .select('*')
        .from('favoriteslist')
        .orderBy('id')
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.status(404).json({
                message: 'not found'
            }, console.log(err.message))
        })
});


module.exports = router;