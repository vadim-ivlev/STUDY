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
     ev.preventDefault();
    let p = {
        pointer,
        type:ev.type,
        x: ev.offsetX,
        y: ev.offsetY,
        pressure: ev.pressure,
        time: Date.now()
    };
    inf(printPoint(p)+` N:${points.length}`);
    meter.setAttribute('value',ev.pressure);
    points.push(p);
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

pane.addEventListener('mousemove'   ,move_handler);
pane.addEventListener('pointermove' ,move_handler);
pane.addEventListener('mousedown'   ,(ev)=>{down=true; pushPoint(ev,'down')});
pane.addEventListener('mouseup'     ,(ev)=>{down=false; pushPoint(ev,'up')});



function move_handler(ev){
    if (down) 
        pushPoint(ev);
}


pane.ontouchmove = function(event){
   // event.preventDefault();
}