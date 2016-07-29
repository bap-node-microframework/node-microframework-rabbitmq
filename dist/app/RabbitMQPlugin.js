"use strict";
var core_1 = require('bap-node-microframework/core');
var amqp = require("amqp-ts");
var RabbitMQPlugin = (function () {
    function RabbitMQPlugin(container, options) {
        this.name = 'rabbitMQ';
        var connection = new amqp.Connection("amqp://localhost");
        var exchange = connection.declareExchange("ExchangeName");
        var queue = connection.declareQueue("QueueName", { durable: false });
        this.instance = {
            connection: connection,
            exchange: exchange,
            queue: queue
        };
        if (container) {
            container.registerService(this.name, this.instance);
            core_1.Container.setApplicationInstance(container);
        }
    }
    RabbitMQPlugin.prototype.getInstance = function () {
        return this.instance;
    };
    RabbitMQPlugin.prototype.getName = function () {
        return this.name;
    };
    return RabbitMQPlugin;
}());
exports.RabbitMQPlugin = RabbitMQPlugin;
//# sourceMappingURL=RabbitMQPlugin.js.map