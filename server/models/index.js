const Sequelize = require('sequelize');

db = new Sequelize('postgres://localhost:5432/trip-planner');

var Place = db.define('place', {
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
})

var Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.FLOAT
  },
  amenities: {
    type: Sequelize.STRING
  }
})

Hotel.belongsTo(Place)

var Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING
  },
  age_range: {
    type: Sequelize.STRING
  }
})

Activity.belongsTo(Place)

var Resteraunt = db.define('resteraunt', {
  name: {
    type: Sequelize.STRING
  },
  cuisine: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  }
})

Resteraunt.belongsTo(Place)


module.exports = {
  db: db,
  place: Place,
  hotel: Hotel,
  activity: Activity,
  resteraunt: Resteraunt
}
