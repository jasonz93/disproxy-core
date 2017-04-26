/**
 * Created by zhangsihao on 2017/4/26.
 */
const {expect} = require('chai');
const RedisBroadcast = require('../libs/redis_broadcast');

describe('Test redis broadcast', function () {
    it('Test broadcast', function (done) {
        const broadcast = new RedisBroadcast('redis://localhost:6379/disproxy_broadcast_test', (msg) => {
            expect(msg).to.be.deep.equal({
                foo: 'bar'
            });
            done();
        });
        setTimeout(() => {
            broadcast.broadcast({
                foo: 'bar'
            }).then();
        }, 500);
    })
});