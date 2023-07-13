const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const session = require('express-session');
const requireLogin = require('./public/session_manager');

app.use(session({
  secret: 'portfolio',
  resave: false,
  saveUninitialized: false
}));


app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(bodyParser.json())
app.use(express.static('public'));
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
  useNewUrlParser : true
})
  .then(() => {
      console.log("Successfully connected to the database");
  }).catch(err => {
      console.log('It was not possible to connect to the datbase.', err);
      process.exit();
  });


// Set the view engine to use EJS (Embedded JavaScript templates)
app.set('view engine', 'ejs');

// Set the folder for views
app.set('views', __dirname + '/views');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the log in page
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/', (req, res) => {
  res.render('login');
});
// Route for the sign up page
app.get('/signup', (req, res) => {
  res.render('signup');
});
// Route for the sign up page
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});
// Route for the home page
app.get('/home', requireLogin, (req, res) => {
  res.render('home');
});

  
  // Route for the about page
  app.get('/about', requireLogin, (req, res) => {
    res.render('about');
  });
  
  // Route for the projects page
  app.get('/projects', requireLogin, (req, res) => {
    res.render('projects');
  });
  
  // Route for the services page
  app.get('/services', requireLogin, (req, res) => {
    res.render('services');
  });
  
  // Route for the contact page
  app.get('/contact', requireLogin, (req, res) => {
    res.render('contact');
  });

  // Route for the business contact page
  app.get('/business', requireLogin, (req, res) => {
    res.render('business');
  });

  //route for the update view
  app.get('/update', requireLogin, (req, res) => {
    res.render('update');
  });
  //send contact message to database
  app.post('/contact_info', (req, res) => {
    const { firstName, lastName, phone, email, message } = req.body;
    res.json({ message: 'Contact form submitted successfully' });
  });

  require('./routes/user.route.js')(app);
  require('./routes/contact.route.js')(app);
  require('./routes/contact_info.route.js')(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
