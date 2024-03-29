// Import necessary packages and controllers
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// Connect to the database using knex
const db =knex({
    client: 'pg',
    connection: {
          host : 'dpg-cga454keoogtbdtk8frg-a',
          port : 5432,
          user : 'smart_brain_db_mi1e_user',
          password : 'm55qvzm2PVYgt4NYpra0t1X3ImDyvSHp',
          database : 'smart_brain_db_mi1e_tbjg'

      //connectionString : process.env.DATABASE_URL,
      //ssl: true,
    }
  });

// Create an instance of the express application
const app = express();

// Use CORS and JSON parsing middleware
app.use(cors())
app.use(express.json());

// Define API routes and their corresponding controllers
app.get('/', (req, res)=> {res.send("it is working")})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) =>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) =>{image.handleApiCall(req, res)})

// Start the server listening on the specified port or 3000 if not defined
app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on  ${process.env.PORT}`);
})

