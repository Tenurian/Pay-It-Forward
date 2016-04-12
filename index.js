var jsonfile = require('jsonfile')
var util = require('util')
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


app.get('/', function (request, response) {
    response.sendfile('index.html');
});

app.get('/post/:info', function (req, res) {
    //console.log(req.params.json);
    var Info = req.params.info.split('+');
    var name = Info[0],
        email = Info[1],
        guests = Info[2],
        comments = Info[3];
    //console.log(Info);

    var object = null;
    jsonfile.readFile('public/stuff.json', function (err, obj) {
        if (!err) {
            //console.log("No error");
            object = obj;
            object.attendees[object.attendees.length] = {
                "name": name,
                "email": email,
                "guests": guests,
                "comments": comments
            }

            jsonfile.writeFile('public/stuff.json', object, function (err) {
                //console.log(JSON.stringify(object));
                //console.logor(err);
            })
        } else {
            //console.log('ERROR')
            //console.log(err);
        }
    });

    res.redirect('/');
});

app.get('/admin', function (req, res) {
    res.sendfile('public/admin.html');
});

app.get('/admin/pass/:info', function (req, res) {
    var Info = req.params.info.split('+');
    var username = Info[0],
        password = Info[1],
        JSONOBJECT;

    jsonfile.readFile('public/users.json', function (err, obj) {
        if (!err) {
            var i, temp = obj;
            for (i = 0; i < obj.users.length; i++) {
                if (temp.users[i].username == username) {
                    temp.users[i].password = password;
                }
            }
            JSONOBJECT = temp;

            jsonfile.writeFile('public/users.json', JSONOBJECT, function (err) {
                //console.log("(67)ERROR:\n" + err);
            });

        } else {
            console.log("ERROR:\n" + err);
        }
    });

    res.redirect('/admin');
});

app.get('/admin/post/:info', function (req, res) {
    var Info = req.params.info.split('+');
    var login_username = Info[0],
        login_password = Info[1],
        output;
    //console.log(login_username + "");
    //console.log(login_password + "");

    jsonfile.readFile('public/users.json', function (err, obj) {
        if (!err) {
            var i,
                login = false;
            for (i = 0; i < obj.users.length; i++) {
                if (login_username.toString() == obj.users[i].username.toString()) {
                    if (login_password.toString() == obj.users[i].password.toString()) {
                        login = true;
                        //console.log("UserID: " + obj.users[i].username);
                        var userID = obj.users[i].username.toString();

                        jsonfile.readFile('public/stuff.json', function (err, object) {
                            if (!err) {

                                output = '<!DOCTYPE html><html><head><Title>ADMIN - Hillcrest Reunion</Title><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script><script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><link type="text/css" rel="stylesheet" href="../../main.css"></head><body><div class="img-container left"><img tooltip="Images provided by Gerald Pay" class="sidebar-img" src="../../Assets/Sidebar%20yearbook.jpg"></div><div class="img-container right"><img class="sidebar-img" src="../../Assets/guy2.jpg"></div><div class="content-back"><div class="container-fluid"><div class="row"><div class="col-sm-2 content-back-col"><div class="content-back-col cbc-def"></div></div><div class="col-sm-8 content-back-col"><div class="content-back-col cbc-alt"></div></div><div class="col-sm-2 content-back-col"><div class="content-back-col cbc-def"></div></div></div></div></div><div class="content-main"><div class="container-fluid"><div class="row"><div class="col-sm-2"></div><div id="content" class="col-sm-8 text-center"><div class="spacer"></div><h1>Admin</h1><div id="output">';

                                output += '<div id="login-success" class="alert alert-success fade in out"><strong>Success!</strong> You have successfully logged in <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></div>';

                                output += '<span class="hidden" id="userID">' + userID + '</span>';

                                output += "<div class='section text-left'>";
                                output += "<h4>Guests Attending</h4>";
                                output += "<table class='table table-hover'><thead><tr><th>Name</th><th>E-mail</th><th>Number of Guests</th><th>Comments / Dietary Needs</th></tr></thead><tbody>";


                                //console.log("Successfully grabbed stuff");
                                //console.log(JSON.stringify(object));
                                var x;
                                for (x = 0; x < object.attendees.length; x++) {
                                    var value = object.attendees[x];
                                    //console.log(value.name);
                                    output += "<tr>";
                                    output += "<td>" + value.name + "</td>";
                                    output += "<td>" + value.email + "</td>";
                                    output += "<td>" + value.guests + "</td>";
                                    output += "<td>" + value.comments + "</td>";
                                    output += "</tr>";
                                }


                                output += "</tbody></table>";
                                output += "</div>";

                                output += '</div>'
                                output += '<h4>Change Password</h4><div id="login" class="well well-lg"><form role="form" id="my-form"><div class="form-group"><label for="oldPass">Old Password:</label><input required class="form-control" type="password" id="oldPass"></div><div class="form-group"><label for="newPass1">New Password:</label><input required class="form-control" type="password" id="newPass1"></div><div class="form-group"><label for="newPass2">Confirm New Password:</label><input required class="form-control" type="password" id="newPass2"></div><br><input id="passChange" type="submit" class="btn btn-default" onclick=></form><div id="putStuffHere"></div></div>';

                                output += '</div><div class="col-sm-2"></div></div></div></div><footer class="text-center"><div class="btn btn-success" onclick="function(){ window.location.href = \'index.html\'}">Back</div></footer> <script src="../../Scripts/passChange.js"></script></body></html>';

                                res.send(output);
                                //                                //console.log()
                            } else {
                                console.log("ERROR:\n" + err);
                            }
                        });
                    }
                }
            }

            if (!login) {
                output = '<!DOCTYPE html><html><head><Title>ADMIN - Hillcrest Reunion</Title><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script><script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><link type="text/css" rel="stylesheet" href="../../main.css"></head><body><div class="img-container left"><img tooltip="Images provided by Gerald Pay" class="sidebar-img" src="../../Assets/Sidebar%20yearbook.jpg"></div><div class="img-container right"><img class="sidebar-img" src="../../Assets/guy2.jpg"></div><div class="content-back"><div class="container-fluid"><div class="row"><div class="col-sm-2 content-back-col"><div class="content-back-col cbc-def"></div></div><div class="col-sm-8 content-back-col"><div class="content-back-col cbc-alt"></div></div><div class="col-sm-2 content-back-col"><div class="content-back-col cbc-def"></div></div></div></div></div><div class="content-main"><div class="container-fluid"><div class="row"><div class="col-sm-2"></div><div id="content" class="col-sm-8 text-center"><div class="spacer"></div><h1>Admin</h1><div id="output">';

                output += '<div id="login-failed" class="alert alert-danger"><strong>Incorrect!</strong> The Username or Password entered was incorrect <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></div>';

                output += '</div></div><div class="col-sm-2"></div></div></div></div><footer class="text-center"><div class="btn btn-success" onclick="function(){ window.location.href = \'index.html\'}">Back</div></a></footer><script>setTimeout(function () {window.location.href = "/admin.html";}, 3000);</script></body></html>';

                res.send(output)


            }
        } else {
            //console.log('ERROR')
            //console.log(err);
        }

    });
});

app.listen(8080);