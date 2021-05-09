const express = require('express');
const path = require('path')
const mongo = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// posts routes

const posts = require('./routes/api/posts')

// Use Routes
app.use('/api/posts/', posts);

// default routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () =>{
    console.log(`I'm here at port ${port}`);
});