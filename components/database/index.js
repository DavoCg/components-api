var components = require('adotcomponents');
var elasticsearch = require('elasticsearch');
var formatter = require('./es-formatter');

module.exports = components.define({
    name: 'database',
    init: function init(done){
        this.client = new elasticsearch.Client({
            host: this.config.host + ':' + this.config.port
        });
        return done();
    },

    addElement: function addElement(options, done){
        this.info('opts', options);
        if(!options.index || !options.type || !options.body){
            return done(new Error('Invalid options'));
        }
        this.client.create({
            index: options.index,
            type: options.type,
            body: options.body
        }, done)
    },

    getElements: function getElement(options, done){
        if(!options.index || !options.type){
            return done(new Error('Invalid options'));
        }

        this.client.search({
            index: options.index,
            type: options.type,
            body: {
                query: {
                    match_all: {}
                }
            }
        }, function(err, response){
            if(err) return done(err);
            return done(null, formatter.formatSearch(response))
        });
    }
});
