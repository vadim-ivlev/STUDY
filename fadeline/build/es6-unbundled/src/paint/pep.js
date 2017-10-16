(function(a,b){'object'===typeof exports&&'undefined'!==typeof module?module.exports=b():'function'===typeof define&&define.amd?define(b):a.PointerEventsPolyfill=b()})(this,function(){'use strict';function a(a,b){b=b||Object.create(null);var c=document.createEvent('Event');c.initEvent(a,b.bubbles||!1,b.cancelable||!1);for(var d,e=2;e<k.length;e++)d=k[e],c[d]=b[d]||l[e];c.buttons=b.buttons||0;var f=0;return f=b.pressure&&c.buttons?b.pressure:c.buttons?0.5:0,c.x=c.clientX,c.y=c.clientY,c.pointerId=b.pointerId||0,c.width=b.width||0,c.height=b.height||0,c.pressure=f,c.tiltX=b.tiltX||0,c.tiltY=b.tiltY||0,c.pointerType=b.pointerType||'',c.hwTimestamp=b.hwTimestamp||0,c.isPrimary=b.isPrimary||!1,c}function b(){this.array=[],this.size=0}function c(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),B&&(this.observer=new B(this.mutationWatcher.bind(this)))}function d(a){return'body /shadow-deep/ '+e(a)}function e(a){return'[touch-action="'+a+'"]'}function f(a){return'{ -ms-touch-action: '+a+'; touch-action: '+a+'; }'}function g(a){if(!v.pointermap.has(a)){var b=new Error('InvalidPointerId');throw b.name='InvalidPointerId',b}}function h(a){if(!a.ownerDocument.contains(a)){var b=new Error('InvalidStateError');throw b.name='InvalidStateError',b}}function i(a){var b=v.pointermap.get(a);return 0!==b.buttons}var j=Math.abs,k=['bubbles','cancelable','view','detail','screenX','screenY','clientX','clientY','ctrlKey','altKey','shiftKey','metaKey','button','relatedTarget','pageX','pageY'],l=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],m=window.Map&&window.Map.prototype.forEach,o=m?Map:b;b.prototype={set:function(a,b){return void 0===b?this.delete(a):void(!this.has(a)&&this.size++,this.array[a]=b)},has:function(a){return this.array[a]!==void 0},delete:function(a){this.has(a)&&(delete this.array[a],this.size--)},get:function(a){return this.array[a]},clear:function(){this.array.length=0,this.size=0},forEach:function(a,b){return this.array.forEach(function(c,d){a.call(b,c,d,this)},this)}};var q=['bubbles','cancelable','view','detail','screenX','screenY','clientX','clientY','ctrlKey','altKey','shiftKey','metaKey','button','relatedTarget','buttons','pointerId','width','height','pressure','tiltX','tiltY','pointerType','hwTimestamp','isPrimary','type','target','currentTarget','which','pageX','pageY','timeStamp'],t=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,'',0,!1,'',null,null,0,0,0,0],p={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},u='undefined'!==typeof SVGElementInstance,v={pointermap:new o,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},register:function(a){for(var b,c=this.eventSourceList.length,d=0;d<c&&(b=this.eventSourceList[d]);d++)b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;d<c&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},contains:function(a,b){try{return a.contains(b)}catch(a){return!1}},down:function(a){a.bubbles=!0,this.fireEvent('pointerdown',a)},move:function(a){a.bubbles=!0,this.fireEvent('pointermove',a)},up:function(a){a.bubbles=!0,this.fireEvent('pointerup',a)},enter:function(a){a.bubbles=!1,this.fireEvent('pointerenter',a)},leave:function(a){a.bubbles=!1,this.fireEvent('pointerleave',a)},over:function(a){a.bubbles=!0,this.fireEvent('pointerover',a)},out:function(a){a.bubbles=!0,this.fireEvent('pointerout',a)},cancel:function(a){a.bubbles=!0,this.fireEvent('pointercancel',a)},leaveOut:function(a){this.out(a),this.propagate(a,this.leave,!1)},enterOver:function(a){this.over(a),this.propagate(a,this.enter,!0)},eventHandler:function(a){if(!a._handledByPE){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),a._handledByPE=!0}},listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(b,c){this.captureInfo[c.pointerId]&&(c.relatedTarget=null);var d=new a(b,c);return c.preventDefault&&(d.preventDefault=c.preventDefault),d._target=d._target||c.target,d},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var b,c=Object.create(null),d=0;d<q.length;d++)b=q[d],c[b]=a[b]||t[d],u&&('target'===b||'relatedTarget'===b)&&c[b]instanceof SVGElementInstance&&(c[b]=c[b].correspondingUseElement);return a.preventDefault&&(c.preventDefault=function(){a.preventDefault()}),c},getTarget:function(a){var b=this.captureInfo[a.pointerId];return b?a._target!==b&&a.type in p?void 0:b:a._target},propagate:function(a,b,c){for(var d=a.target,e=[];!d.contains(a.relatedTarget)&&d!==document;)e.push(d),d=d.parentNode;c&&e.reverse(),e.forEach(function(c){a.target=c,b.call(this,a)},this)},setCapture:function(b,c){this.captureInfo[b]&&this.releaseCapture(b),this.captureInfo[b]=c;var d=new a('gotpointercapture');d.pointerId=b,this.implicitRelease=this.releaseCapture.bind(this,b),document.addEventListener('pointerup',this.implicitRelease),document.addEventListener('pointercancel',this.implicitRelease),d._target=c,this.asyncDispatchEvent(d)},releaseCapture:function(b){var c=this.captureInfo[b];if(c){var d=new a('lostpointercapture');d.pointerId=b,this.captureInfo[b]=void 0,document.removeEventListener('pointerup',this.implicitRelease),document.removeEventListener('pointercancel',this.implicitRelease),d._target=c,this.asyncDispatchEvent(d)}},dispatchEvent:function(a){var b=this.getTarget(a);if(b)return b.dispatchEvent(a)},asyncDispatchEvent:function(a){requestAnimationFrame(this.dispatchEvent.bind(this,a))}};v.boundHandler=v.eventHandler.bind(v);var w={shadow:function(a){if(a)return a.shadowRoot||a.webkitShadowRoot},canTarget:function(a){return a&&!!a.elementFromPoint},targetingShadow:function(a){var b=this.shadow(a);if(this.canTarget(b))return b},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector('shadow');c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(e=this.targetingShadow(f);e;)if(d=e.elementFromPoint(b,c),!d)e=this.olderShadow(e);else{var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d}return f}},owner:function(a){for(var b=a;b.parentNode;)b=b.parentNode;return b.nodeType!==Node.DOCUMENT_NODE&&b.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)}},x=Array.prototype.forEach.call.bind(Array.prototype.forEach),y=Array.prototype.map.call.bind(Array.prototype.map),z=Array.prototype.slice.call.bind(Array.prototype.slice),A=Array.prototype.filter.call.bind(Array.prototype.filter),B=window.MutationObserver||window.WebKitMutationObserver,C={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:['touch-action']};c.prototype={watchSubtree:function(a){this.observer&&w.canTarget(a)&&this.observer.observe(a,C)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&'complete'!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){x(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll('[touch-action]'):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(z(b))},installOnLoad:function(){document.addEventListener('readystatechange',function(){'complete'===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){var b=y(a,this.findElements,this);return b.push(A(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if('childList'===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else'attributes'===a.type&&this.elementChanged(a.target,a.oldValue)}};var D=['none','auto','pan-x','pan-y',{rule:'pan-x pan-y',selectors:['pan-x pan-y','pan-y pan-x']}],E='',F=window.PointerEvent||window.MSPointerEvent,G=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,H=v.pointermap,I=25,J=[1,4,2,8,16],K=!1;try{K=1===new MouseEvent('test',{buttons:1}).buttons}catch(a){}var L,M={POINTER_ID:1,POINTER_TYPE:'mouse',events:['mousedown','mousemove','mouseup','mouseover','mouseout'],register:function(a){v.listen(a,this.events)},unregister:function(a){v.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,d=a.clientX,e=a.clientY,f=0,g=c.length;f<g&&(b=c[f]);f++){var h=j(d-b.x),i=j(e-b.y);if(h<=I&&i<=I)return!0}},prepareEvent:function(a){var b=v.cloneEvent(a),c=b.preventDefault;return b.preventDefault=function(){a.preventDefault(),c()},b.pointerId=this.POINTER_ID,b.isPrimary=!0,b.pointerType=this.POINTER_TYPE,b},prepareButtonsForMove:function(a,b){var c=H.get(this.POINTER_ID);a.buttons=0!==b.which&&c?c.buttons:0,b.buttons=a.buttons},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=H.get(this.POINTER_ID),c=this.prepareEvent(a);K||(c.buttons=J[c.button],b&&(c.buttons|=b.buttons),a.buttons=c.buttons),H.set(this.POINTER_ID,a),b&&0!==b.buttons?v.move(c):v.down(c)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,H.set(this.POINTER_ID,a),v.move(b)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=H.get(this.POINTER_ID),c=this.prepareEvent(a);if(!K){var d=J[c.button];c.buttons=b?b.buttons&~d:0,a.buttons=c.buttons}H.set(this.POINTER_ID,a),c.buttons&=~J[c.button],0===c.buttons?v.up(c):v.move(c)}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,H.set(this.POINTER_ID,a),v.enterOver(b)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,v.leaveOut(b)}},cancel:function(a){var b=this.prepareEvent(a);v.cancel(b),this.deactivateMouse()},deactivateMouse:function(){H.delete(this.POINTER_ID)}},N=v.captureInfo,O=w.findTarget.bind(w),P=w.allShadows.bind(w),Q=v.pointermap,R='touch-action',S={events:['touchstart','touchmove','touchend','touchcancel'],register:function(a){L.enableOnSubtree(a)},unregister:function(){},elementAdded:function(b){var c=b.getAttribute(R),a=this.touchActionToScrollType(c);a&&(b._scrollType=a,v.listen(b,this.events),P(b).forEach(function(b){b._scrollType=a,v.listen(b,this.events)},this))},elementRemoved:function(a){a._scrollType=void 0,v.unlisten(a,this.events),P(a).forEach(function(a){a._scrollType=void 0,v.unlisten(a,this.events)},this)},elementChanged:function(b,c){var d=b.getAttribute(R),a=this.touchActionToScrollType(d),e=this.touchActionToScrollType(c);a&&e?(b._scrollType=a,P(b).forEach(function(b){b._scrollType=a},this)):e?this.elementRemoved(b):a&&this.elementAdded(b)},scrollTypes:{EMITTER:'none',XSCROLLER:'pan-x',YSCROLLER:'pan-y',SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;if('none'===b)return'none';return b===c.XSCROLLER?'X':b===c.YSCROLLER?'Y':c.SCROLLER.exec(b)?'XY':void 0},POINTER_TYPE:'touch',firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===Q.size||1===Q.size&&Q.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,200)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return('touchstart'===a||'touchmove'===a)&&(b=1),b},touchToPointer:function(a){var b=this.currentTouchEvent,c=v.cloneEvent(a),d=c.pointerId=a.identifier+2;c.target=N[d]||O(c),c.bubbles=!0,c.cancelable=!0,c.detail=this.clickCount,c.button=0,c.buttons=this.typeToButtons(b.type),c.width=a.radiusX||a.webkitRadiusX||0,c.height=a.radiusY||a.webkitRadiusY||0,c.pressure=a.force||a.webkitForce||0.5,c.isPrimary=this.isPrimaryTouch(a),c.pointerType=this.POINTER_TYPE,c.altKey=b.altKey,c.ctrlKey=b.ctrlKey,c.metaKey=b.metaKey,c.shiftKey=b.shiftKey;var e=this;return c.preventDefault=function(){e.scrolling=!1,e.firstXY=null,b.preventDefault()},c},processTouches:function(a,b){var c=a.changedTouches;this.currentTouchEvent=a;for(var d,e=0;e<c.length;e++)d=c[e],b.call(this,this.touchToPointer(d))},shouldScroll:function(b){if(this.firstXY){var c,d=b.currentTarget._scrollType;if('none'===d)c=!1;else if('XY'===d)c=!0;else{var e=b.changedTouches[0],f=d,a='Y'===d?'X':'Y',g=j(e['client'+f]-this.firstXY[f]),h=j(e['client'+a]-this.firstXY[a]);c=g>=h}return this.firstXY=null,c}},findTouch:function(a,b){for(var c,d=0,e=a.length;d<e&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(Q.size>=b.length){var c=[];Q.forEach(function(a,d){if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(e)}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.overDown))},overDown:function(a){Q.set(a.pointerId,{target:a.target,out:a,outTarget:a.target}),v.enterOver(a),v.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var b=a,c=Q.get(b.pointerId);if(c){var d=c.out,e=c.outTarget;v.move(b),d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(v.leaveOut(d),v.enterOver(b)):(b.target=e,b.relatedTarget=null,this.cancelOut(b))),c.out=b,c.outTarget=b.target}},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(v.up(a),v.leaveOut(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){v.cancel(a),v.leaveOut(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){Q.delete(a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(a){var b=M.lastTouches,c=a.changedTouches[0];if(this.isPrimaryTouch(c)){var d={x:c.clientX,y:c.clientY};b.push(d);var e=function(a,b){var c=a.indexOf(b);-1<c&&a.splice(c,1)}.bind(null,b,d);setTimeout(e,2500)}}};L=new c(S.elementAdded,S.elementRemoved,S.elementChanged,S);var T,U,V=v.pointermap,W=window.MSPointerEvent&&'number'===typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,X={events:['MSPointerDown','MSPointerMove','MSPointerUp','MSPointerOut','MSPointerOver','MSPointerCancel','MSGotPointerCapture','MSLostPointerCapture'],register:function(a){v.listen(a,this.events)},unregister:function(a){v.unlisten(a,this.events)},POINTER_TYPES:['','unavailable','touch','pen','mouse'],prepareEvent:function(a){var b=a;return W&&(b=v.cloneEvent(a),b.pointerType=this.POINTER_TYPES[a.pointerType]),b},cleanup:function(a){V.delete(a)},MSPointerDown:function(a){V.set(a.pointerId,a);var b=this.prepareEvent(a);v.down(b)},MSPointerMove:function(a){var b=this.prepareEvent(a);v.move(b)},MSPointerUp:function(a){var b=this.prepareEvent(a);v.up(b),this.cleanup(a.pointerId)},MSPointerOut:function(a){var b=this.prepareEvent(a);v.leaveOut(b)},MSPointerOver:function(a){var b=this.prepareEvent(a);v.enterOver(b)},MSPointerCancel:function(a){var b=this.prepareEvent(a);v.cancel(b),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var b=v.makeEvent('lostpointercapture',a);v.dispatchEvent(b)},MSGotPointerCapture:function(a){var b=v.makeEvent('gotpointercapture',a);v.dispatchEvent(b)}},Y=window.navigator;Y.msPointerEnabled?(T=function(a){g(a),h(this),i(a)&&this.msSetPointerCapture(a)},U=function(a){g(a),this.msReleasePointerCapture(a)}):(T=function(a){g(a),h(this),i(a)&&v.setCapture(a,this)},U=function(a){g(a),v.releaseCapture(a,this)}),function(){if(F){D.forEach(function(a){a+''===a?(E+=e(a)+f(a)+'\n',G&&(E+=d(a)+f(a)+'\n')):(E+=a.selectors.map(e)+f(a.rule)+'\n',G&&(E+=a.selectors.map(d)+f(a.rule)+'\n'))});var a=document.createElement('style');a.textContent=E,document.head.appendChild(a)}}(),function(){if(!window.PointerEvent){if(window.PointerEvent=a,window.navigator.msPointerEnabled){var b=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,'maxTouchPoints',{value:b,enumerable:!0}),v.registerSource('ms',X)}else v.registerSource('mouse',M),void 0!==window.ontouchstart&&v.registerSource('touch',S);v.register(document)}}(),function(){window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:T},releasePointerCapture:{value:U}})}();return{dispatcher:v,Installer:c,PointerEvent:a,PointerMap:o,targetFinding:w}});