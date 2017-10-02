// import  './node_modules/jquery/dist/jquery.min.js'

// DEFS --------------------------------------------

// shows if pointer is down
let pointerDown = false;
let press = 0;
// array of points to draw
const points = [];


// registers  touch evs
const pane = $('#pane');
// shows the force
const meter = $('#meter');
// to show messages
const inf = (s = '') => $('#info').html(s);
const infP = (s = '') => $('#infoPressure').html(s);
const infPE = (s = '') => $('#infoPressureEvents').html(s);

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
        x: ev.offsetX,
        y: ev.offsetY,
        pressure: press,
        time: Date.now()
    };
    points.push(p);

    // let info=printPoint(p) + ` N:${points.length}`;
    // inf(info);
    // meter.val(p.pressure);
    // // if (p.action !=='move'){ console.log(info);  }
}


/**
 * Returns a string representing the point
 * @param {*} p 
 */
function printPoint(p) {
    let s = ''
    for (let i in p) s += `${i}: ${p[i]} `;
    return s;
}



// Handlers ================================
// there are several place where you can add event handlers.
// pointer events, mouse events, pressurejs events, touch events.
// It's hard to tell what is the right choince if we want the app work
// on any device


function force_handler(force, event) {
    press = force;
}


function over_handler(event) {
    if (event.buttons)
        pointerDown = true;
    pushPoint(event, 'over')
}


function out_handler(event) {
    pointerDown = false;
    pushPoint(event, 'movestart')
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


// BEGIN ============================================

// prevent the page from dragging in iOS
// $(document).on('touchmove',(event) => event.preventDefault());
pane.on('touchmove', (event) => event.preventDefault());
// document.ontouchmove = (e)=> e.preventDefault();





/**
 * Initializes pressurejs. 
 */
//TODO: cgange pane to element covering all the space??
$('#pane').pressure({
    change: force_handler,
    start: function (event) {},
    end: function () {},
    }, 
    { preventSelect: true }
);


// mouse events
pane.on('mouseover', over_handler);
pane.on('mouseout', out_handler);
//pane.on('mousedown', down_handler);
// pane.on('mouseup', up_handler);
// pane.on('mousemove', move_handler)

//pointer events
//pane.on('pointermove' ,move_handler);




//move events abstract away the defaults 
//that need attention on dufferent devices.
//https://github.com/stephband/jquery.event.move



pane.on('movestart', movestart_handler);
pane.on('moveend', moveend_handler);
pane.on('move', move_handler);

//Quick fix.
// add missing offxetX and offstY to the event
//https://github.com/stephband/jquery.event.move
function fixOffsets(ev){
    if (ev.offsetX || ev.offsetY) return;
    let offset =pane.offset();
    ev.offsetX = ((ev.pageX || 0) - offset.left) ;//+ $(window).scrollLeft();
    ev.offsetY = ((ev.pageY || 0) - offset.top) ;//+ $(window).scrollTop();
}

/**
 * The next step is to draw the points array in such a way,
 * that the earlier points were drawn more transparent than the latest.
 * That's how the fading line illusion happens. 
 */