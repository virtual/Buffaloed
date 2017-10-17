let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');
let User = require('./models/User');

let mongodbUri = 'mongodb://localhost/buffaloed';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} }

};

mongoose.connect(mongooseUri, options);
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('database connected to Buffaloed');
});

app.get("/", function(req, res, next) {
  res.send("connected!");
});

app.get('/users', function(req, res, next) {
  User.find(function(req, users) {
    res.json(users);
  });
});

app.use(express.static("public"));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', function(req, res, next) {
  let user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  console.log(user);
  user.save(function(err, newUser){
    if(err) {
      next(err);
    } else {
      res.json(newUser);
    }
  })
});

app.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      if (user) {
        if (password === user.password) {
          res.json({
            found: true,
            message: "Successful Login, Welcome " + user.firstName,
            success: true,
            firstName: user.firstName,
            lastName: user.lastName
          });
        } else {
          res.json({
            found: true,
            message: "Bad password",
            success: false
          });
        }
      } else {
        res.json({
          found: false,
          message: "No such user",
          success: false
        });
      }
    }
  });
});

app.listen(5000, function(){
  console.log('Buffaloed app is listening on 5000');
});