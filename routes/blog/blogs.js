const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;