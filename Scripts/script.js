//function processForm(e) {
//    console.log("WHEEEEEEE");
//    console.log(e.name);
//    console.log(e.email);
//    console.log(e.guests);
//    console.log(e.comments);
//
//
//    return false;
//}
//
//var form = document.getElementById('sign-up');
//if (form.attachEvent) {
//    form.attachEvent("submit", processForm);
//} else {
//    form.addEventListener("submit", processForm);
//}

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



    return false;
});