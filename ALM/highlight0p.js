//var doca = document.getElementById("iframe1");
//var doc1 = doca.iframe.contentWindow.document;        

var doc1 = window.document; //used by ank1
var OriginalBody; //save original so can restore

window.parent.postMessage("IframeNavC", '*');

//link click event        
function doSomething(e) { //not used anymore
    //console.log(this.value); // this will be the clicked element

    //performMark("the");
    window.parent.postMessage(e.target.href, '*'); //send message to parent
    location.href = e.target.href //jump to link
    //alert(e.target.href);
    //alert("1");

		//<script src = "../highlight0p.js" ></script >
		//<script src="../ank1.js"></script>

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


window.addEventListener("pageshow", function (event) {

	var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);

	//console.log("pagenav");


	if (historyTraversal) {

		//console.log(document.URL);
		window.parent.postMessage(document.URL, '*'); //send message to parent

		//call c# below


		// Handle page restore.
		//window.location.reload();
	}
});


//only working on subwindow because that is where change happens now, so put code on iframe and send results via window message
window.addEventListener("hashchange", function (event) {


	//console.log(location.hash);
	window.parent.postMessage(location.hash, '*'); //send message to parent



});

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