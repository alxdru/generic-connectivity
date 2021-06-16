"use strict";

/** Basic setup in respect to modules, messaging settings and getting messaging options */

const msg = require('@sap/xb-msg');
const env = require('@sap/xb-msg-env');
const xsenv = require('@sap/xsenv');
const { service } = require('../utils/config');

const taskList = {
    sendToAnnotate : { topic: 'INBOUND-NEWS' }
};

xsenv.loadEnv();


/** Start messaging client */

class Broker {
    constructor() {
        this.tasks = taskList;
        this.client = new msg.Client(env.msgClientOptions(service, [], Object.keys(taskList)));
    }

    writeTasksMessage(message) {
        const { tasks } = this;
        Object.getOwnPropertyNames(tasks).forEach((id) => {
            const task = tasks[id];
            const stream = this.client.ostream(id);
    
            const handler = () => {
                console.log('publishing message: ' + message + ' on topic: ' + task.topic);
    
                if (!stream.write(message)) {
                    console.log('wait');
                    return;
                }

                handler();
            };
    
            stream.on('drain', handler);
    
            handler();
        });
    }

    setup(success) {
    /** Messaging client handler methods */
        this.client
        .on('connected', () => {
            console.log('connected');
        })
        .on('drain', () => {
            console.log('continue');
        })
        .on('error', (error) => {
            console.log(error);
        });

        try {
            this.client.connect();
            success();
        } catch (e) {
            console.log("Error on establishing broker connection " + e.message);
        }
    }
}  

const broker = new Broker();

module.exports.broker = broker;




