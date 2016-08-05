import { Container } from 'bap-node-microframework/core';
import * as amqp from "amqp-ts";

export class OptionsRabbitMQ {

    public connectionOptions: OptionsConnectionRabbitMQ;
    public exchanges : Array<string>;
    public queues : Array<string>;
    public bindings : Array<any>;

    constructor (_connectionOptions: OptionsConnectionRabbitMQ,
                _exchanges: Array<string>,
                _queues: Array<string>,
                _bindings: Array<any>) {
        
        this.connectionOptions = _connectionOptions;
        this.exchanges = _exchanges;
        this.queues = _queues;
        this.bindings = _bindings;
    }
}

export class OptionsConnectionRabbitMQ {

    public host: string;
    public port: number;
    public login: string;
    public password: string;
    public connectionTimeout: number;
    public authMechanism: string;
    public vhost: string;

    constructor (_host: string, 
                _port: number,
                _login: string,
                _password: string,
                _connectionTimeout: number,
                _authMechanism: string,
                _vhost: string) {

        this.host = _host;
        this.port = _port;
        this.login = _login;
        this.password = _password;
        this.connectionTimeout = _connectionTimeout;
        this.authMechanism = _authMechanism;
        this.vhost = _vhost;
    }
}

export class RabbitMQPlugin {
    private instance: any;
    private name: String = 'rabbitMQ';

    constructor(container, options: OptionsRabbitMQ) {

        var connection = new amqp.Connection("amqp://localhost");

        let exchanges = this.processExchanges(connection, options.exchanges);
        let queues = this.processQueues(connection, options.queues);
        this.processBindings(options.bindings, queues, exchanges);

        this.instance = {
            connection: connection,
            exchanges: exchanges,
            queues: queues,
            amqp: amqp
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

    private processQueues (connection: amqp.Connection, queuesNames : Array<string>) {
        let queues = new Array<Object>();
        
        for (let queueName of queuesNames) {
            let q = connection.declareQueue(queueName);
            queues[queueName] = q;
        }

        return queues;
    }

    private processExchanges (connection: amqp.Connection, exchangesNames : Array<string>) {
        let exchanges = new Array<Object>();

        for (let exchangeName of exchangesNames) {
            let q = connection.declareExchange(exchangeName);
            exchanges[exchangeName] = q;
        }

        return exchanges;
    }

    private processBindings (bindings: Array<any>, queues, exchanges) {
        for (let binding of bindings) {
            queues[binding.queue].bind(exchanges[binding.exchange]);
        }
    }
}

