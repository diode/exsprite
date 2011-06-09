/*!
 * spriteX JavaScript Library v1.0.0
 * 
 * Copyright 2011, Vipin V
 * 
 * 
 
 */
 
 
 /**
 * Class definition 
 */
 var ExSprite = function (){
 	
 	 
 	 /* Main canvas 2D graphics context */
	 var _mainGraphics2D = Ex.graphics2D; 
	
	 var _actionsStack   = [];
	 
	 var _actionParams		= [];
	 
 	 /* x co-ordinate */
 	 var _x 	= 0;
 	 
 	 /* y co-ordinate */
 	 var _y 	= 0;
 	 
 	 /* width of the sprite */
 	 var _width 	= 0;
 	 
 	 /* height of the sprite */
 	 var _height 	= 0;
 	
 	 /* child index of the sprite */
 	 var _childIndex 	= 0;
 	 
 	 /* number of children of the sprite */
 	 var _children 	= [];
 	 
 	 
 	 // compositing
    var _alpha 	=  ""; // (default 1.0)
    var _compositeOperation  = "source-over"; // (default source-over)
    // colors and styles
           
    var _strokeStyle  = "#000"; // (default black)
    var _fillStyle =  "#000"; // (default black)
	 
	 // line caps/joins
    var _lineWidth   = 1; // (default 1)
    var _lineCap     = "butt"; // "butt", "round", "square" (default "butt")
    var _lineJoin   =  "miter"; // "round", "bevel", "miter" (default "miter")
    var _miterLimit = 10; // (default 10)

  	 // shadows
    var _shadowOffsetX  = 0; // (default 0)
    var _shadowOffsetY  = 0; // (default 0)
    var _shadowBlur     = 0; // (default 0)
    var _shadowColor    = "#fff"; // (default transparent black)
           
    var _font  = "10px sans-serif" ; // (default 10px sans-serif)
    var _textAlign   = "start"; // "start", "end", "left", "right", "center" (default: "start")
    var _textBaseline  = "alphabetic"; // "top", "hanging", "middle", "alphabetic", "ideographic", "bottom" (default: "alphabetic")       
 	 
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
    
	 /**
 	 * Function pushChild
 	 * Push item to the array of child elements
 	 * 
 	 */
	 this.pushChild = function(exSprite){
	 	_children.push(exSprite);
	 }


  	 
	 
	 /**
 	 * Function alpha
 	 * Setter and Getter of _alpha
 	 * 
 	 */
    this.alpha  = function (value){
    	if(value){
    		_alpha = value;
    	}else{
    		return _alpha;
    	}
    }

 	 /**
 	 * Function compositeOperation
 	 * Setter and Getter of _compositeOperation
 	 * 
 	 */
    this.compositeOperation  = function (value){
    	if(value){
    		_compositeOperation = value;
    	}else{
    		return _compositeOperation;
    	}
    }
    
 	 /**
 	 * Function strokeStyle
 	 * Setter and Getter of _strokeStyle
 	 * 
 	 */
    this.strokeStyle  = function (value){
    	if(value){
    		_strokeStyle = value;
    	}else{
    		return _strokeStyle;
    	}
    }
    
 	 /**
 	 * Function fillStyle
 	 * Setter and Getter of _fillStyle
 	 * 
 	 */
    this.fillStyle  = function (value){
    	if(value){
    		_fillStyle = value;
    	}else{
    		return _fillStyle;
    	}
    }
    
    
 	 /**
 	 * Function lineWidth
 	 * Setter and Getter of _lineWidth
 	 * 
 	 */
    this.lineWidth  = function (value){
    	if(value){
    		_lineWidth = value;
    	}else{
    		return _lineWidth;
    	}
    }

 	 /**
 	 * Function lineCap
 	 * Setter and Getter of _lineCap
 	 * 
 	 */
    this.lineCap  = function (value){
    	if(value){
    		_lineCap = value;
    	}else{
    		return _lineCap;
    	}
    }
    
 	 /**
 	 * Function lineJoin
 	 * Setter and Getter of _lineJoin
 	 * 
 	 */
    this.lineJoin  = function (value){
    	if(value){
    		_lineJoin = value;
    	}else{
    		return _lineJoin;
    	}
    }
    
 	 /**
 	 * Function miterLimit
 	 * Setter and Getter of _miterLimit
 	 * 
 	 */
    this.miterLimit  = function (value){
    	if(value){
    		_miterLimit = value;
    	}else{
    		return _miterLimit;
    	}
    }
  
    
 	 /**
 	 * Function shadowOffsetX
 	 * Setter and Getter of _shadowOffsetX
 	 * 
 	 */
    this.shadowOffsetX  = function (value){
    	if(value){
    		_shadowOffsetX = value;
    	}else{
    		return _shadowOffsetX;
    	}
    }
    

 	 /**
 	 * Function shadowOffsetY
 	 * Setter and Getter of _shadowOffsetY
 	 * 
 	 */
    this.shadowOffsetY = function (value){
    	if(value){
    		_shadowOffsetY = value;
    	}else{
    		return _shadowOffsetY;
    	}
    }	 
    
    	 
	 /**
 	 * Function shadowBlur
 	 * Setter and Getter of _shadowBlur
 	 * 
 	 */
    this.shadowBlur = function (value){
    	if(value){
    		_shadowBlur = value;
    	}else{
    		return _shadowBlur;
    	}
    }	 
    
    
 	 /**
 	 * Function shadowColor
 	 * Setter and Getter of _shadowColor
 	 * 
 	 */
    this.shadowColor = function (value){
    	if(value){
    		_shadowColor = value;
    	}else{
    		return _shadowColor;
    	}
    }	 
    
 	 /**
 	 * Function font
 	 * Setter and Getter of _font
 	 * 
 	 */
    this.font = function (value){
    	if(value){
    		_font = value;
    	}else{
    		return _font;
    	}
    }	 
    
 	 /**
 	 * Function textAlign
 	 * Setter and Getter of _textAlign
 	 * 
 	 */
    this.textAlign = function (value){
    	if(value){
    		_textAlign = value;
    	}else{
    		return _textAlign;
    	}
    }	 
    
 	 /**
 	 * Function textBaseline
 	 * Setter and Getter of _textBaseline
 	 * 
 	 */
    this.textBaseline = function (value){
    	if(value){
    		_textBaseline = value;
    	}else{
    		return _textBaseline;
    	}
    }	     
  
    
    this.beginPath = function(){
    		_actionsStack.push("beginPath");
	 		_actionParams.push({});
	 }
	
	 this.closePath = function (){
	 		_actionsStack.push("closePath");
	 		_actionParams.push({});
	 }
	 
	 this.moveTo = function (x, y){
	 		_actionsStack.push("moveTo");
	 		_actionParams.push({x:(_x + x), y:(_y + y)});
	 }
	 
	 this.lineTo = function (x, y){
	 		_actionsStack.push("lineTo");
	 		_actionParams.push({x:(_x + x), y:(_y + y)});
	 }
		
	 
	 this.fillRect = function (x, y, w, h){
	 		_actionsStack.push("fillRect");
	 		_actionParams.push({x:(_x + x), y:(_y + y), w:w, h:h});
			_width 	= w;
			_height	= h;	 		
	 }
        
    this.strokeRect	= function(x, y, w, h){
    		_actionsStack.push("strokeRect");
	 		_actionParams.push({x:(_x + x), y:(_y + y), w:w, h:h});
    		_mainGraphics2D.strokeRect(_x + x, _y + y, w, h);
    		_width 	= w;
			_height	= h;
    }
    
    
    this.clear = function (){
	 		
	 		_actionsStack.clear();
	 		_actionParams.clear();
	 		
	 		_width 	= 0;
			_height	= 0;	 	
				
	 }
        
   
	 
	 /**
	 	 * Function updateDisplay
	 	 * Updates the display graphics
	 	 * 
	 	 */    
	 this.updateDisplay = function(){
	 	
	 	//graphics2D.clearRect(this.x(), this.y(), this.width(), this.height());
	 	//this.draw(graphics2D);
	 	
	 	_mainGraphics2D.clearRect(_x, _y, _width, _height);
	 	
	 	_mainGraphics2D.globalCompositeOperation = _compositeOperation; 
	   _mainGraphics2D.strokeStyle 	= _strokeStyle;
	   _mainGraphics2D.fillStyle		= _fillStyle;
		_mainGraphics2D.lineWidth		= _lineWidth;
	   _mainGraphics2D.lineCap			= _lineCap;
	   _mainGraphics2D.lineJoin			= _lineJoin;
	   _mainGraphics2D.miterLimit		= _miterLimit;
	
	  	_mainGraphics2D.shadowOffsetX	= _shadowOffsetX;
	   _mainGraphics2D.shadowOffsetY	= _shadowOffsetY;
	   _mainGraphics2D.shadowBlur		= _shadowBlur;
	   _mainGraphics2D.shadowColor		= _shadowColor;
	   
	   _mainGraphics2D.font				= _font;
	   _mainGraphics2D.textAlign		= _textAlign;
	   _mainGraphics2D.textBaseline	= _textBaseline;
	  
	 	
	 	if(_actionsStack && _actionsStack.length){
	 		
	 		for( var a = 0; a < _actionsStack; a++){
	 		
		 		var action = _actionsStack[a];
		 		var params = _actionParams[a];
		 		perform2DAction(action, params);
		 		
		 	}
	 		
	 	}
	 	
	 	for( var i = 0; i < this.numChildren; i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.updateDisplay){
	 			child.updateDisplay();
	 		}
	 		
	 	}
	 	
	 }
	 
	 function perform2DAction(action, params){
	 	 
	 	switch(action){
	 		case "beginPath":
	 			_mainGraphics2D.beginPath();
	 			break;
	 		case "closePath":
	 			_mainGraphics2D.closePath();
	 			break;
	 		case "moveTo":
	 			_mainGraphics2D.moveTo(params.x, params.y);
	 			break;
	 		case "lineTo":
	 			_mainGraphics2D.lineTo(params.x, params.y);
	 			break;
	 		case "fillRect":
	 			_mainGraphics2D.fillRect(params.x, params.y, params.w, params.h);
	 			break;
	 		case "strokeRect":
	 			_mainGraphics2D.strokeRect(params.x, params.y, params.w, params.h);
	 			break;
	 		deafult:
	 			break;
	 	}
	 	
	 	
	 	
	 }
 
}



 
 
 ExSprite.prototype.draw = function(){
 	
 	console.log("sdsdsds");
 	
 }
   


