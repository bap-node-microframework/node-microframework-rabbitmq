"use strict";
var RabbitMQPlugin_1 = require('../app/RabbitMQPlugin');
var optionsConnectionRabbitMQ = new RabbitMQPlugin_1.OptionsConnectionRabbitMQ("localhost", 5672, "guest", "guest", 10000, 'AMQPLAIN', '');
var optionsRabbitMQ = new RabbitMQPlugin_1.OptionsRabbitMQ(optionsConnectionRabbitMQ, ["ex1", "ex2"], ["queue1", "queue2"], [{ queue: "queue1", exchange: "ex2" }, { queue: "queue2", exchange: "ex1" }]);
var rabbit = new RabbitMQPlugin_1.RabbitMQPlugin(null, optionsRabbitMQ);
var rabbitMQ = rabbit.getInstance();
var message = new rabbitMQ.amqp.Message("Salut ca va ?");
rabbitMQ.exchanges.ex1.send(message);
console.log("Message delivered");
//# sourceMappingURL=send.js.map