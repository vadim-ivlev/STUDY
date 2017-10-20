
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
 * @param {object} thisHost - this of the host component
 * @returns {object} - {canvas, p5 }
 */
function PointSketch(dpane, width=600, height=400, points=[],thisHost ){
// globals ===========================================
let canvas;
let ctx;
var frameID;
let then=Date.now();

let sig_k=15;

// Measuring real fps
let fpsCounter=0;
let timer=setInterval(readFps,1000)
function readFps(){
    thisHost._setRealFps(fpsCounter);
    fpsCounter=0;
}


function getFading(dt,timeSpan) {
    if (dt > timeSpan) return 0;
    return sigmoid(dt, timeSpan, sig_k); //lin(dt, timeSpan);

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
    let color='rgba('+c+','+ a*(f/255)*pr +')';
    ctx.lineWidth=s+s*pr;
    ctx.strokeStyle=color;
    ctx.stroke();
}

function p(i, min = 0, max = (points.length - 1)){
    if (i > max) return  [points[max].x, points[max].y];
    if (i < min )  return  [points[min].x, points[min].y];
    return [points[i].x, points[i].y];
}

function mp(i,j, min = 0, max = (points.length - 1)  ){
    var pi=p(i, min, max), pj=p(j,min,max);
    return [ (pi[0]+pj[0])/2, (pi[1]+pj[1])/2 ];
}
/**
 * 
 * @param {*} i - index 
 * @param {*} min - min value of index
 * @param {*} max - max value of index
 */
function getPoint(points, i, min = 0, max = (points.length - 1)) {
    if (i > max) return  points[max];
    if (i < min)  return  points[min];
    return points[i];
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
    if ( now - then > 1000./thisHost.fps ){
        then=now;
        fpsCounter++;
        drawFrame3(points,(thisHost.fadingTime * 1000));
    }
    start();
}


//start and stop animation
function start(){ frameID = window.requestAnimationFrame(draw); }
function stop(){ window.cancelAnimationFrame(frameID) ; }



function print(m) { console.log(JSON.stringify(m).replace(/},/g,"},\n"));}

/**
 * Iterator. Returns chunks of points with action="move", not shorter then 2.
 * @param {*} arr - array of points 
 */
function* getChunksIt(arr = []){
    var a=arr;
    var l=arr.length;
    let i1=-1;
    let i2=-1; 
    for (let i=l-1; i>=0 ; i-- ) {
        let p = a[i];
        if (p.action != "move") {
            if (i2-i1 > 0) {
                yield {first:i1, last:i2};
            }
            i1=i2=-1;
            continue;
        } 
        if (i2 == -1) {
            i1=i2=i;
            continue;
        } 
        i1=i;
    }

    if (i2 - i1 > 0) {
        yield { first: i1, last: i2 };
    } else {
        yield null;
    }

}

function drawChunk(points, chunk, timeSpan ){
    if(chunk==null) {
        return;
    }


    let p0 = points[chunk.last];
    let p1 ;
    let lastEnd=[p0.x, p0.y];

    // TODO: move it out of loop to fade all line as a whole
    let dt=Date.now()-p0.time;
    if ( dt > timeSpan) { return; } // truncate
    let a = getFading(dt,timeSpan);

    for (let i=chunk.last; i>=chunk.first; i--){
        p0 = getPoint(points, i, chunk.first, chunk.last); 
        p1 = getPoint(points, i-1, chunk.first, chunk.last);


        let c0=p(i, chunk.first, chunk.last);
        let c1=p(i-1, chunk.first, chunk.last);
        let c01 = mp(i, i-1, chunk.first, chunk.last);
        drawQudraticCurve(lastEnd,c0,c01,p1,a);
        lastEnd=[c01[0],c01[1]];
    }
}

function drawQudraticCurve(lastEnd,c0,c01,p1,a) {
        ctx.beginPath();
        ctx.moveTo(...lastEnd);
        ctx.quadraticCurveTo(...c0, ...c01);
        doStroke(p1,a);
}



function drawFrame3(points,timeSpan){

    clearCanvas();
    let chunks = getChunksIt(points);
    for (let chunk of chunks) {
        drawChunk(points, chunk, timeSpan);
    }
}


setup(dpane, width, height); 
start();


return {
        canvas
    };
}