var Ex = function(){
		
	Ex.container = null;
	Ex.canvas		 = null;		
	Ex.graphics2D	 = null;
	Ex.baseSprite	 = null;
	Ex.fps 			=	30;
	Ex.rendering		= null;
	
}

Ex.init = function(container, width, height, fps){
	
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
			
			Ex.container.appendChild(Ex.canvas);
			
			if(fps){
				
				Ex.fps = fps;
				
			}
			
			return true;
			
		}
		
	}
	
	return false;

}


Ex.addSprite = function(exSprite){
	
	if(Ex.baseSprite){
		Ex.baseSprite.pushChild(exSprite);
	}
	
}

Ex.startRendering = function(){
	
	Ex.rendering = setInterval(Ex.render, (1/Ex.fps) * 1000);
	
}

Ex.stopRendering = function(){
	
	if(Ex.rendering){
		clearInterval(Ex.rendering);
	}
	
}


Ex.render = function (){
	//console.log("rendering......");	
	Ex.baseSprite.updateDisplay(Ex.graphics2D);
}


/*


   
	


  void save(); // push state on state stack
  void restore(); // pop state stack and restore state
 
  void scale(in double x, in double y);
  void rotate(in double angle);
  void translate(in double x, in double y);
  void transform(in double a, in double b, in double c, in double d, in double e, in double f);
  void setTransform(in double a, in double b, in double c, in double d, in double e, in double f);
  

  CanvasGradient createLinearGradient(in double x0, in double y0, in double x1, in double y1);
  CanvasGradient createRadialGradient(in double x0, in double y0, in double r0, in double x1, in double y1, in double r1);
  CanvasPattern createPattern(in HTMLImageElement image, in DOMString repetition);
  CanvasPattern createPattern(in HTMLCanvasElement image, in DOMString repetition);
  CanvasPattern createPattern(in HTMLVideoElement image, in DOMString repetition);

  void clearRect(in double x, in double y, in double w, in double h);
  

  
 
  void quadraticCurveTo(in double cpx, in double cpy, in double x, in double y);
  void bezierCurveTo(in double cp1x, in double cp1y, in double cp2x, in double cp2y, in double x, in double y);
  void arcTo(in double x1, in double y1, in double x2, in double y2, in double radius);
  void rect(in double x, in double y, in double w, in double h);
  void arc(in double x, in double y, in double radius, in double startAngle, in double endAngle, in optional boolean anticlockwise);
  void fill();
  void stroke();
  void clip();
  boolean isPointInPath(in double x, in double y);

  
  boolean drawFocusRing(in Element element, in optional boolean canDrawCustom);

  
  long caretBlinkRate();
  boolean setCaretSelectionRect(in Element element, in double x, in double y, in double w, in double h);

  void fillText(in DOMString text, in double x, in double y, in optional double maxWidth);
  void strokeText(in DOMString text, in double x, in double y, in optional double maxWidth);
  TextMetrics measureText(in DOMString text);

 
  void drawImage(in HTMLImageElement image, in double dx, in double dy, in optional double dw, in double dh);
  void drawImage(in HTMLImageElement image, in double sx, in double sy, in double sw, in double sh, in double dx, in double dy, in double dw, in double dh);
  void drawImage(in HTMLCanvasElement image, in double dx, in double dy, in optional double dw, in double dh);
  void drawImage(in HTMLCanvasElement image, in double sx, in double sy, in double sw, in double sh, in double dx, in double dy, in double dw, in double dh);
  void drawImage(in HTMLVideoElement image, in double dx, in double dy, in optional double dw, in double dh);
  void drawImage(in HTMLVideoElement image, in double sx, in double sy, in double sw, in double sh, in double dx, in double dy, in double dw, in double dh);

  
  ImageData createImageData(in double sw, in double sh);
  ImageData createImageData(in ImageData imagedata);
  ImageData getImageData(in double sx, in double sy, in double sw, in double sh);
  void putImageData(in ImageData imagedata, in double dx, in double dy, in optional double dirtyX, in double dirtyY, in double dirtyWidth, in double dirtyHeight);


*/
