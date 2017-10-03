// import  './node_modules/jquery/dist/jquery.min.js'

// DEFS --------------------------------------------

// shows if pointer is down
let pointerDown = false;
// pointer pressure while drawing
let press = 0;
// array of points to draw
const points = [];

// registers  touch evs
const pane = $('#pane');


/**
 * Creates a record about pointer event and adds it
 * to the global array points[]. 
 * pointer param describes what happend 
 * to the pointer device: "down", "up" 
 * @param {event} ev
 * @param {String} pointer 
 */
function pushPoint(ev, action) {
    fixOffsets(ev);
    let p = {
        action,
        eventType: ev.type,
        x: (ev.offsetX),
        y: (ev.offsetY),
        pressure: press,
        time: Date.now()
    };
    points.push(p);

}


// Handlers ================================
// there are several place where you can add event handlers.
// pointer events, mouse events, pressurejs events, touch events.
// It's hard to tell what is the right choince if we want the app work
// on any device


function force_handler(force, event) {
    press = force;
}


function mouseover_handler(event) {
    if (event.buttons)
        pointerDown = true;
    pushPoint(event, 'mouseover')
}


function mouseout_handler(event) {
    pointerDown = false;
    pushPoint(event, 'mouseout')
}


function movestart_handler(event) {
    pointerDown = true;
    pushPoint(event, 'movestart')
}


function moveend_handler(event={type:'up'}) {
    pointerDown = false;
    pushPoint(event, 'moveend')
}


function move_handler(event) {
    if (pointerDown)
        pushPoint(event, 'move');
}


/**
 * Quick fix.
 * add missing offxetX and offstY to the event
 * https://github.com/stephband/jquery.event.move
 * @param {*} ev 
 */
function fixOffsets(ev){
    if (ev.offsetX || ev.offsetY) return;
    let offset =pane.offset();
    ev.offsetX = ((ev.pageX || 0) - offset.left) ;//+ $(window).scrollLeft();
    ev.offsetY = ((ev.pageY || 0) - offset.top) ;//+ $(window).scrollTop();
}

// BEGIN ============================================

// prevent the page from dragging in iOS
// $(document).on('touchmove',(event) => event.preventDefault());
pane.on('touchmove', (event) => event.preventDefault());


/**
 * Initializes pressurejs. 
 */
$('#pane').pressure({
    change: force_handler,
    start: function (event) {},
    end: function () {},
    }, 
    { preventSelect: true, polyfillSpeedUp: 300 }
);


// mouse events
pane.on('mouseover', mouseover_handler);
pane.on('mouseout', mouseout_handler);
//pane.on('mousedown', down_handler);
// pane.on('mouseup', up_handler);
// pane.on('mousemove', move_handler)

//pointer events
//pane.on('pointermove' ,pointermove_handler);


/**
 * move events abstract away the defaults 
 * that need attention on dufferent devices.
 * https://github.com/stephband/jquery.event.move
 */
pane.on('movestart', movestart_handler);
pane.on('moveend', moveend_handler);
pane.on('move', move_handler);

