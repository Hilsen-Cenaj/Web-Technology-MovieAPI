var button=document.getElementsByClassName("dltBtn");
for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click",function () {
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


var moreBtn=document.getElementsByClassName("moreBtnBookmark");
var text;
var active=false;

for (var i = 0; i < moreBtn.length; i++) {
    moreBtn[i].addEventListener("click",function () {

        if(!active){
            var details=document.createElement("div");
            var title=this.getAttribute("title");
            this.parentNode.insertBefore(details, this.nextSibling);
            details.setAttribute("id", "details");

            this.innerHTML = "Hide";
            learnMore(title, details);
            active = true;
        }else {
            this.innerHTML = "More";
            document.getElementById("details").remove();
            active = false;
        }

    });


}

function learnMore(title, details){
    //Progress Indicator
    var progressImg=document.createElement("IMG");
    progressImg.src = '../static/images/progress.gif';
    progressImg.setAttribute("th:src","@{images/progress.gif}");
    progressImg.alt = 'Please wait...';
    // set up a request
    var request = new XMLHttpRequest();
    // keep track of the request
    request.onreadystatechange = function() {
        // check if the response data send back to us
        if(request.readyState === 4) {
            //If progressImg has been initialized then remove it
            if(details.contains(progressImg)) {
                details.removeChild(progressImg);
            }
            // add a border
            details.style.border = '1px solid rgb(160, 160, 160)';
            details.style.borderRadius="8px";
            // check if the request is successful
            if(request.status === 200) {
                // update the HTML of the element
                updateDetails(request, details);
            }
            else {
                // otherwise display an error message
                details.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
            }
        }
    }

    var url="http://www.omdbapi.com/?apikey=edde99b1&t="+title+"&plot=full";

    //Adding plot=full on parameters if fullplot=true
    console.log("GET URL: "+url);
    request.open("GET",url);
    request.send();
    details.insertBefore(progressImg,details.childNodes[2]);

}

function updateDetails(request, details){
    text=JSON.parse(request.responseText);

    //Clear content before writing
    details.innerHTML="";

    //Build Content
    var content=document.createElement("P");
    content.setAttribute("id","content");
    content.innerHTML= " <b>Release date:</b> " + text.Released + " <br><b>Duration:</b> " + text.Runtime +
        " <br><b>Genre:</b> " + text.Genre + "<br>" +text.Plot + "<br>" ;
    //Adding Rattings
    var ratings=text["Ratings"];
    if(ratings.length!==0){
        content.innerHTML+="<br><b>Ratings: </b><br>";
        ratings.forEach(element => {
            for(i in element){
                content.innerHTML+="<b>"+i+"</b>"+": "+element[i]+" ";
            }
            content.innerHTML+="<br>";
        });
    }
    content.style.textAlign="center";
    details.appendChild(content);


    /*Adding Poster*/
    if(text.Poster!=="N/A"){
        var poster=document.createElement("IMG");
        poster.setAttribute("src", text.Poster);
        /*Errors when load the poster*/
        poster.onerror= function(){
            poster.alt="Error: could not load poster"
        }
        details.appendChild(poster);
    }
}