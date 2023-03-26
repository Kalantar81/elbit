const Router = require('express').Router();
const User = require('../models/user');
const apiResponse = require('../lib/apiResponse');
const {ObjectId} = require('mongoose');

Router.post('/login', async (req, res, next) => {
  try {
    let user = await User.login(req.body.email, req.body.password);
    if (user) {
      return res.send(apiResponse.success(user));
    }

    return res.send(apiResponse.ErrorCodes.Unauthorized);
  } catch (ex) {
    console.log(`exception in login ${ex}`);
    return res.sendStatus(500);
  }
});

Router.post('', async (req, res, next) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });
    await user.save();
    return res.send(apiResponse.success(user));
  } catch (ex) {
    console.log(`exception in post user ${ex}`);
    return res.sendStatus(500);
  }
});

Router.get('', async (req, res, next) => {
  try {
    let users = await User.find();
    console.log('users: ', users);
    return res.send(apiResponse.success(users));
  } catch (ex) {
    console.log(`exception in get all users ${ex}`);
    return res.sendStatus(500);
  }
});

Router.get('/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({_id: req.params.id});
    return res.send(apiResponse.success(user));
  } catch (ex) {
    console.log(`exception in get user ${ex}`);
    return res.sendStatus(500);
  }
});

Router.put('/:id', async (req, res, next) => {
  try {
    let user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      },
      {useFindAndModify: false},
    );

    if (!user) {
      return res.send(apiResponse.ErrorCodes.EntityNotFound);
    }

    return res.send(apiResponse.success('Ok'));
  } catch (ex) {
    console.log(`exception in update user ${ex}`);
    return res.sendStatus(500);
  }
});

Router.delete('/:id', async (req, res, next) => {
  try {
    console.log('user id: ', req.params.id, ' deleted');
    let user = await User.findByIdAndRemove(req.params.id);
    return res.send(apiResponse.success(user));
  } catch (ex) {
    console.log(`exception in delete user ${ex}`);
    return res.sendStatus(500);
  }
});

module.exports = Router;
