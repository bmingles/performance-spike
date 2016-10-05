"use strict";
var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.get('/favicon.ico', function (req, res) {
    res.send(200);
});
app.get('/', function (req, res) {
    res.render('index', { title: 'Home', message: 'Hello!' });
});
var _loop_1 = function(char) {
    app.get('/' + char, function (req, res) {
        setTimeout(function () {
            res.redirect('/data_' + char);
        }, 1000);
    });
};
for (var _i = 0, _a = 'abcdefghijklmnopqrstuvwxyz'; _i < _a.length; _i++) {
    var char = _a[_i];
    _loop_1(char);
}
var _loop_2 = function(char) {
    app.get('/data_' + char, function (req, res) {
        setTimeout(function () {
            res.redirect('/data2_' + char);
        }, 1000);
    });
};
for (var _b = 0, _c = 'abcdefghijklmnopqrstuvwxyz'; _b < _c.length; _b++) {
    var char = _c[_b];
    _loop_2(char);
}
for (var _d = 0, _e = 'abcdefghijklmnopqrstuvwxyz'; _d < _e.length; _d++) {
    var char = _e[_d];
    app.get('/data2_' + char, function (req, res) {
        setTimeout(function () {
            res.send('Data!');
        }, 3000);
    });
}
app.listen(3000, function () {
    console.log('Listening on 3000.');
});
