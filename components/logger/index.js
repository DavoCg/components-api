var components = require('adotcomponents');

module.exports = components.define({
    name: 'logger',
    events: {
        'fruits::add-resource': function onAddResource(options, done){
            return this.log(options, done);
        }
    },
    init: function init(done){
        return done();
    },
    log: function log(options, done){
        var message = options.message || '';
        var data = options.data || {};
        this.info(message, data);
        return done();
    }
});
