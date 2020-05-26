/***Deleting a bookmark***/
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
    //Successful data sending
    XHR.addEventListener( "load", function(event) {
        alert(event.target.responseText);// Display response from XHR
        if (XHR.status !== 400) {
                window.location.reload();//Reload user/bookmarks since we deleted an item
        }
    } );

    //Alert error message
    XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request for Delete
    XHR.open( "DELETE", "/user/bookmark/"+code);
    //Using this to read correct the body of XHR
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    XHR.send("title="+title);
}

/***Display more information about a title***/
var moreBtn=document.getElementsByClassName("moreBtnBookmark");

for (var i = 0; i < moreBtn.length; i++) {
    //Make an attribute at "more" button to save if it shows already the details
    moreBtn[i].setAttribute("active","false");

    moreBtn[i].addEventListener("click",function () {
        var title=this.getAttribute("title");//Saves the title
        var active=this.getAttribute("active");//Saves if it is active

        if(active === "false"){
            //if active = false the make a div element with id = title
            var details=document.createElement("div");
            details.setAttribute("id", title);
            details.setAttribute("class", "description");
            //insert this div
            this.parentNode.insertBefore(details, this.nextSibling);
            this.innerHTML = "Hide";
            this.setAttribute("active","true");//active=true

            learnMore(title, details);

        }else {
            this.innerHTML = "More";
            //remove div element with id=title
            document.getElementById(title).remove();
            this.setAttribute("active","false");//active=false
        }

    });


}

function learnMore(title, details){
    //Progress Indicator
    var progressImg=document.createElement("IMG");
    progressImg.src = '/progress.gif';
    progressImg.setAttribute("th:src","@{/progress.gif}");
    progressImg.alt = 'Please wait...';

    // set up a request
    var request = new XMLHttpRequest();

    // keep track of the request
    request.onreadystatechange = function() {
        // check if the response data send back to us
        if(request.readyState === 4) {
            //If progressImg has been initialized then remove it else don't remove it
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

    console.log("GET URL: "+url);
    request.open("GET",url);
    request.send();
    //Add progressIMG while waiting for response
    details.insertBefore(progressImg,details.childNodes[2]);

}

function updateDetails(request, details){
    //text holds the Json response
    var text=JSON.parse(request.responseText);

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

    /*Adding Poster with promises*/
    if(text.Poster!=="N/A"){
        new Promise(function(resolve, reject){
            var poster=document.createElement("IMG");
            poster.src=text.Poster;
            poster.onload=resolve(poster);
            /*Errors when load the poster*/
            poster.onerror=reject(poster);

        })
            .then(poster=>details.appendChild(poster))
            .catch(error => {
                poster.alt="Failed to load poster";
                details.appendChild(poster);
            });
    }
}