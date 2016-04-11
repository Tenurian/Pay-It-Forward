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

    console.log(document.getElementById('name').value);
    console.log(document.getElementById('email').value);
    console.log(document.getElementById('guests').value);
    console.log(document.getElementById('comments').value);

    return false;
});