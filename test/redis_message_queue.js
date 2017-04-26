/**
 * Created by zhangsihao on 2017/4/26.
 */
const {expect} = require('chai');
const RedisMessageQueue = require('../libs/redis_message_queue');

describe('Test redis message queue', function () {
    it('Test', function (done) {
        const mq = new RedisMessageQueue('redis://localhost:6379/disproxy_mq_test', (msg) => {
            expect(msg).to.be.deep.equal({
                foo: 'bar'
            });
            done();
        });
        setTimeout(() => {
            mq.send({
                foo: 'bar'
            })
        }, 500);
    })
})