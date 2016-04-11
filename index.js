var jsonfile = require('jsonfile')
var util = require('util')
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


app.get('/', function (request, response) {
    response.sendfile('index.html');
});

app.get('/post/:info', function (req, res) {
    console.log(req.params.json);
    var Info = req.params.info.split('+');
    var name = Info[0],
        email = Info[1],
        guests = Info[2],
        comments = Info[3];
    console.log(Info);

    var object = null;
    jsonfile.readFile('public/stuff.json', function (err, obj) {
        if (!err) {
            console.log("No error");
            object = obj;
            object.attendees[object.attendees.length] = {
                "name": name,
                "email": email,
                "guests": guests,
                "comments": comments
            }

            jsonfile.writeFile('public/stuff.json', object, function (err) {
                console.log(JSON.stringify(object));
                console.error(err);
            })
        } else {
            console.log('ERROR')
            console.log(err);
        }
    });

    res.redirect('/');
});

app.listen(8080);