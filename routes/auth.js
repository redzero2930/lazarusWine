const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const path = require('path');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "greenday99",
  database: "login_demo",
});

db.connect((err) => {
  if (err) {
    console.error("Something went wrong conneting to data base, error: ", err);
    process.exit(1);
  } else {
    console.log("Connection to database succesfully");
  }
});

router.post('/login', (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        console.error('username or password missing in the request');
        return res.status(400).send('Please send both username and password');
    }

    db.query('SELECT * FROM users WHERE username = ?',[username],async (err, results)=>{
        if(err){
            console.error('query error at login')
            return res.status(500).send('Internal data base error');
        }

        if(results.length === 0){
            console.error('username not found')
            return res.status(401).send('incorrect username or password');
        }

        const user = results[0];
        console.log('user found');

        const passwordMatch = await bcrypt.compare(password, user.password);  
        if (passwordMatch) {
            console.log('Password match');
            res.redirect('/auth/home');
        } else {
            console.log('Password does not match');
            return res.status(401).send('Incorrect username or password');
        }
    })
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      console.log('Username or password missing on request');
      return res.status(400).send('Please send both username and password');
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
          console.error('Query error: ', err);
          return res.status(500).send('Internal database error');
      }

      if (results.length > 0) {
          console.error('Username already registered, please try again with another one');
          return res.status(409).send('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
          if (err) {
              console.error('Database query error:', err);
              return res.status(500).send('Internal server error');
          }
          res.redirect('/login/login.html');
      });
  });
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home/home.html'));
})

module.exports = router;
