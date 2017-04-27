/**
 * Created by zhangsihao on 2017/4/26.
 */
const BaseBroadcast = require('./base_broadcast');
const redis = require('redis');
const url = require('url');
const Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);

class RedisBroadcast extends BaseBroadcast {
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
        if (listener) {
            this.redisSub = redis.createClient(redisOpts);
            this.redisSub.on('message', (topic, msg) => {
                if (topic === this.topic) {
                    listener(JSON.parse(msg));
                }
            });
        }
        this.redisSub.subscribe(this.topic);
        this.redisPub = redis.createClient(redisOpts);
    }

    async broadcast(msg) {
        return await this.redisPub.publishAsync(this.topic, JSON.stringify(msg));
    }
}

module.exports = RedisBroadcast;