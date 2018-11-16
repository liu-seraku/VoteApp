var app = require('express')(); //expressを使うため
var http = require('http').Server(app); //expressを使って通信を扱う
var io = require('socket.io')(http); //socketを使うため
var POST = process.env.PORT || 8080;

//ルートディレクトリにアクセスした時に動く処理
app.get('/', function (req, res) {
    //index.htmlにリダイレクトする
    res.sendFile(__dirname + '/index.html');
});

app.get('/resetcss.css', function (req, res) {
    res.sendFile(__dirname + '/resetcss.css');
});

app.get('/stylesheet.css', function (req, res) {
    res.sendFile(__dirname + '/stylesheet.css');
});

app.get('/image/curtains.jpg', function (req, res) {
    res.sendFile(__dirname + '/image/curtains.jpg');
});

app.get('/image/curtains-l.jpg', function (req, res) {
    res.sendFile(__dirname + '/image/curtains-l.png');
});

app.get('/image/coin.png', function (req, res) {
    res.sendFile(__dirname + '/image/coin.png');
});

app.get('/behavior.js', function (req, res) {
    res.sendFile(__dirname + '/behavior.js');
});

io.on('connection', function (socket) {
    socket.on('vote', function (msg) {
        io.emit('vote', msg);
    });
    socket.on('set points', function (msg) {
        io.emit('set points', msg);
    });
    socket.on('reset board', function (msg) {
        io.emit('reset board', msg);
    });
});

//接続待ち状態になる
http.listen(POST, function () {
    console.log('接続開始', POST);
});