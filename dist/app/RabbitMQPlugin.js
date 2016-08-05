"use strict";
var core_1 = require('bap-node-microframework/core');
var amqp = require("amqp-ts");
var OptionsRabbitMQ = (function () {
    function OptionsRabbitMQ(_connectionOptions, _exchanges, _queues, _bindings) {
        this.connectionOptions = _connectionOptions;
        this.exchanges = _exchanges;
        this.queues = _queues;
        this.bindings = _bindings;
    }
    return OptionsRabbitMQ;
}());
exports.OptionsRabbitMQ = OptionsRabbitMQ;
var OptionsConnectionRabbitMQ = (function () {
    function OptionsConnectionRabbitMQ(_host, _port, _login, _password, _connectionTimeout, _authMechanism, _vhost) {
        this.host = _host;
        this.port = _port;
        this.login = _login;
        this.password = _password;
        this.connectionTimeout = _connectionTimeout;
        this.authMechanism = _authMechanism;
        this.vhost = _vhost;
    }
    return OptionsConnectionRabbitMQ;
}());
exports.OptionsConnectionRabbitMQ = OptionsConnectionRabbitMQ;
var RabbitMQPlugin = (function () {
    function RabbitMQPlugin(container, options) {
        this.name = 'rabbitMQ';
        var connection = new amqp.Connection("amqp://localhost");
        var exchanges = this.processExchanges(connection, options.exchanges);
        var queues = this.processQueues(connection, options.queues);
        this.processBindings(options.bindings, queues, exchanges);
        this.instance = {
            connection: connection,
            exchanges: exchanges,
            queues: queues,
            amqp: amqp
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
    RabbitMQPlugin.prototype.processQueues = function (connection, queuesNames) {
        var queues = new Array();
        for (var _i = 0, queuesNames_1 = queuesNames; _i < queuesNames_1.length; _i++) {
            var queueName = queuesNames_1[_i];
            var q = connection.declareQueue(queueName);
            queues[queueName] = q;
        }
        return queues;
    };
    RabbitMQPlugin.prototype.processExchanges = function (connection, exchangesNames) {
        var exchanges = new Array();
        for (var _i = 0, exchangesNames_1 = exchangesNames; _i < exchangesNames_1.length; _i++) {
            var exchangeName = exchangesNames_1[_i];
            var q = connection.declareExchange(exchangeName);
            exchanges[exchangeName] = q;
        }
        return exchanges;
    };
    RabbitMQPlugin.prototype.processBindings = function (bindings, queues, exchanges) {
        for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
            var binding = bindings_1[_i];
            queues[binding.queue].bind(exchanges[binding.exchange]);
        }
    };
    return RabbitMQPlugin;
}());
exports.RabbitMQPlugin = RabbitMQPlugin;
//# sourceMappingURL=RabbitMQPlugin.js.map