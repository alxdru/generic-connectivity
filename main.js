"use strict";

const { apiInit } = require('./src/api');
const { broker } = require('./src/broker');

function initializeSystem() {
    console.log('Initializing system 0/2..');
    broker.setup(() => {console.log('Broker initialized 1/2!')});

    console.log('Setting up API for external communication');
    apiInit(() => {console.log('API for external use in place 2/2!')});
}

initializeSystem();