var jsonfile = require('jsonfile')
var util = require('util')

$('#sign-up').submit(function () {
    console.log("WHEEEEEEE");
    var name = document.getElementById('name'),
        email = document.getElementById('email'),
        guests = document.getElementById('guests'),
        comments = document.getElementById('comments');

    console.log(name.value);
    console.log(email.value);
    console.log(guests.value);
    console.log(comments.value);

    if (name.value && email.value && guests.value) {
        console.log('Ready to do work');

        $('#sign-up').hide();
        document.getElementById('modal-output').innerHTML = '<div id="login-success" class = "alert alert-success fade in out" > <strong> Success! </strong> You have successfully signed up <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> </div>';

        setTimeout(function () {
            $('#myModal').modal('hide');
        }, 10000);

        var object;
        $.ajax({
            dataType: "json",
            url: "stuff.json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            success: function (data) {
                console.log('Success');
                object = data;
                object.attendees[object.attendees.length] = {
                    "name": name.value,
                    "email": email.value,
                    "guests": guests.value,
                    "comments": comments.value,
                }
                $.each(object.attendees, function (index, val) {
                    console.log("Name: " + val.name + "\nEmail: " + val.email + "\nGuests: " + val.guests + "\nComments: " + val.comments)
                });
                var stringy = JSON.stringify(object);
                console.log(stringy);

                jsonfile.writeFile('test.json', object, function (err) {
                    console.error(err)
                })
            }
        });
    }
    return false;
});