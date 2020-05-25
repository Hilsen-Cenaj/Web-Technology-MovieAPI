var button=document.getElementsByClassName("dltBtn");
for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click",function () {
        console.log("readyto delete");
        var code=this.getAttribute("code");
        var title=this.getAttribute("title");
        deleteBtn(code,title);
    });
}

function deleteBtn(code,title){
    const XHR = new XMLHttpRequest();


    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
        alert(event.target.responseText);
        if (XHR.status !== 400) {
                window.location.reload();
        }
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( "DELETE", "/user/bookmark/"+code);
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // The data sent is what the user provided in the form
    XHR.send("title="+title);
}

