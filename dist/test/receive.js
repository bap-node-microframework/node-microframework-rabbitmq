"use strict";
var RabbitMQPlugin_1 = require('../app/RabbitMQPlugin');
var rabbit = new RabbitMQPlugin_1.RabbitMQPlugin(null, {});
var rabbitMQ = rabbit.getInstance();
rabbitMQ.queue.activateConsumer(function (message) {
    console.log('received message: ' + message.getContent());
}, { noAck: true });
//# sourceMappingURL=receive.js.map