// import '../node_modules/jquery/dist/jquery.min.js'
// import './fadeline-jquery.js'
// globals ===========================================
let rgba={r:0,g:0,b:0,a:255}; // max values: 255
let strWeight=2; //pixels
let fadingTime=10000; //msec
let sig_k=15; 



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
        if (coords==null) continue;

        stroke(rgba.r, rgba.g, rgba.b, a * rgba.a);
        strokeWeight(strWeight+a*strWeight);
        curve(...coords);
    }
}


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


// TODO 
// Leave the last 30 sec only of drawing;
// All points in one line make the same time.
// The user can change time before the lines start fading.
// Add texture to lines.
// Browserify all outer js dependancies through one lib.js