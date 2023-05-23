// =======================================> modules & requirement <================================================
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/acccountRoutes');
const formRouter = require('./routes/formRouter');
const myTasksRouter = require('./routes/myTasksRouter');
const jwtController = require('./controllers/jwtController');

// =======================================> middleWares <=========================================================
const {
    render
} = require('ejs');
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(cookieParser());

// ==>set static and templates folder
app.set('view engine', 'ejs');
app.use(express.static('public'));

// =========================================> CONNECT TO THE DATABASE <=========================================
const DB_URI = 'mongodb+srv://admin:cfzFDeZ9o5LB05aN@clustertask.oix6faq.mongodb.net/task-manager?retryWrites=true&w=majority';

mongoose.connect(DB_URI).then((result) => {
    app.listen(4000);
    console.log('http://localhost:4000/');
}).catch((err) => console.log('connection failed:', err));

// =========================================> ROUTERS <=========================================================
// ==>about router
app.get('/about', (req, res) => {
    res.redirect('/');
});

// ==>my tasks router
app.use('/myTasks', myTasksRouter);

// ==>home & login/register router
app.use(formRouter);

// ==>account routes:
app.use('/account', accountRouter);

// ==>4O4 router
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'page not found'
    });
});
