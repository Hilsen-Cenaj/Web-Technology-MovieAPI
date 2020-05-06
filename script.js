var searchtext=document.getElementById("searchbar");
var details=document.getElementById("details");
var text;

function learnMore(){
    
    // set up a request
	var request = new XMLHttpRequest();
    // keep track of the request
    request.onreadystatechange = function() {
        // check if the response data send back to us 
        if(request.readyState === 4) {
            // add a border
            details.style.border = '1px solid rgb(160, 160, 160)';
            details.style.borderRadius="8px"
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
    text=JSON.parse(request.responseText);

    if(text.Title!==undefined){
        //Clear content before writing
        details.innerHTML="";

        //Build Title
        var title=document.createElement("H2");
        title.textContent=text.Title;
        title.style.textAlign="center";
        details.appendChild(title);

        //Build Content
        var content=document.createElement("P");
        content.setAttribute("id","content")
        content.innerHTML= " <b>Release date:</b> " + text.Released + " <br><b>Duration:</b> " + text.Runtime +
        " <br><b>Genre:</b> " + text.Genre + "<br>" +text.Plot + "<br>" ;
        content.style.textAlign="right";
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
        printJSON(document.getElementById("content"),text)
        active = true;
    }else{
        moreBtn.innerHTML = "More";
        content.innerHTML= " <b>Release date:</b> " + text.Released + " <br><b>Duration:</b> " + text.Runtime +
        " <br><b>Genre:</b> " + text.Genre + "<br>" +text.Plot + "<br>" ;
        active = false;
    }
}

function printJSON(content,jsontext){
    content.innerHTML="";
    for(j in jsontext){
        if(jsontext[j]!=="N/A" && j!=="Poster"){
            content.innerHTML+="<b>"+j+"</b>"+": "+jsontext[j]+"<br>";
        }
    }
}