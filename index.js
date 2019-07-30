'use strict';

/**
 * Partie HTTP
 */

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

// app.use('/', express.static(path.normalize(`${__dirname}/public`)));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'pug');
app.use('/src', express.static(__dirname + '/src'));

app.use(session({
    secret: 'my secret text',
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./admin'));

app.use(function (req, res, next) {
    res.render('404', {
        titles: 'Erreur 404',
        session: req.session
    });
});

const port = 8000;
let HTTPServer = app.listen(port, function () {
    console.log(`Écoute sur le port: ${port}`);
});

/**
 * Partie Websocket
 */

// const SocketIo = require('socket.io');

// let ioServer = new SocketIo(HTTPServer);

// let allSquares = {};

// ioServer.on('connection', function(socket){

//     let myData = {
//         id: 'carre-' + Math.round(Math.random() * 10000),
//         top: '0px',
//         left: '0px',
//         width: '75px',
//         height: '75px',
//         backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16)
//     };

//     allSquares[myData.id] = myData;

//     socket.emit('create', myData);

//     socket.on('move', function(data){

//         data.id = myData.id;
//         data.width = myData.width;
//         data.height = myData.height;
//         data.backgroundColor = myData.backgroundColor;

//         for (let property in allSquares ) {
//             if (property !== myData.id) {
//                 // On boucle sur tous les carrés en jeu pour tester des conditions sur les propriétés des carrés
//             }
//         }

//         console.log(data);

//         ioServer.emit('update', data);

//     });
    
//     socket.on('disconnect', function(){
//         ioServer.emit('delete', myData);
//         delete allSquares[myData.id];
//     });
// });