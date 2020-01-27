const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.status(200).json({
        message: `${req.query.message}`
    });
    console.log(req.method ,req.originalUrl, ` param:${req.query.message}`);
});

module.exports = app;