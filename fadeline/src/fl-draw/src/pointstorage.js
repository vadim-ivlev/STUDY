

function PointStorage(hostsThis) {
    var dpane;
    // DEFS --------------------------------------------
    // array of points to draw
    let points = [];

    // shows if pointer is down
    let pointerDown = false;

    // pointer's pressure while drawing. 
    //https://pressurejs.com/
    let press = 0;

    /**
     * Creates a record about pointer event and adds it
     * to the global array points[]. 
     * pointer param describes what happend 
     * to the pointer device: "down", "up" 
     * @param {event} ev
     * @param {String} pointer 
     */
    function pushPoint(ev, action) {
        fixOffsets(ev);
        let p = {
            action,
            eventType: ev.type,
            x: (ev.offsetX),
            y: (ev.offsetY),
            pressure: press,
            size:hostsThis.size,
            color:hostsThis.color,
            flow:hostsThis.flow,
            time: Date.now()
        };
        points.push(p);
        //  console.log('pushPoint ',points)

    }


    // Handlers ================================
    // there are several place where you can add event handlers.
    // pointer events, mouse events, pressurejs events, touch events.
    // It's hard to tell what is the right choince if we want the app work
    // on any device

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
     * Quick fix.
     * add missing offxetX and offstY to the event
     * https://github.com/stephband/jquery.event.move
     * @param {*} ev 
     */
    function fixOffsets(ev) {
        if (ev.offsetX || ev.offsetY) return; //FIXME: it could be 0
        // FIXME: we have to go all way up the tree, including shadow dom
        ev.offsetX = ((ev.pageX || 0) - dpane.offsetLeft);//+ $(window).scrollLeft();
        ev.offsetY = ((ev.pageY || 0) - dpane.offsetTop);//+ $(window).scrollTop();
    }

    // BEGIN ============================================

    function attachEventHandlers(pane) {
        dpane=pane; // will need it fixOffsets

        // prevent the page from dragging in iOS
        pane.addEventListener('touchmove', (event) => event.preventDefault());

        // Initializes pressurejs.
        Pressure.set(pane, {
            change: (force, event) => { press = force; },
            start: function (event) { },
            end: function () { },
        },
            { preventSelect: true, polyfillSpeedUp: 300 }
        );


        // mouse events
        pane.addEventListener('mouseover', mouseover_handler);
        pane.addEventListener('mouseout', mouseout_handler);
        pane.addEventListener('mousedown', movestart_handler);
        pane.addEventListener('mouseup', moveend_handler);
        pane.addEventListener('mousemove', move_handler)

        //touch events
        pane.addEventListener('touchstart', movestart_handler);
        pane.addEventListener('touchend', moveend_handler);
        pane.addEventListener('touchmove', move_handler);


        //TODO: add touch event, or polyfill of pointer events
        //https://github.com/jquery/PEP
/* 
        pointermove: a pointer moves, similar to touchmove or mousemove.
        pointerdown: a pointer is activated, or a device button held.
        pointerup: a pointer is deactivated, or a device button released.
        pointerover: a pointer has moved onto an element.
        pointerout: a pointer is no longer on an element it once was.
        pointerenter: a pointer enters the bounding box of an element.
        pointerleave: a pointer leaves the bounding box of an element.
        pointercancel: a pointer will no longer generate events.
 */
        // pane.addEventListener('pointerover', mouseover_handler);
        // pane.addEventListener('pointerout', mouseout_handler);
        // pane.addEventListener('pointerdown', movestart_handler);
        // pane.addEventListener('pointerup', moveend_handler);
        // pane.addEventListener('pointermove', move_handler)



        /**
         * move events abstract away the defaults 
         * that need attention on dufferent devices.
         * https://github.com/stephband/jquery.event.move
         */
        // pane.on('movestart', movestart_handler);
        // pane.on('moveend', moveend_handler);
        // pane.on('move', move_handler);

        // TODO: Gesture events?

    }
    return {
        points,
        attachEventHandlers
    };


}