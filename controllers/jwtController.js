const jwt = require('jsonwebtoken');

const cookie_auth = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (! token) {
            return res.status(403).render('index', {
                title: 'login',
                message1: 'please login or register',
                message2: null,
                category: 'danger',
                active: null,
                popUp: 'active-popup',
                blur: 'active-blur'
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) 
                return res.status(403).render('index', {
                    title: 'login',
                    message1: 'please login or register',
                    message2: null,
                    category: 'danger',
                    active: null,
                    popUp: 'active-popup',
                    blur: 'active-blur'
                });
            


            // don't let em in, token just expired :)


            req.user = user;
            next();
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const generate_token = (user) => {
    const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    return token;
}

module.exports = {
    cookie_auth,
    generate_token
}
