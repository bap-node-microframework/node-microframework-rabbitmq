import { Container } from 'bap-node-microframework/core';

export class RabbitMQPlugin {
    private instance: any;
    private name: String = 'rabbitMQ';

    constructor(container, options) {
        container.registerService(this.name, this.instance);
        Container.setApplicationInstance(container);
    }

    getInstance() {
        return this.instance;
    }

    getName() {
        return this.name;
    }
}