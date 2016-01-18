var express = require('express')
var app = express()

app.get('/node/express/foo', function (req, res) {
    res.send('Hello from foo! [express sample]');
});

app.get('/node/express/bar', function (req, res) {
    res.send('Hello from bar! [express sample]');
});

app.get('/node/express/*', function (req, res) {
    res.send('Hello from all! [express sample]');
});

app.listen(process.env.PORT)