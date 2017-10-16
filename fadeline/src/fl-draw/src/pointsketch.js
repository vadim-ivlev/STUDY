
// TODO:
// Leave the last 30 sec only of drawing;
// All points in one line make the same time.
// The user can change time before the lines start fading.
// Add texture to lines.
// Browserify all outer js dependancies through one lib.js

/**
 * Module to draw fading lines by poins array
 * 
 * @param {domNode} dpane - Parent node to attach canvas
 * @param {number} width  
 * @param {number} height 
 * @param {object[]} points - Array of poins to draw
 * @returns {object} - {canvas, p5 }
 */
function PointSketch(dpane, width=600, height=400, points=[],thisHost ){
// globals ===========================================
let canvas;
let ctx;
var frameID;
let myp5;
// let dpane; 
let then=Date.now();
let fps=thisHost.fps;
let fpsCounter=0;

let fadingTime=10000; //msec
let sig_k=15;
window.ppp=points; 

let timer=setInterval(readFps,1000)
function readFps(){
    thisHost._setRealFps(fpsCounter);
    // console.log('fps = ', fpsCounter);
    fpsCounter=0;
}

// points = [
//     { x: 100, y: 100, action:'move', color:'#000000',size:3,flow:255, pressure:0.99, time:100000000000000 },
//     { x: 200, y: 200, action:'move', color:'#ff0000',size:4,flow:255, pressure:0.2, time:100000000000000 },
//     { x: 300, y: 100, action:'move', color:'#00ff00',size:5,flow:255, pressure:0.99, time:100000000000000 },
//     { x: 400, y: 200, action:'move', color:'#0000ff',size:6,flow:255, pressure:0.2, time:100000000000000 },
//     { x: 500, y: 100, action:'move', color:'#ffff00',size:7,flow:255, pressure:0.9, time:100000000000000 },
//     { x: 600, y: 200, action:'move', color:'#00ffff',size:8,flow:255, pressure:0.1, time:100000000000000 },
//     { x: 700, y: 100, action:'move', color:'#000000',size:9,flow:255, pressure:0.99, time:100000000000000 },
// ];


function getCurveCoords(i){
    var p1 =points[i],p2,p3,p4;    
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
    let p1 = points[i];
    let now=Date.now() ;
    let dt=(now - p1.time);
    // let fading = lin(dt, timeSpan);
    let fading = sigmoid(dt, sig_k, timeSpan);
    let alpha = fading * p1.pressure;

    // if (fading>-0.1) console.log(points.length,fading);
    // console.log(`now:${now} p.time:${p1.time} dt:${dt} alpha:${alpha}`)
    return alpha;

    /**
     * -----------------------------------------------------
     * Linear fading function. Changes from 1 to 0
     * when x changes from 0 to n.
     * @param {*} x 
     * @param {*} n 
     */
    function lin(x,n) {return 1.0-x/n;} 


    /**
     * ------------------------------------------------------
     * Sigmoid fading function. Works well when k~10
     * @param {*} x 
     * @param {*} k 
     * @param {*} n 
     */
    function sigmoid(x, k, n ) { return 1 / (Math.exp((k * (x - 0.5 * n)) / n) + 1); }

}


/**
 * To initialize p5 later.
 * https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
 */

var sketch = function (p) {

    p.setup = function() {
        canvas = p.createCanvas(width, height).canvas; //does it change canva's style only?
        // canvas = dpane.childNodes[0];
        canvas.style.visibility='visible';
        // canvas.setAttribute("touch-action","none");

        p.noFill();
        p.curveTightness(-0.5);
        p.strokeCap(p.SQUARE);
    };

    p.draw = function() {
        p.clear();
        redrawLastLines(fadingTime);
    };

    function redrawLastLines(timeSpan = 5000 ) {
        fpsCounter++;

        for (let i =points.length  - 1; i > 2; i--) {
            let a = getAlpha(timeSpan, i);
            if (a < 0) {
                console.log('truncate');
                return; //truncate?
            }

            // let coords = getLineCoords(i);
            let coords = getCurveCoords(i);
            // console.log('coords=',coords);
            if (coords == null) continue;

            
            let pi = points[i];
            let c = p.color(pi.color);
            let s = parseFloat(pi.size);
            let f = parseFloat(pi.flow);
            let pr = parseFloat(pi.pressure);
           
            p.stroke(p.red(c), p.green(c), p.blue(c), a * f);
            // console.log(p.red(c), p.green(c), p.blue(c), a * f,a,f)
            p.strokeWeight(1+s*pr);
            p.curve(...coords);
        }
    }
};



function setup(dpane, width=600, height=400) {
    canvas=dpane.ownerDocument.createElement("canvas");
    canvas.width=width;
    canvas.height=height;
    canvas.style.width=`${width}px`;
    canvas.style.height=`${height}px`;
    dpane.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
}

function midPointBtw(p1, p2) {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    };
  }


function drawFrame(timeSpan){
    if (points.length <2 ){
        return;
    }
    //!!!! Erase canvas. dirty hack enstead of clearRect 
    // to prevent decrease in frameRate
    canvas.width=width+1;
    canvas.width=width;


    let p0 = points[points.length-1];
    let p1 ;//= points[points.length-2];
    ctx.moveTo(p0.x, p0.y);

    // for (let i=0, l=points.length-2; i<l; i++){
    for (let i=points.length-1; i>0; i--){
        p0 = points[i];
        p1 = points[i-1];

        let a = getAlpha(timeSpan, i);
        if (a < 0) {
            console.log('truncate');
            return; //truncate?
        }

        // check if we should draw
        if (p0.action !='draw' && p1.action !='move'){ continue; } 

        let p01 = midPointBtw(p0, p1)
        
        ctx.beginPath();
        ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
        // ctx.lineTo(p1.x, p1.y);
        // console.log(p0.x, p0.y, p1.x, p1.y);
        
        
        let c = hexToRgb(p0.color);
        let s = parseFloat(p0.size);
        let f = parseFloat(p0.flow);
        let pr = parseFloat(p0.pressure);
        let color='rgba('+c+','+ (a) +')';
        // console.log('color=', color);
        ctx.lineWidth=s+s*pr;
        ctx.strokeStyle=color;
        // ctx.lineCap = "round";
        ctx.stroke();
    }

    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point

    // ctx.lineTo(p1.x, p1.y);
    // ctx.stroke();
}

function hexToRgb(hex) {
    if (hex[0]=='#') hex=hex.substr(1);
    var c = parseInt(hex, 16);
    var r = (c >> 16) & 255;
    var g = (c >> 8) & 255;
    var b = c & 255;
    return r + "," + g + "," + b;
}

function draw() {
    let now = Date.now();
    if ( now - then > 1000./fps ){
        then=now;
        fpsCounter++;
        drawFrame(fadingTime);
    }
    start();
}

// shim layer with setTimeout fallback
// window.requestAnimFrame = (function () {
//     return window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         function (callback) {
//             window.setTimeout(callback, 1000 / 60);
//         };
// })();


function start(){
    frameID = window.requestAnimationFrame(draw);
}


function stop(){
    window.cancelAnimationFrame(frameID) ;
}


// myp5 = new p5(sketch,dpane);  // do it in ready function
setup(dpane, width, height); start();

return {
        canvas,
        p5:myp5
    };
}


