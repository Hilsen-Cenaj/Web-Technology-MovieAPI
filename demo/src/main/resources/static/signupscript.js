/***Post Form Data***/
function sendData(myform,myFunction,url) {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData( myform );

    //Succeful Data Sending
    XHR.addEventListener( "load", function(event) {

        if (XHR.status === 200 ) {
            myFunction(XHR);
        }else{
            alert(event.target.responseText);
        }
    } );

    //Alert an error message
    XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );
    XHR.open( "POST", url );
    //Send Form Data
    XHR.send( FD );
}

const form = document.getElementById( "signupForm" );
if(form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData(this,responseSignup,"/newuser");
    });
}

function responseSignup(XHR){
    alert(XHR.responseText);
    var ask = window.confirm("Would you like to login?");
    if (ask) {
        window.location.href = "/login";
    }
}
const formlogin = document.getElementById( "loginForm" );
if(formlogin) {
    formlogin.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData(this,responseLogin,"/user");
    });
}
function responseLogin(XHR){
        window.location.href = "/user";
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
