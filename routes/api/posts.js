const express = require('express');
const router = express.Router();
const { findByID, getPosts } = require('../../models/dao')

// Posts Model

// Get All Posts

router.get('/', (req, res) => {
    getPosts().then(result => {
        res.json(result);
    // console.log(post);
    })
})

// Get One post by ID

router.get('/:id', (req, res) => {
    findByID(req.params.id).then(result => res.json(result));
})

// Post a blog post

// Delete a blog post


module.exports = router;