var db = require('../database/mysql_db');

exports.getAllDriver = function(req, res, next) {
    db.get().query('SELECT * FROM driver', function (err, rows) {
        if(err){
            return next(err);
        }else{
            res.status(200).send(rows);
        }
    });
};

exports.getDriverDetails = function (req, res, next) {
    var query = 'SELECT * FROM cab_request_details WHERE cr_driver_id='+req.params.id;
    db.get().query(query, function (err, rows) {
        if(err){
            return next(err);
        }else{
            res.status(200).send(rows);
        }
    });
};