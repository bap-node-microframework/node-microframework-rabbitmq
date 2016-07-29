import { RabbitMQPlugin } from '../app/RabbitMQPlugin';
import * as amqp from "amqp-ts";

let rabbit = new RabbitMQPlugin(null, {});

let rabbitMQ = rabbit.getInstance();

let message = new amqp.Message("Salut ca va ?");
rabbitMQ.queue.send(message);
console.log("Message delivered");