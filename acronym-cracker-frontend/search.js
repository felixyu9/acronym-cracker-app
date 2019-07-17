let acronymEntered = document.getElementById("acronym-entered");
let searchButton = document.getElementById("search-button");
let defination = document.getElementById("defination");
//fill in your api endpoint base url
let apiBaseUrl ="blahblahblah/definations/"

searchButton.onclick = (event) =>{
    event.preventDefault()

    const theAcronym = acronymEntered.value;
    const request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', apiBaseUrl + theAcronym, true)

    request.onload = function() {
        let data = JSON.parse(this.response)
        const def = "Definitions: <br />"
        if(data.length > 0){
            defination.innerHTML = def + data[0].defination;
        }else{
            defination.innerHTML = def + "Definition for \"" + theAcronym + "\" was not found. Please contact Wiker to add it.";
        } 
    }
    request.send()
     
}

