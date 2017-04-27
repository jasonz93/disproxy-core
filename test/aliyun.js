/**
 * Created by zhangsihao on 2017/4/26.
 */
const {expect} = require('chai');
const Aliyun = require('../libs/aliyun');

describe('Test aliyun', function () {
    const aliyun = new Aliyun('cn-beijing', 'IXqi88QaVEG9iGnV', 'wA7mJ4drL6dDj9AVC2dDrk4ohEGCXz');

    it('Test get instance info', async function () {
        let result = await aliyun.getInstanceInfoByPrivateIp('172.24.131.6');
        expect(result).not.to.be.equal(null);
    })

    it('Test get eip by private ip', async function () {
        let result = await aliyun.getEIpByPrivateIp('172.24.131.6');
        expect(result).to.be.equal('60.205.217.198');
    })
});