var db = require('../database/mysql_db');
var moment = require('moment');

exports.getAllRequestStatus = function (req, res, next) {
    db.get().query('SELECT * FROM cab_request_details', function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.status(200).send(rows);
        }
    });
};

exports.getRequestsQueue = function (req, res, next) {
    db.get().query('SELECT * FROM cab_request_details WHERE cr_status=?',['Waiting'], function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.status(200).send(rows);
        }
    });
};

exports.getOngoingRequests = function (req, res, next) {
    db.get().query('SELECT * FROM cab_request_details WHERE cr_status=?',['Ongoing'], function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.status(200).send(rows);
        }
    });
};

exports.getCompletedRequests = function (req, res, next) {
    db.get().query('SELECT * FROM cab_request_details WHERE cr_status=?',['Completed'], function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.status(200).send(rows);
        }
    });
};

exports.makeCabRequest = function (req, res, next) {
    // Check if customer has already requested a cab and
    // if it is in  waiting or ongoing state,
    // he can't request for another.
    var query = 'SELECT ?? FROM ?? ' +
        'WHERE ??=? AND ' +
        '?? IN (?,?) ' +
        'ORDER BY ?? DESC';
    var values = ['cr_status', 'cab_request_details', 'cr_customer_id', req.body.customer_id, 'cr_status',
        'Waiting', 'Ongoing', 'cr_requested_time'];
    db.get().query(query, values, function (err, rows) {
        if (err) {
            return next(err)
        } else if (rows.length > 0) {
            var error = {
                message: "Can't Request cab as the current request is in " + rows[0].cr_status +' status'
            };
            return next(error);
        }
        var data = {
            tables: {
                cab_request_details: [{cr_cusomter_id: req.body.cusomter_id}]
            }
        };
        db.fixtures(data, function (err) {
            if (err) {
                return next(err);
            }
            var query = 'SELECT * FROM cab_request_details ' +
                'WHERE cr_cusomter_id=? ' +
                'ORDER BY cr_requested_time desc ' +
                'LIMIT 1';
            var values = [req.body.cusomter_id];
            db.get().query(query, values, function (err, rows) {
                if (err) {
                    return next(err);
                } else {
                    return res.status(201).send(rows);
                }
            });
        });
    });
};

exports.acceptRequest = function (req, res, next){
    var query = "UPDATE ?? " +
        "SET ??=?, ??=?, ??=? " +
        "WHERE ?? = ? AND ??=?";
    var values = ['cab_request_details',
        'cr_driver_id', req.body.driver_id,
        'cr_status', 'Ongoing',
        'cr_request_accepted_time', moment().format("YYYY-MM-DD hh:mm:ss"),
        'cr_status', 'Waiting', 'cr_customer_id', req.body.customer_id];
    db.get().query(query, values, function (err, rows) {
        if(err){
            return next(err);
        }
        query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        values = ['cab_request_details', 'cr_driver_id', req.body.driver_id, 'cr_customer_id', req.body.customer_id];
        db.get().query(query, values, function (err, rows) {
            if(err){
                return next(err);
            }
            res.status(200).send(rows);
        });
    });
};

exports.completeRequest = function (req, res, next){
    var query = "UPDATE ?? " +
        "SET ??=?, ??=? " +
        "WHERE ?? = ? AND ??=? AND ??=?";
    var values = ['cab_request_details',
        'cr_status', 'Complete',
        'cr_request_completed_time', moment().format("YYYY-MM-DD hh:mm:ss"),
        'cr_status', 'Ongoing', 'cr_customer_id', req.body.customer_id, 'cr_driver_id', req.body.driver_id];
    db.get().query(query, values, function (err, rows) {
        if(err){
            return next(err);
        }
        query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        values = ['cab_request_details', 'cr_driver_id', req.body.driver_id, 'cr_customer_id', req.body.customer_id];
        db.get().query(query, values, function (err, rows) {
            if(err){
                return next(err);
            }
            res.status(200).send(rows);
        });
    });
};