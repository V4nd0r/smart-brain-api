const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id:'123',
            name: 'John',
            password: 'cookies',
            email: 'johndoe@examplemail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id:'345',
            name: 'Sam',
            password: 'bananas',
            email: 'sammy@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'',
            hash:'',
            email:''
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
//bcrypt.compare("apples", '$2a$10$qWlGnVqFrjoqnVpeNNy0NePTV5FjH/NoQ68pL2gJYnQiPc6W/bvHq', function(err, res) {
  //  console.log('first guess', res);
//});
//bcrypt.compare("veggies", '$2a$10$qWlGnVqFrjoqnVpeNNy0NePTV5FjH/NoQ68pL2gJYnQiPc6W/bvHq', function(err, res) {
//    console.log('second guess', res);
//});
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        }else{
         res.status(400).json('error logging in');   
        }
    //res.json('signin')
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id:'133',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params; 
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
           return res.json(user);
        }
    })
    if (!found){
        res.status(404).json('no such user');
      }
})

app.put('/image', (req, res) => {
    const { id } = req.body; 
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries ++;
            return res.json(user.entries);
        }
    })
    if (!found){
        res.status(404).json('no such user');
      }   
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})

