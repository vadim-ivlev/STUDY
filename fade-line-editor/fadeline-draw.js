function setup() {
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent('pane');
    ellipse(width / 2, height / 2, 20, 20);
    smooth(8)
    // frameRate(5);
}

function draw() {
    redrawLastLines(30000);
}

function redrawLastLines(timeSpan = 5000.0, startTime = Date.now()) {
    clear();
    for (let i = points.length - 1; i > 0; i--) {
        let p1 = points[i];
        if (p1.action != 'move') continue;
        let p2 = points[i - 1];
        let a = getAlpha(timeSpan, startTime, p1);
        //console.log(a);
        if (a < 0) {
            //truncate poins? 
            return;
        }

        stroke(0, 0, 0, 256 * a);
        strokeWeight(3);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}

function getAlpha(timeSpan, startTime, point) {
    let dt=(Date.now() - point.time);
    let fading = 1.0 - dt/timeSpan;
    // console.log(`now:${Date.now()} p.time:${point.time} dt:${dt}`)
    return fading * point.pressure;
}

// TODO. 
// Leave the last 30 sec only of drawing;
// All points in one line make the same time.
// A line that begins to dissapear changes its color and alpha charply.
// The user can change time before the lines start fading.
// Make lines smooth
// Att texture to lines.
// make color depending on pressure.