var passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('mongoose').model('User'),
    config = require('../config');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

module.exports = function () {
    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
        User.findById(payload._id).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch(err => {
            console.log('err');
            return done('err', false)
        });
    }));
} 