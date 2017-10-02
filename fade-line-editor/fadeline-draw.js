
function setup() {
    var myCanvas = createCanvas(windowWidth-80, windowHeight/2);
    myCanvas.parent('pane');
    noFill();
    curveTightness(-0.5);
    // blendMode(DIFFERENCE);    
    
    // frameRate(30);
    // noLoop();
}

function draw() {
    clear();
    redrawLastLines(5000);
}

function redrawLastLines(timeSpan = 5000 ) {
    for (let i =points.length  - 1; i > 2; i--) {
        let a = getAlpha(timeSpan, i);
        if (a < 0) {
            //truncate poins?
            console.log('alpha <0'); 
            return;
        }


        // let coords = getLineCoords(i);
        let coords = getCurveCoords(i);
        if (coords==null) continue;

        stroke(0, 0, 0, 256*a);
        strokeWeight(2+a*2);
        // console.log(`len=${points.length} i=${i} a=${a} coords: ${coords}`);
        // line(...coords);
        curve(...coords);
    }
}

// function getLineCoords(i){
//         let p1 = points[i];
//         if (p1.action != 'move'){ 
//             // console.log('!=move, ',i, p1);
//             return null;
//         }
//         let p2 = points[i - 1];
//         return [p1.x, p1.y, p2.x, p2.y];
// }

function getCurveCoords(i){
        var p1 =points[i],p2,p3,p4;    

        p1 = points[i];
        if (p1.action != 'move'){ 
            return null;
        }
        p2 = points[i - 1];
        if (p2.action != 'move'){ 
            return [p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p2.x, p2.y];
        }
        p3 = points[i - 2];
        if (p3.action != 'move'){ 
            return [p1.x, p1.y, p2.x, p2.y, p2.x, p2.y, p3.x, p3.y];
        }
        p4 = points[i - 3];
        return [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y];
}

    



function getAlpha(timeSpan, i) {
    let p1 = points[i];
    let now=Date.now() ;
    let dt=(now - p1.time);
    let fading = 1.0 - dt/timeSpan;
    let alpha=fading * p1.pressure;
    // console.log(`now:${now} p.time:${p1.time} dt:${dt} alpha:${alpha}`)
    return alpha;
}

// TODO. 
// Leave the last 30 sec only of drawing;
// All points in one line make the same time.
// A line that begins to dissapear changes its color and alpha charply.
// The user can change time before the lines start fading.
// Make lines smooth
// Att texture to lines.
// make color depending on pressure.