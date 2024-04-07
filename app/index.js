const express = require('express')
const router = express.Router()


router.get('/index', async function(req, res, next) {
    res.json({result : true, msg : 'index'})
})

module.exports = router;
