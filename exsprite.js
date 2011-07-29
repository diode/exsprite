/**
 * exSprite JavaScript Library v1.0.0
 * http://www.exsprite.com
 * Copyright 2011, Vipin V
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: July 29 2011
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


/*
   Package: com.diode.exs
   ExSprite Classes Package
*/
com = new Object();
com.diode = new Object();
com.diode.exs = new Object();


/*
   Package: com.diode.exs.display
   Package that contains classes which handles dispaly and graphics
*/
com.diode.exs.display = new Object();


/*
   Package: com.diode.exs.demos
   ExSprite Demos Package
*/
com.diode.exs.demos = new Object();


/*
   Package: com.diode.exs.utils
   Package that contains classes with utility functions
*/
com.diode.exs.utils = new Object();

/*
   Function: log
   Function to log to console
   
   Parameters:

     

   Returns:

      (void).

   See Also:
*/
com.diode.exs.utils.log = function(){
	console.log(arguments);
}

/*
   Class: Matrix
   A utility class to handle matrix operations
*/
com.diode.exs.utils.Matrix = function(){}
 

 
/*
   Function: copyMatrix
   Function that copies the elements of one matrix to another
   
   Parameters:

      m1 (object) - Target Matrix.
      m2 (object) - Source Matrix.

   Returns:

      (void).

   See Also:
*/
com.diode.exs.utils.Matrix.copyMatrix	  = function (m1, m2){
	   for(var x in m2){
	   	  m1[x] = m2[x];
	   	}
}



