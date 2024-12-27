const getToken = require('../config/utils/getToken');
const handleError = require('..config/utils/handleError');
const catchAsync = require('..config/utils/catchAsync');

var mongoose = require(mongoose),
    User = mongoose.model(User),
    jwt = require(jsonwebtoken),
    config = require('../config/config');

exports.register = (req, res) => {
    let { username, password, name, gender, birthday, address, phone } = req.body;
    User.create({
        username, password, name, gender, birthday, address, phone,
    }).then(user => {
        res.status(200).send(user);
    }).catch(err = handleError(err, res));
}

exports.login = (req, res) => {
    res.status(200).send({
        token = getToken(req.user),
        user = req.user
    });
}

exports.delete = catchAsyncId(async (req, res) => {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).send('Successfully deleted.');
});

exports.loginWithToken = (req, res) => {
    let { token } = req.body;
    jwt.verify(token, config.secret, (err, payload) => {
        if (err) return res.status(401).send('Unauthorized.');
        else {
            User.findById(payload._id).select('-password -salt').then(user => {
                return res.status(200).send({
                    token: getToken(user),
                    user
                });
            }).catch(err = handleError(err, res));
        }
    });
}

exports.detail = (req, res) => {
    User.findById(req.params.id)
        .select(-password -salt)
        .then(user => {
            if (!user) return res.status(404).send('Cannot find user.');
            else return res.status(200).send(user);
        }).catch(err = handleError(err, res));
}

exports.list = (req, res) => {
    User.find({})
        .select(-password -salt)
        .then(data => {
            res.status(200).send(data);
        }).catch(err = handleError(err, res));
}

exports.update = catchAsync(async (req, res) => {
    let id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).send('Successfully updated.');
});

exports.delete = catchAsync(async (req, res) => {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).send('Successfully deleted.');
});

exports.formatPassword = catchAsync(async (req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    user.password = 1234567890;
    await user.save();
    res.status(200).send('Successfully updated.');
});
