function learnMore(){
    //new comment
    var searchtext=document.getElementById("text");
    var details=document.getElementById("details");
    // set up a request
	var request = new XMLHttpRequest();
    // keep track of the request
    request.onreadystatechange = function() {
    // check if the response data send back to us 
    if(request.readyState === 4) {
        // add a border
        details.style.border = '3px solid #000000';
        // check if the request is successful
        if(request.status === 200) {
            // update the HTML of the element
            var text=JSON.parse(request.responseText);
            details.innerHTML = text.Title+" "+ text.Poster;        
        }
        else {
            // otherwise display an error message
            details.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        }
    }
}
    
    var url="http://www.omdbapi.com/?apikey=edde99b1&t="+searchtext.value;
    console.log(url);
    request.open("GET",url);
    request.send();
    
}