/*
   Function: multiply2DMatrix
   Function that multiplies two 2D transformation matrices and returns the product matrix.
   
   Parameters:

      m1 (object) - First 2D transformation matrix.
      m2 (object) - Second 2D transformation matrix.

   Returns:

      m1.m2  (object) - product of the two 2D transformation matrices.

   See Also:
*/
com.diode.exs.utils.Matrix.multiply2DMatrices = function (m1, m2){
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

/*
   Function: getDeterminant2D
   Function that finds out the determinant value of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (number) - determinant value

   See Also:
*/
com.diode.exs.utils.Matrix.getDeterminant2D = function(m){
		 var d = 0;
		 d +=   m.a * m.d * m.w;
		 d +=   m.c * m.dy * m.u;
		 d +=   m.dx * m.b * m.v;
		 d -=   m.u * m.d * m.dx;
		 d -= 	  m.v * m.dy * m.a;
		 d -=   m.w * m.b * m.c;
		 return d;
}


/*
   Function: getTranspose2D
   Function that returns the transpose of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (object) - Transpose of the matrix

   See Also:
*/
com.diode.exs.utils.Matrix.getTranspose2D = function(m){
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


/*
   Function: getAdjoint2D
   Function that returns the adjoint of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (object) - Adjoint of the matrix

   See Also:
*/
com.diode.exs.utils.Matrix.getAdjoint2D = function(m){
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
	return this.getTranspose2D(c);
}


/*
   Function: getInverse2D
   Function that returns the inverse of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (object) - Inverse of the matrix

   See Also:
*/
com.diode.exs.utils.Matrix.getInverse2D = function(m){
	var d = this.getDeterminant2D(m);
	var i = {};
	if(typeof(d) == "number" && d != 0){
		var f = 1/d;
		var a = this.getAdjoint2D(m);
		for(var x in a){
			i[x] = a[x] * f;
		}
	}
	return i;
}


/*
   Class: Geometry
   A class that conatins utility functions to handle coordinate geometry.
*/
com.diode.exs.utils.Geometry = function(){}



/*
   Function: rectToPoints
   Function that returns or sets the four vertices of a rectangle object
   
   Parameters:

      rect (object) - Rectangle object ex: {x:0, y:0, w:100, h:100}
      points (array) - This array is filled with the four vertices objects
   
   Returns:

      (array) - Array of four vertices of the rectangle object

   See Also:
*/
com.diode.exs.utils.Geometry.rectToPoints = function(rect, points){
	
	var ps  = [
								{x:rect.x, y:rect.y},
								{x:rect.x + rect.w, y:rect.y},
								{x:rect.x, y:rect.y + rect.h},
								{x:rect.x + rect.w, y:rect.y + rect.h}
					
						];
						
						
	if(points){
		points[0] = ps[0];
		points[1] = ps[1];
		points[2] = ps[2];
		points[3] = ps[3];
	}
	
	return ps;

}



/*
   Function: pointsToRect
   Function that sets the bounding rectangle of set of points
   
   Parameters:

      points (array) - Array of point objects ex: [{x:0, y:10}, {x:-9, y:-8}]
      rect (object) - x, y , w, h properties of this object is set 
   
   Returns:

      (void) 

   See Also:
*/
com.diode.exs.utils.Geometry.pointsToRect = function(points, rect){
   	
   	  
   		for(var i = 0; i < points.length; i++){
  						
  				var p = points[i];
  					  
  				if(rect.x1 == undefined){
  					rect.x1 = p.x;
  				}
  					  
				if(rect.x2 == undefined){
  					rect.x2 = p.x;
  				}
  					  
  				rect.x1 = Math.min(p.x, rect.x1);
  				rect.x2 = Math.max(p.x, rect.x2);
  					  
  				if(rect.y1 == undefined){
  					rect.y1 = p.y;
  				}
  					  
  				if(rect.y2 == undefined){
  					rect.y2 = p.y;
  				}
  					  
  				rect.y1 = Math.min(p.y, rect.y1);
  				rect.y2 = Math.max(p.y, rect.y2);
  				
  				
  				rect.x = rect.x1;
  				rect.y = rect.y1;
  				rect.w = rect.x2 - rect.x1;
  				rect.h = rect.y2 - rect.y1;
  				
  		}				

 }
 
  /*
   Function: intersects
   Checks whether the given rectangles intersect
   
   Parameters:

      rect1 (object) - x, y , w, h 
      rect2 (object) - x, y , w, h 
   
   Returns:

      (false/object)  the intersection rectangle object if they intersect else

   See Also:
*/
com.diode.exs.utils.Geometry.intersects = function(rect1, rect2){
   	
   	  
   		if(
   			typeof(rect1) == "object" && typeof(rect1.x) == "number"  && typeof(rect1.y) == "number"   && typeof(rect1.w) == "number"   && typeof(rect1.h) == "number"   &&
   			typeof(rect1) == "object" && typeof(rect2.x) == "number"  && typeof(rect2.y) == "number"   && typeof(rect2.w) == "number"   && typeof(rect2.h) == "number"   
   		){
   				
   			var intersection = {};
   			
   			intersection.x = Math.max(rect1.x, rect2.x);
   			intersection.y = Math.max(rect1.y, rect2.y);
   			
   			intersection.w = Math.min( (rect1.x + rect1.w), (rect2.x + rect2.w) ) - intersection.x;
   			intersection.h = Math.min( (rect1.y + rect1.h), (rect2.y + rect2.h) ) - intersection.y;
   			
   			if(typeof(intersection.x) == "number" && typeof(intersection.y) == "number" && typeof(intersection.w) == "number" && typeof(intersection.h) == "number" &&
   				intersection.w > 0 && intersection.h > 0){
   				return intersection; 
   			}
   			
   			return false;
   		}
   		
   		return false;

}
 
 /*
   Function: isPointInside
   Checks whether the given point is inside the given rectangle
   
   Parameters:

      point (object) - a point object  ex: {x:0, y:10}, {x:-9, y:-8}
      rect (object) - x, y , w, h 
   
   Returns:

      (boolean)  true if the point is inside and false if point is outside

   See Also:
*/
com.diode.exs.utils.Geometry.isPointInside = function(point, rect){
   	
   	  
   		if( typeof(point.x) == "number" && typeof(point.y) == "number" &&
   		    typeof(rect.x) == "number" && typeof(rect.y) == "number" &&  typeof(rect.w) == "number" && typeof(rect.h) == "number" ){
   			
   			if(rect.x <= point.x && (rect.x + rect.w) >= point.x &&
   			   rect.y <= point.y && (rect.y + rect.h) >= point.y){
   				
   				return true;
   				
   			}
   			
   			
   		}
   		
   		
   		return false;

}




/*
   Function: getVector
   Returns a vector object {x,y,value}
   
   Parameters:

      vx (number) - horizontal component
      vy (number) - vertical component
   
   Returns:

      (object)  

   See Also:
*/
com.diode.exs.utils.Geometry.getVector = function (vx, vy){
	
	
	/* Class: Vector
		Returns a Vector class
	
	*/
	return {
		
			x:typeof(vx) != 'undefined' ? vx : 0,
			y:typeof(vy) != 'undefined' ? vy : 0,
			/*
			   Function: value
			   Returns the magnitude of this vector
			   
			   Parameters:
			
			   Returns:
					(number)  
			
			   See Also:
			*/
			value:function(){
				return Math.sqrt( Math.pow(this.x, 2) +  Math.pow(this.y, 2) );
			}
			
	}
	

}


/*
	Package: com.diode.exs.events
	Package that contains Event Classes
	
*/
com.diode.exs.events = new Object();


/*
	Class: Event
	Base Class for all event classes.
*/
com.diode.exs.events.Event  = function(type){
 	 	
 	 var _type = type;
 	 var _target;
 	 var _currentTarget;
 	 
		
		
		
		this.setTarget = function(t){
	 			_target = t;
	 	}
	 	
	 	
	 	this.setCurrentTarget = function(){
	 			_currentTarget = ct;
	 	}
	 
	 	
	 	this.type = function(){
	 			return _type;
	 	}
	 	
	 	this.getTarget = function(){
	 			return _target;
	 	}
	 	
	 	
	 	this.getCurrentTarget = function(){
	 			return _currentTarget;
	 	}
	 	
	 
 	 
 	 	
}

/*
	Package: com.diode.exs.events.mouse
	Sub-Package for mouse events
*/
com.diode.exs.events.mouse = new Object();


/*
	Class: MouseEvent
	Class that is udsed to handle mouse events 
*/
com.diode.exs.events.mouse.MouseEvent = function(type, mouseX, mouseY){
 	
 	com.diode.exs.events.Event.call(this, type);
 	
 	var _mouseX =  	mouseX;
 	var _mouseY =  	mouseY;
 	
 	
 	this.globalX = function(){
 		return _mouseX; 
 	}
 	
 	
 	this.globalY = function(){
 		return _mouseY; 
 	}
 	
 	
 	
 	this.mouseX = function(item){
 		return _mouseX; 
 	}
 	
 	
 	this.mouseX = function(item){
 		return _mouseY; 
 	}
 	
 	
}
com.diode.exs.events.mouse.MouseEvent.prototype = new com.diode.exs.events.Event();

/*
	Constant: MOUSE_CLICK 
	Event type Mouse Click
*/
com.diode.exs.events.mouse.MouseEvent.MOUSE_CLICK 	= "mouseClick";

/*
	Constant: MOUSE_MOVE 
	Event type Mouse Move
*/
com.diode.exs.events.mouse.MouseEvent.MOUSE_MOVE 	= "mouseMove";

/*
	Constant: MOUSE_OVER 
	Event type Mouse Over
*/
com.diode.exs.events.mouse.MouseEvent.MOUSE_OVER 	= "mouseOver";

/*
	Constant: MOUSE_OUT 
	Event type Mouse Out
*/
com.diode.exs.events.mouse.MouseEvent.MOUSE_OUT 		= "mouseOut";

/*
	Constant: MOUSE_DOWN
	Event type Mouse Down
*/
com.diode.exs.events.mouse.MouseEvent.MOUSE_DOWN 		= "mouseDown";

/*
	Constant: MOUSE_UP 
	Event type Mouse Up
*/
com.diode.exs.events.mouse.MouseEvent.MOUSE_UP 		= "mouseUp";



/*
   Class: ExSprite
   ExSprite Class : Core Display Object
*/
com.diode.exs.display.ExSprite = function (stage){
 	
 	
 	
 	 /* 
	 	Variable: Matrix (private)
	 	Class com.diode.exs.utils.Matrix
	 */
 	 var Matrix = com.diode.exs.utils.Matrix;
 	 
 	 /* 
	 	Variable: Geometry (private)
	 	Class com.diode.exs.utils.Geometry
	 */
 	 var Geometry = com.diode.exs.utils.Geometry;
 	 
 	 
 	 /* 
	 	Variable: log (private)
	 */
 	 var log = com.diode.exs.utils.log;
 	 
 	 
 	 /************************************************** PROPERTIES **********************************************/
 	 
 	 
 	 /* 
	 	Variable: _stage (private)
	 	Stage
	 */
	 var _stage = stage;	 
 	 
	
	/* 
	 	Variable: _xthis (private)
	 	instance
	 */
	 var _xthis = null;	 
	 
	 
	 /* 
	 	Variable: _name (private)
	 	Name of the instance
	 */
	 var _name = "";
	 
	 
	 /* 
	 	Variable: _data (private)
	 	This is used to store any data associated with the object
	 */
	 var _data = "";
	 
	 /* 
	 	Variable: _frame (private)
	 	Current frame number
	 */
	 var _frame = 0;
	 
	 /* 
	 	Variable: _fps (private)
	 	Number of frames per second
	 */
	 var _fps = 0;
	 
 	 /* 
	 	Variable: _x (private)
	 	Cartesian coordinate x
	 */
 	 var _x 	= 0;
 	 
 	 /* 
	 	Variable: _y (private)
	 	Cartesian coordinate y
	 */
 	 var _y 	= 0;
 	 
 	 /* 
	 	Variable: _width (private)
	 	Width of the object
	 */
 	 var _width 	= 0;
 	 
 	 /* 
	 	Variable: _height (private)
	 	Height of the object
	 */
 	 var _height 	= 0;
 	 
 	 /* 
	 	Variable: _angleUnit (private)
	 	Unit in which angle is measured.    values: "radian", "degree" default:"radian"
	 */
 	 var _angleUnit	=   "radian"; 
 	 
 	 /* 
	 	Variable: _rotation (private)
	 	Rotation of the object on XY plane 
	 */
 	 var _rotation = 0;
 	 
	 /* 
	 	Variable: _scaleX (private)
	 	Horizontal scaling of the object
	 */
 	 var _scaleX = 1;
 	 
 	 /* 
	 	Variable: _scaleY (private)
	 	Vertical scaling of the object
	 */
 	 var _scaleY = 1;
 	 
 	 
 	 
 	 /* 
	 	Variable: _transform (private)
	 	Transforamtion in expressed as matrices.        _transform.augMatrix2D: concatenated transforamtion matrix,  _transform.matrix2D: local transforamtion matrix
	 */
 	 var _transform = {
 	 		augMatrix2D:{a:1, b:0, u:0, c:0, d:1, v:0, dx:0, dy:0, w:1},
 	 		matrix2D:{a:1, b:0, u:0, c:0, d:1, v:0, dx:0, dy:0, w:1}
 	 };
 	 
 	 
 	 /* 
	 	Variable: _points (private)
	 	Collecion points inside the object to determine the bounds.
	 */
 	 var _points = {};
 	 
 	 /* 
	 	Variable: _showInnerBounds (private)
	 	Flag that decides the visibility of inner bounds      
	 */
 	 var _showInnerBounds = false;
 	  	 
 	 /* 
	 	Variable: _innerBounds (private)
	 	Inner bounds of the object expressed as rectangle
	 */
 	 var _innerBounds = {x:0, y:0, w:0, h:0};
 	 
 	 /* 
	 	Variable: _showOuterBounds (private)
	 	Flag that decides the visibility of outer bounds. With respect to parent object      
	 */
 	 var _showOuterBounds = false;
 	 
 	 /* 
	 	Variable: _outerBounds (private)
	 	Outer bounds of the object expressed as rectangle. With respect to parent object 
	 */
 	 var _outerBounds = {x:0, y:0, w:0, h:0};
 	 
 	 
 	 /* 
	 	Variable: _showGlobalBounds (private)
	 	Flag that decides the visibility of global bounds. With respect to the coordinate system of the canvas.      
	 */
 	 var _showGlobalBounds = false;
 	 
 	 /* 
	 	Variable: _globalBounds (private)
	 	Global bounds of the object expressed as rectangle. With respect to the coordinate system of the canvas.   
	 */
 	 var _globalBounds = {x:0, y:0, w:0, h:0};
 	 
 	 
 	 /* 
	 	Variable: _hitArea (private)
	 	Area which will be used for hit test. Expressed as rectangle object.
	 */
 	 var _hitArea  =  {x:0, y:0, w:0, h:0}
 	 
 	 /* 
	 	Variable: _parentSprite (private)
	 	Parent object to which this object is added.
	 */
 	 var _parentSprite;
 
 	 /* 
	 	Variable: _childIndex (private)
	 	Index of this object in the children array of its parent object
	 */
 	 var _childIndex 	= 0;
 	 
 	 /* 
	 	Variable: _children (private)
	 	List of the children of this object
	 */
 	 var _children 	= [];
 	 
 	 
 	 /* 
	 	Variable: _eventHandlers (private)
	 	List of event handling functions
	 */
 	 var _eventHandlers = {};
 	 
 	 
 	 /* 
	 	Variable: _defaultEventHandlers (private)
	 	List of event handling functions
	 */
 	 var _defaultEventHandlers = {};
 	 
	 
	 /* 
	 	Variable: _mouseEnabled (private)
	 	Flag that decides whether this object responds to Mouse Interactions
	 */
 	 var _mouseEnabled = true;
 	 
 	 /* 
	 	Variable: _mouseOver (private)
	 	Flag that shows mouse pointer is on this object
	 */
 	 var _mouseOver = false;
 	 
 	 
 	 /************************************************** GETTER & SETTER FUNCTIONS **********************************************/
 	 
 	 
 	 /**
 	 * Function: stage
 	 * Getter of _stage
 	 * 
 	 */
    this.stage = function (value){
    	return _stage;
    }
 	 
 	 /**
 	 * Function: name
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
 	 * Function: frame
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
 	 * Function: fps
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
 	 * Function: data
 	 * Setter and Getter of _data
 	 * 
 	 */
    this.data = function (value){
    	if(typeof(value) != 'undefined'){
    		_data = value;
    	}else{
    		return _data;
    	}
    }
    
    
 	 /**
 	 * Function: x
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
 	 * Function: y
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
 	 * Function: width
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
 	 * Function: height
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
    
    /**
 	 * Function: angleUnit
 	 * Setter and Getter of _angleUnit
 	 * 
 	 */
    this.angleUnit  = function (value){
    	if(typeof(value) != 'undefined'){
    		_angleUnit = value;
    	}else{
    		return _angleUnit;
    	}
    } 
    
   /**
 	 * Function: rotation
 	 * Setter and Getter of _rotation
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
 	 * Function: scaleX
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
 	 * Function: scaleY
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
 	 * Function: transform
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
  
  
  
    
    /* Function: showInnerBounds
 	 * Getter of showInnerBounds
 	 * 
 	 */
    this.showInnerBounds  = function (value){
    	if(typeof(value) != 'undefined'){
    		_showInnerBounds = value;
    	}else{
    		return _showInnerBounds;
    	}
    }
    
    /* Function: innerBounds
 	 * Getter of _innerBounds
 	 * 
 	 */
    this.innerBounds  = function (){
    	return _innerBounds;
    }
    
    
    
    /* Function: showOuterBounds
 	 * Getter of showOuterBounds
 	 * 
 	 */
    this.showOuterBounds  = function (value){
    	if(typeof(value) != 'undefined'){
    		_showOuterBounds = value;
    	}else{
    		return _showOuterBounds;
    	}
    }
    
    /* Function: innerBounds
 	 * Getter of _innerBounds
 	 * 
 	 */
    this.outerBounds  = function (){
    	return _outerBounds;
    }
    
     /* Function: showGlobalBounds
 	 * Getter of showGlobalBounds
 	 * 
 	 */
    this.showGlobalBounds  = function (value){
    	if(typeof(value) != 'undefined'){
    		_showGlobalBounds = value;
    	}else{
    		return _showGlobalBounds;
    	}
    }
    
    /* Function: globalBounds
 	 * Getter of _globalBounds
 	 * 
 	 */
    this.globalBounds  = function (){
    	return _globalBounds;
    }
    
       
    /**
 	 * Function: hitArea
 	 * Setter and Getter of _hitArea
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
 	 * Function: parentSprite
 	 * Getter of _parentSprite
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
 	 * Function: childIndex
 	 * Getter of _childIndex
 	 * 
 	 */
    this.childIndex  = function (){
    	return _childIndex;
    }
    
    
    /**
 	 * Function: mouseEnabled
 	 * Setter and Getter of _mouseEnabled
 	 * 
 	 */
    this.mouseEnabled  = function (value){
    	if(typeof(value) != 'undefined'){
    		_mouseEnabled = value;
    	}else{
    		return _mouseEnabled;
    	}
    } 
    
    
    /**
 	 * Function: mouseOver
 	 * Setter and Getter of _mouseOver
 	 * 
 	 */
    this.mouseOver  = function (value){
    	if(typeof(value) != 'undefined'){
    		_mouseOver = value;
    	}else{
    		return _mouseOver;
    	}
    } 
    
	 
	 
	 
	/************************************************** METHODS **********************************************/
    
    
    
   /**
 	 * Function: pushChild
 	 * Push item to the array of child elements
 	 * 
 	 */
	 this.addChild = function(exSprite){
	 	_children.push(exSprite);
	 	exSprite.parentSprite(this);
	 }
	 
	 /**
 	 * Function: getChildren
 	 * Returns the array of child elements
 	 * 
 	 */
    this.getChildren  = function (){
    	return _children;
    } 
    
    /**
 	 * Function: numChildren
 	 * Returns the number of child elements
 	 * 
 	 */
    this.numChildren  = function (){
    	return _children.length;
    }    
	 
	 /**
 	 * Function: addElements
 	 * Override this function in Subclasses to addChildren and call froem where the instance is created
 	 * 
 	 */
	this.addElements = function(){
		
		
	}

	/**
 	 * Function: updateTransform
 	 * Update the transformation matrix of this object and its child objects
 	 * 
 	 */
   this.updateTransform = function(graphics2D){
   	
   		this.modifyTransform();
   		this.calculateTransform(graphics2D);
   	
   		for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.updateTransform){
	 			
	 				child.updateTransform();
	 			
	 		}
	 		
	 	}
   	
   	}

	/**
 	 * Function: modifyTransform
 	 * This function modifies the orientation of the object . This function has to be overrided and used in subclasses
 	 * 
 	 */
   this.modifyTransform = function(){    
   			
   			
   }
   
   /**
 	 * Function: applyParentTransform
 	 * This function applies the transformation of parent object to draw something in parent object
 	 * 
 	 */
   this.applyParentTransform  = function(graphics2D){
   		
   		var parentTransform = _parentSprite.transform();
   		var m2D = parentTransform.augMatrix2D;
  		graphics2D.setTransform( m2D.a, m2D.b, m2D.c, m2D.d, m2D.dx, m2D.dy );
   	
   	}
   	
   	/**
 	 * Function: applyLocalTransform
 	 * This function applies the transformation of this object to draw something
 	 * 
 	 */
   	this.applyLocalTransform  = function(graphics2D){
   		
   		var m2D = _transform.augMatrix2D;
  		graphics2D.setTransform( m2D.a, m2D.b, m2D.c, m2D.d, m2D.dx, m2D.dy );
   	
   	}
  
   /**
 	 * Function: calculateTransform
 	 * This function creates the resultant transformation matrix
 	 * 
 	 */
  	this.calculateTransform  = function(graphics2D){
  		
  		
  		var rot = _rotation;
  		if(_angleUnit == "degree"){
  			rot	 = rot * (Math.PI/180);
  		}
  		
  		
  		var sMatrix =  {a:_scaleX, b:0, u:0, c:0, d:_scaleY, v:0, dx:0, dy:0, w:1};
  		var rMatrix =  {a:Math.cos(rot), b:Math.sin(rot), u:0, c:-Math.sin(rot), d:Math.cos(rot), v:0, dx:0, dy:0, w:1};
  		var tMatrix =  {a:1, b:0, u:0, c:0, d:1, v:0, dx:_x, dy:_y, w:1};
  		
  		_transform.matrix2D  = Matrix.multiply2DMatrices(Matrix.multiply2DMatrices(tMatrix, rMatrix), sMatrix);
  		
  
  		if(_parentSprite){
			
			
			var parentTransform = _parentSprite.transform();
			
			_transform.augMatrix2D = Matrix.multiply2DMatrices(parentTransform.augMatrix2D, _transform.matrix2D);
			  			
  		
  		}else{
  			
  			Matrix.copyMatrix(_transform.augMatrix2D, _transform.matrix2D);
  			
  		}
  		
  		
  		
  		
	}
   
    /**
 	 * Function: determineBounds
 	 * Adds points to points list to determine the bounds of this object
 	 * 
 	 */
   this.determineBounds = function(key, points){    
      	
      	_points[key] = points;
    
   }
  
    /**
 	 * Function: updateBounds
 	 * update the bounds of this object after transformation is modified.
 	 * 
 	 */
  	this.updateBounds = function(){    
  	
  		
  		//console.log(" name >>> ", this.name());
  	
		
		for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.updateBounds){
	 			
	 			child.updateBounds();
	 			
	 			var childBounds = child.outerBounds();
	 			
	 			
	 			var points = [];
				Geometry.rectToPoints(childBounds, points);
		 
		 
				this.determineBounds("child_" + i.toString(), points);
	 			
	 		}
	 		
	 	}
		
  	
  			var innerBounds = {x1:undefined, x2:undefined, y1:undefined, y2:undefined};
  	
  			for(var key in _points){
  				
  				var innerPoints = _points[key];
  				
  				if(typeof(innerPoints) != "undefined" && innerPoints.length){
  					
  					Geometry.pointsToRect(innerPoints, innerBounds);
  					
  				
  				}
  				
  			}
      	
      		if(	typeof(innerBounds.x) == "number"){
      			 	_innerBounds.x = innerBounds.x;
      		}
      		
			if(	typeof(innerBounds.y) == "number"){
      			 	_innerBounds.y = innerBounds.y;
     		}
     		
     		if(	typeof(innerBounds.w) == "number"){
	      			_innerBounds.w = innerBounds.w;
      		}
      		
      		if(	typeof(innerBounds.h) == "number"){
	      			_innerBounds.h = innerBounds.h;
      		}
   		
     	
     		if(_parentSprite){
     			
     			var pltGlobal = this.localToGlobal(_innerBounds.x, _innerBounds.y);
     			var plbGlobal = this.localToGlobal(_innerBounds.x, _innerBounds.y + _innerBounds.h);
     			var prtGlobal = this.localToGlobal(_innerBounds.x + _innerBounds.w, _innerBounds.y);
     			var prbGlobal = this.localToGlobal(_innerBounds.x + _innerBounds.w, _innerBounds.y + _innerBounds.h);
     			
     			var globalPoints = [pltGlobal, plbGlobal, prtGlobal, prbGlobal];
     			var globalBounds = {x1:undefined, x2:undefined, y1:undefined, y2:undefined};
     			Geometry.pointsToRect(globalPoints, globalBounds);
     			
     				  				
  				if(	typeof(globalBounds.x) == "number"){
	      			 	_globalBounds.x = globalBounds.x;
	      		}
	      		if(	typeof(globalBounds.y) == "number"){
	      			 	_globalBounds.y = globalBounds.y;
	     		}
	     		if(	typeof(globalBounds.w) == "number"){
		      			_globalBounds.w = globalBounds.w;
	      		}
	      		if(	typeof(globalBounds.h) == "number"){
		      			_globalBounds.h = globalBounds.h;
	      		}
	     			
     			
     			var pltParent = _parentSprite.globalToLocal(pltGlobal);
     			var plbParent = _parentSprite.globalToLocal(plbGlobal);
     			var prtParent = _parentSprite.globalToLocal(prtGlobal);
     			var prbParent = _parentSprite.globalToLocal(prbGlobal);
     			
     			var outerPoints = [pltParent, plbParent, prtParent, prbParent];
     			var outerBounds = {x1:undefined, x2:undefined, y1:undefined, y2:undefined};
     			Geometry.pointsToRect(outerPoints, outerBounds);
     			
     				  				
  				if(	typeof(outerBounds.x) == "number"){
	      			 	_outerBounds.x = outerBounds.x;
	      		}
	      		if(	typeof(outerBounds.y) == "number"){
	      			 	_outerBounds.y = outerBounds.y;
	     		}
	     		if(	typeof(outerBounds.w) == "number"){
		      			_outerBounds.w = outerBounds.w;
	      		}
	      		if(	typeof(outerBounds.h) == "number"){
		      			_outerBounds.h = outerBounds.h;
	      		}
	     			
			}
	     		
     		
   
   }
   
 
	 
	 /**
	 	 * Function: updateDisplay
	 	 * Updates the display graphics. Recurses into child objects
	 	 * 
	 	 * 
	 */    
	 this.updateDisplay = function(graphics2D, frame, fps){
	 	
	 	_frame = frame;
		_fps	 = fps;
		
		
		this.drawGlobalBounds(graphics2D);
		
		
		if(_parentSprite){
			this.applyParentTransform(graphics2D);
			this.drawInParent(graphics2D);
			this.drawOuterBounds(graphics2D);
		}
		
		
		
		this.applyLocalTransform(graphics2D);
		this.draw(graphics2D);
		this.drawInnerBounds(graphics2D);
	 	
	 	/*for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.drawInParent){
	 			child.drawInParent(graphics2D);
	 			child.
	 		}
	 		
	 	}*/
	 	
	 	for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.updateDisplay){
	 			
				for( var j =  i+1 ; j < this.numChildren(); j++){
					
					var child1 = _children[j];
					var hit = child.hitTestObject(child1);
					if(hit){
						log(child.name() , " hits ", child1.name());
					}
					
				}
	 			
	 			child.updateDisplay(graphics2D, frame, fps);
	 		}
	 		
	 	}
	 	
	 }
	 
	/**
	 	 * Function: drawInnerBounds
	 	 * Draw the inner bounds of the object if the flag is true
	 	 * 
	 	 * 
	 */  
	this.drawInnerBounds = function(graphics2D){
		
		if(typeof(_showInnerBounds) === "string"){
			
			var bounds = this.innerBounds();
			graphics2D.strokeStyle   = _showInnerBounds; //"rgba(255, 255, 0, 0.7)";
			graphics2D.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
			
	   }
		
	 }
	 
	 /**
	 	 * Function: drawOuterBounds
	 	 * Draw the outer bounds of the object if the flag is true
	 	 * 
	 	 * 
	 */ 
	 this.drawOuterBounds = function(graphics2D){
		
		if(typeof(_showOuterBounds) === "string"){
			
			var bounds = this.outerBounds();
			graphics2D.strokeStyle   = _showOuterBounds; //"rgba(255, 255, 0, 0.7)";
			graphics2D.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
			
	   }
		
	 }
	 
	 
	/**
	 	 * Function: drawGlobalBounds
	 	 * Draw the global bounds of the object if the flag is true
	 	 * 
	 	 * 
	 */ 
	this.drawGlobalBounds = function(graphics2D){
		
		if(typeof(_showGlobalBounds) === "string"){
			
			graphics2D.setTransform(1, 0, 0, 1, 0, 0);
			
			var bounds = this.globalBounds();
			graphics2D.strokeStyle   = _showGlobalBounds; //"rgba(255, 255, 0, 0.7)";
			graphics2D.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
			
	   }
		
	 }
	 
	 
	 /**
	 	 * Function: drawInParent
	 	 * Draws the pixels according to parent transformation. This function has to be overrided in subclasses to draw something in parent object
	 	 * 
	 	 */ 
	this.drawInParent = function(graphics2D){
		
		
		
	}
	 
	 /**
	 	 * Function: draw
	 	 * Draws the pixel according to the sprite content. This function has to be overrided in subclasses to draw something.
	 	 * 
	 	 */   
	 this.draw = function (graphics2D){
	 	
	 	
	 }
	 

	 /** 
	 * Function: localToGlobal 
	 *  Returns the global point equivalent to the given local point. 
	 *
	 */
	 this.localToGlobal = function(x, y){
	 	
	 	
	 	if(typeof(x) == "object"){
	 		
	 		y = x.y;
	 		x = x.x;
	 		
	 	}
	 	
	 	if(typeof(x) == "number" && typeof(y) == "number"){
	 		
	 		var augmatrix2D  = this.transform().augMatrix2D;
	 		
	 		
	 		var point = {a:1, b:0, u:0, c:0, d:1, v:0, dx:x, dy:y, w:1};
	 		
	 		var result = Matrix.multiply2DMatrices(augmatrix2D, point);
	 		
	 		return {x:result.dx, y:result.dy};
	 		
	 		//console.log("matrix >>> ", result.dx, result.dy);
	 		
	 	}
	 	
	 }
	 
	 /** 
	 * Function: globalToLocal 
	 *  Returns the local point equivalent to the given global point. 
	 *
	 */
	 this.globalToLocal = function(x, y){
	 	
	 	if(typeof(x) == "object"){
	 		
	 		y = x.y;
	 		x = x.x;
	 		
	 	}
	 	
	 	if(typeof(x) == "number" && typeof(y) == "number"){
	 		
	 		var augmatrix2D  = this.transform().augMatrix2D;
	 		
	 		var point = {a:1, b:0, u:0, c:0, d:1, v:0, dx:x, dy:y, w:1};
	 		
	 		var result = Matrix.multiply2DMatrices(Matrix.getInverse2D(augmatrix2D), point);
	 		
	 		return {x:result.dx, y:result.dy};
	 		
	 	}
	 	
	 }
	 
	 
	 /** 
	 * Function: hitTest 
	 * Checks whether the point is inside this object.
	 *
	 */

	 this.hitTest = function(x,y){
	 	
	 	var p;
	 	if(typeof(x) == "object" && typeof(x.x) == "number" && typeof(x.y) == "number"){
	 		p = x;
	 	}else if(typeof(x) == "number" && typeof(y) == "number"){
	 		p = {x:x, y:y};
	 	}
	 	
	 	var hit = false;
	 	var bounds = this.outerBounds();
	 	if(typeof(p) == "object"){
	 		hit = Geometry.isPointInside(p, bounds);
	 	}
	 	
	 	return hit;
	 	
	 }
	 
	 /** 
	 * Function: hitTestObject 
	 *  Checks whether the given object collides with this one.
	 *
	 */
	 this.hitTestObject = function(object){
	 	
	 	var bounds1 = this.outerBounds();
	 	var bounds2 = object.outerBounds();
	 	
	 	if(bounds1 && bounds2){

			var intersection = Geometry.intersects(bounds1, bounds2);	 		
	 		
	 		if(typeof(intersection) == "object"){
	 			return true;
	 		}
	 		
	 	}
	 
	 	return false;
	 
	 }
	 
	 
	 this.startDrag = function(){
	 	
	 	
	 	
	 }
	 
	 
	 this.stopDrag = function(){
	 	
	 	
	 	
	 }
	 
	 
	 
	 this.dispatchEvent = function(event){
	 	
	 	event.setTarget(this);
	 	
	 	this.callEventListener(event);
	 	
	 	var available = this.callDefaultEventListener(event);
	 	
	 	if(!available){
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
		 		if(child && child.dispatchEvent){
		 				child.dispatchEvent(event);
		 		}
		 	}
	 	}
	 	
	 	
	 
	 }
	 
	 
	 this.addDefaultEventListener = function(eventType, handler){
	 	
	 	if(typeof(eventType) == "string" && typeof(handler) == "function"){
	 		
	 		_defaultEventHandlers[eventType] = handler;
	 		
		}
	 	
	 }
	 
	 this.addEventListener = function(eventType, handler){
	 	
	 	if(typeof(eventType) == "string" && typeof(handler) == "function"){
	 		
	 		if(typeof(_eventHandlers[eventType]) != "object"){
	 				_eventHandlers[eventType] = [];
	 		}
	 		
			var handlers = _eventHandlers[eventType];	 	
			
			var exists = false;	
	 		if(typeof(handlers) != "undefined" && handlers.length){
		 		
		 		for(var i = 0; i < handlers.length; i++){
	 				if(handlers[i] == handler){
	 						exists = true;
	 						break;
	 				}
	 			}
		 	}
			if(!exists){
		 		handlers.push(handler);
		 	}	
	 	}
	 	
	 }
	 
	 
	 this.callDefaultEventListener = function(event){
		
		var eventType = event.type();
	 	
	 	if(typeof(eventType) == "string"){
	 		
	 		if(typeof(_defaultEventHandlers[eventType]) == "undefined"){
	 				return false;
	 		}
	 		
	 		var handler = _defaultEventHandlers[eventType];
	 		
	 		if(typeof(handler) == "function"){
	 				handler(event);
	 				return true;
	 		}
	 		 return false;
	 	}
	 	
	 }
	 
	this.callEventListener = function(event){
		
		var eventType = event.type();
	 	
	 	if(typeof(eventType) == "string"){
	 		
	 		if(typeof(_eventHandlers[eventType]) != "object"){
	 				return;
	 		}
	 		
	 		var handlers = _eventHandlers[eventType];
	 		
	 		if(typeof(handlers) != "undefined" && handlers.length){
	 				
	 				for(var i = 0; i < handlers.length; i++){
	 					var handler = handlers[i];
	 					handler(event);
	 				}
	 		}
	 		
	 	}
	 	
	 }
	 
	 
	 this.removeEventListener = function(eventType, handler){
	 	
	 	if(typeof(eventType) == "string" && typeof(handler) == "function"){
	 		
	 		if(typeof(_eventHandlers[eventType]) != "object"){
	 				return;
	 		}
	 		
	 		var handlers = _eventHandlers[eventType];
	 		
	 		if(typeof(handlers) != "undefined" && handlers.length){
	 				
	 				for(var i = 0; i < handlers.length; i++){
	 					if(handlers[i] == handler){
	 						handlers.splice(i, 1);
	 						break;
	 					}
	 				}
	 		}
	 		
	 	}
	 	
	 }
	 
	 
	 this.defaultMouseClickListener = function(event){
	 	
	 	if(typeof(event.globalX()) == "number" && typeof(event.globalY()) == "number"){
	 		
	 		var gX = event.globalX();
	 		var gY = event.globalY();
	 		
	 		var point = this.globalToLocal(gX, gY);
	 		
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
	 		
	 			//console.log( "checking >>> ", this.name(), Geometry.isPointInside(point, bounds) );
	 			
	 			var clicked = false;
	 			
	 			if(child && child.hitTest){
	 				clicked = child.hitTest(point);
	 			}
		 		
		 		if(clicked === true && child.dispatchEvent){
		 				child.dispatchEvent(event);			 			
		 		}
		 		
			}
	 		
	 	}
	 	
	 }
	 
	 
	 this.defaultMouseOverListener = function(event){
	 	
	 	_mouseOver  = true;
	 	
	 	if(typeof(event.globalX()) == "number" && typeof(event.globalY()) == "number"){
	 		
	 		var gX = event.globalX();
	 		var gY = event.globalY();
	 		
	 		var point = this.globalToLocal(gX, gY);
	 		
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
	 		
	 			//console.log( "checking >>> ", this.name(), Geometry.isPointInside(point, bounds) );
	 			
	 			var over = false;
	 			
	 			if(child && child.hitTest){
	 				over = child.hitTest(point);
	 			}
		 		
		 		if(over === true && !child.mouseOver() && child.dispatchEvent){
		 				child.dispatchEvent(event);			 			
		 		}
		 		
			}
	 		
	 	}
	 }
	 
	 this.defaultMouseOutListener = function(event){
	 	
	 	_mouseOver  = false;
	 	
	 	if(typeof(event.globalX()) == "number" && typeof(event.globalY()) == "number"){
	 		
	 		var gX = event.globalX();
	 		var gY = event.globalY();
	 		
	 		var point = this.globalToLocal(gX, gY);
	 		
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
	 		
	 			//console.log( "checking >>> ", this.name(), Geometry.isPointInside(point, bounds) );
	 			
	 			var over = false;
	 			
	 			if(child && child.hitTest){
	 				over = child.hitTest(point);
	 			}
		 		
		 		if(over != true && child.mouseOver() === true && child.dispatchEvent){
		 				child.dispatchEvent(event);			 			
		 		}
		 		
			}
	 		
	 	}
	 }
	 
	 this.defaultMouseMoveListener = function(event){
	 	
	 	
	 	
	 	if(typeof(event.globalX()) == "number" && typeof(event.globalY()) == "number"){
	 		
	 		var gX = event.globalX();
	 		var gY = event.globalY();
	 		
	 		var point = this.globalToLocal(gX, gY);
	 		
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
	 		
	 			//console.log( "checking >>> ", this.name(), Geometry.isPointInside(point, bounds) );
	 			
	 			var over = false;
	 			
	 			if(child && child.hitTest){
	 				over = child.hitTest(point);
	 			}
	 			
 			
		 		
		 		if(over === true && child.mouseOver() != true && child.dispatchEvent){
		 				var mouseOverEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_OVER, event.globalX, event.globalY);
		 				child.dispatchEvent(mouseOverEvent);			 			
		 		}
		 		
		 		if(over != true && child.mouseOver() === true && child.dispatchEvent){
		 				var mouseOutEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_OUT, event.globalX, event.globalY);
		 				child.dispatchEvent(mouseOutEvent);			 			
		 		}
		 		
				
				if(over === true && child.dispatchEvent){
		 				child.dispatchEvent(event);			 			
		 		}
		 		
		 		
			}
	 		
	 	}
	 }
	 
	 
	 this.defaultMouseDownListener = function(event){
	 	
	 	
	 	
	 	if(typeof(event.globalX()) == "number" && typeof(event.globalY()) == "number"){
	 		
	 		var gX = event.globalX();
	 		var gY = event.globalY();
	 		
	 		var point = this.globalToLocal(gX, gY);
	 		
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
	 		
	 			//console.log( "checking >>> ", this.name(), Geometry.isPointInside(point, bounds) );
	 			
	 			var over = false;
	 			
	 			if(child && child.hitTest){
	 				over = child.hitTest(point);
	 			}
		 		
		 		if(over === true && child.dispatchEvent){
		 				child.dispatchEvent(event);			 			
		 		}
		 		
			}
	 		
	 	}
	 }
	 
	 this.defaultMouseUpListener = function(event){
	 	
	 	
	 	
	 	if(typeof(event.globalX()) == "number" && typeof(event.globalY()) == "number"){
	 		
	 		var gX = event.globalX();
	 		var gY = event.globalY();
	 		
	 		var point = this.globalToLocal(gX, gY);
	 		
	 		for( var i = 0; i < this.numChildren(); i++){
	 			var child = _children[i];
	 		
	 			//console.log( "checking >>> ", this.name(), Geometry.isPointInside(point, bounds) );
	 			
	 			var over = false;
	 			
	 			if(child && child.hitTest){
	 				over = child.hitTest(point);
	 			}
		 		
		 		if(over === true && child.dispatchEvent){
		 				child.dispatchEvent(event);			 			
		 		}
		 		
			}
	 		
	 	}
	 }
	 
	 _xthis = this;
	 
	 this.addDefaultEventListener(com.diode.exs.events.mouse.MouseEvent.MOUSE_CLICK, function(event){ 
	 																																	_xthis.defaultMouseClickListener(event);
	 																															  });
	 this.addDefaultEventListener(com.diode.exs.events.mouse.MouseEvent.MOUSE_OVER, function(event){ 
	 																																	_xthis.defaultMouseOverListener(event);
	 																															  });		
 	 this.addDefaultEventListener(com.diode.exs.events.mouse.MouseEvent.MOUSE_OUT, function(event){ 
	 																																	_xthis.defaultMouseOutListener(event);
	 																															  }); 	
	 this.addDefaultEventListener(com.diode.exs.events.mouse.MouseEvent.MOUSE_MOVE, function(event){ 
	 																																	_xthis.defaultMouseMoveListener(event);
	 																															  });																															  																														  																													 
	 this.addDefaultEventListener(com.diode.exs.events.mouse.MouseEvent.MOUSE_DOWN, function(event){ 
	 																																	_xthis.defaultMouseDownListener(event);
	 																															  }); 	
	 this.addDefaultEventListener(com.diode.exs.events.mouse.MouseEvent.MOUSE_UP, function(event){ 
	 																																	_xthis.defaultMouseUpListener(event);
	 																															  });
	 
}



