const Express = require('express');
const models = require('../models')

const router = Express.Router();

router.get('/', function(req, res, next) {
  var hotels = models.Hotel.findAll({ include: [{ all: true }] })
  var restaurants = models.Restaurant.findAll({ include: [{ all: true }] })
  var activities = models.Activity.findAll({ include: [{ all: true }] })

  Promise.all([hotels, restaurants, activities])
  .then(function(data) {
    res.json(data)
  })
})

module.exports = router;
