import { Container } from 'bap-node-microframework/core';
import * as amqp from "amqp-ts";

export class RabbitMQPlugin {
    private instance: any;
    private name: String = 'rabbitMQ';

    constructor(container, options) {

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
            Container.setApplicationInstance(container);
        }
    }

    getInstance() {
        return this.instance;
    }

    getName() {
        return this.name;
    }
}