/**
	 	 * Class: ExView
	 	 * Rendering system for ExSprites
	 	 * 
	 	 * 
	 */ 
com.diode.exs.display.ExView = function(){
	
	
	
	var _xthis = null;
	
	/* 
	 	Variable: ExSprite (private)
	 	Class com.diode.exs.display.ExSprite;
	 */	
	var ExSprite = com.diode.exs.display.ExSprite;
	
	
	/* 
	 	Variable: _container (private)
	 	Container element of the canvas in the HTML DOM
	 */		
	var _container = null;
	
	/* 
	 	Variable: _canvas (private)
	 	Canvas Element
	 */
	var _canvas		 = null;	
	
	/* 
	 	Variable: _graphics2D (private)
	 	2D Graphics context of the canavs
	 */	
	var _graphics2D	 = null;
	
	/* 
	 	Variable: _baseSprite (private)
	 	Instance of Root Container which is added at the root position
	 */	
	var _baseSprite	 = null;
	
	/* 
	 	Variable: _rendering (private)
	 	Rendering interval ID
	 */	
	var _rendering		= null;
	
	/* 
	 	Variable: _start (private)
	 	Time at which rendering started
	 */	
	var _start			= 0;
	
	/* 
	 	Variable: _count (private)
	 	Variable to count frames
	 */	
	var _count			= 0;
	
	/* 
	 	Variable: _frame (private)
	 	Number of current frame
	 */	
	var _frame				= 0;
	
	/* 
	 	Variable: _fps (private)
	 	Number of frames per second
	 */	
	var _fps					= 0;
	
	/* 
	 	Variable: _dragHandler (private)
	 	Number of frames per second
	 */	
	var _dragHandler;
	
	
/************************************************** METHODS **********************************************/
	
	
/*
* Function: init
  * Initiate  exSprite Environement
  *
**/
this.init = function(container, width, height, fps){
	
	
		
	_container		=  document.getElementById(container);
	
	if(_container){
		
		_canvas	  = document.createElement('canvas');
		
		if(_canvas	 && _canvas.getContext){
			
			_graphics2D =  _canvas.getContext("2d");
			
			_canvas.width = width;
			_canvas.height = height;
			_canvas.style.position = "absolute";
			_canvas.style.top = 0;
			_canvas.style.left = 0;
			
			
			_baseSprite = new ExSprite();
			_baseSprite.name("BaseSprite");
			
			
			var _fns = {
		
				onMouseClick: function(event){
			
						//console.log(" Mouse clicked .... Canvas >> ", event.layerX, event.layerY, event.view.screenX, event.view.screenY);
						
						var mouseClickEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_CLICK, event.layerX, event.layerY);
						_baseSprite.dispatchEvent(mouseClickEvent);
						
				},
				
				onMouseOver: function(event){
			
						//console.log(" Mouse over .... Canvas");
						var mouseOverEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_OVER, event.layerX, event.layerY);
						_baseSprite.dispatchEvent(mouseOverEvent);
			
				},
				
				onMouseOut: function(event){
					
						//console.log(" Mouse out .... Canvas");
						var mouseOutEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_OUT, event.layerX, event.layerY);
						_baseSprite.dispatchEvent(mouseOutEvent);
					
				},
				
				onMouseMove: function(event){
					
						//console.log(" Mouse Move .... Canvas");
						var mouseMoveEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_MOVE, event.layerX, event.layerY);
						_baseSprite.dispatchEvent(mouseMoveEvent);
						
						_xthis.handleDrag(event);
					
				},
				
				onMouseDown: function(event){
					
						//console.log(" Mouse Down .... Canvas");
						var mouseDownEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_DOWN, event.layerX, event.layerY);
						_baseSprite.dispatchEvent(mouseDownEvent);
					
				},
				
				onMouseUp: function(event){
					
						//console.log(" Mouse Up .... Canvas");
						var mouseUpEvent = new com.diode.exs.events.mouse.MouseEvent(com.diode.exs.events.mouse.MouseEvent.MOUSE_UP, event.layerX, event.layerY);
						_baseSprite.dispatchEvent(mouseUpEvent);
					
				}
		
		
			}
			
			
			_canvas.onclick 			= _fns.onMouseClick;
			_canvas.onmouseover 		= _fns.onMouseOver;
			_canvas.onmouseout 		= _fns.onMouseOut;
			_canvas.onmousemove 		= _fns.onMouseMove;
			_canvas.onmousedown 		= _fns.onMouseDown;
			_canvas.onmouseup  		= _fns.onMouseUp;
			
			
			_container.appendChild(_canvas);
			
			_xthis = this;
			
			return true;
			
		}
		
	}
	
	
	
	
	return false;

}


