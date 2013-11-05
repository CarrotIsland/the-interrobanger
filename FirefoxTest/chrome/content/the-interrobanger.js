(function() {

    function walk(node) {
    	// I stole this whole thing from:
	    // http://is.gd/WHhTDE
	    // The original creator stole this function from here:
	    // http://is.gd/mwZp7E
        
        var child, next;
    
        switch ( node.nodeType ) {
            case 1:  // Element
                if(node.value !== undefined)
                    node.value = node.value.replace(/(((\?+!+)|(!+\?+))[\?!]*)+/g, "‽");
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while ( child ) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;
    
            case 3: // Text node
                handleText(node);
                break;
        }
    }
    
    function handleText(textNode) {
        var v = textNode.nodeValue;
    
        v = v.replace(/(((\?+!+)|(!+\?+))[\?!]*)+/g, "‽");
    
        textNode.nodeValue = v;
    }

    function windowLoadHandler() {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
