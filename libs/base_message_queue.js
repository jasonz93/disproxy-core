/**
 * Created by zhangsihao on 2017/4/26.
 */
class BaseMessageQueue {
    constructor(connStr, listener) {

    }

    async send(msg) {
        throw new Error('Method not implemented.');
    }
}

module.exports = BaseMessageQueue;