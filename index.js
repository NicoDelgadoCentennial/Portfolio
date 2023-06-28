const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(bodyParser.json())
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

  app.get('/home', (req, res) => {
    res.render('home');
  });
  
  // Route for the about page
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
  // Route for the projects page
  app.get('/projects', (req, res) => {
    res.render('projects');
  });
  
  // Route for the services page
  app.get('/services', (req, res) => {
    res.render('services');
  });
  
  // Route for the contact page
  app.get('/contact', (req, res) => {
    res.render('contact');
  });

  require('./routes/user.route.js')(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
