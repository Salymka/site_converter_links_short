const {Router} = require('express')
const Link = require('../models/Link')
const config = require('config')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const url = config.get("baseUrl")
        const {originLink} = req.body
        const code = shortid.generate()
        // console.log(!!auth);
        const existing = await Link.findOne({originLink})

        if(existing){
            return res.json({link: existing})
        }
        const convertLink = url + '/t/' + code

        const link = new Link({
            code,
            originLink,
            convertLink,
            activeUser: req.user.userId
        })

        await link.save()

        res.status(201).json({link})

    }catch (e) {
        res.status(500).json({massage: "Whats happened "})
    }

})

router.get('/myLinks', auth, async (req, res) => {
    try {
        const links = await Link.find({activeUser: req.user.userId})
        res.json(links)
    }catch (e) {
        res.status(500).json({massage: "Whats happened "})
    }

})

router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    }catch (e) {
        res.status(500).json({massage: "Whats happened "})
    }

})

module.exports = router