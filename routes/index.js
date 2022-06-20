const express = require('express');
const router = express.Router();



// Get homepage
router.get('/', (req, res, next) => {
    res.render('index', {
        page_title: "Dolphin Cove"
    });
    next();
});

module.exports = router;