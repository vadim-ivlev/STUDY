'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import '../node_modules/jquery/dist/jquery.min.js'
// import './fadeline-jquery.js'
// globals ===========================================
var rgba = { r: 0, g: 0, b: 0, a: 255 }; // max values: 255
var strWeight = 2; //pixels
var fadingTime = 10000; //msec
var sig_k = 15;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight * 0.5);
    myCanvas.parent('pane');
    noFill();
    curveTightness(-0.5);
    // blendMode(DIFFERENCE);    
    // frameRate(30);
    // noLoop();
}

function draw() {
    clear();
    redrawLastLines(fadingTime);
}

function redrawLastLines() {
    var timeSpan = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;

    for (var i = points.length - 1; i > 2; i--) {
        var a = getAlpha(timeSpan, i);
        if (a < 0) {
            //truncate poins?
            // console.log('alpha <0'); 
            return;
        }

        // let coords = getLineCoords(i);
        var coords = getCurveCoords(i);
        if (coords == null) continue;

        stroke(rgba.r, rgba.g, rgba.b, a * rgba.a);
        strokeWeight(strWeight + a * strWeight);
        curve.apply(undefined, _toConsumableArray(coords));
    }
}

function getCurveCoords(i) {
    var p1 = points[i],
        p2,
        p3,
        p4;
    p1 = points[i];
    if (p1.action != 'move') return null;
    p2 = points[i - 1];
    if (p2.action != 'move') return [p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p2.x, p2.y];
    p3 = points[i - 2];
    if (p3.action != 'move') return [p1.x, p1.y, p2.x, p2.y, p2.x, p2.y, p3.x, p3.y];
    p4 = points[i - 3];
    return [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y];
}

function getAlpha(timeSpan, i) {
    var p1 = points[i];
    var now = Date.now();
    var dt = now - p1.time;
    var fading = lin(dt, timeSpan);
    // let fading = sigmoid(dt, sig_k, timeSpan);
    var alpha = fading * p1.pressure;

    // if (fading>-0.1) console.log(points.length,fading);
    // console.log(`now:${now} p.time:${p1.time} dt:${dt} alpha:${alpha}`)
    return alpha;
}

/**
 * Linear fading function. Changes from 1 to 0
 * when x changes from 0 to n.
 * @param {*} x 
 * @param {*} n 
 */
function lin(x, n) {
    return 1.0 - x / n;
}

/**
 * Sigmoid fading function. Works well when k~10
 * @param {*} x 
 * @param {*} k 
 * @param {*} n 
 */
function sigmoid(x, k, n) {
    return 1 / (Math.exp(k * (x - 0.5 * n) / n) + 1);
}

// TODO 
// Leave the last 30 sec only of drawing;
// All points in one line make the same time.
// The user can change time before the lines start fading.
// Add texture to lines.
// Browserify all outer js dependancies through one lib.js
'use strict';

// import  './node_modules/jquery/dist/jquery.min.js'

// DEFS --------------------------------------------

// shows if pointer is down
var pointerDown = false;
// pointer pressure while drawing
var press = 0;
// array of points to draw
var points = [];

// registers  touch evs
var pane = $('#pane');

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
    var p = {
        action: action,
        eventType: ev.type,
        x: ev.offsetX,
        y: ev.offsetY,
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


function mouseover_handler(event) {
    if (event.buttons) pointerDown = true;
    pushPoint(event, 'mouseover');
}

function mouseout_handler(event) {
    pointerDown = false;
    pushPoint(event, 'mouseout');
}

function movestart_handler(event) {
    pointerDown = true;
    pushPoint(event, 'movestart');
}

function moveend_handler() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: 'up' };

    pointerDown = false;
    pushPoint(event, 'moveend');
}

function move_handler(event) {
    if (pointerDown) pushPoint(event, 'move');
}

/**
 * Quick fix.
 * add missing offxetX and offstY to the event
 * https://github.com/stephband/jquery.event.move
 * @param {*} ev 
 */
function fixOffsets(ev) {
    if (ev.offsetX || ev.offsetY) return;
    var offset = pane.offset();
    ev.offsetX = (ev.pageX || 0) - offset.left; //+ $(window).scrollLeft();
    ev.offsetY = (ev.pageY || 0) - offset.top; //+ $(window).scrollTop();
}

// BEGIN ============================================

// prevent the page from dragging in iOS
// $(document).on('touchmove',(event) => event.preventDefault());
pane.on('touchmove', function (event) {
    return event.preventDefault();
});

/**
 * Initializes pressurejs. 
 */
$('#pane').pressure({
    change: function change(force, event) {
        press = force;
    },
    start: function start(event) {},
    end: function end() {}
}, { preventSelect: true, polyfillSpeedUp: 300 });
// function force_handler(force, event) { press = force; }


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

//# sourceMappingURL=bundle.js.map