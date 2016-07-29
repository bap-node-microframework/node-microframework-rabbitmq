"use strict";
var core_1 = require('bap-node-microframework/core');
var RabbitMQPlugin = (function () {
    function RabbitMQPlugin(container, options) {
        this.name = 'rabbitMQ';
        container.registerService(this.name, this.instance);
        core_1.Container.setApplicationInstance(container);
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