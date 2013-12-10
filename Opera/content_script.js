function handleText(textNode) {
    "use strict";
    var v = textNode.nodeValue;
    v = v.replace(/(((\?+!+)|(!+\?+))[\?!]*)+/g, "‽");
    textNode.nodeValue = v;
}

function walk(node) {
    "use strict";
    // I stole this whole thing from:
    // http://is.gd/WHhTDE
    // The original creator stole this function from here:
    // http://is.gd/mwZp7E
    var child, next;
    switch (node.nodeType) {
    case 1:
        // Element
        if (typeof node.value !== 'undefined') {
            node.value = String(node.value).replace(/(((\?+!+)|(!+\?+))[\?!]*)+/g, "‽");
        }
    case 11:
        // Document fragment
        child = node.firstChild;
        while (child) {
            next = child.nextSibling;
            walk(child);
            child = next;
        }
        break;
    case 3:
        // Text node
        handleText(node);
        break;
    }
}

walk(document.body);