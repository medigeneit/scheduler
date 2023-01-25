const router = require('express').Router();
const scheduleController = require("./controllers/schedule-controller.js");

router.get('/', (req, res) => {
    res.send({"message":'hello world'})
})

router.get('/user/:id?', (req, res) => {
    res.send('GET')
})

router.get( '/schedules/:id', scheduleController.show );
router.get( '/schedules', scheduleController.index );
router.post('/schedules', scheduleController.store );

module.exports = router;
