const { Router } = require('express')
const router = Router()
const liveOnController = require('../controller/liveOnController')

router.get('/liveon', (req, res) => {
    liveOnController.getLiveOn(req, res)
})

router.put('/liveon/:id', (req, res) => {
    liveOnController.alterLiveOn(req, res)
})


module.exports = router