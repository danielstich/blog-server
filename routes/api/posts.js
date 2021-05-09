const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { findByID, getPosts, getToken } = require('../../models/dao')

// Posts Model

// Get All Posts

router.get('/', (req, res) => {
    getPosts().then(result => {
	res.set('Access-Control-Allow-Origin', '*');
        res.json(result);
    // console.log(post);
    })
});

// Get One post by ID

router.get('/:id', (req, res) => {
    findByID(req.params.id).then(result => {
	res.set('Access-Control-Allow-Origin', '*');
	res.json(result)
	})
});

router.post('/login', bodyParser.json(), (req, res) => {
    getToken(req.body.password)
        .then(token => {
            console.log(`Your token is ${token}`);
            res.set('Access-Control-Allow-Origin', '*');
            res.json( { token: token } );
        })
        .catch(error => {
            console.log(error);
            res.status(400).send(error);
        })
});

// Post a blog post

// Delete a blog post


module.exports = router;
