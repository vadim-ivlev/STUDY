window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}();var Paint=function(a){var b=a.el;b.width=window.innerWidth,b.height=window.innerHeight;var c=b.getContext("2d");c.lineCap=a.lineCap||"round",this.ctx=c,this.canvas=b,this.lines={},this.pointers={},this.initEvents(),requestAnimFrame(this.renderLoop.bind(this))};Paint.prototype.initEvents=function(){var a=this.canvas;a.addEventListener("pointerdown",this.onPointerDown.bind(this)),a.addEventListener("pointermove",this.onPointerMove.bind(this)),a.addEventListener("pointerup",this.onPointerUp.bind(this)),a.addEventListener("pointercancel",this.onPointerUp.bind(this))},Paint.prototype.onPointerDown=function(a){var b="touch"===a.pointerType?a.width||10:4;this.pointers[a.pointerId]=new Pointer({x:a.clientX,y:a.clientY,width:b})},Paint.prototype.onPointerMove=function(a){var b=this.pointers[a.pointerId];b&&b.setTarget({x:a.clientX,y:a.clientY})},Paint.prototype.onPointerUp=function(a){delete this.pointers[a.pointerId]},Paint.prototype.renderLoop=function(){for(var a in this.pointers){var b=this.pointers[a];if(b.isDelta()){var c=this.ctx;c.lineWidth=b.width,c.strokeStyle=b.color,c.beginPath(),c.moveTo(b.x,b.y),c.lineTo(b.targetX,b.targetY),c.stroke(),c.closePath(),b.didReachTarget()}}requestAnimFrame(this.renderLoop.bind(this))};function Pointer(a){this.x=a.x,this.y=a.y,this.width=a.width,this.color=Pointer.COLORS[Math.floor(Math.random()*Pointer.COLORS.length)]}Pointer.COLORS=["red","green","yellow","blue","magenta","orangered"],Pointer.prototype.setTarget=function(a){this.targetX=a.x,this.targetY=a.y},Pointer.prototype.didReachTarget=function(){this.x=this.targetX,this.y=this.targetY},Pointer.prototype.isDelta=function(){return this.targetX&&this.targetY&&(this.x!=this.targetX||this.y!=this.targetY)};