var draw = (function() {

  //Get the height and width of the main we will use this set canvas to the full
  //size of the main element.
  var mWidth = document.querySelector('main').offsetWidth,
    mHeight = document.querySelector('main').offsetHeight,

    //Create the canvas
    canvas = document.createElement("canvas"),

    //Create the context
    ctx = canvas.getContext("2d"),

    //Create the initial bounding rectangle
    rect = canvas.getBoundingClientRect(),

    //current x,y position
    x=0,
    y=0,

    //starting x,y
    x1=0,
    y1=0,

    //ending x,y
    x2=0,
    y2=0,

    //Tracks the last x,y state
    lx = false,
    ly = false,

    //What shape are we drawing?
    shape='',

    //Are we drawimg a path?
    isDrawing=false;

    //stroke color
    var stroke='';
    //fill color
    var fill='';

  return {

    //Set the x,y coords based on current event data
    setXY: function(evt) {

      //Track last x,y position before setting the current posiiton.
      lx=x;
      ly=y;

      //Set the current x,y position
      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top) - canvas.offsetTop;
    },

    //Write the x,y coods to the target div
    writeXY: function() {
      document.getElementById('trackX').innerHTML = 'X: ' + x;
      document.getElementById('trackY').innerHTML = 'Y: ' + y;
    },

    //Set the x1,y1
    setStart: function() {
      x1=x;
      y1=y;
    },

    //Set the x2,y2
    setEnd: function() {
      x2=x;
      y2=y;
    },

    //Sets the shape to be drawn
    setShape: function(shp) {
      shape = shp;
    },

    getShape: function() {
      return shape;
    },

//Set a random color
randColor: function(){
  return '#'+ Math.floor(Math.random()*16777215).toString(16)
},

//Setter for Stroke
setStrokeColor: function(color){
  stroke = color;
},
//Getter for Stroke
getStrokeColor: function(){
  if(stroke.length > 6){
    return stroke;
  }
  return this.randColor();
},

//Setter for Fill
setFillColor: function(color){
  fill = color;
},

//Getter for Fill
getFillColor: function(){
  if(fill.length > 6){
    return fill;
  }
  return this.randColor();
},

//Sets the path to be drawn
    setIsDrawing: function(bool) {
      isDrawing = bool;
    },

    getIsDrawing: function() {
      return isDrawing;
    },

    //Draws the selected shape
    draw: function() {
      ctx.restore();
      if(shape==='rectangle')
      {
        this.drawRect();
      } else if( shape==='line' ) {
        this.drawLine();
      } else if( shape==='path' ) {
        this.drawPath();
      } else if( shape==='circle' ) {
        this.drawCircle();
      } else if( shape==='triangle' ) {
        this.drawTri();
        alert('Please choose a shape');
      }
      ctx.save();
    },

    //Draw a triangle
    drawTri: function () {
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.stroke();
      ctx.fill();
         
      
      /*ctx.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + triangleWidth / 2, y + triangleHeight);
      context.lineTo(x - triangleWidth / 2, y + triangleHeight);
      context.closePath();
      ctx.stroke();
      ctx.fillTri();*/
    },
    


    //Draw a circle
    drawCircle: function() {

      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

      let a = (x1-x2)
      let b = (y1-y2)
      let radius = Math.sqrt( a*a + b*b );

      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    },

    //Draw a line
    drawLine: function() {
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    },

    //Draw a path
    drawPath: function() {
      //console.log({x1:x,y1:y,x2:x2,y2:y2});
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x, y);
      ctx.stroke();
    },

    //Draw a rectangle
    drawRect: function() {
      //Start by using random fill colors.
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
    },

    getCanvas: function(){
      return canvas;
    },

    //Initialize the object, this must be called before anything else
    init: function() {
      canvas.width = mWidth;
      canvas.height = mHeight;
      document.querySelector('main').appendChild(canvas);

    }
  };

})();

//Initialize draw
draw.init();


//Add a mousemove listener to the canvas
//When the mouse reports a change of position use the event data to
//set and report the x,y position on the mouse.
draw.getCanvas().addEventListener('mousemove', function(evt) {
  draw.setXY(evt);
  draw.writeXY();
  if(draw.getShape()=='path' && draw.getIsDrawing()===true) {
    draw.draw();
  }
}, false);



//Add a mousedown listener to the canvas
//Set the starting position
draw.getCanvas().addEventListener('mousedown', function() {
  draw.setStart();
  draw.setIsDrawing(true);
}, false);

//Add a mouseup listener to the canvas
//Set the end position and draw the rectangle
draw.getCanvas().addEventListener('mouseup', function() {
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
}, false);

document.getElementById('btnRect').addEventListener('click', function(){
    draw.setShape('rectangle');
}, false);

document.getElementById('btnLine').addEventListener('click', function(){
    draw.setShape('line');
}, false);

document.getElementById('btnCircle').addEventListener('click', function(){
    draw.setShape('circle');
}, false);

document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
}, false);

document.getElementById('btnTri').addEventListener('click', function(){
  draw.setShape('triangle');
}, false);

document.getElementById('strokeColor').addEventListener('change', function(){
  draw.setStrokeColor(document.getElementById('strokeColor').value);
});

document.getElementById('randstrokeColor').addEventListener('change', function(){
  draw.setStrokeColor('');
});

document.getElementById('fillColor').addEventListener('change', function(){
  draw.setFillColor(document.getElementById('fillColor').value);
});

document.getElementById('randFillColor').addEventListener('change', function(){
  draw.setFillColor('');
});