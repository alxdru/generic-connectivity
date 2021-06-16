const { APIError } = require('../../utils/ApiError');
const { broker } = require('../broker');

class TaskInboundController {

    // Ingest and send message to event mesh
    ingest(req, res, next) {
        const { task } = req.body;

        if (!task) next(new APIError('Please send a proper request with proper task..'));

        try{
            broker.writeTasksMessage(task);
            res.json({
                status: 200, 
                message: 'Message has been received and forwarded properly.'
            })
        } catch (e) {
            next(new APIError(`Ingestion failed with error: ${e.message}`));
        }
    }

}

module.exports.TaskInboundController = TaskInboundController;