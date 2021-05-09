const express = require('express');
const path = require('path')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// posts routes

const posts = require('./routes/api/posts')

// Use Routes
app.use(cors());
app.use('/api/posts/', posts);

// default routes
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () =>{
    console.log(`I'm here at port ${port}`);
});