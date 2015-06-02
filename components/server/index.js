var components = require('adotcomponents');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = components.define({
    name: 'server',
    init: function init(done){
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.listen(this.config.port, this.config.bind, done);
    },
    addRoute: function addRoute(method, route, fn){
        this.app[method](route, fn);
    }
});
