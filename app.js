const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/login/login.html'); 
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});
