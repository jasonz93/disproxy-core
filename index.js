/**
 * Created by zhangsihao on 2017/4/26.
 */
exports.Interfaces = {
    BaseBroadcast: require('./libs/base_broadcast'),
    BaseMessageQueue: require('./libs/base_message_queue')
};
exports.Aliyun = require('./libs/aliyun');
exports.RedisBroadcast = require('./libs/redis_broadcast');
exports.RedisMessageQueue = require('./libs/redis_message_queue');
exports.Models = {
    Proxy: require('./models/proxy')
};
exports.ConnectorManager = require('./libs/connector_manager');