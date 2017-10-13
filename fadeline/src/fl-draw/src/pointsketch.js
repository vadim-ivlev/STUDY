
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
 * @param {object} hostsThis - this of the host
 * @returns {object} - {sketch fn, dpane, canvas, p5 }
 */
function PointSketch(dpane, width=600, height=400, points=[], hostsThis){
// globals ===========================================
    var canvas;

// let rgba={r:0,g:0,b:0,a:255}; // max values: 255
// let strWeight=2; //pixels
let fadingTime=10000; //msec
let sig_k=15; 




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
    let fading = lin(dt, timeSpan);
    // let fading = sigmoid(dt, sig_k, timeSpan);
    let alpha = fading * p1.pressure;

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
function lin(x,n) {return 1.0-x/n;} 


/**
 * Sigmoid fading function. Works well when k~10
 * @param {*} x 
 * @param {*} k 
 * @param {*} n 
 */
function sigmoid(x, k, n ) { return 1 / (Math.exp((k * (x - 0.5 * n)) / n) + 1); }


/**
 * To initialize p5 later.
 * https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
 */
var sketch = function (p) {

    p.setup = function() {
        //var myCanvas = createCanvas(windowWidth, windowHeight * 0.5);
        //myCanvas.parent('pane');

        p.createCanvas(width, height); //does it change canva's style only?
        canvas = dpane.childNodes[0];
        canvas.style.visibility='visible';
        // canvas.setAttribute("touch-action","none");

        p.noFill();
        p.curveTightness(-0.5);
        // blendMode(DIFFERENCE);    
        // frameRate(30);
        // noLoop();
        p.rect(0,0,70,70);
        p.line(0,0,150,100);
    };

    p.draw = function() {
        p.clear();
        redrawLastLines(fadingTime);
    };

    function redrawLastLines(timeSpan = 5000 ) {
        for (let i =points.length  - 1; i > 2; i--) {
            let a = getAlpha(timeSpan, i);
            if (a < 0) {
                //truncate poins?
                // console.log('alpha <0'); 
                return;
            }

            // let coords = getLineCoords(i);
            let coords = getCurveCoords(i);
            if (coords == null) continue;

            // p.stroke(rgba.r, rgba.g, rgba.b, a * rgba.a);
            
            let pi = points[i];
            let c = p.color(pi.color);
            let s = parseFloat(pi.size);
            let f = parseFloat(pi.flow);
            let pr = parseFloat(pi.pressure);
           
            p.stroke(p.red(c), p.green(c), p.blue(c), a * f);
            p.strokeWeight(1+s*pr);
            p.curve(...coords);
        }
    }
};


var myp5 = new p5(sketch,dpane);  // do it in ready function
    
return {
        sketch,
        dpane,
        canvas,
        p5:myp5
    };
}


