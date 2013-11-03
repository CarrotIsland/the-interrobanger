(function() {

    function walk(node) 
    {
      	// I stole this whole thing from:
      	// http://is.gd/V4x2D2
        // I stole this function from here:
        // http://is.gd/mwZp7E

        var child, next;

        switch ( node.nodeType )  
        {
            case 1:  // Element
              if(node.value !== undefined)
                node.value = node.value.replace(/(((\?+!+)|(!+\?+))[\?!]*)+/g, "‽");
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while ( child ) 
                {
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

    function handleText(textNode) 
    {
      var v = textNode.nodeValue;

      v = v.replace(/(((\?+!+)|(!+\?+))[\?!]*)+/g, "‽");

      textNode.nodeValue = v;
    }

    window.addEventListener('DOMContentLoaded', function() {
        walk(document.body);
    }, false);

}());
