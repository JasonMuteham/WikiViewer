var wiki;

var goButtonHTML = document.getElementById("goButton"); 
goButtonHTML.onclick = function(event){goButton(event)};

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function loadData(sObj){
    console.log(sObj.query.search[0].title);
    console.log(sObj.query.search[0].snippet);
    for(f=0; f<sObj.query.search.length; f++){
        var cardHTML = document.getElementById("card-"+f); 
        var cardTitleHTML = document.getElementById("card-title-"+f); 
        var cardTextHTML = document.getElementById("card-text-"+f); 
        cardTitleHTML.innerHTML = sObj.query.search[f].title;
        cardTextHTML.innerHTML = sObj.query.search[f].snippet + '....';
        cardHTML.classList.remove('animated', 'zoomIn');
        cardHTML.classList.add('animated', 'zoomIn');
        cardHTML.classList.replace('invisible',"visible");
    }
}

function searchWiki(sText){
    var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + sText + "&format=json&origin=*" ;

    var client = new HttpClient();
    return client.get(url, function(data){
        wiki = JSON.parse(data);
        loadData(wiki);
    });
}

function goButton(event){
    if (!(event.keyCode == 13 || event.type == "click")){return};

    var inp = document.getElementById("search");
    if (inp.value == ""){return};

    searchWiki(inp.value);
}

function goWiki(event){

    var cardNo = event;
    var pageId = wiki.query.search[cardNo].pageid;
    var wikiURL = "https://en.wikipedia.org/?curid=" + pageId;
    var win = window.open(wikiURL, '_blank');
    win.focus();
}

