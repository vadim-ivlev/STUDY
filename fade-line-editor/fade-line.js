// registers  touch evs
const pane = document.getElementById('pane');
// shows the force
const meter = document.getElementById('meter');
// to show messages
const info = document.getElementById('info');
const inf = (s='') => info.innerHTML=s;
// shows if pointer is down
var down=false;
const points=[];


/**
 * Creates a record about pointer event and adds it
 * to the global array points[]. 
 * pointer param describes what happend 
 * to the pointer device: "down", "up" 
 * @param {event} ev
 * @param {String} pointer 
 */
function pushPoint(ev,pointer){
    points.push({
        pointer,
        x: ev.offsetX,
        y: ev.offsetY,
        pressure: ev.pressure,
        time: Date.now()
    });
}


/**
 * Returns a string representing the point
 * @param {*} p 
 */
function printPoint(p){
    let s=''
    for (let i in p) s+=`${i}: ${p[i]} `;
    return s;
}

// pane.addEventListener('mousemove',mouse_move_handler);
pane.addEventListener('pointermove' ,move_handler);
pane.addEventListener('mousedown'   ,(ev)=>{down=true; pushPoint(ev,'down')});
pane.addEventListener('mouseup'     ,(ev)=>{down=false; pushPoint(ev,'up')});




function move_handler(ev){
    if (!down) return;
    pushPoint(ev);
    meter.setAttribute('value',ev.pressure);
    let p=points.slice(-1)[0];
    inf(printPoint(p)+` N:${points.length}`);
}