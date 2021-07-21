const express = require("express");
const router = express.Router()
const shortId = require('shortid')
const Url = require('../models/Url')
const utils = require('../utils/utils')

router.post('/short', async (req, res) => {
    const { origUrl }  = req.body
    const base = process.env.BASE 

    const urlId = shortId.generate()

    if (utils.validateUrl(origUrl)) {
        try {
            let url = await Url.findOne({origUrl})
            if (url) {
                res.json(url)
            } else {
                const shortUrl = `${base}/${urlId}`

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date()
                })

                await url.save()
                res.json(url.shortUrl)
            }
        } catch (error) {
            console.log(error.message)
            res.status(500).json('Server error')
        }
    } else {
        res.status(400).json('Invalid Url')
    }

})

module.exports = router