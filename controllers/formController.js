const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const home_page = (req, res) => {
    res.render('index', {
        title: 'home page',
        message1: null,
        message2: null,
        popUp: null,
        active: null,
        blur: null
    });
}

const loginRegisterform = async (req, res) => {
    try {
        if (req.body.username && req.body.email && req.body.password) { // register
            const {
                username,
                email,
                password
            } = req.body;
            if (await User.findOne({
                email
            })) {
                return res.render('index', {
                    title: 'register',
                    message1: null,
                    message2: 'email already exist!',
                    category: 'danger',
                    active: 'active',
                    popUp: 'active-popup',
                    blur: 'active-blur'
                });
            }
            const hashedpassword = await bcrypt.hash(password, 10);
            const new_user = new User({
                username: username,
                email: email,
                password: hashedpassword
            });
            new_user.save().then((result) => {
                return res.render('index', {
                    title: 'login',
                    message1: 'account successfully created!',
                    message2: null,
                    category: 'success',
                    active: null,
                    popUp: 'active-popup',
                    blur: 'active-blur'
                });
            }).catch((err) => {
                console.log(err);
            });
        } else { // login
            const {
                email,
                password
            } = req.body;
            const login_user = await User.findOne({
                email
            });
            const password_match = login_user && await bcrypt.compare(password, login_user.password);

            if (! password_match || ! login_user) {
                return res.status(401).render('index', {
                    title: 'login',
                    message1: 'incorrect credential!',
                    message2: null,
                    category: 'danger',
                    active: null,
                    popUp: 'active-popup',
                    blur: 'active-blur'
                });
            }
            const accessToken = jwt.sign(login_user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });
            res.cookie('jwt', accessToken, {
                httpOnly: true
            });
            return res.redirect('/myTasks');
        }
    } catch (err) {
        console.log('async error!', err);
        res.sendStatus(500);
    }
}

module.exports = {
    loginRegisterform,
    home_page
};
