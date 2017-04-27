/**
 * Created by zhangsihao on 2017/4/26.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const ProxySchema = new Schema({
    external_ip: String,
    internal_ip: String,
    port: Number,
    protocol: String,
    type: String,
    bans: {
        type: [String],
        default: []
    },
    create_at: Date,
    update_at: Date
});

exports.AttachModel = function (mongoose) {
    return mongoose.model('Proxy', ProxySchema);
};

exports.Schema = ProxySchema;