/***Post Form Data***/
function sendData() {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData( form );

    //Succeful Data Sending
    XHR.addEventListener( "load", function(event) {
        alert(event.target.responseText);
        if (XHR.status !== 400) {
            var ask = window.confirm("Would you like to login?");
            if (ask) {
                window.location.href = "/login";
            }
        }
    } );

    //Alert an error message
    XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );
    XHR.open( "POST", "/newuser" );
    //Send Form Data
    XHR.send( FD );
}

const form = document.getElementById( "signupForm" );
if(form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
}
/***Display Email Warning when it doesn't have the correct form***/
var email=document.querySelector("input[type=email]");
var displayWarningEmail=document.createElement("DIV");
//Insert After input=email
email.parentNode.insertBefore(displayWarningEmail,email.nextSibling);
email.addEventListener("keyup",function(){
    let regex=/\S+@\S+\.\S+/;
    if(!regex.test(email.value)){
        displayWarningEmail.display="block";
        displayWarningEmail.style.fontSize="80%";
        displayWarningEmail.style.color="red"
        displayWarningEmail.innerHTML="<br>Email should be: somebody@something.com"
    }else{
        displayWarningEmail.innerHTML="";
    }
});
