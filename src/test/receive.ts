import { RabbitMQPlugin, OptionsRabbitMQ, OptionsConnectionRabbitMQ } from '../app/RabbitMQPlugin';

let optionsConnectionRabbitMQ = 
    new OptionsConnectionRabbitMQ("localhost", 5672, "guest", "guest", 10000, 'AMQPLAIN', '');

let optionsRabbitMQ = new OptionsRabbitMQ(optionsConnectionRabbitMQ, 
    ["ex1", "ex2"],
    ["queue1", "queue2"],
    [{ queue: "queue1" , exchange :"ex2"}, { queue:"queue2", exchange:"ex1"}]);

let rabbit = new RabbitMQPlugin(null, optionsRabbitMQ);

let rabbitMQ = rabbit.getInstance();


rabbitMQ.queues.queue2.activateConsumer(function(message) {
    console.log('received message: ' + message.getContent());
}, {noAck: true});