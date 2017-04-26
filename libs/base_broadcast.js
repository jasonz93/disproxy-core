/**
 * Created by zhangsihao on 2017/4/26.
 */
class BaseBroadcast {
    constructor(connStr, listener) {

    }

    async broadcast(msg) {
        throw new Error('Method not implemented.');
    }
}

module.exports = BaseBroadcast;