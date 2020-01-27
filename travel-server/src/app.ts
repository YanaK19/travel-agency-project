import express from "express";
const app = express();

app.get('/echo', (req, res) => {
    console.log(req.method, req.path, ` param:${req.query.message}`);
});

app.get('*', (req, res) => {
    res.json( {message: `page not found`} );
});

export{app}