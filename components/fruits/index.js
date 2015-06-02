var components = require('adotcomponents');

module.exports = components.define({
    name: 'fruits',
    required: ['server', 'database'],
    init: function init(done){
        this.server.addRoute('post', '/fruits', this.addFruit);
        this.server.addRoute('get', '/fruits', this.getFruits);
        return done();
    },
    addFruit: function addFruit(req, res, next){
        var options = {index: 'resource', type: 'fruits', body: req.body};

        this.database.addElement(options, function(err, fruit){
            if(err) return next(err);
            return res.status(200).send(fruit);
        });
    },
    getFruits: function getFruits(req, res, next){
        var options = {index: 'resource', type: 'fruits'};

        this.database.getElements(options, function(err, fruits){
            if(err) return next(err);
            return res.status(200).send(fruits);
        });
    }
});
