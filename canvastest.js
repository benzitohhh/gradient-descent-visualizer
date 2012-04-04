// see http://diveintohtml5.info/canvas.html
// and http://matt.might.net/articles/rendering-mathematical-functions-in-javascript-with-canvas-html/
// and http://www.html5canvastutorials.com/labs/html5-canvas-graphing-an-equation/

var Canvas = document.getElementById('xy-graph');
var Ctx = null;

var Width = Canvas.width;
var Height = Canvas.height;

// When rendering, XSTEP determines the horizontal distance between points:
var XSTEP = (MaxX() - MinX()) / Width;

function test() {
    ctx = Canvas.getContext('2d');
    // mess around here
    //ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    // ctx.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    //ctx.fillRect(0, 0, 100, 100);
    //ctx.strokeRect(0, 0, 100, 100);
    
    // to clear canvas
    //Canvas.width = Canvas.width;
    
    for (var x=0.5; x < 500; x+=10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 375);
    };
    for (var y=0.5; y < 375; y+=10) {
        ctx.moveTo(0, y);
        ctx.lineTo(500, y);
    };
    ctx.strokeStyle = '#eee';
    ctx.stroke();
}   










/*
  The origin (0,0) of the canvas is the upper left:

  (0,0)
    --------- +X
   |
   |
   |
   |
   +Y

  Positive x coordinates go to the right, and positive y coordinates go down.

  The origin in mathematics is the "center," and positive y goes *up*.

  We'll refer to the mathematics coordinate system as the "logical"
  coordinate system, and the coordinate system for the canvas as the
  "physical" coordinate system.

  The functions just below set up a mapping between the two coordinate
  systems.

  They're defined as functions, so that one wanted to, they could read
  ther values from a from instead of having them hard-coded.

 */

function init() {
    Draw();
}


// Clears the canvas, draws the axes and graphs the function F.
function Draw() {
    // Evaluate the user-supplied code, which must bind a value to F.
    eval(document.getElementById('function-code').value);
    if (Canvas.getContext) {
        // Set up the canvas:
        Ctx = Canvas.getContext('2d');
        Ctx.clearRect(0, 0, Width, Height);
        // Draw:
        DrawAxes();
        RenderFunction(F);
    } else {
        // Do nothing.
        }
}

// Returns the distance between ticks on the X axis:
function XTickDelta() {
    return 1;
}

// Returns the distance between ticks on the Y axis:
function YTickDelta() {
    return 1;
}

// DrawAxes draws the X ad Y axes, with tick marks.
function DrawAxes() {
    Ctx.save();
    Ctx.lineWidth = 2;
    // +Y axis
    Ctx.beginPath();
    Ctx.moveTo(XC(0), YC(0));
    Ctx.lineTo(XC(0), YC(MaxY()));
    Ctx.stroke();

    // -Y axis
    Ctx.beginPath();
    Ctx.moveTo(XC(0), YC(0));
    Ctx.lineTo(XC(0), YC(MinY()));
    Ctx.stroke();

    // Y axis tick marks
    var delta = YTickDelta();
    for (var i = 1; (i * delta) < MaxY(); ++i) {
        Ctx.beginPath();
        Ctx.moveTo(XC(0) - 5, YC(i * delta));
        Ctx.lineTo(XC(0) + 5, YC(i * delta));
        Ctx.stroke();
    }

    var delta = YTickDelta();
    for (var i = 1; (i * delta) > MinY(); --i) {
        Ctx.beginPath();
        Ctx.moveTo(XC(0) - 5, YC(i * delta));
        Ctx.lineTo(XC(0) + 5, YC(i * delta));
        Ctx.stroke();
    }

    // +X axis
    Ctx.beginPath();
    Ctx.moveTo(XC(0), YC(0));
    Ctx.lineTo(XC(MaxX()), YC(0));
    Ctx.stroke();

    // -X axis
    Ctx.beginPath();
    Ctx.moveTo(XC(0), YC(0));
    Ctx.lineTo(XC(MinX()), YC(0));
    Ctx.stroke();

    // X tick marks
    var delta = XTickDelta();
    for (var i = 1; (i * delta) < MaxX(); ++i) {
        Ctx.beginPath();
        Ctx.moveTo(XC(i * delta), YC(0) - 5);
        Ctx.lineTo(XC(i * delta), YC(0) + 5);
        Ctx.stroke();
    }

    var delta = XTickDelta();
    for (var i = 1; (i * delta) > MinX(); --i) {
        Ctx.beginPath();
        Ctx.moveTo(XC(i * delta), YC(0) - 5);
        Ctx.lineTo(XC(i * delta), YC(0) + 5);
        Ctx.stroke();
    }
    Ctx.restore();
}

// RenderFunction(f) renders the input funtion f on the canvas.
function RenderFunction(f) {
    var first = true;

    Ctx.beginPath();
    for (var x = MinX(); x <= MaxX(); x += XSTEP) {
        var y = f(x);
        if (first) {
            Ctx.moveTo(XC(x), YC(y));
            first = false;
        } else {
            Ctx.lineTo(XC(x), YC(y));
        }
    }
    Ctx.stroke();
}

// Returns the right boundary of the logical viewport:
function MaxX() {
    return 10;
}

// Returns the left boundary of the logical viewport:
function MinX() {
    return - 10;
}

// Returns the top boundary of the logical viewport:
function MaxY() {
    return MaxX() * Height / Width;
}

// Returns the bottom boundary of the logical viewport:
function MinY() {
    return MinX() * Height / Width;
}

// Returns the physical x-coordinate of a logical x-coordinate:
function XC(x) {
    return (x - MinX()) / (MaxX() - MinX()) * Width;
}

// Returns the physical y-coordinate of a logical y-coordinate:
function YC(y) {
    return Height - (y - MinY()) / (MaxY() - MinY()) * Height;
}



