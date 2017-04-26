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
    prototype: String,
    type: String,
    bans: [String],
    create_at: Date,
    update_at: Date
});

exports.AttachModel = function (mongoose) {
    mongoose.model('Proxy', ProxySchema);
};

exports.Schema = ProxySchema;