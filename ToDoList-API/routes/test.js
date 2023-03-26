const Router = require('express').Router();

Router.get('/test', async (req, res, next) => {
    try {
        return res.send('Test');
    } catch (ex) {
        return res.send(ex);
    }
});

module.exports = Router;