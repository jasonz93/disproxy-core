/**
 * Created by zhangsihao on 2017/4/26.
 */
const url = require('url');

class ConnectorManager {
    constructor() {
        this.broadcasts = {
            redis: require('./redis_broadcast')
        };
        this.mq = {
            redis: require('./redis_message_queue')
        };
    }

    registerBroadcastSchema(schema, constructor) {
        this.broadcasts[schema] = constructor;
    }

    getBroadcast(connUrl, listener) {
        let parsed = url.parse(connUrl);
        let protocol = parsed.protocol.replace(':', '');
        let cons = this.broadcasts[protocol];
        if (cons) {
            return new cons(connUrl, listener);
        } else {
            throw new Error('Broadcast protocol %s not registered.', protocol);
        }
    }

    registerMessageQueue(schema, constructor) {
        this.mq[schema] = constructor;
    }

    getMessageQueue(connUrl, listener) {
        let parsed = url.parse(connUrl);
        let protocol = parsed.protocol.replace(':', '');
        let cons = this.mq[protocol];
        if (cons) {
            return new cons(connUrl, listener);
        } else {
            throw new Error('Message queue protocol %s not registered.', protocol);
        }
    }
}

module.exports = ConnectorManager;