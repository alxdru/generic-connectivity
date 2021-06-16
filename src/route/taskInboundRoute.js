const router = require('express').Router();
const { TaskInboundController } = require('../controller/taskInboundController');

const taskInboundController = new TaskInboundController();
router.post('', taskInboundController.ingest);

module.exports = router;