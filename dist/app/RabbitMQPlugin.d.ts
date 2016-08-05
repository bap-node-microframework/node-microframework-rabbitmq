export declare class OptionsRabbitMQ {
    connectionOptions: OptionsConnectionRabbitMQ;
    exchanges: Array<string>;
    queues: Array<string>;
    bindings: Array<any>;
    constructor(_connectionOptions: OptionsConnectionRabbitMQ, _exchanges: Array<string>, _queues: Array<string>, _bindings: Array<any>);
}
export declare class OptionsConnectionRabbitMQ {
    host: string;
    port: number;
    login: string;
    password: string;
    connectionTimeout: number;
    authMechanism: string;
    vhost: string;
    constructor(_host: string, _port: number, _login: string, _password: string, _connectionTimeout: number, _authMechanism: string, _vhost: string);
}
export declare class RabbitMQPlugin {
    private instance;
    private name;
    constructor(container: any, options: OptionsRabbitMQ);
    getInstance(): any;
    getName(): String;
    private processQueues(connection, queuesNames);
    private processExchanges(connection, exchangesNames);
    private processBindings(bindings, queues, exchanges);
}
