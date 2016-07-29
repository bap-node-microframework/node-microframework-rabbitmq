"use strict";
var RabbitMQPlugin_1 = require('../app/RabbitMQPlugin');
var amqp = require("amqp-ts");
var rabbit = new RabbitMQPlugin_1.RabbitMQPlugin(null, {});
var rabbitMQ = rabbit.getInstance();
var message = new amqp.Message("Salut ca va ?");
rabbitMQ.queue.send(message);
console.log("Message delivered");
//# sourceMappingURL=send.js.map