var mysql = require('mysql')
    , async = require('async');

var state = {
    pool: null
};

state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'book_cab'
});

exports.connect = function() {
    var pool = state.pool;
    pool.getConnection(function (err, connection) {
        if(err){
            console.log('Error while connecting to MySQL');
            throw err;
        }
    });
    return true;
};

exports.get = function() {
    return state.pool
};

exports.fixtures = function(data, done) {
    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    var names = Object.keys(data.tables);
    async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
            var keys = Object.keys(row),
                values = keys.map(function(key) { return "'" + row[key] + "'" });
            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done);
};

exports.drop = function(tables, done) {
    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
};