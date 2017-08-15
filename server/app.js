const Express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models')

const APIrouter = require('./routes/api')

const app = new Express();

app.listen(3000, function() {
  console.log("listening on port 3000");
})

app.use(bodyParser.json());
app.use(volleyball);
app.use(Express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res, next) {
  res.redirect('/error.html');
})

app.use('/api', APIrouter)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status).send(err.message);
})
