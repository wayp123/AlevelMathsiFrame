//var doca = document.getElementById("iframe1");
//var doc1 = doca.iframe.contentWindow.document;        

var doc1 = window.document; //used by ank1
var OriginalBody; //save original so can restore

window.parent.postMessage("IframeNavC", '*');

//link click event        
function doSomething(e) {
    //console.log(this.value); // this will be the clicked element

    //performMark("the");
    window.parent.postMessage(e.target.href, '*'); //send message to parent
    location.href = e.target.href //jump to link
    //alert(e.target.href);
    //alert("1");
}

function HighlightFunction(SearchTerm) { //pass multiple param via string array? else use new function, file

    if (OriginalBody == null) { OriginalBody = document.getElementsByTagName('body')[0].innerHTML; }
    var bdy = document.getElementsByTagName('body')[0].innerHTML;

    var re = new RegExp('(\\b' + SearchTerm + '\\b)', 'igm'); //returns patterns
    bdy = bdy.replace(re, '<span style="color:white;background-color:fuchsia;">$1<\/span>'); //#F2F2F2

    //var re = /A-level Mathematics/g;
    //bdy = bdy.replace(re, '<span style="color:white;background-color:fuchsia;">A-level Mathematics<\/span>');

    document.getElementsByTagName('body')[0].innerHTML = bdy; //apply changes
}

function RestoreFunction() {
    if (OriginalBody != null) document.getElementsByTagName('body')[0].innerHTML = OriginalBody; //restore changes
}

function BookMjump(Bmark){ document.location.hash = Bmark; }


//receive message from parent
window.addEventListener("message", function (e) {

    //if (e.data == "RestoreFunction1") RestoreFunction(); else HighlightFunction(e.data);
    //alert(e.data+"6");
	
	var ss1=e.data;
	var L1=ss1.length-1;
	var s1=ss1.substr(0,1);
	var s2=ss1.substr(1,L1);
	

	
	switch (s1)
	{
		
		case '0':
		
		HighlightFunction(s2);
		break;
		
		case '1':
		
		RestoreFunction();
		break;
		
		case '2':
		
		BookMjump(s2);
		break;
		
	}
	
	

}, false);