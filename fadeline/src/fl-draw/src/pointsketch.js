
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

// Measuring real fps
let timer=setInterval(readFps,1000)
function readFps(){
    thisHost._setRealFps(fpsCounter);
    fpsCounter=0;
}

// points = [
//     { x: 100, y: 100, action:'move', color:'#000000',size:5,flow:255, pressure:0.99, time:100000000000000 },
//     { x: 200, y: 200, action:'move', color:'#ff0000',size:5,flow:255, pressure:0.1, time:100000000000000 },
//     { x: 300, y: 100, action:'move', color:'#00ff00',size:5,flow:255, pressure:0.99, time:100000000000000 },
//     { x: 400, y: 200, action:'move', color:'#0000ff',size:5,flow:255, pressure:0.1, time:100000000000000 },
//     { x: 500, y: 100, action:'move', color:'#ffff00',size:5,flow:255, pressure:0.99, time:100000000000000 },
//     { x: 600, y: 200, action:'move', color:'#00ffff',size:5,flow:255, pressure:0.1, time:100000000000000 },
//     { x: 700, y: 100, action:'move', color:'#000000',size:5,flow:255, pressure:0.99, time:100000000000000 },
// ];

function getAlpha(timeSpan, i) {
    let p1 = points[i];
    let now=Date.now() ;
    let dt=(now - p1.time);
    if (dt > timeSpan) 
        return 0;

    let fading = 1;
    fading = sigmoid(dt, timeSpan, sig_k); //lin(dt, timeSpan);

    return fading * p1.pressure;

    /**
     * -----------------------------------------------------
     * Linear fading function. Changes from 1 to 0
     * when x changes from 0 to n.
     * @param {*} x - value  
     * @param {*} n - max value when fading -> 0
     */
    function lin(x,n) {return (x > n? 0.: 1.0-x/n);} 


    /**
     * ------------------------------------------------------
     * Sigmoid fading function. Works well when k~10
     * @param {*} x - value   
     * @param {*} n - max value when fading -> 0 
     * @param {*} k - coefficient how fast is fading
     */
    function sigmoid(x, n, k ) { return 1 / (Math.exp((k * (x - 0.5 * n)) / n) + 1); }

}


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


/**
 * !!!! Erase canvas. dirty hack enstead of clearRect to prevent decrease in frameRate
 */
function clearCanvas(){
    canvas.width=width+1;
    canvas.width=width;
}  


/**
 * Sets the style in accord with the p0 parameter and stroke.
 * @param {object} p0 - point  
 * @param {number} a - alpha  
 */
function doStroke(p0,a ){

    let c = hexToRgb(p0.color);
    let s = parseFloat(p0.size);
    let f = parseFloat(p0.flow);
    let pr = parseFloat(p0.pressure);
    let color='rgba('+c+','+ a +')';
    // console.log('color=', color);
    ctx.lineWidth=s+s*pr;
    ctx.strokeStyle=color;
    // ctx.lineCap = "round";
    // ctx.closePath(); 
    ctx.stroke();
}

function p(i){
    var l=points.length;
    if (i > l-1) return  [points[l-1].x, points[l-1].y];
    if (i < 0 )  return  [points[0].x, points[0].y];
    return [points[i].x, points[i].y];
}

function mp(i,j){
    var pi=p(i), pj=p(j);
    return [ (pi[0]+pj[0])/2, (pi[1]+pj[1])/2 ];
}

function getPoint(i){
    var l=points.length;
    if (i > l-1) return  points[l-1];
    if (i < 0 )  return  points[0];
    return points[i];
}

function drawFrame2(timeSpan){ 
    if (points.length <2 ){ return; }
    clearCanvas();

    // TODO: implement drawing by chunks.
    let p0 = points[points.length-1];
    let p1 ;//= points[points.length-2];
    // ctx.moveTo(p0.x, p0.y);
    let lastEnd=[p0.x, p0.y];

    for (let i=points.length-1; i>0; i--){
        p0 = getPoint(i); 
        p1 = getPoint(i-1);

        // to draw, at least one of the points have to have action="move"
        if (p0.action !='move') continue;
        if (p1.action !='move') continue;  
        
        if ( Date.now()-p0.time > timeSpan) {
            console.log('truncate3');
            return;
        }
    
        let a = getAlpha(timeSpan, i-1);
        

        let c0=p(i);
        let c1=p(i-1);
        let c01 = mp(i, i-1);
        // if (i==5) debugger;

        ctx.beginPath();
        ctx.moveTo(...lastEnd);
        ctx.quadraticCurveTo(...c0, ...c01);
        lastEnd=[c01[0],c01[1]];
        doStroke(p1,a);
    }
}

//TODO: Move  to toolbar
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
        drawFrame2(fadingTime);
    }
    start();
}


//start and stop animation
function start(){ frameID = window.requestAnimationFrame(draw); }
function stop(){ window.cancelAnimationFrame(frameID) ; }


setup(dpane, width, height); 
start();


return {
        canvas
    };
}


