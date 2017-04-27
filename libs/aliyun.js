/**
 * Created by zhangsihao on 2017/4/26.
 */
const request = require('request-promise');
const ALY = require('aliyun-sdk');

class Aliyun {
    constructor(regionId, accessKey, accessSecret) {
        this.regionId = regionId;
        this.accessKey = accessKey;
        this.accessSecret = accessSecret;
        this.ecs = new ALY.ECS({
            accessKeyId: accessKey,
            secretAccessKey: accessSecret,
            endpoint: 'https://ecs.aliyuncs.com',
            apiVersion: '2014-05-26'
        });
    }

    async getEIpByPrivateIp(privateIp) {
        let instanceInfo = await this.getInstanceInfoByPrivateIp(privateIp);
        if (instanceInfo && instanceInfo.EipAddress) {
            return instanceInfo.EipAddress.IpAddress;
        } else {
            return null;
        }
    }

    async getInstanceInfoByPrivateIp(privateIp) {
        let result = await new Promise((resolve, reject) => {
            this.ecs.describeInstances({
                RegionId: this.regionId,
                PrivateIpAddresses: JSON.stringify([privateIp])
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
        let instances = result.Instances.Instance;
        if (instances.length) {
            return instances[0];
        } else {
            return null;
        }
    }
}

module.exports = Aliyun;