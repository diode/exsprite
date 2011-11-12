/**
 * exSprite JavaScript Library v1.0.2
 * http://www.exsprite.com
 * Copyright 2011, Vipin V
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: November 12 2011
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
/**
 * Class: Ex
 * Global singleton class
 * 
 * 
 */
ex = (function () {


    var _defs = {

        ExView: function () {



            var _xthis = null;


/* 
	 	Variable: _container (private)
	 	Container element of the canvas in the HTML DOM
	 */
            var _container = null;

/* 
	 	Variable: _canvas (private)
	 	Canvas Element
	 */
            var _canvas = null;

/* 
	 	Variable: _graphics2D (private)
	 	2D Graphics context of the canavs
	 */
            var _graphics2D = null;
            
/* 
	 	Variable: _graphics2DProxy (private)
	 	2D Graphics context of the canavs
	 */
            var _graphics2Dproxy = null;
            
            

/* 
	 	Variable: _baseSprite (private)
	 	Instance of Root Container which is added at the root position
	 */
            var _baseSprite = null;

/* 
	 	Variable: _rendering (private)
	 	Rendering interval ID
	 */
            var _rendering = null;

/* 
	 	Variable: _start (private)
	 	Time at which rendering started
	 */
            var _start = 0;

/* 
	 	Variable: _count (private)
	 	Variable to count frames
	 */
            var _count = 0;

/* 
	 	Variable: _frame (private)
	 	Number of current frame
	 */
            var _frame = 0;

/* 
	 	Variable: _fps (private)
	 	Number of frames per second
	 */
            var _fps = 0;

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
            this.init = function (container, width, height, fps) {



                _container = document.getElementById(container);

                if (_container) {

                    _canvas = document.createElement('canvas');

                    if (_canvas && _canvas.getContext) {

                        _graphics2D = _canvas.getContext("2d");

                        _canvas.width = width;
                        _canvas.height = height;

                        _baseSprite = ex.createSprite();
                        _baseSprite.name("BaseSprite");
                        
                        _graphics2Dproxy = {
                        	target: null,                        
                        	lineWidth: function (v) {
							    _graphics2D.lineWidth = v;
							},
							textBaseline: function (v) {
							    _graphics2D.textBaseline = v;
							},
							strokeStyle: function (v) {
							    _graphics2D.strokeStyle = v;
							},
							lineJoin: function (v) {
							    _graphics2D.lineJoin = v;
							},
							shadowBlur: function (v) {
							    _graphics2D.shadowBlur = v;
							},
							globalAlpha: function (v) {
							    _graphics2D.globalAlpha = v;
							},
							textAlign: function (v) {
							    _graphics2D.textAlign = v;
							},
							globalCompositeOperation: function (v) {
							    _graphics2D.globalCompositeOperation = v;
							},
							font: function (v) {
							    _graphics2D.font = v;
							},
							shadowColor: function (v) {
							    _graphics2D.shadowColor = v;
							},
							miterLimit: function (v) {
							    _graphics2D.miterLimit = v;
							},
							shadowOffsetY: function (v) {
							    _graphics2D.shadowOffsetY = v;
							},
							fillStyle: function (v) {
							    _graphics2D.fillStyle = v;
							},
							shadowOffsetX: function (v) {
							    _graphics2D.shadowOffsetX = v;
							},
							lineCap: function (v) {
							    _graphics2D.lineCap = v;
							},
							save: function () {
							    _graphics2D.save.apply(_graphics2D, arguments);
							},
							restore: function () {
							    _graphics2D.restore.apply(_graphics2D, arguments);
							},
							scale: function () {
							    _graphics2D.scale.apply(_graphics2D, arguments);
							},
							rotate: function () {
							    _graphics2D.rotate.apply(_graphics2D, arguments);
							},
							translate: function () {
							    _graphics2D.translate.apply(_graphics2D, arguments);
							},
							transform: function () {
							    _graphics2D.transform.apply(_graphics2D, arguments);
							},
							setTransform: function () {
							    _graphics2D.setTransform.apply(_graphics2D, arguments);
							},
							createLinearGradient: function () {
							    _graphics2D.createLinearGradient.apply(_graphics2D, arguments);
							},
							createRadialGradient: function () {
							    _graphics2D.createRadialGradient.apply(_graphics2D, arguments);
							},
							clearRect: function () {
							    _graphics2D.clearRect.apply(_graphics2D, arguments);
							},
							fillRect: function (x, y, w, h) {
							    _graphics2D.fillRect(x, y, w, h);
							    (this.target)?this.target.determineBounds("fillRect", [{x:x, y:y}, {x:x+w, y:y+h}, {x:x, y:y+h}, {x:x+w, y:y}]):"";
							},
							beginPath: function () {
							    _graphics2D.beginPath.apply(_graphics2D, arguments);
							},
							closePath: function () {
							    _graphics2D.closePath.apply(_graphics2D, arguments);
							},
							moveTo: function (x, y) {
							    _graphics2D.moveTo(x, y);
							    (this.target)?this.target.determineBounds("moveTo", [{x:x, y:y}]):"";
							},
							lineTo: function (x, y) {
							    _graphics2D.lineTo(x, y);
							    (this.target)?this.target.determineBounds("lineTo", [{x:x, y:y}]):"";
							},
							quadraticCurveTo: function () {
							    _graphics2D.quadraticCurveTo.apply(_graphics2D, arguments);
							},
							bezierCurveTo: function () {
							    _graphics2D.bezierCurveTo.apply(_graphics2D, arguments);
							},
							arcTo: function () {
							    _graphics2D.arcTo.apply(_graphics2D, arguments);
							},
							rect: function () {
							    _graphics2D.rect.apply(_graphics2D, arguments);
							},
							arc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
							    
							    _graphics2D.arc(x, y, radius, startAngle, endAngle, anticlockwise);
							    
							    (this.target)?this.target.determineBounds("arc", [
																		{x:x-radius, y:y-radius},
																		{x:x+radius, y:y-radius},
																		{x:x+radius, y:y+radius},
																		{x:x-radius, y:y+radius}
																	]):"";
								
							},
							fill: function () {
							    _graphics2D.fill.apply(_graphics2D, arguments);
							},
							stroke: function () {
							    _graphics2D.stroke.apply(_graphics2D, arguments);
							},
							clip: function () {
							    _graphics2D.clip.apply(_graphics2D, arguments);
							},
							isPointInPath: function () {
							    _graphics2D.isPointInPath.apply(_graphics2D, arguments);
							},
							measureText: function () {
							    _graphics2D.measureText.apply(_graphics2D, arguments);
							},
							setAlpha: function () {
							    _graphics2D.setAlpha.apply(_graphics2D, arguments);
							},
							setCompositeOperation: function () {
							    _graphics2D.setCompositeOperation.apply(_graphics2D, arguments);
							},
							setLineWidth: function () {
							    _graphics2D.setLineWidth.apply(_graphics2D, arguments);
							},
							setLineCap: function () {
							    _graphics2D.setLineCap.apply(_graphics2D, arguments);
							},
							setLineJoin: function () {
							    _graphics2D.setLineJoin.apply(_graphics2D, arguments);
							},
							setMiterLimit: function () {
							    _graphics2D.setMiterLimit.apply(_graphics2D, arguments);
							},
							clearShadow: function () {
							    _graphics2D.clearShadow.apply(_graphics2D, arguments);
							},
							fillText: function () {
							    _graphics2D.fillText.apply(_graphics2D, arguments);
							},
							strokeText: function () {
							    _graphics2D.strokeText.apply(_graphics2D, arguments);
							},
							setStrokeColor: function () {
							    _graphics2D.setStrokeColor.apply(_graphics2D, arguments);
							},
							setFillColor: function () {
							    _graphics2D.setFillColor.apply(_graphics2D, arguments);
							},
							strokeRect: function (x, y, w, h) {
								 _graphics2D.strokeRect(x, y, w, h);
							    (this.target)?this.target.determineBounds("strokeRect", [{x:x, y:y}, {x:x+w, y:y+h}, {x:x, y:y+h}, {x:x+w, y:y}]):"";
							},
							drawImage: function () {
							    _graphics2D.drawImage.apply(_graphics2D, arguments);
							},
							setShadow: function () {
							    _graphics2D.setShadow.apply(_graphics2D, arguments);
							},
							createPattern: function () {
							    _graphics2D.createPattern.apply(_graphics2D, arguments);
							},
							putImageData: function () {
							    _graphics2D.putImageData.apply(_graphics2D, arguments);
							},
							createImageData: function () {
							    _graphics2D.createImageData.apply(_graphics2D, arguments);
							},
							getImageData: function () {
							    _graphics2D.getImageData.apply(_graphics2D, arguments);
							},
							drawImageFromRect: function () {
							    _graphics2D.drawImageFromRect.apply(_graphics2D, arguments);
							}
					                        
                        }


                        var _fns = {

                            onMouseClick: function (event) {

                                var mouseClickPoint = ex.geometry.getCanvasPoint(_canvas, event.pageX, event.pageY);
                                var mouseClickEvent = ex.mouseEvent(ex.MOUSE_CLICK, mouseClickPoint);
                                _baseSprite.dispatchEvent(mouseClickEvent);

                            },

                            onMouseOver: function (event) {

                                var mouseOverPoint = ex.geometry.getCanvasPoint(_canvas, event.pageX, event.pageY);
                                var mouseOverEvent = ex.mouseEvent(ex.MOUSE_OVER, mouseOverPoint);
                                _baseSprite.dispatchEvent(mouseOverEvent);

                            },

                            onMouseOut: function (event) {

                                var mouseOutPoint = ex.geometry.getCanvasPoint(_canvas, event.pageX, event.pageY);
                                var mouseOutEvent = ex.mouseEvent(ex.MOUSE_OUT, mouseOutPoint);
                                _baseSprite.dispatchEvent(mouseOutEvent);

                            },

                            onMouseMove: function (event) {

                                var mouseMovePoint = ex.geometry.getCanvasPoint(_canvas, event.pageX, event.pageY);
                                var mouseMoveEvent = ex.mouseEvent(ex.MOUSE_MOVE, mouseMovePoint);
                                _baseSprite.dispatchEvent(mouseMoveEvent);

                                _xthis.handleDrag(event);

                            },

                            onMouseDown: function (event) {

                                var mouseDownPoint = ex.geometry.getCanvasPoint(_canvas, event.pageX, event.pageY);
                                var mouseDownEvent = ex.mouseEvent(ex.MOUSE_DOWN, mouseDownPoint);
                                _baseSprite.dispatchEvent(mouseDownEvent);

                            },

                            onMouseUp: function (event) {

                                var mouseUpPoint = ex.geometry.getCanvasPoint(_canvas, event.pageX, event.pageY);
                                var mouseUpEvent = ex.mouseEvent(ex.MOUSE_UP, mouseUpPoint);
                                _baseSprite.dispatchEvent(mouseUpEvent);

                            },
                            
                            onKeyDown: function(event){
                            	var keyDownEvent = ex.keyEvent(ex.KEY_DOWN, event.keyCode);
                                _baseSprite.dispatchEvent(keyDownEvent);                          
                            },
                            
                            onKeyPress: function(event){
                            	var keyPressEvent = ex.keyEvent(ex.KEY_PRESS, event.keyCode);
                                _baseSprite.dispatchEvent(keyPressEvent);  
                            },
                            
                            onKeyUp: function(event){
                            	var keyUpEvent = ex.keyEvent(ex.KEY_UP, event.keyCode);
                                _baseSprite.dispatchEvent(keyUpEvent);                        
                            }


                        }


                        _canvas.onclick 	= _fns.onMouseClick;
                        _canvas.onmouseover = _fns.onMouseOver;
                        _canvas.onmouseout 	= _fns.onMouseOut;
                        _canvas.onmousemove = _fns.onMouseMove;
                        _canvas.onmousedown = _fns.onMouseDown;
                        _canvas.onmouseup 	= _fns.onMouseUp;
                        
                        window.onkeydown 	= _fns.onKeyDown;
                        window.onkeypress 	= _fns.onKeyPress;
                        window.onkeyup 		= _fns.onKeyUp;


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
            this.addChild = function (exSprite) {

                if (_baseSprite) {
                    _baseSprite.addChild(exSprite);
                }

            }


            /** Function: startRendering
             * Start rendering if animation is involved
             *
             **/
            this.startRendering = function (fps) {

                if (ex) {

                    _start = new Date().getTime();

                    var xthis = this;
                    _rendering = setInterval(function () {
                        xthis.render();
                    }, 1000/((fps)?fps:15));


                }


            }


            /** Function: render
             * Function that renders view
             *
             **/
            this.render = function () {

                _frame++;

                var now = new Date().getTime();
                var diff = now - _start;
                _fps = ((_frame / diff) * 1000).toFixed(2);

                _graphics2Dproxy.setTransform(1, 0, 0, 1, 0, 0);
                _graphics2Dproxy.clearRect(0, 0, _canvas.width, _canvas.height);


                _baseSprite.updateTransform(_graphics2Dproxy);
                _baseSprite.updateBounds();
                _baseSprite.updateDisplay(_graphics2Dproxy, _frame, _fps);

				
				//ex.log(_fps);
				
            }



            /** Function: stopRendering
             * Stop rendering if animation is involved
             *
             **/
            this.stopRendering = function () {

                if (_rendering) {
                    clearInterval(_rendering);
                }

            }


            this.handleDrag = function (event) {}

        },

        ExSprite: function () {

            /************************************************** PROPERTIES **********************************************/



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
            var _x = 0;

/* 
	 	Variable: _y (private)
	 	Cartesian coordinate y
	 */
            var _y = 0;

/* 
	 	Variable: _width (private)
	 	Width of the object
	 */
            var _width = 0;

/* 
	 	Variable: _height (private)
	 	Height of the object
	 */
            var _height = 0;

/* 
	 	Variable: _angleUnit (private)
	 	Unit in which angle is measured.    values: "radian", "degree" default:"radian"
	 */
            var _angleUnit = "radian";

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
                augMatrix2D: {
                    a: 1,
                    b: 0,
                    u: 0,
                    c: 0,
                    d: 1,
                    v: 0,
                    dx: 0,
                    dy: 0,
                    w: 1
                },
                matrix2D: {
                    a: 1,
                    b: 0,
                    u: 0,
                    c: 0,
                    d: 1,
                    v: 0,
                    dx: 0,
                    dy: 0,
                    w: 1
                }
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
            var _innerBounds = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };

/* 
	 	Variable: _showOuterBounds (private)
	 	Flag that decides the visibility of outer bounds. With respect to parent object      
	 */
            var _showOuterBounds = false;

/* 
	 	Variable: _outerBounds (private)
	 	Outer bounds of the object expressed as rectangle. With respect to parent object 
	 */
            var _outerBounds = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };


/* 
	 	Variable: _showGlobalBounds (private)
	 	Flag that decides the visibility of global bounds. With respect to the coordinate system of the canvas.      
	 */
            var _showGlobalBounds = false;

/* 
	 	Variable: _globalBounds (private)
	 	Global bounds of the object expressed as rectangle. With respect to the coordinate system of the canvas.   
	 */
            var _globalBounds = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };


/* 
	 	Variable: _hitArea (private)
	 	Area which will be used for hit test. Expressed as rectangle object.
	 */
            var _hitArea = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            }

/* 
	 	Variable: _parentSprite (private)
	 	Parent object to which this object is added.
	 */
            var _parentSprite;

/* 
	 	Variable: _childIndex (private)
	 	Index of this object in the children array of its parent object
	 */
            var _childIndex = 0;

/* 
	 	Variable: _children (private)
	 	List of the children of this object
	 */
            var _children = [];


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
             * Function: name
             * Setter and Getter of _name
             * 
             */
            this.name = function (value) {
                if (typeof (value) != 'undefined') {
                    _name = value;
                } else {
                    return _name;
                }
            }

            /**
             * Function: frame
             * Setter and Getter of _frame
             * 
             */
            this.frame = function (value) {
                if (typeof (value) != 'undefined') {
                    _frame = value;
                } else {
                    return _frame;
                }
            }


            /**
             * Function: fps
             * Setter and Getter of _fps
             * 
             */
            this.fps = function (value) {
                if (typeof (value) != 'undefined') {
                    _fps = value;
                } else {
                    return _fps;
                }
            }


            /**
             * Function: data
             * Setter and Getter of _data
             * 
             */
            this.data = function (value) {
                if (typeof (value) != 'undefined') {
                    _data = value;
                } else {
                    return _data;
                }
            }


            /**
             * Function: x
             * Setter and Getter of _x
             * 
             */
            this.x = function (value) {
                if (typeof (value) != 'undefined') {
                    _x = value;
                } else {
                    return _x;
                }
            }


            /**
             * Function: y
             * Setter and Getter of _y
             * 
             */
            this.y = function (value) {
                if (typeof (value) != 'undefined') {
                    _y = value;
                } else {
                    return _y;
                }
            }

            /**
             * Function: width
             * Setter and Getter of _width
             * 
             */
            this.width = function (value) {
                if (typeof (value) != 'undefined') {
                    _width = value;
                } else {
                    return _width;
                }
            }


            /**
             * Function: height
             * Setter and Getter of _height
             * 
             */
            this.height = function (value) {
                if (typeof (value) != 'undefined') {
                    _height = value;
                } else {
                    return _height;
                }
            }

            /**
             * Function: angleUnit
             * Setter and Getter of _angleUnit
             * 
             */
            this.angleUnit = function (value) {
                if (typeof (value) != 'undefined') {
                    _angleUnit = value;
                } else {
                    return _angleUnit;
                }
            }

            /**
             * Function: rotation
             * Setter and Getter of _rotation
             * 
             */
            this.rotation = function (value) {
                if (typeof (value) != 'undefined') {
                    _rotation = value;
                } else {
                    return _rotation;
                }
            }


            /**
             * Function: scaleX
             * Setter and Getter of _scaleX
             * 
             */
            this.scaleX = function (value) {
                if (typeof (value) != 'undefined') {
                    _scaleX = value;
                } else {
                    return _scaleX;
                }
            }


            /**
             * Function: scaleY
             * Setter and Getter of _scaleY
             * 
             */
            this.scaleY = function (value) {
                if (typeof (value) != 'undefined') {
                    _scaleY = value;
                } else {
                    return _scaleY;
                }
            }


            /**
             * Function: transform
             * Setter and Getter of _height
             * 
             */
            this.transform = function (value) {
                if (typeof (value) != 'undefined') {
                    _transform = value;
                } else {
                    return _transform;
                }
            }




            /* Function: showInnerBounds
             * Getter of showInnerBounds
             * 
             */
            this.showInnerBounds = function (value) {
                if (typeof (value) != 'undefined') {
                    _showInnerBounds = value;
                } else {
                    return _showInnerBounds;
                }
            }

            /* Function: innerBounds
             * Getter of _innerBounds
             * 
             */
            this.innerBounds = function () {
                return _innerBounds;
            }



            /* Function: showOuterBounds
             * Getter of showOuterBounds
             * 
             */
            this.showOuterBounds = function (value) {
                if (typeof (value) != 'undefined') {
                    _showOuterBounds = value;
                } else {
                    return _showOuterBounds;
                }
            }

            /* Function: innerBounds
             * Getter of _innerBounds
             * 
             */
            this.outerBounds = function () {
                return _outerBounds;
            }

            /* Function: showGlobalBounds
             * Getter of showGlobalBounds
             * 
             */
            this.showGlobalBounds = function (value) {
                if (typeof (value) != 'undefined') {
                    _showGlobalBounds = value;
                } else {
                    return _showGlobalBounds;
                }
            }

            /* Function: globalBounds
             * Getter of _globalBounds
             * 
             */
            this.globalBounds = function () {
                return _globalBounds;
            }


            /**
             * Function: hitArea
             * Setter and Getter of _hitArea
             * 
             */
            this.hitArea = function (value) {
                if (typeof (value) != 'undefined' && typeof (value.x) != 'undefined' && typeof (value.y) != 'undefined' && typeof (value.w) != 'undefined' && typeof (value.h) != 'undefined') {
                    _hitArea = value;
                } else {
                    return _hitArea;
                }
            }



            /**
             * Function: parentSprite
             * Getter of _parentSprite
             * 
             */
            this.parentSprite = function (value) {
                if (typeof (value) != 'undefined') {
                    _parentSprite = value;
                } else {
                    return _parentSprite;
                }
            }


            /**
             * Function: childIndex
             * Getter of _childIndex
             * 
             */
            this.childIndex = function () {
                return _childIndex;
            }


            /**
             * Function: mouseEnabled
             * Setter and Getter of _mouseEnabled
             * 
             */
            this.mouseEnabled = function (value) {
                if (typeof (value) != 'undefined') {
                    _mouseEnabled = value;
                } else {
                    return _mouseEnabled;
                }
            }


            /**
             * Function: mouseOver
             * Setter and Getter of _mouseOver
             * 
             */
            this.mouseOver = function (value) {
                if (typeof (value) != 'undefined') {
                    _mouseOver = value;
                } else {
                    return _mouseOver;
                }
            }




            /************************************************** METHODS **********************************************/



            /**
             * Function: pushChild
             * Push item to the array of child elements
             * 
             */
            this.addChild = function (exSprite) {
                _children.push(exSprite);
                exSprite.parentSprite(this);
            }

            /**
             * Function: getChildren
             * Returns the array of child elements
             * 
             */
            this.getChildren = function () {
                return _children;
            }

            /**
             * Function: numChildren
             * Returns the number of child elements
             * 
             */
            this.numChildren = function () {
                return _children.length;
            }

            /**
             * Function: addElements
             * Override this function in Subclasses to addChildren and call froem where the instance is created
             * 
             */
            this.addElements = function () {


            }

            /**
             * Function: updateTransform
             * Update the transformation matrix of this object and its child objects
             * 
             */
            this.updateTransform = function (graphics2D) {

                this.modifyTransform();
                this.calculateTransform(graphics2D);

                for (var i = 0; i < this.numChildren(); i++) {

                    var child = _children[i];

                    if (child && child.updateTransform) {

                        child.updateTransform();

                    }

                }

            }

            /**
             * Function: modifyTransform
             * This function modifies the orientation of the object . This function has to be overrided and used in subclasses
             * 
             */
            this.modifyTransform = function () {


            }

            /**
             * Function: applyParentTransform
             * This function applies the transformation of parent object to draw something in parent object
             * 
             */
            this.applyParentTransform = function (graphics2D) {

                var parentTransform = _parentSprite.transform();
                var m2D = parentTransform.augMatrix2D;
                graphics2D.setTransform(m2D.a, m2D.b, m2D.c, m2D.d, m2D.dx, m2D.dy);

            }

            /**
             * Function: applyLocalTransform
             * This function applies the transformation of this object to draw something
             * 
             */
            this.applyLocalTransform = function (graphics2D) {

                var m2D = _transform.augMatrix2D;
                graphics2D.setTransform(m2D.a, m2D.b, m2D.c, m2D.d, m2D.dx, m2D.dy);

            }

            /**
             * Function: calculateTransform
             * This function creates the resultant transformation matrix
             * 
             */
            this.calculateTransform = function (graphics2D) {


                var rot = _rotation;
                if (_angleUnit == "degree") {
                    rot = rot * (Math.PI / 180);
                }


                var sMatrix = {
                    a: _scaleX,
                    b: 0,
                    u: 0,
                    c: 0,
                    d: _scaleY,
                    v: 0,
                    dx: 0,
                    dy: 0,
                    w: 1
                };
                var rMatrix = {
                    a: Math.cos(rot),
                    b: Math.sin(rot),
                    u: 0,
                    c: -Math.sin(rot),
                    d: Math.cos(rot),
                    v: 0,
                    dx: 0,
                    dy: 0,
                    w: 1
                };
                var tMatrix = {
                    a: 1,
                    b: 0,
                    u: 0,
                    c: 0,
                    d: 1,
                    v: 0,
                    dx: _x,
                    dy: _y,
                    w: 1
                };

                _transform.matrix2D = ex.matrix.multiply2DMatrices(ex.matrix.multiply2DMatrices(tMatrix, rMatrix), sMatrix);


                if (_parentSprite) {


                    var parentTransform = _parentSprite.transform();

                    _transform.augMatrix2D = ex.matrix.multiply2DMatrices(parentTransform.augMatrix2D, _transform.matrix2D);


                } else {

                    ex.matrix.copyMatrix(_transform.augMatrix2D, _transform.matrix2D);

                }




            }

            /**
             * Function: determineBounds
             * Adds points to points list to determine the bounds of this object
             * 
             */
            this.determineBounds = function (key, points) {
            
            	if(!_points[key]){
            		_points[key] = [];
            	}
				for(var i = 0; i < points.length; i++){
        			 _points[key].push(points[i]);
        		}
                

            }

            /**
             * Function: updateBounds
             * update the bounds of this object after transformation is modified.
             * 
             */
            this.updateBounds = function () {


                for (var i = 0; i < this.numChildren(); i++) {

                    var child = _children[i];

                    if (child && child.updateBounds) {

                        child.updateBounds();

                        var childBounds = child.outerBounds();


                        var points = [];
                        ex.geometry.rectToPoints(childBounds, points);


                        this.determineBounds("child_" + i.toString(), points);

                    }

                }


                var innerBounds = {
                    x1: undefined,
                    x2: undefined,
                    y1: undefined,
                    y2: undefined
                };

                for (var key in _points) {

                    var innerPoints = _points[key];
                    
                    if (typeof (innerPoints) != "undefined" && innerPoints.length) {
                    	ex.geometry.pointsToRect(innerPoints, innerBounds);
                    }

                }
                
                

                if (typeof (innerBounds.x) == "number") {
                    _innerBounds.x = innerBounds.x;
                }

                if (typeof (innerBounds.y) == "number") {
                    _innerBounds.y = innerBounds.y;
                }

                if (typeof (innerBounds.w) == "number") {
                    _innerBounds.w = innerBounds.w;
                }

                if (typeof (innerBounds.h) == "number") {
                    _innerBounds.h = innerBounds.h;
                }


                if (_parentSprite) {

                    var pltGlobal = this.localToGlobal(_innerBounds.x, _innerBounds.y);
                    var plbGlobal = this.localToGlobal(_innerBounds.x, _innerBounds.y + _innerBounds.h);
                    var prtGlobal = this.localToGlobal(_innerBounds.x + _innerBounds.w, _innerBounds.y);
                    var prbGlobal = this.localToGlobal(_innerBounds.x + _innerBounds.w, _innerBounds.y + _innerBounds.h);

                    var globalPoints = [pltGlobal, plbGlobal, prtGlobal, prbGlobal];
                    var globalBounds = {
                        x1: undefined,
                        x2: undefined,
                        y1: undefined,
                        y2: undefined
                    };
                    ex.geometry.pointsToRect(globalPoints, globalBounds);


                    if (typeof (globalBounds.x) == "number") {
                        _globalBounds.x = globalBounds.x;
                    }
                    if (typeof (globalBounds.y) == "number") {
                        _globalBounds.y = globalBounds.y;
                    }
                    if (typeof (globalBounds.w) == "number") {
                        _globalBounds.w = globalBounds.w;
                    }
                    if (typeof (globalBounds.h) == "number") {
                        _globalBounds.h = globalBounds.h;
                    }


                    var pltParent = _parentSprite.globalToLocal(pltGlobal);
                    var plbParent = _parentSprite.globalToLocal(plbGlobal);
                    var prtParent = _parentSprite.globalToLocal(prtGlobal);
                    var prbParent = _parentSprite.globalToLocal(prbGlobal);

                    var outerPoints = [pltParent, plbParent, prtParent, prbParent];
                    var outerBounds = {
                        x1: undefined,
                        x2: undefined,
                        y1: undefined,
                        y2: undefined
                    };
                    ex.geometry.pointsToRect(outerPoints, outerBounds);


                    if (typeof (outerBounds.x) == "number") {
                        _outerBounds.x = outerBounds.x;
                    }
                    if (typeof (outerBounds.y) == "number") {
                        _outerBounds.y = outerBounds.y;
                    }
                    if (typeof (outerBounds.w) == "number") {
                        _outerBounds.w = outerBounds.w;
                    }
                    if (typeof (outerBounds.h) == "number") {
                        _outerBounds.h = outerBounds.h;
                    }

                }

				
				_points = {};

            }



            /**
             * Function: updateDisplay
             * Updates the display graphics. Recurses into child objects
             * 
             * 
             */
            this.updateDisplay = function (graphics2D, frame, fps) {
            
            	_frame = frame;
                _fps = fps;
				
				

                this.drawGlobalBounds(graphics2D);


                if (_parentSprite) {
                    this.applyParentTransform(graphics2D);
                    graphics2D.target = this.parentSprite();
                    this.drawInParent(graphics2D);
                    this.drawOuterBounds(graphics2D);
                }



                this.applyLocalTransform(graphics2D);
                graphics2D.target = this;
                this.draw(graphics2D);
                this.drawInnerBounds(graphics2D);

/*for( var i = 0; i < this.numChildren(); i++){
	 		
	 		var child = _children[i];
	 		
	 		if(child && child.drawInParent){
	 			child.drawInParent(graphics2D);
	 			child.
	 		}
	 		
	 	}*/

                for (var i = 0; i < this.numChildren(); i++) {

                    var child = _children[i];

                    if (child && child.updateDisplay) {

                        for (var j = i + 1; j < this.numChildren(); j++) {

                            var child1 = _children[j];
                            var hit = child.hitTestObject(child1);
                            if (hit) {

                                var hitEvent1 = ex.hitEvent(ex.HIT, child1, 0, 0);
                                var hitEvent2 = ex.hitEvent(ex.HIT, child, 0, 0);

                                child.dispatchEvent(hitEvent1);
                                child1.dispatchEvent(hitEvent2);

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
            this.drawInnerBounds = function (graphics2D) {

                if (typeof (_showInnerBounds) === "string") {

                    var bounds = this.innerBounds();
                    graphics2D.strokeStyle(_showInnerBounds); //"rgba(255, 255, 0, 0.7)";
                    graphics2D.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

                }

            }

            /**
             * Function: drawOuterBounds
             * Draw the outer bounds of the object if the flag is true
             * 
             * 
             */
            this.drawOuterBounds = function (graphics2D) {

                if (typeof (_showOuterBounds) === "string") {

                    var bounds = this.outerBounds();
                    graphics2D.strokeStyle(_showOuterBounds); //"rgba(255, 255, 0, 0.7)";
                    graphics2D.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

                }

            }


            /**
             * Function: drawGlobalBounds
             * Draw the global bounds of the object if the flag is true
             * 
             * 
             */
            this.drawGlobalBounds = function (graphics2D) {

                if (typeof (_showGlobalBounds) === "string") {

                    graphics2D.setTransform(1, 0, 0, 1, 0, 0);

                    var bounds = this.globalBounds();
                    graphics2D.strokeStyle(_showGlobalBounds); //"rgba(255, 255, 0, 0.7)";
                    graphics2D.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

                }

            }


            /**
             * Function: drawInParent
             * Draws the pixels according to parent transformation. This function has to be overrided in subclasses to draw something in parent object
             * 
             */
            this.drawInParent = function (graphics2D) {



            }

            /**
             * Function: draw
             * Draws the pixel according to the sprite content. This function has to be overrided in subclasses to draw something.
             * 
             */
            this.draw = function (graphics2D) {


            }


            /** 
             * Function: localToGlobal 
             *  Returns the global point equivalent to the given local point. 
             *
             */
            this.localToGlobal = function (x, y) {


                if (typeof (x) == "object") {

                    y = x.y;
                    x = x.x;

                }

                if (typeof (x) == "number" && typeof (y) == "number") {

                    var augmatrix2D = this.transform().augMatrix2D;


                    var point = {
                        a: 1,
                        b: 0,
                        u: 0,
                        c: 0,
                        d: 1,
                        v: 0,
                        dx: x,
                        dy: y,
                        w: 1
                    };

                    var result = ex.matrix.multiply2DMatrices(augmatrix2D, point);

                    return {
                        x: result.dx,
                        y: result.dy
                    };

                }

            }

            /** 
             * Function: globalToLocal 
             *  Returns the local point equivalent to the given global point. 
             *
             */
            this.globalToLocal = function (x, y) {

                if (typeof (x) == "object") {

                    y = x.y;
                    x = x.x;

                }

                if (typeof (x) == "number" && typeof (y) == "number") {

                    var augmatrix2D = this.transform().augMatrix2D;

                    var point = {
                        a: 1,
                        b: 0,
                        u: 0,
                        c: 0,
                        d: 1,
                        v: 0,
                        dx: x,
                        dy: y,
                        w: 1
                    };

                    var result = ex.matrix.multiply2DMatrices(ex.matrix.getInverse2D(augmatrix2D), point);

                    return {
                        x: result.dx,
                        y: result.dy
                    };

                }

            }


            /** 
             * Function: hitTest 
             * Checks whether the point is inside this object.
             *
             */

            this.hitTest = function (x, y) {

                var p;
                if (typeof (x) == "object" && typeof (x.x) == "number" && typeof (x.y) == "number") {
                    p = x;
                } else if (typeof (x) == "number" && typeof (y) == "number") {
                    p = {
                        x: x,
                        y: y
                    };
                }

                var hit = false;
                var bounds = this.outerBounds();
                if (typeof (p) == "object") {
                    hit = ex.geometry.isPointInside(p, bounds);
                }

                return hit;

            }

            /** 
             * Function: hitTestObject 
             *  Checks whether the given object collides with this one.
             *
             */
            this.hitTestObject = function (object) {

                var bounds1 = this.outerBounds();
                var bounds2 = object.outerBounds();

                if (bounds1 && bounds2) {

                    var intersection = ex.geometry.intersects(bounds1, bounds2);

                    if (typeof (intersection) == "object") {
                        return true;
                    }

                }

                return false;

            }


            this.startDrag = function () {



            }


            this.stopDrag = function () {



            }



            this.dispatchEvent = function (event) {

                event.setTarget(this);

                this.callEventListener(event);

                var available = this.callDefaultEventListener(event);

                if (!available) {
                    for (var i = 0; i < this.numChildren(); i++) {
                        var child = _children[i];
                        if (child && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }
                    }
                }



            }


            this.bindDefault = function (eventType, handler) {

                if (typeof (eventType) == "string" && typeof (handler) == "function") {

                    _defaultEventHandlers[eventType] = handler;

                }

            }

            this.bind = function (eventType, handler) {

                if (typeof (eventType) == "string" && typeof (handler) == "function") {

                    if (typeof (_eventHandlers[eventType]) != "object") {
                        _eventHandlers[eventType] = [];
                    }

                    var handlers = _eventHandlers[eventType];

                    var exists = false;
                    if (typeof (handlers) != "undefined" && handlers.length) {

                        for (var i = 0; i < handlers.length; i++) {
                            if (handlers[i] == handler) {
                                exists = true;
                                break;
                            }
                        }
                    }
                    if (!exists) {
                        handlers.push(handler);
                    }
                }

            }


            this.callDefaultEventListener = function (event) {

                var eventType = event.type();

                if (typeof (eventType) == "string") {

                    if (typeof (_defaultEventHandlers[eventType]) == "undefined") {
                        return false;
                    }

                    var handler = _defaultEventHandlers[eventType];

                    if (typeof (handler) == "function") {
                        handler(event);
                        return true;
                    }
                    return false;
                }

            }

            this.callEventListener = function (event) {

                var eventType = event.type();

                if (typeof (eventType) == "string") {

                    if (typeof (_eventHandlers[eventType]) != "object") {
                        return;
                    }

                    var handlers = _eventHandlers[eventType];

                    if (typeof (handlers) != "undefined" && handlers.length) {

                        for (var i = 0; i < handlers.length; i++) {
                            var handler = handlers[i];
                            handler(event);
                        }
                    }

                }

            }


            this.unbind = function (eventType, handler) {

                if (typeof (eventType) == "string" && typeof (handler) == "function") {

                    if (typeof (_eventHandlers[eventType]) != "object") {
                        return;
                    }

                    var handlers = _eventHandlers[eventType];

                    if (typeof (handlers) != "undefined" && handlers.length) {

                        for (var i = 0; i < handlers.length; i++) {
                            if (handlers[i] == handler) {
                                handlers.splice(i, 1);
                                break;
                            }
                        }
                    }

                }

            }


            this.mouseclick = function (event) {

                if (typeof (event.mouseX()) == "number" && typeof (event.mouseY()) == "number") {

                    var gX = event.mouseX();
                    var gY = event.mouseY();

                    var point = _xthis.globalToLocal(gX, gY);

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        var child = _children[i];

                        var clicked = false;

                        if (child && child.hitTest) {
                            clicked = child.hitTest(point);
                        }

                        if (clicked === true && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }

                    }

                }

            }


            this.mouseover = function (event) {

                _mouseOver = true;

                if (typeof (event.mouseX()) == "number" && typeof (event.mouseY()) == "number") {

                    var gX = event.mouseX();
                    var gY = event.mouseY();

                    var point = _xthis.globalToLocal(gX, gY);

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        var child = _children[i];

                        var over = false;

                        if (child && child.hitTest) {
                            over = child.hitTest(point);
                        }

                        if (over === true && !child.mouseOver() && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }

                    }

                }
            }

            this.mouseout = function (event) {

                _mouseOver = false;

                if (typeof (event.mouseX()) == "number" && typeof (event.mouseY()) == "number") {

                    var gX = event.mouseX();
                    var gY = event.mouseY();

                    var point = _xthis.globalToLocal(gX, gY);

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        var child = _children[i];

                        var over = false;

                        if (child && child.hitTest) {
                            over = child.hitTest(point);
                        }

                        if (over != true && child.mouseOver() === true && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }

                    }

                }
            }

            this.mousemove = function (event) {



                if (typeof (event.mouseX()) == "number" && typeof (event.mouseY()) == "number") {

                    var gX = event.mouseX();
                    var gY = event.mouseY();

                    var point = _xthis.globalToLocal(gX, gY);

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        var child = _children[i];

                        var over = false;

                        if (child && child.hitTest) {
                            over = child.hitTest(point);
                        }



                        if (over === true && child.mouseOver() != true && child.dispatchEvent) {
                            var mouseOverEvent = ex.mouseEvent(ex.MOUSE_OVER, {
                                x: event.mouseX(),
                                y: event.mouseY()
                            });
                            child.dispatchEvent(mouseOverEvent);
                        }

                        if (over != true && child.mouseOver() === true && child.dispatchEvent) {
                            var mouseOutEvent = ex.mouseEvent(ex.MOUSE_OUT, {
                                x: event.mouseX(),
                                y: event.mouseY()
                            });
                            child.dispatchEvent(mouseOutEvent);
                        }


                        if (over === true && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }


                    }

                }
            }


            this.mousedown = function (event) {



                if (typeof (event.mouseX()) == "number" && typeof (event.mouseY()) == "number") {

                    var gX = event.mouseX();
                    var gY = event.mouseY();

                    var point = _xthis.globalToLocal(gX, gY);

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        var child = _children[i];

                        var over = false;

                        if (child && child.hitTest) {
                            over = child.hitTest(point);
                        }

                        if (over === true && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }

                    }

                }
            }

            this.mouseup = function (event) {



                if (typeof (event.mouseX()) == "number" && typeof (event.mouseY()) == "number") {

                    var gX = event.mouseX();
                    var gY = event.mouseY();

                    var point = _xthis.globalToLocal(gX, gY);

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        var child = _children[i];

                        var over = false;

                        if (child && child.hitTest) {
                            over = child.hitTest(point);
                        }

                        if (over === true && child.dispatchEvent) {
                            child.dispatchEvent(event);
                        }

                    }

                }
            }
            
            
            this.keychange = function (event) {

                if (typeof (event.keyCode()) == "number") {

                    for (var i = 0; i < _xthis.numChildren(); i++) {
                        
                        var child = _children[i];
						child.dispatchEvent(event);
                        

                    }

                }

            }
            
            
            


            this.bindDefault(ex.MOUSE_CLICK, this.mouseclick);
            this.bindDefault(ex.MOUSE_OVER, this.mouseover);
            this.bindDefault(ex.MOUSE_OUT, this.mousemove);
            this.bindDefault(ex.MOUSE_DOWN, this.mousedown);
            this.bindDefault(ex.MOUSE_UP, this.mouseup);
            this.bindDefault(ex.KEY_DOWN, this.keychange);
            this.bindDefault(ex.KEY_PRESS, this.keychange);
            this.bindDefault(ex.KEY_UP, this.keychange);

            _xthis = this;

        },

        Event: function (type) {

            var _type = type;
            var _target;
            var _currentTarget;

            this.setTarget = function (t) {
                _target = t;
            }


            this.setCurrentTarget = function () {
                _currentTarget = ct;
            }


            this.type = function () {
                return _type;
            }

            this.getTarget = function () {
                return _target;
            }


            this.getCurrentTarget = function () {
                return _currentTarget;
            }




        }


    }


    var _exViews = [];

    var _ex = {



/*
		Constant: MOUSE_CLICK 
		Event type Mouse Click
	*/
        MOUSE_CLICK: "mouseClick",

/*
		Constant: MOUSE_MOVE 
		Event type Mouse Move
	*/
        MOUSE_MOVE: "mouseMove",

/*
		Constant: MOUSE_OVER 
		Event type Mouse Over
	*/
        MOUSE_OVER: "mouseOver",

/*
		Constant: MOUSE_OUT 
		Event type Mouse Out
	*/
        MOUSE_OUT: "mouseOut",

/*
		Constant: MOUSE_DOWN
		Event type Mouse Down
	*/
        MOUSE_DOWN: "mouseDown",

/*
		Constant: MOUSE_UP 
		Event type Mouse Up
	*/
        MOUSE_UP: "mouseUp",
        
/*
		Constant: KEY_DOWN 
		Event type Key Down
	*/
        KEY_DOWN: "keyDown",

/*
		Constant: KEY_PRESS
		Event type Key Press
	*/
        KEY_PRESS: "keyPress",

/*
		Constant: KEY_UP 
		Event type Key Up
	*/
        KEY_UP: "keyUp",        


/*
	Constant: HIT 
	Event type HIT*/
        HIT: "hit",


        log: function () {
            if (console && console.log) {
                console.log(arguments);
            }
        },

        matrix: {



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
            copyMatrix: function (m1, m2) {
                for (var x in m2) {
                    m1[x] = m2[x];
                }
            },



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
            multiply2DMatrices: function (m1, m2) {
                var r = {};
                r.a = m1.a * m2.a + m1.c * m2.b + m1.dx * m2.u;
                r.c = m1.a * m2.c + m1.c * m2.d + m1.dx * m2.v;
                r.dx = m1.a * m2.dx + m1.c * m2.dy + m1.dx * m2.w;
                r.b = m1.b * m2.a + m1.d * m2.b + m1.dy * m2.u;
                r.d = m1.b * m2.c + m1.d * m2.d + m1.dy * m2.v;
                r.dy = m1.b * m2.dx + m1.d * m2.dy + m1.dy * m2.w;
                r.u = m1.u * m2.a + m1.v * m2.b + m1.w * m2.u;
                r.v = m1.u * m2.c + m1.v * m2.d + m1.w * m2.v;
                r.w = m1.u * m2.dx + m1.v * m2.dy + m1.w * m2.w;
                return r;
            },

/*
   Function: getDeterminant2D
   Function that finds out the determinant value of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (number) - determinant value

   See Also:
*/
            getDeterminant2D: function (m) {
                var d = 0;
                d += m.a * m.d * m.w;
                d += m.c * m.dy * m.u;
                d += m.dx * m.b * m.v;
                d -= m.u * m.d * m.dx;
                d -= m.v * m.dy * m.a;
                d -= m.w * m.b * m.c;
                return d;
            },


/*
   Function: getTranspose2D
   Function that returns the transpose of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (object) - Transpose of the matrix

   See Also:
*/
            getTranspose2D: function (m) {
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
            },


/*
   Function: getAdjoint2D
   Function that returns the adjoint of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (object) - Adjoint of the matrix

   See Also:
*/
            getAdjoint2D: function (m) {
                var c = {};
                c.a = m.d * m.w - m.v * m.dy;
                c.c = (-1) * (m.b * m.w - m.u * m.dy);
                c.dx = m.b * m.v - m.u * m.d;
                c.b = (-1) * (m.c * m.w - m.v * m.dx);
                c.d = m.a * m.w - m.u * m.dx;
                c.dy = (-1) * (m.a * m.v - m.u * m.c);
                c.u = m.c * m.dy - m.d * m.dx;
                c.v = (-1) * (m.a * m.dy - m.b * m.dx);
                c.w = m.a * m.d - m.b * m.c;
                return this.getTranspose2D(c);
            },


/*
   Function: getInverse2D
   Function that returns the inverse of a 2D transformation matrix.
   
   Parameters:

      m (object) - Transformation matrix.
   
   Returns:

      (object) - Inverse of the matrix

   See Also:
*/
            getInverse2D: function (m) {
                var d = this.getDeterminant2D(m);
                var i = {};
                if (typeof (d) == "number" && d != 0) {
                    var f = 1 / d;
                    var a = this.getAdjoint2D(m);
                    for (var x in a) {
                        i[x] = a[x] * f;
                    }
                }
                return i;
            }

        },

        geometry: {



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
            rectToPoints: function (rect, points) {

                var ps = [{
                    x: rect.x,
                    y: rect.y
                }, {
                    x: rect.x + rect.w,
                    y: rect.y
                }, {
                    x: rect.x,
                    y: rect.y + rect.h
                }, {
                    x: rect.x + rect.w,
                    y: rect.y + rect.h
                }

                ];


                if (points) {
                    points[0] = ps[0];
                    points[1] = ps[1];
                    points[2] = ps[2];
                    points[3] = ps[3];
                }

                return ps;

            },



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
            pointsToRect: function (points, rect) {


                for (var i = 0; i < points.length; i++) {

                    var p = points[i];

                    if (rect.x1 == undefined) {
                        rect.x1 = p.x;
                    }

                    if (rect.x2 == undefined) {
                        rect.x2 = p.x;
                    }

                    rect.x1 = Math.min(p.x, rect.x1);
                    rect.x2 = Math.max(p.x, rect.x2);

                    if (rect.y1 == undefined) {
                        rect.y1 = p.y;
                    }

                    if (rect.y2 == undefined) {
                        rect.y2 = p.y;
                    }

                    rect.y1 = Math.min(p.y, rect.y1);
                    rect.y2 = Math.max(p.y, rect.y2);


                    rect.x = rect.x1;
                    rect.y = rect.y1;
                    rect.w = rect.x2 - rect.x1;
                    rect.h = rect.y2 - rect.y1;

                }

            },

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
            intersects: function (rect1, rect2) {


                if (
                typeof (rect1) == "object" && typeof (rect1.x) == "number" && typeof (rect1.y) == "number" && typeof (rect1.w) == "number" && typeof (rect1.h) == "number" && typeof (rect1) == "object" && typeof (rect2.x) == "number" && typeof (rect2.y) == "number" && typeof (rect2.w) == "number" && typeof (rect2.h) == "number") {

                    var intersection = {};

                    intersection.x = Math.max(rect1.x, rect2.x);
                    intersection.y = Math.max(rect1.y, rect2.y);

                    intersection.w = Math.min((rect1.x + rect1.w), (rect2.x + rect2.w)) - intersection.x;
                    intersection.h = Math.min((rect1.y + rect1.h), (rect2.y + rect2.h)) - intersection.y;

                    if (typeof (intersection.x) == "number" && typeof (intersection.y) == "number" && typeof (intersection.w) == "number" && typeof (intersection.h) == "number" && intersection.w > 0 && intersection.h > 0) {
                        return intersection;
                    }

                    return false;
                }

                return false;

            },

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
            isPointInside: function (point, rect) {


                if (typeof (point.x) == "number" && typeof (point.y) == "number" && typeof (rect.x) == "number" && typeof (rect.y) == "number" && typeof (rect.w) == "number" && typeof (rect.h) == "number") {

                    if (rect.x <= point.x && (rect.x + rect.w) >= point.x && rect.y <= point.y && (rect.y + rect.h) >= point.y) {

                        return true;

                    }


                }


                return false;

            },




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
            getVector: function (vx, vy) {


/* Class: Vector
		Returns a Vector class
	
	*/
                return {

                    x: typeof (vx) != 'undefined' ? vx : 0,
                    y: typeof (vy) != 'undefined' ? vy : 0,
/*
			   Function: value
			   Returns the magnitude of this vector
			   
			   Parameters:
			
			   Returns:
					(number)  
			
			   See Also:
			*/
                    value: function () {
                        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
                    }

                }


            },


            getCanvasPoint: function (canvas, mx, my) {

                var element = canvas;
                var tx = 0,
                    ty = 0,
                    cx = 0,
                    cy = 0;

                while (element) {
                    tx += element.offsetLeft;
                    ty += element.offsetTop;
                    element = element.offsetParent;
                }

                cx = mx - tx;
                cy = my - ty;

                return {
                    x: cx,
                    y: cy
                }


            }

        },


        define: function (c, Def) {
            _defs[c] = Def;
        },

        extend: function (b, c, Def) {
            if (_defs[b]) {
                Def.prototype = new _defs[b]();
                Def.prototype.inherit = _defs[b];
                _defs[c] = Def;

            }
        },

        set: function (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }
        },

        createView: function () {

            if (_defs["ExView"]) {
                var exView = new _defs["ExView"]();
                _exViews.push(exView);
                return exView;
            }

        },

        createSprite: function (s, params) {

            s = (s) ? s : "ExSprite";

            if (_defs[s]) {
                var exSprite = new _defs[s](params);
                return exSprite;
            }

        },

        mouseEvent: function (type, mx, my) {

            if (_defs["MouseEvent"]) {
                var mouseEvent = new _defs["MouseEvent"](type, mx, my);
                return mouseEvent;
            }

        },
        
        keyEvent: function (type, keyCode) {

            if (_defs["KeyEvent"]) {
                var keyEvent = new _defs["KeyEvent"](type, keyCode);
                return keyEvent;
            }

        },

        hitEvent: function (type, mx, my) {

            if (_defs["HitEvent"]) {
                var hitEvent = new _defs["HitEvent"](type, mx, my);
                return hitEvent;
            }

        }



    };



    _ex.extend("Event", "MouseEvent", function (type, mousepoint) {

        this.inherit(type);
        
        var _mouseX = mousepoint.x;
        var _mouseY = mousepoint.y;

        this.mouseX = function () {
            return _mouseX;
        }


        this.mouseY = function () {
            return _mouseY;
        }


    });
    
    _ex.extend("Event", "KeyEvent", function (type, keyCode) {

        this.inherit(type);
        
        var _keyCode = keyCode;
        
        this.keyCode = function () {
            return _keyCode;
        }


    });

    _ex.extend("Event", "HitEvent", function (type, object, mouseX, mouseY) {

        this.inherit(type);

        var _object = object;
        var _mouseX = mouseX;
        var _mouseY = mouseY;


        this.hitObject = function () {
            return _object;
        }


        this.mouseX = function () {
            return _mouseX;
        }


        this.mouseX = function () {
            return _mouseY;
        }



    });


    return _ex;



})();