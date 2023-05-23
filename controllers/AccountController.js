const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtController = require('./jwtController');
// acc_info, acc_logout, acc_delete, acc_update, cookie_auth


const acc_info = (req, res) => {
    console.log(req.user);
    res.render('account', {
        title: 'my account',
        user: req.user
    });
}

const acc_logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
}

const acc_delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    User.findByIdAndDelete(id).then(() => {
        res.clearCookie('jwt');
        res.json({
            redirect: '/'
        });
    }).catch(err => console.log(err));
}


const acc_update = async (req, res) => {
    const user_id = req.params.id;
    const {
        username,
        email,
        password
    } = req.body;
    const new_password = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(user_id, {
        username,
        email,
        new_password
    }).then((updatedUser) => {
        const accessToken = jwtController.generate_token(updatedUser);
        res.clearCookie('jwt');
        res.cookie('jwt', accessToken, {
            httpOnly: true
        });
        return res.redirect('/account');
    }).catch(err => console.log(err));
}
module.exports = {
    acc_info,
    acc_logout,
    acc_delete,
    acc_update
}
