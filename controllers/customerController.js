var db = require('../database/mysql_db');
exports.getAllCustomer = function(req, res, next) {
    db.get().query('SELECT * FROM customer', function (err, rows) {
        if(err){
            return next(err);
        }else{
            res.status(200).send(rows);
        }
    });
};

exports.createCustomer = function(req, res, next){
    var data = {
        tables: {
            customer: [{
                customer_name: req.body.customer_name,
                customer_number: req.body.customer_number
            }]
        }
    };
    db.fixtures(data, function (err) {
        if (err) {
            return next(err);
        }
        var query = 'SELECT * FROM customer ' +
            'WHERE customer_number=? ';
        var values = [req.body.customer_number];
        db.get().query(query, values, function (err, rows) {
            if (err) {
                return next(err);
            } else {
                return res.status(201).send(rows);
            }
        });
    });
};
