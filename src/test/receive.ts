import { RabbitMQPlugin } from '../app/RabbitMQPlugin';
import * as amqp from "amqp-ts";

let rabbit = new RabbitMQPlugin(null, {});

let rabbitMQ = rabbit.getInstance();

rabbitMQ.queue.activateConsumer(function(message) {
  console.log('received message: ' + message.getContent());
}, {noAck: true});