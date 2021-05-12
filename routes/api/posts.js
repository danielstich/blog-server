const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { findByID, getPosts, getToken, postBlog } = require('../../models/dao')

// Posts Model

// Get All Posts

router.get('/', (req, res) => {
    getPosts().then(result => {
        res.json(result);
    // console.log(post);
    })
});

// Get One post by ID

router.get('/:id', (req, res) => {
    findByID(req.params.id).then(result => {
	    res.json(result)
	})
});

router.post('/login', bodyParser.json(), (req, res) => {
    getToken(req.body.password)
        .then(token => {
            res.json( { token: token } );
        })
        .catch(error => {
            console.log(error);
            res.status(400).send(error);
        })
});

// Post a blog post

router.post('/post', bodyParser.json(), async (req, res) => {
    let token = req.headers.authorization;
    try {
        postBlog(req.body, token);
        res.status(201);
        res.send( { msg: 'Blog Posted' });
    } catch (error) {
        res.status(403).send(error);
    }
})

// Delete a blog post


module.exports = router;
