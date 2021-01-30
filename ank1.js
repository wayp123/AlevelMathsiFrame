(function(doc){
    var cb_addEventListener = function(obj, evt, fnc) { //called
        // W3C model
        if (obj.addEventListener) {
            obj.addEventListener(evt, fnc, false);
            return true;
        } 
        // Microsoft model
        else if (obj.attachEvent) {
            return obj.attachEvent('on' + evt, fnc);
        }
        // Browser don't support W3C or MSFT model, go on with traditional
        else {
            evt = 'on'+evt;
            if(typeof obj[evt] === 'function'){
                // Object already has a function on traditional
                // Let's wrap it with our own function inside another function
                fnc = (function(f1,f2){
                    return function(){
                        f1.apply(this,arguments);
                        f2.apply(this,arguments);
                    }
                })(obj[evt], fnc);
            }
            obj[evt] = fnc;
            return true;
        }
        return false;
    };
	
	
    var hasClass = function(el,className) { //called
        return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1; //string op
    }



    cb_addEventListener(doc, 'click', function(e){ //1st caller gets e by ref from obj.addEventListener(evt, fnc, false); above
      if(hasClass(e.target, 'ank1')){
          e.preventDefault ? e.preventDefault() : e.returnValue = false;
          doSomething.call(e.target, e);
      }
    });
	
	
	
})(doc1);