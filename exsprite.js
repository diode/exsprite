/**
 * exSprite JavaScript Library v1.0.0
 * http://www.exsprite.com/
 * Copyright 2011, Vipin V
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Jun 12 2011
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software to deal in the Software without
 * restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



 var Utils = function(){}
 
 
 /* A utility function to copy 2D transform matrix */
Utils.copy2DMatrix	  = function (m1, m2){
	   for(var x in m2){
	   	  m1[x] = m2[x];
	   	}
}
/* A utility function to 2D transform matrices */
Utils.multiply2DMatrices = function (m1, m2){
	 	var r = {};
	 	r.a   = 	m1.a * m2.a 	+ m1.c * m2.b + m1.dx * m2.u;
	 	r.c		= 	m1.a * m2.c 	+ m1.c * m2.d + m1.dx * m2.v;
	 	r.dx	= 	m1.a * m2.dx + m1.c * m2.dy + m1.dx * m2.w;
	 	r.b 	= 	m1.b * m2.a + m1.d * m2.b + m1.dy * m2.u;
	 	r.d		= 	m1.b * m2.c + m1.d * m2.d + m1.dy * m2.v ;
	 	r.dy	= 	m1.b * m2.dx + m1.d * m2.dy + m1.dy * m2.w;
	 	r.u 	= 	m1.u * m2.a + m1.v * m2.b + m1.w * m2.u;
	 	r.v		= 	m1.u * m2.c + m1.v * m2.d + m1.w *  m2.v;
	 	r.w		= 	m1.u * m2.dx + m1.v * m2.dy + m1.w *  m2.w;
	 	return r;
}

Utils.getDeterminant2D = function(m){
		 var d = 0;
		 d +=   m.a * m.d * m.w;
		 d +=   m.c * m.dy * m.u;
		 d +=   m.dx * m.b * m.v;
		 d -=   m.u * m.d * m.dx;
		 d -= 	  m.v * m.dy * m.a;
		 d -=   m.w * m.b * m.c;
		 return d;
}

Utils.getTranspose2D = function(m){
	var t = {};
	t.a = m.a;
	t.b = m.c;
	t.u = m.dx;
	t.c = m.b;
	t.d = m.d;
	t.v = m.dy;
	t.dx = m.u;
	t.dy = m.v;
	t.w = m.w;
	return t;
}

Utils.getAdjoint2D = function(m){
	var c = {};
	c.a 	= 	m.d * m.w - m.v * m.dy;
   c.c 	= 	(-1) * ( m.b * m.w - m.u * m.dy );
   c.dx 	= 	m.b * m.v - m.u * m.d;
   c.b		=	(-1)*(m.c * m.w-m.v * m.dx);
  	c.d		=	m.a*m.w-m.u * m.dx;
   c.dy	=	(-1)*(m.a*m.v-m.u*m.c);
	c.u		=	m.c*m.dy-m.d*m.dx;
   c.v		=	(-1)*(m.a*m.dy-m.b*m.dx);
  	c.w		=	m.a*m.d-m.b*m.c;
	return Utils.getTranspose2D(c);
}

