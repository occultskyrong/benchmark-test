const kafka = require('kafka-node');

const { Producer, KeyedMessage } = kafka;

const { databases: { kafka: { host, port } } } = require('../config/index');

const client = new kafka.KafkaClient({ kafkaHost: `${host}:${port}` });


const producer = new Producer(client);


module.exports = {
  client,
  KeyedMessage,
  producer,
  Producer,
};
