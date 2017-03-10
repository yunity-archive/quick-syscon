// @flow

require('dotenv').config({silent: true})
var path = require('path')

if (!process.env.BUILD_DIR) {
    process.env.BUILD_DIR = 'build'
    if (process.env.TARGET) process.env.BUILD_DIR = path.join(process.env.BUILD_DIR, process.env.TARGET)
}
process.env.BUILD_DIR = path.resolve(__dirname, process.env.BUILD_DIR)

var meteorSettings = require('./meteor/settings.json')


var defaults = {
    PORT: '3000',
    ROOT_URL: 'http://localhost:3000',
    MONGO_URL: 'mongodb://localhost:27017/syscon',
    METEOR_SETTINGS: JSON.stringify(meteorSettings),
}

for (var key in defaults) process.env[key] = defaults[key]
