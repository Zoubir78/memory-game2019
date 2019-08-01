'use strict';

var express = require('express');
var router = express.Router();
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zoubir94:Zoubir-94@cluster0-2hepw.mongodb.net/joueurs?retryWrites=true&w=majority";
const dbName = 'game';

var datas = {};

router.use(function (req, res, next) {
    datas = app.locals;
    datas.session = req.session;
    next();
});

router.get('/', function (req, res, next) {
    datas.title = 'Memory game';
    res.render('home', datas);
});

router.get('/game', function (req, res, next) {
    datas.title = 'Amusez-vous bien !';
    res.render('game', datas);
});

router.get('/register', function (req, res, next) {
    if (req.body.identifiant) {
        app.locals.msg = {
            text: 'You are already registered',
            class: 'primary'
        };
        res.redirect('/connect');
    } else {
        datas.title = 'Register to play';
        res.render('register', datas);
    }
});

router.get('/connect', function (req, res, next) {
    if (req.session.identifiant) {
        app.locals.msg = {
            text: 'You are already logged',
            class: 'primary'
        };
        res.redirect('/');
    } else {
        datas.title = 'Login to play';
        res.render('connect', datas);
    }
});

router.get('/disconnect', function (req, res, next) {
    req.session.destroy(function (err) {
        app.locals.msg = {
            text: 'You are disconnected',
            class: 'info'
        };
        res.redirect('/');
    });
});

router.get('/check', function (req, res, next) {
    MongoClient.connect(uri, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('joueurs');
        if (req.query.identifiant && req.query.mdp) {
            collection.find({
                identifiant: req.query.identifiant,
                mdp: req.query.mdp
            }).toArray(function (err, docs) {
                client.close();
                if (docs.length) {
                    req.session.identifiant = docs[0].identifiant;
                    req.session.mdp = docs[0].mdp;
                    app.locals.msg = {
                        text: 'You are connected',
                        class: 'success'
                    };
                    // datas.avatar = req.query.avatar;
                    res.redirect('/game');

                } else {
                    app.locals.msg = {
                        text: 'Bad informations',
                        class: 'danger'
                    };
                    res.redirect('/connect');
                }
            });
        } else {
            app.locals.msg = {
                text: 'Missing datas',
                class: 'danger'
            };
            res.redirect('/connect');
        }
    });
});

router.post('/register', function (req, res, next) {
    MongoClient.connect(uri, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('joueurs');
        if (req.body.identifiant && req.body.mdp) {
            collection.insertOne({
                identifiant: req.body.identifiant,
                mdp: req.body.mdp,
                avatar: req.body.avatar
            }, function (err) {
                client.close();
                app.locals.msg = {
                    text: 'You are registered',
                    class: 'success'
                };
                res.redirect('/connect');
            });
        } else {
            app.locals.msg = {
                text: 'Missing datas',
                class: 'danger'
            };
            res.redirect('/register');
        }
    });
});

module.exports = router;