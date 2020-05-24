
window.addEventListener( "load", function () {
    function sendData() {
        const XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const FD = new FormData( form );

        // Define what happens on successful data submission
        XHR.addEventListener( "load", function(event) {
            alert(event.target.responseText);
            if (XHR.status !== 400) {
                var ask = window.confirm("Would you like to login?");
                if (ask) {
                    window.location.href = "login.html";
                }
            }
        } );

        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
            alert( 'Oops! Something went wrong.' );
        } );

        // Set up our request
        XHR.open( "POST", "/signup" );

        // The data sent is what the user provided in the form
        XHR.send( FD );
    }

    // Access the form element...
    const form = document.getElementById( "signupForm" );

    // ...and take over its submit event.
    form.addEventListener( "submit", function ( event ) {
        event.preventDefault();

        sendData();

    } );
} );