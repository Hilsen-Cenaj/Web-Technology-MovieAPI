var searchtext=document.getElementById("searchbar");
var details=document.getElementById("details");
var text;


function learnMore(myFunction,fullplot=false){
    //Progress Indicator
    var progressImg=document.createElement("IMG");
    progressImg.src = 'progress.gif';
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
                myFunction(request);
            }
            else {
                // otherwise display an error message
                details.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
            }
        }
    }
    
    var url="http://www.omdbapi.com/?apikey=edde99b1&t="+searchtext.value;

    //Adding plot=full on parameters if fullplot=true
    if(fullplot) url+="&plot=full";
    console.log("GET URL: "+url);
    request.open("GET",url);
    request.send();
    details.insertBefore(progressImg,details.childNodes[2]);
    
}

function updateDetails(request){
    text=JSON.parse(request.responseText);

    if(text.Title!==undefined){
        //Clear content before writing
        details.innerHTML="";

        //Build Title
        var title=document.createElement("H2");
        title.textContent=text.Title;
        title.style.textAlign="center";
        details.appendChild(title);
        var saveBtn=document.createElement("BUTTON");
        saveBtn.innerHTML="Save Me";
        saveBtn.setAttribute("class","button");
        saveBtn.setAttribute("id","saveBtn")
        saveBtn.setAttribute("onclick","sendData()");
        details.appendChild(saveBtn);

        //Build Content
        var content=document.createElement("P");
        content.setAttribute("id","content");
        content.innerHTML= " <b>Release date:</b> " + text.Released + " <br><b>Duration:</b> " + text.Runtime +
        " <br><b>Genre:</b> " + text.Genre + "<br>" +text.Plot + "<br>" ;
        content.style.textAlign="center";
        details.appendChild(content);
        
        /*Addind More button*/
        var moreBtn=document.createElement("BUTTON");
        moreBtn.setAttribute("class","button");
        moreBtn.setAttribute("id","moreBtn");
        moreBtn.setAttribute("onclick","moreBtnClick()");
        moreBtn.innerHTML="More";
        moreBtn.style.display = "block";
        details.appendChild(moreBtn);

        
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
    }else if(searchtext.value===""){
        /*Nothing to show ,empty search*/
        details.style.border = 'none';
        details.style.background="none";
        details.innerHTML="";
    }else{
        /*Not available movie*/
        details.innerHTML="Sorry , There are no results for \" "+searchtext.value+" \"";
    }
}

/**
 * Change Text in button "moreBtn"
 */
var active=false;
function moreBtnClick(){
    var moreBtn=document.getElementById("moreBtn");
    if(!active){
        moreBtn.innerHTML = "Less";
        //Call learnMore with function : printJSON , and fullplot=true
        learnMore(printJSON,true);
        active = true;
    }else{
        moreBtn.innerHTML = "More";
        content.innerHTML= " <b>Release date:</b> " + text.Released + " <br><b>Duration:</b> " + text.Runtime +
        " <br><b>Genre:</b> " + text.Genre + "<br>" +text.Plot + "<br>" ;
        active = false;
    }
}

function printJSON(request){
    
    var jsontext=JSON.parse(request.responseText);
    var content=document.getElementById("content");
    content.innerHTML=""; //Clear Content
    for(j in jsontext){
        //Exclude Everything with N/A , Poster , Response , Ratings ,Title , Plot
        if(jsontext[j]!=="N/A" && j!=="Poster" && j!=="Response" && j!="Ratings" &&j!=="Title" && j!=="Plot" ){
            content.innerHTML+="<b>"+j+"</b>"+": "+jsontext[j]+"<br>";
        }
    }
    //Adding Full Plot 
    content.innerHTML+="<b>Plot: </b>"+jsontext.Plot;

    //Adding Rattings
    var ratings=jsontext["Ratings"];
    if(ratings.length!==0){
        content.innerHTML+="<br><b>Ratings: </b><br>";
        ratings.forEach(element => {
            for(i in element){
                content.innerHTML+="<b>"+i+"</b>"+": "+element[i]+" ";
            }
            content.innerHTML+="<br>";
        });
    }
}



function sendData() {
    const XHR = new XMLHttpRequest();

    var title=document.getElementsByTagName("H2")[0];
    var code=document.getElementById("searchbar").value;

    console.log(title.innerHTML);
    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
        alert(event.target.responseText);

    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
        alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( "POST", "/user/bookmark/"+code);

    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // The data sent is what the user provided in the form
    XHR.send("title="+title.innerHTML);
}


