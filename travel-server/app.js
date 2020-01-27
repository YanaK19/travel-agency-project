const express = require('express');

const app = express();

app.get('/echo', (req, res) => {
    if(req.path === '/echo') {
        res.status(200).json({
            message: `${req.query.message}`
        });
        console.log(req.method, req.path, ` param:${req.query.message}`);
    }
});

app.get('*', function(req, res){
    res.send(`page ${req.path} not found`, 404);
});

module.exports = app;