/** Function: addToBase
  * Adds sprite to the base container
  *
**/
this.addChild = function(exSprite){
	
	if(_baseSprite){
		_baseSprite.addChild(exSprite);
	}
	
}


/** Function: startRendering
  * Start rendering if animation is involved
  *
**/
this.startRendering = function(){
	
	if(com.diode.exs.Ex){
		
		_start = new Date().getTime(); 
		
		var xthis = this; 
		_rendering = setInterval(function(){
												xthis.render();
										}, 1000/15);
						
	
	}	
	
	
}


/** Function: render
  * Function that renders view
  *
**/
this.render = function (){
	
		_frame++;

		var now = new Date().getTime();  
		var diff = now - _start;
		_fps		=  ((_frame/diff) * 1000).toFixed(2);
	
		_graphics2D.setTransform(1, 0, 0, 1, 0, 0);
		_graphics2D.clearRect(0, 0, _canvas.width, _canvas.height);
		
		
		_baseSprite.updateTransform(_graphics2D);
		_baseSprite.updateBounds();
		_baseSprite.updateDisplay(_graphics2D, _frame, _fps);
		

}



/** Function: stopRendering
  * Stop rendering if animation is involved
  *
**/
this.stopRendering = function(){
	
	if(_rendering){
		clearInterval(_rendering);
	}
	
}


this.handleDrag = function(event){
	
	//_dragHandler(event);
	
}

}



/**
	 	 * Class: Ex
	 	 * Global singleton class
	 	 * 
	 	 * 
	 */ 

com.diode.exs.Ex = (function(){
	
	
	var _exViews = [];
	
		
	return {createView:function(){
		
		if(com.diode.exs.display.ExView){
			var exView = new com.diode.exs.display.ExView();
			_exViews.push(exView);
			return exView;
		}
		
	}};
	
	
	
})();



