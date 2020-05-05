window.onload = function(){
    document.getElementById("moreBtn").addEventListener("click", moreBtnClick);
};

var searchtext=document.getElementById("text");
var details=document.getElementById("details");
var moreBtn;
var active=false;

moreBtn.style.display = "none";

function learnMore(){
    
    // set up a request
	var request = new XMLHttpRequest();
    // keep track of the request
    request.onreadystatechange = function() {
        // check if the response data send back to us 
        if(request.readyState === 4) {
            // add a border
            details.style.border = '1px solid #000000';
            details.style.background="rgba(24, 24, 24, 0.055)"
            // check if the request is successful
            if(request.status === 200) {
                // update the HTML of the element
                updateDetails(request);
            }
            else {
                // otherwise display an error message
                details.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
            }
        }
    }
    
    var url="http://www.omdbapi.com/?apikey=edde99b1&t="+searchtext.value;
    console.log("GET URL: "+url);
    request.open("GET",url);
    request.send();
    
}

function updateDetails(request){
    var text=JSON.parse(request.responseText);
    moreBtn=document.getElementById("moreBtn");

    if(text.Title!==undefined){

        details.innerHTML = text.Title + "<br>" + text.Plot + "<br>" + 
        " <b>Release date:</b> " + text.Released + " <b>Duration:</b> " + text.Runtime +
        " <b>Genre:</b> " + text.Genre + "<br>";

        /*Addind More button*/
        moreBtn.style.display = "block";
        details.appendChild(moreBtn);
        
        /*Adding Poster*/
        var poster=document.createElement("IMG");
        poster.setAttribute("src", text.Poster);
        details.appendChild(poster);
    }else if(searchtext.value===""){
        details.style.border = 'none';
        details.style.background="none";
        details.innerHTML="";
    }else{
        details.innerHTML="Sorry , There are no results for \" "+searchtext.value+" \"";
    }
}

/**
 * Change Text in button "moreBtn"
 */
function moreBtnClick(){
    if(active === false){
        moreBtn.innerHTML = "Λιγότερα";
        active = true;
    }else{
        moreBtn.innerHTML = "Περισσότερα";
        active = false;
    }
}