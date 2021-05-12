const express = require('express');
const path = require('path')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// posts routes

const posts = require('./routes/api/posts');
const blogs = require('./routes/blog/blogs');

// Use Routes
let allowed = /\.stich\.pub$/;

app.use(cors( { origin: allowed }));
app.use('/api/posts/', posts);
app.use('/blogs/', blogs);

// default routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () =>{
    console.log(`I'm here at port ${port}`);
});