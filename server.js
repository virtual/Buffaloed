let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');
let User = require('./models/User');
let Sight = require('./models/Sight');
let Quiz = require('./models/Quiz');
let passport = require('passport');
let passportLocal = require('passport-local');
let expressSession = require('express-session');
let LocalStrategy = require("passport-local").Strategy; // constructor
let passwordHash = require('password-hash');
const cookieParser = require('cookie-parser');
require('dotenv').config();

let mongodbUri = "mongodb://"+process.env.SERVER_MLAB_USER+":"+process.env.SERVER_MLAB_PASSWORD+"@ds119345.mlab.com:19345/mcs";

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

/* passport has strategies which are functions that prove that a user trying to hit your server has permission */
if (process.env.NODE_ENV === 'production') { 
  app.use(express.static("./client/build"));
} else {
  app.use(express.static("public"));  
}
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({ secret: 'mtcs07boz', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// needs to be called username 
passport.use(new LocalStrategy({username: 'email', password: 'password'}, 
function(email, password, done){
  // hit the db and do some matching
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err, null); // null for no user
    } else {
      if (user && passwordHash.verify(password, user.password)){
        return done(null, user);
      } else {
        // additional test and error handling here
        return done("Password and username don't match", null)
      }
    }
  });
}
));

// store that they have logged in in a session with a cookie
// serialize auth user which puts user into cookie for requests
passport.serializeUser(function(user, done){
  done(null, user._id); // mongodb user id
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err) {
      console.log(err);
    } else {
      done(null, user);
    }
  })
})

app.get("/", function(req, res, next) {
  res.send("connected!");
});

app.get('/user', function(req, res, next) {
  // if no req user
  if (req.user) {
    User.findById(req.user._id, (err, user)=>{
      res.json(user);
    });
    //res.json(req.user); // when a server sets the cookies, this responds whats in the cookie
  } else {
    res.json({redirect: "/login", message: "not authenticated"})
  }
});

app.get('/users', function(req, res, next) {
  User.find(function(req, users) {
    res.json(users);
  });
});

app.get('/sights', function(req, res, next) {
  Sight.find(function(err, sights) {
    if(err){
      next(err)
    } else {
      res.json(sights);
    }   
  });
});

app.get("/sight/:slug", function(req, res, next){
  Sight.find({
    slug: req.params.slug
  },(err, foundSight)=>{
    if(err){
      console.log(err);
      next(err)
    } else { 
      res.json({
        sightData: foundSight
      })
    }
  });
})

// saves sight on update
app.post('/saveSight', function(req, res, next) {
  if(req.body.savetype === 'add'){ 

    // Add new sight to db for slug/sight 
    let sight = new Sight();   
    sight.slug = req.body.slug;  
    sight.name = req.body.name;
    sight.img = req.body.img;
    sight.lat = req.body.lat;
    sight.lng = req.body.lng;
    sight.type = req.body.type;
    sight.desc = req.body.desc;  

    sight.save(
      function(err, newSight){
        if(err) {
          next(err);
        } else {
          res.json(newSight);
        }
      }
    )
    } else { 
  Sight.findOneAndUpdate(
    {slug: req.body.slug}, 
    {$set:req.body}, 
    {new: true}, 
    (err, doc)=>{
      if(err){
          console.log("Something wrong when updating data!")
      } else {
        res.json({data: doc});
      }
  });
  }
});

app.post('/deleteSight', function(req, res, next) {
  Sight.findOneAndRemove({slug:req.body.slug}, (err, toDelete) => {  
    let response = {
      message: "Sight successfully deleted",
      id: toDelete._id
  }; 
  res.status(200).send(response);
 });
});

app.post('/signup', function(req, res, next) {
  let user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function(err, newUser){
    if(err) {
      next(err);
    } else {
      res.json(newUser);
    }
  })
});

// Saves score to db
app.post('/score', function(req, res, next) {

  Quiz.find({slug: req.body.slug}, (err, foundQuiz)=>{
    let obj = {
      score:req.body.leaderboard.score,
      email:req.body.leaderboard.email
    };
    if(err){
      console.log(err);
      next(err)
    } else { 
      if (foundQuiz.length > 0) {
        // Quiz with slug exists 
        let foundUser = false;

        // Check if current user's email is in the sight's quiz list
        // check if the score is more than what they got before & update
        foundQuiz[0].leaderBoard.forEach((e, i) =>{
          console.log('e')
          console.log(e)
          if(e.email === req.body.leaderboard.email) {
            // √ user is in list
            // check if score is higher and update if so
            foundUser = true;  

            if(parseInt(e.score) < parseInt(req.body.leaderboard.score)) {
              // √ update score
              foundQuiz[0].leaderBoard[i].score = parseInt(req.body.leaderboard.score);
              console.log('update score');
              foundQuiz[0].save( 
                function(err, newQuiz){
                  if(err) {
                  next(err);
                } else {
                  res.json(newQuiz);
                }
              });
            } else {
              // √ no change
              console.log('no update needed');
            }
          } 
          
        });
        // end foreach

        if (!(foundUser)) {  
          // √ User is not in list, 
          // add email and score to existing leaderboard object 
          foundQuiz[0].leaderBoard.push(obj);
          foundQuiz[0].save( 
          function(err, newQuiz){
            if(err) {
              next(err);
            } else {
              res.json(newQuiz);
            }
          });
        }
 
      } else {
        // Add new quiz to db for slug/sight 
        let quiz = new Quiz();
        quiz.leaderBoard = [];
        quiz.slug = req.body.slug;
        quiz.leaderBoard.push(obj) 
        quiz.save(
          function(err, newQuiz){
          if(err) {
            next(err);
          } else {
            res.json(newQuiz);
          }
       })
      }
    }
  }).limit(1);
});

app.post('/scoreInfo', function(req, res, next) {
  if (req.body.slug) {
    Quiz.find({slug: req.body.slug},
      function(err, scores) {
      if (err) {
        next(err)
      } else {
        res.json(scores);
        //console.log(scores);
      }
    }) 
  } 
});

app.post('/scoreInfoByEmail', function(req, res, next) {
  if (req.body.email) {
    User.findOne({email: {$regex: new RegExp(req.body.email, "ig") }},
      function(err, user) {
      if (err) {
        next(err)
      } else {
        res.json(user); 
      }
    }) 
  } 
});


// adds passport middleware
app.post('/login', function (req, res, next) {
  passport.authenticate("local", function(err, user){
    if (err) {
      res.json({ found: false, success: false, err: true, message: err}); // can also send res.status
    } else if (user) {
      // write code to send user to dashboard - passport 
      req.logIn(user, (err)=>{
        //console.log(user);
        // gets a session working
        if (err) {
          res.json({found: false, success: false, message: err});
        } else {
          res.json({found: true, success: true, 
            id: user.id, email: user.email, 
            firstName: user.firstName, lastName: user.lastName,
            img: user.img
          });
        }
      })
    } else {
      res.json({found: false, success: false, message: "Password and user do not match!"});      
    }
  })(req,res,next); 
  var email = req.body.email;
  var password = req.body.password;
});

app.get('/logout', function(req, res){
  if (req.user) {
    req.logout();
    res.json('user logged out')
    req.session.destroy();
    
  } else {
    res.json('no user logged in')
  }
});

var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log('Buffaloed app is listening on ' + port);
});