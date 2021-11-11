var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development'])

/* GET users listing. */
router.delete('/', function (req, res, next) {
    console.log('user tried to delete', req.body.username)
    knex('favoriteslist')
        .del()
        .where({ listname: `${req.body.listname}` })
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.status(404).json({
                message: 'not found'
            })
        })
});
// app.delete('/delete', (req, res) => {
//   console.log('user tried to delete', req.body.username)
//   knex('scores')
//     .del()
//     .where({ username: req.body.username })
//     .then(data => res.status(200).json(data))
//     .catch(err => {
//       res.status(404).json({
//         message: 'not found'
//       })
//     })
// })

module.exports = router;