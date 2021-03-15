const express = require('express');
const app = express();
const port = 5000;
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
})

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(`${__dirname}/style.css`));
})

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(`${__dirname}/app.js`));
})

app.listen(port, () =>{
    console.log(`I'm here at port ${port}`);
})