Utils.getInverse2D = function(m){
	var d = Utils.getDeterminant2D(m);
	var i = {};
	if(typeof(d) == "number" && d != 0){
		var f = 1/d;
		var a = Utils.getAdjoint2D(m);
		for(var x in a){
			i[x] = a[x] * f;
		}
	}
	return i;
}



 var Event  = function(){
 	 	
 }

 var MouseEvent = function(){
 	Event.call(this);
 }
 
 
 MouseEvent.prototype = new Event;
 MouseEvent.MOUSE_CLICK = "mouseClick";
 MouseEvent.MOUSE_MOVE = "mouseMove";
 MouseEvent.MOUSE_OVER = "mouseOver";
 MouseEvent.MOUSE_OUT = "mouseOut";

 /**
 * ExSprite Class definition 
 */
 var ExSprite = function (){
 	
 	 
 	 /************************************************** PROPERTIES **********************************************/
	
	 
	 /* name of this */
	 var _name = "";
	 
	 /* number of frame */
	 var _frame = 0;
	 
	 /* number of frames per second */
	 var _fps = 0;
	 
 	 /* x co-ordinate */
 	 var _x 	= 0;
 	 
 	 /* y co-ordinate */
 	 var _y 	= 0;
 	 
 	 /* width of the sprite */
 	 var _width 	= 0;
 	 
 	 /* height of the sprite */
 	 var _height 	= 0;
 	 
 	 /* Unit in which angle is expressed */
 	 var _angleUnit	=   "radian"; 
 	 
 	 /* height of the sprite */
 	 var _rotation = 0;
 	 
	 /* horizontal scaling of the sprite */
 	 var _scaleX = 1;
 	 
 	 /* vertical scaling of the sprite */
 	 var _scaleY = 1;
 	 
 	 
 	 
 	 /* transformation */
 	 var _transform = {
 	 		augMatrix2D:{a:1, b:0, u:0, c:0, d:1, v:0, dx:0, dy:0, w:1},
 	 		matrix2D:{a:1, b:0, u:0, c:0, d:1, v:0, dx:0, dy:0, w:1}
 	 	};
 	 	
 	 var _innerBounds = {x:0, y:0, w:0, h:0};
 	 
 	 var _outerBounds = {x:0, y:0, w:0, h:0};
 	 
 	 var _hitArea  =  {x:0, y:0, w:0, h:0}
 	 
 	 var _points = {};
 	 
 	 /* parent container */ 
 	 var _parentSprite;
 
 	 /* child index of the sprite */
 	 var _childIndex 	= 0;
 	 
 	 /* number of children of the sprite */
 	 var _children 	= [];
 	 
 	 
 	 
 	 /************************************************** GETTER & SETTER FUNCTIONS **********************************************/
 	 
 	 
 	 /**
 	 * Function name
 	 * Setter and Getter of _name
 	 * 
 	 */
    this.name = function (value){
    	if(typeof(value) != 'undefined'){
    		_name = value;
    	}else{
    		return _name;
    	}
    }
 	 
 	 /**
 	 * Function frame
 	 * Setter and Getter of _frame
 	 * 
 	 */
    this.frame = function (value){
    	if(typeof(value) != 'undefined'){
    		_frame = value;
    	}else{
    		return _frame;
    	}
    }
    
    
    /**
 	 * Function fps
 	 * Setter and Getter of _fps
 	 * 
 	 */
    this.fps = function (value){
    	if(typeof(value) != 'undefined'){
    		_fps = value;
    	}else{
    		return _fps;
    	}
    }
    
    
 	 /**
 	 * Function x
 	 * Setter and Getter of _x
 	 * 
 	 */
    this.x  = function (value){
    	if(typeof(value) != 'undefined'){
    		_x = value;
    	}else{
    		return _x;
    	}
    }
    
    
    /**
 	 * Function y
 	 * Setter and Getter of _y
 	 * 
 	 */
    this.y  = function (value){
    	if(typeof(value) != 'undefined'){
    		_y = value;
    	}else{
    		return _y;
    	}
    }
    
  	 /**
 	 * Function width
 	 * Setter and Getter of _width
 	 * 
 	 */
    this.width  = function (value){
    	if(typeof(value) != 'undefined'){
    		_width = value;
    	}else{
    		return _width;
    	}
    } 
    
    
    /**
 	 * Function height
 	 * Setter and Getter of _height
 	 * 
 	 */
    this.height  = function (value){
    	if(typeof(value) != 'undefined'){
    		_height = value;
    	}else{
    		return _height;
    	}
    } 
    
    
    this.angleUnit  = function (value){
    	if(typeof(value) != 'undefined'){
    		_angleUnit = value;
    	}else{
    		return _angleUnit;
    	}
    } 
    
 /**
 	 * Function height
 	 * Setter and Getter of _height
 	 * 
 	 */
    this.rotation  = function (value){
    	if(typeof(value) != 'undefined'){
    		_rotation = value;
    	}else{
    		return _rotation;
    	}
    } 
    
    
    /**
 	 * Function scaleX
 	 * Setter and Getter of _scaleX
 	 * 
 	 */
    this.scaleX  = function (value){
    	if(typeof(value) != 'undefined'){
    		_scaleX = value;
    	}else{
    		return _scaleX;
    	}
    } 
    
    
    /**
 	 * Function scaleY
 	 * Setter and Getter of _scaleY
 	 * 
 	 */
    this.scaleY  = function (value){
    	if(typeof(value) != 'undefined'){
    		_scaleY = value;
    	}else{
    		return _scaleY;
    	}
    } 
    
    
	/**
 	 * Function height
 	 * Setter and Getter of _height
 	 * 
 	 */
    this.transform  = function (value){
    	if(typeof(value) != 'undefined'){
    		_transform = value;
    	}else{
    		return _transform;
    	}
    }
    
    
    /* Function innerBounds
 	 * Getter of _innerBounds
 	 * 
 	 */
    this.innerBounds  = function (){
    	return _innerBounds;
    }
    
    
    /* Function innerBounds
 	 * Getter of _innerBounds
 	 * 
 	 */
    this.outerBounds  = function (){
    	return _outerBounds;
    }
    
    
    /**
 	 * Function hitArea
 	 * Setter and Getter of _height
 	 * 
 	 */
    this.hitArea  = function (value){
    	if(typeof(value) != 'undefined' 
    	&& typeof(value.x) != 'undefined'
    	&& typeof(value.y) != 'undefined'
    	&& typeof(value.w) != 'undefined'
    	&& typeof(value.h) != 'undefined'){
    		_hitArea = value;
    	}else{
    		return _hitArea;
    	}
    }
    
    
    
    /**
 	 * Function childIndex
 	 * Getter of _childIndex
 	 * 
 	 */
    this.parentSprite  = function (value){
    	if(typeof(value) != 'undefined'){
    		_parentSprite = value;
    	}else{
    		return _parentSprite;
    	}
    } 
    
    
    /**
 	 * Function childIndex
 	 * Getter of _childIndex
 	 * 
 	 */
    this.childIndex  = function (){
    	return _childIndex;
    }
    
    
    /**
 	 * Function getChildren
 	 * Returns the array of child elements
 	 * 
 	 */
    this.getChildren  = function (){
    	return _children;
    } 
    
    /**
 	 * Function numChildren
 	 * Returns the number of child elements
 	 * 
 	 */
    this.numChildren  = function (){
    	return _children.length;
    }    
    
	 
	 
	 
	/************************************************** METHODS **********************************************/
    
    
   /**
 	 * Function pushChild
 	 * Push item to the array of child elements
 	 * 
 	 */
	 this.pushChild = function(exSprite){
	 	_children.push(exSprite);
	 	exSprite.parentSprite(this);
	 }

  
    
   this.modifyTransform = function(){    
   
   }
   
   this.determineBounds = function(key, points){    
      	
      	_points[key] = points;
    
    }
  
  	this.updateBounds = function(){    
  	
  			var innerBounds = {x1:undefined, x2:undefined, y1:undefined, y2:undefined};
  	
  			for(var key in _points){
  				
  				var innerPoints = _points[key];
  				
  				if(typeof(innerPoints) != "undefined" && innerPoints.length){
  					
  					this.checkBounds(innerPoints, innerBounds);
  					
  				
  				}
  				
  			}
      	
      		if(	typeof(innerBounds.x1) == "number"){
      			 	_innerBounds.x = innerBounds.x1;
      		}
      		
			if(	typeof(innerBounds.y1) == "number"){
      			 	_innerBounds.y = innerBounds.y1;
     		}
     		
     		if(	typeof(innerBounds.x1) == "number" && 	typeof(innerBounds.x2) == "number"){
	      			_innerBounds.w = innerBounds.x2 - innerBounds.x1;
      		}
      		
      		if(	typeof(innerBounds.y1) == "number" && 	typeof(innerBounds.y2) == "number"){
      			 	_innerBounds.h = innerBounds.y2 - innerBounds.y1;
      		}
   		
     	
     		if(_parentSprite){
     			
     			var pltGlobal = this.localToGlobal(_innerBounds.x, _innerBounds.y);
     			var plbGlobal = this.localToGlobal(_innerBounds.x, _innerBounds.y + _innerBounds.h);
     			var prtGlobal = this.localToGlobal(_innerBounds.x + _innerBounds.w, _innerBounds.y);
     			var prbGlobal = this.localToGlobal(_innerBounds.x + _innerBounds.w, _innerBounds.y + _innerBounds.h);
     			
     			var pltParent = _parentSprite.globalToLocal(pltGlobal);
     			var plbParent = _parentSprite.globalToLocal(plbGlobal);
     			var prtParent = _parentSprite.globalToLocal(prtGlobal);
     			var prbParent = _parentSprite.globalToLocal(prbGlobal);
     			
     			var outerPoints = [pltParent, plbParent, prtParent, prbParent];
     			var outerBounds = {x1:undefined, x2:undefined, y1:undefined, y2:undefined};
     			
     			this.checkBounds(outerPoints, outerBounds);
     			
     			//console.log(" outer >>> ", outerBounds.x1, outerBounds.x2, outerBounds.y1, outerBounds.y2);
	  				
  				if(	typeof(outerBounds.x1) == "number"){
	      			 	_outerBounds.x = outerBounds.x1;
	      		}
	      		
				if(	typeof(outerBounds.y1) == "number"){
	      			 	_outerBounds.y = outerBounds.y1;
	     		}
	      		
	      		if(	typeof(outerBounds.x1) == "number" && 	typeof(outerBounds.x2) == "number"){
	      			 	_outerBounds.w = outerBounds.x2 - outerBounds.x1;
	      		}
	      		
	      		if(	typeof(outerBounds.y1) == "number" && 	typeof(outerBounds.y2) == "number"){
	      			 	_outerBounds.h = outerBounds.y2 - outerBounds.y1;
	      		}
     			
			}
     		
     		
   
   }
   
   
   this.checkBounds = function(points, bounds){
   	
   	  
   		for(var i = 0; i < points.length; i++){
  						
  					  var p = points[i];
  					  
  					  if(bounds.x1 == undefined){
  					  		bounds.x1 = p.x;
  					  }
  					  
  					  if(bounds.x2 == undefined){
  					  		bounds.x2 = p.x;
  					  }
  					  
  					  bounds.x1 = Math.min(p.x, bounds.x1);
  					  bounds.x2 = Math.max(p.x, bounds.x2);
  					  
  					  if(bounds.y1 == undefined){
  					  		bounds.y1 = p.y;
  					  }
  					  
  					  if(bounds.y2 == undefined){
  					  		bounds.y2 = p.y;
  					  }
  					  
  					  bounds.y1 = Math.min(p.y, bounds.y1);
  					  bounds.y2 = Math.max(p.y, bounds.y2);
  					  
  		}				
   	
   		
   	
   }
   
   
  
  	this.applyTransform  = function(graphics2D){
  		
  		
  		var rot = _rotation;
  		if(_angleUnit == "degree"){
  			rot	 = rot * (Math.PI/180);
  		}
  		
  		
  		var sMatrix =  {a:_scaleX, b:0, u:0, c:0, d:_scaleY, v:0, dx:0, dy:0, w:1};
  		var rMatrix =  {a:Math.cos(rot), b:Math.sin(rot), u:0, c:-Math.sin(rot), d:Math.cos(rot), v:0, dx:0, dy:0, w:1};
  		var tMatrix =  {a:1, b:0, u:0, c:0, d:1, v:0, dx:_x, dy:_y, w:1};
  		
  		_transform.matrix2D  = Utils.multiply2DMatrices(Utils.multiply2DMatrices(tMatrix, rMatrix), sMatrix);
  		
  
  		if(_parentSprite){
			
			
			var parentTransform = _parentSprite.transform();
			
			_transform.augMatrix2D = Utils.multiply2DMatrices(parentTransform.augMatrix2D, _transform.matrix2D);
			  			
  		
  		}else{
  			
  			Utils.copy2DMatrix(_transform.augMatrix2D, _transform.matrix2D);
  			
  		}
  		
  		var m2D = _transform.augMatrix2D;
  		
  		graphics2D.setTransform( m2D.a, m2D.b, m2D.c, m2D.d, m2D.dx, m2D.dy );
  		
  		
	}
  
  
    
 
	 
	 /**
	 	 * Function updateDisplay
	 	 * Updates the display graphics
	 	 * Recurses into child objects
	 	 * 
	 	 */    
	 this.updateDisplay = function(graphics2D, frame, fps){
	 	

		
		_frame = frame;
		_fps	 = fps;
		
		this.modifyTransform();
		this.applyTransform(graphics2D);
		this.updateBounds();
	 	this.draw(graphics2D);
	 	
	 	for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.drawInParent){
	 			child.drawInParent(graphics2D);
	 		}
	 		
	 	}
	 	
	 	for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.updateDisplay){
	 			child.updateDisplay(graphics2D, frame, fps);
	 		}
	 		
	 	}
	 	
	 }
	 
	 /**
	 	 * Function drawInParent
	 	 * Draws the pixels according to parent transformation
	 	 * 
	 	 */ 
	 this.drawInParent = function(graphics2D){
		
		
		
	}
	 
	 /**
	 	 * Function draw
	 	 * Draws the pixel according to the sprite content
	 	 * 
	 	 */   
	 this.draw = function (graphics2D){
	 	
	 		
	 		 	
	 }
	 
	 /** 
	 * Function hitTest 
	 *
	 *
	 */

	 this.hitTest = function(x,y){
	 	
	 	
	 	
	 }
	 
	 /** 
	 * Function hitTest 
	 *
	 *
	 */

	 this.hitTestObject = function(object){
	 	
	 	
	 	
	 }
	 

	 this.localToGlobal = function(x, y){
	 	
	 	
	 	if(typeof(x) == "object"){
	 		
	 		y = x.y;
	 		x = x.x;
	 		
	 	}
	 	
	 	if(typeof(x) == "number" && typeof(y) == "number"){
	 		
	 		var augmatrix2D  = this.transform().augMatrix2D;
	 		
	 		
	 		var point = {a:1, b:0, u:0, c:0, d:1, v:0, dx:x, dy:y, w:1};
	 		
	 		var result = Utils.multiply2DMatrices(augmatrix2D, point);
	 		
	 		return {x:result.dx, y:result.dy};
	 		
	 		//console.log("matrix >>> ", result.dx, result.dy);
	 		
	 	}
	 	
	 }
	 
	 

	 
	 this.globalToLocal = function(x, y){
	 	
	 	if(typeof(x) == "object"){
	 		
	 		y = x.y;
	 		x = x.x;
	 		
	 	}
	 	
	 	if(typeof(x) == "number" && typeof(y) == "number"){
	 		
	 		var augmatrix2D  = this.transform().augMatrix2D;
	 		
	 		var point = {a:1, b:0, u:0, c:0, d:1, v:0, dx:x, dy:y, w:1};
	 		
	 		var result = Utils.multiply2DMatrices(point, Utils.getInverse2D(augmatrix2D));
	 		
	 		return {x:result.dx, y:result.dy};
	 		
	 		//console.log("matrix >>> ", result.dx, result.dy);
	 		
	 	}
	 	
	 }
 
}



