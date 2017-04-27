/**
 * Created by zhangsihao on 2017/4/26.
 */
const redis = require('redis');
const url = require('url');
const BaseMessageQueue = require('./base_message_queue');
const Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);

class RedisMessageQueue extends BaseMessageQueue {
    constructor(connStr, listener) {
        super();
        let connUrl = url.parse(connStr);
        let redisOpts = {};
        if (connUrl.auth) {
            redisOpts.password = connUrl.auth;
        }
        if (connUrl.hostname) {
            redisOpts.host = connUrl.hostname;
        }
        if (connUrl.port) {
            redisOpts.port = connUrl.port;
        }
        if (connUrl.pathname) {
            this.topic = connUrl.pathname.slice(1);
        } else {
            throw new Error('Redis broadcast url must contains path.');
        }
        this.redis = redis.createClient(redisOpts);
        if (listener) {
            let recvFunc = () => {
                this.redis.blpop(this.topic, 1, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (data !== null) {
                            listener(JSON.parse(data[1]));
                        }
                    }
                    recvFunc();
                });
            };
            recvFunc();
        }
    }

    async send(msg) {
        return await this.redis.rpush(this.topic, JSON.stringify(msg));
    }
}

module.exports = RedisMessageQueue;