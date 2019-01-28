/**
 * 测试 将日志推到 kafka ， 使用 winston 写入文件系统 ； 之间的并发量基准差别
 */
const Benchmark = require('benchmark');
const fs = require('fs');
const path = require('path');

const suite = new Benchmark.Suite();

const { producer } = require('../common/kafka');

const logs = fs.readFileSync(path.join(__dirname, '../logs/demo.log'), { encoding: 'utf8' });
const logsArray = logs.split('\n');

/**
 * 将日志推到 kafka
 */
async function sendMessage2Kafka(messages) {
  const payloads = [{ topic: 'test', messages }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

producer.on('ready', async () => {
  //   suite
  //     .add('Send message', () => {
  //     })
  //     .on('cycle', (event) => {
  //       console.log(String(event.target));
  //     })
  //     .run({ async: true });
  await sendMessage2Kafka(logsArray);
});

producer.on('error', err => console.error(err));