/* Global object to handle Canvas */
var Ex = function(){
		
	Ex.container = null;
	Ex.canvas		 = null;		
	Ex.graphics2D	 = null;
	Ex.baseSprite	 = null;
	Ex.rendering		= null;
	Ex.start			= 0;
	Ex.count			= 0;
	Ex.frame				= 0;
	Ex.fps					= 0;
	
}

/** Function Init
  * Initiate  exSprite Environement
  *
**/
Ex.init = function(container, width, height, fps){
	
	Ex();
	
	Ex.container		=  document.getElementById(container);
	
	if(Ex.container){
		
		Ex.canvas	  = document.createElement('canvas');
		
		if(Ex.canvas	 && Ex.canvas.getContext){
			
			Ex.graphics2D =  Ex.canvas.getContext("2d");
			
			Ex.canvas.width = width;
			Ex.canvas.height = height;
			Ex.canvas.style.position = "absolute";
			Ex.canvas.style.top = 0;
			Ex.canvas.style.left = 0;
			
			
			Ex.baseSprite = new ExSprite();
			Ex.baseSprite.name("BaseSprite");
			
			
			var _fns = {
		
				onMouseClick: function(event){
			
						
			
				},
				
				onMouseOver: function(event){
			
						
			
				},
				
				onMouseOut: function(event){
					
					
				},
				
				onMouseMove: function(event){
					
					
				}
		
		
			}
			
			
			Ex.canvas.onclick 			= _fns.onMouseClick;
			Ex.canvas.onmouseover 	= _fns.onMouseOver;
			Ex.canvas.onmouseout 		= _fns.onMouseOut;
			Ex.canvas.onmousemove 	= _fns.onMouseMove;
			
			
			Ex.container.appendChild(Ex.canvas);
			
			
			
			
			
			
			return true;
			
		}
		
	}
	
	
	
	
	return false;

}


/** Function addSprite
  * Adds sprite to the base container
  *
**/
Ex.addToBase = function(exSprite){
	
	if(Ex.baseSprite){
		Ex.baseSprite.pushChild(exSprite);
	}
	
}

/** Function startRendering
  * Start rendering if animation is involved
  *
**/
Ex.startRendering = function(){
	Ex.start = new Date().getTime();  
	Ex.rendering = window.setInterval(Ex.render, 1000/15);
	
}



/** Function stopRendering
  * Stop rendering if animation is involved
  *
**/
Ex.stopRendering = function(){
	
	if(Ex.rendering){
		window.clearInterval(Ex.rendering);
	}
	
}


/** Function render
  * Renders each child object recursively
  *
**/
Ex.render = function (){
	
	Ex.frame++;
	
	var now = new Date().getTime();  
	var diff = now - Ex.start;
	Ex.fps		=  ((Ex.frame/diff) * 1000).toFixed(2);

	Ex.graphics2D.setTransform(1, 0, 0, 1, 0, 0);
	Ex.graphics2D.clearRect(0, 0, Ex.canvas.width, Ex.canvas.height);
	Ex.baseSprite.updateDisplay(Ex.graphics2D, Ex.frame, Ex.fps);
	
}


