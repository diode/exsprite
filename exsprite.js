/**
 * exSprite JavaScript Library v1.0.0
 * http://www.exsprite.com/
 * Copyright 2011, Vipin V
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Jun 14 2011
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
	 	
	 	
	 	m1.a = m2.a;
	 	m1.b = m2.b;
	 	m1.u = m2.u;
	 	m1.c = m2.c;
	 	m1.d = m2.d;
	 	m1.v = m2.v;
	 	m1.dx = m2.dx;
	 	m1.dy = m2.dy;
	 	m1.w = m2.w;
	 	
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
    	if(value){
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
    	if(value){
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
    	if(value){
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
    	if(value){
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
    	if(value){
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
    	if(value){
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
    	if(value){
    		_height = value;
    	}else{
    		return _height;
    	}
    } 
    
    
    this.angleUnit  = function (value){
    	if(value){
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
    	if(value){
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
    	if(value){
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
    	if(value){
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
    	if(value){
    		_transform = value;
    	}else{
    		return _transform;
    	}
    }
    
    
   
    
    
    
    /**
 	 * Function childIndex
 	 * Getter of _childIndex
 	 * 
 	 */
    this.parentSprite  = function (value){
    	if(value){
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
	 	this.draw(graphics2D);
	 	
	 	for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.updateDisplay){
	 			child.updateDisplay(graphics2D, frame, fps);
	 		}
	 		
	 	}
	 	
	 }
	 
	 
	 /**
	 	 * Function draw
	 	 * Draws the pixel according to the sprite content
	 	 * 
	 	 */   
	 this.draw = function (graphics2D){
	 	
	 		
	 		 	
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


