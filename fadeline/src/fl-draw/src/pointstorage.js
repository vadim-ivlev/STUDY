

function PointStorage(hostsThis) {
    var dpane;
    // array of points to draw
    let points = [];
    window.points=points;

    // shows if pointer is down
    let pointerDown = false;

    // pointer's pressure while drawing. 
    //https://pressurejs.com/
    let press = 0;

    /**
     * adds a record to the global array points[]. 
     * 'action' describes what happend 
     * to the pointer device: "down", "up" 
     * @param {event} ev
     * @param {String} pointer 
     */
    function pushPoint(ev, action) {
        var bounds = event.target.getBoundingClientRect();
        let p = {
            action,
            eventType: ev.type,
            x: ev.detail.x - bounds.x,
            y: ev.detail.y - bounds.y,
            pressure: press,
            size:hostsThis.size,
            color:hostsThis.color,
            flow:hostsThis.flow,
            time: Date.now()
        };
        points.push(p);
    }


    // Handlers =================================================

    function mouseover_handler(event) {
        if (event.buttons)
            pointerDown = true;
        pushPoint(event, 'mouseover')
    }

    function mouseout_handler(event) {
        pointerDown = false;
        pushPoint(event, 'mouseout')
    }

    function movestart_handler(event) {
        pointerDown = true;
        pushPoint(event, 'movestart')
    }

    function moveend_handler(event = { type: 'up' }) {
        pointerDown = false;
        pushPoint(event, 'moveend')
    }

    function move_handler(event) {
        if (pointerDown)
            pushPoint(event, 'move');
    }

   
    /**
     * Initializes pressurejs.
     * @param {*} pane 
     */
    function attachPressureHandlers(pane){
        Pressure.set(pane, {
            change: (force, event) => { press = force; },
            start: function (event) { },
            end: function () { },
        },
            { preventSelect: true, polyfillSpeedUp: 300 }
        );
    }

    /**
     * prevent the page from dragging in iOS
     * @param {*} pane 
     */
    function preventPageFromDragging(pane) {
        pane.addEventListener('touchmove', (event) => event.preventDefault());
    }


    function attachMouseHandlers(pane){
        // pane.addEventListener('mouseover', mouseover_handler);
        // pane.addEventListener('mouseout', mouseout_handler);
        pane.addEventListener('mousedown', movestart_handler);
        pane.addEventListener('mouseup', moveend_handler);
        pane.addEventListener('mousemove', move_handler)
    }

    function attachTouchHandlers(pane){
        pane.addEventListener('touchstart', movestart_handler);
        pane.addEventListener('touchend'  , moveend_handler);
        pane.addEventListener('touchmove' , move_handler);
    }

    /**
     * Polyfill of pointer events
     * requires PEP.js from https://github.com/jquery/PEP
     * 
     * pointermove: a pointer moves, similar to touchmove or mousemove.
     * pointerdown: a pointer is activated, or a device button held.
     * pointerup: a pointer is deactivated, or a device button released.
     * pointerover: a pointer has moved onto an element.
     * pointerout: a pointer is no longer on an element it once was.
     * pointerenter: a pointer enters the bounding box of an element.
     * pointerleave: a pointer leaves the bounding box of an element.
     * pointercancel: a pointer will no longer generate events.
     * @param {*} pane 
     */
    function attachPointerHandlers(pane){
        pane.addEventListener('pointerover', mouseover_handler);
        pane.addEventListener('pointerout', mouseout_handler);
        pane.addEventListener('pointerdown', movestart_handler);
        pane.addEventListener('pointerup', moveend_handler);
        pane.addEventListener('pointermove', move_handler)
    }


    function attachGestureHandlers(pane){
        Polymer.Gestures.addListener(hostsThis,'down' , movestart_handler);
        Polymer.Gestures.addListener(hostsThis,'up'   , moveend_handler);
        Polymer.Gestures.addListener(hostsThis,'track', move_handler);
    }


    function attachEventHandlers(pane) {
        dpane=pane; // will need it fixOffsets
        preventPageFromDragging(pane);
        attachPressureHandlers(pane);

        // attachMouseHandlers(pane);
        // attachTouchHandlers(pane);

        //for polymer only
        attachGestureHandlers(pane);

    }


    return {
        points,
        attachEventHandlers
    };


}