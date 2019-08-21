/* 
 * Enable an object to be draggable
 * Written for the /customer page originally
 * But not used as we changed directions in our design
 */

let wX;
let wY;
let dragging = false;

function draggableMouseDown(e){
    if (e.which == 1) {// left button down
        dragging = true;
        wX = e.pageX;
        wY = e.pageY;
    }
}
function draggableMouseMove(e){
    e.stopPropagation();
    e.preventDefault();
    if (dragging) {
        var xLoc = e.screenX - wX;
        var yLoc = e.screenY - wY;

        if (window.focusAPI) {
            window.focusAPI.setWindowPosition(xLoc, yLoc);
        }
    }
}
function draggableMouseUp(){
    dragging = false;        
}

export default {
    getElementLocation(node){
        return node.getBoundingClientRect();
    },

    getViewPort(){
        return{ width: window.innerWidth, height: window.innerHeight};
        /*
        let width = 0, height = 0;
        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            width = window.innerWidth,
            height = window.innerHeight
        }
        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0) {
            width = document.documentElement.clientWidth,
            height = document.documentElement.clientHeight
        }
        else {// older versions of IE
            width = document.getElementsByTagName('body')[0].clientWidth,
            height = document.getElementsByTagName('body')[0].clientHeight
        }
        return {width, height};
        */
    },
    loadDraggable(){
        if(window.focusAPI){
            document.querySelector('.win-draggable').addEventListener("mousedown", draggableMouseDown);
            window.addEventListener('mousemove', draggableMouseMove);
            window.addEventListener('mouseup',draggableMouseUp);
        }
    },
    unloadDraggable(){
        if(window.focusAPI){
            document.querySelector('.win-draggable').removeEventListener("mousedown", draggableMouseDown);
            window.removeEventListener('mousemove', draggableMouseMove);
            window.removeEventListener('mouseup',draggableMouseUp);            
        }
    }

};