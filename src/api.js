const express = require('express');

const taskInboundRoute = require('./route/taskInboundRoute');

const port = process.env.PORT || 4003;
const app = express();

function apiInit(success) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/newsTasks', taskInboundRoute);

    const server = app.listen(port, () => {
        console.log(`Api services started! Server listening on port:${port}.`);
        success();
    });
}

module.exports.apiInit = apiInit;