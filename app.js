// To create facebook app please follow instruction:
// https://magefan.com/blog/create-facebook-application

// Please note: replace 'App ID' and 'App Secret' generated in Facebook App
const mongoose = require('mongoose');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy
let cookieParser = require('cookie-parser');
let session = require('express-session');
let dotnenv = require('dotenv');
//const todorouter = require("./routes/todo");
const tocontroller= require("./controllers/todo");
const uploadcontroller= require("./controllers/upload");

const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({storage:storage});


dotnenv.config();
// set the view engine to ejs
app.set('view engine', 'ejs');

// Connect to MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/atpl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => {
  console.log('Successfully connected to MongoDB database');
})
.catch((err) => {
  console.error('Error connecting to MongoDB database:', err.message);
});

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

// app.use: register chain of middlewares before executing any end route logic
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ 
    secret: 'keyboard cat', 
    key: 'sid',
    resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//app.use("/todos", todorouter);

// setup passport session - authentication middleware for Node.js
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },

  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(null, profile);
    });
  }
));
// Bind and listen the connection 
app.listen(process.env.PORT);

// Setup on given routes when requested by get htttp
app.get('/', (req, res) => {
    res.render('pages/index');
})

app.post('/todos',ensureAuthenticated,tocontroller.create)
app.get('/todos',ensureAuthenticated,tocontroller.getAll)
app.post('/todos/update/:id',ensureAuthenticated,tocontroller.update)
app.post('/todos/delete/:id',ensureAuthenticated,tocontroller.delete)

app.post('/upload',[upload.single('image'),ensureAuthenticated],uploadcontroller.upload)
app.post('/upload/delete/:id',ensureAuthenticated,uploadcontroller.deleteimage)

app.get('/account', ensureAuthenticated, async function(req, res){

try{
  const tasks = await tocontroller.getAll(); //getAllimages
  const images = await uploadcontroller.getAllimages();

  res.render('pages/account', {user: req.user.displayName,tasks:tasks,images:images})

}catch(ex){
  console.log(ex);
  res.status(500).send('Internal Server Error');

}
});
  
app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
  
// Facebook will redirect the user to this URL after approval.  
app.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect : '/account', failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
);

app.get('/login', (req, res) => {
    res.render('pages/login', {
        loginLink: "/auth/facebook"
    });
})

app.get('/logout', function(req, res){
    req.logout();
    // req.session.destroy();
    res.redirect('/');
});


// middleware to ensure that any resource is protected
// and ensure a user is authenticated.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
