const express = require('express')
const router = express.Router()
const Url = require('../models/Url')

router.get('/:urlId', async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId })
        if (url) {
            url.clicks++
            url.save()
            return res.redirect(url.origUrl)
        } else res.status(404).json('url not found')
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Server error')
    }
})

module.exports = router