
//initialize some canvas variables
var mainCanvas = document.getElementById("viewPort");
var mainContext = mainCanvas.getContext('2d');
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

//initialize the animation function (browser specific)
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

//initialize the world
var world = {};
world.gravity = 1;
world.bgcolor = "#EEEEEE";
world.airresistance = 0.1;

//initialize the objects object
var objects = [];

//define a circle object
function Circle(radius, posX, posY, speedX, speedY, accelX, accelY, endtypeX, endtypeY, elasticityX, elasticityY, airresistance, gravity, color) {
    this.type = "circle";
    this.radius = radius;
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.accelX = accelX;
    this.accelY = accelY;
    this.endtypeX = endtypeX;
    this.endtypeY = endtypeY;
    this.elasticityX = elasticityX;
    this.elasticityY = elasticityY;
    this.airresistance = airresistance;
    this.gravity = gravity;
    this.color = color;
} // end circle object

//define the update function for the circle
Circle.prototype.update = function() {

    //process acceleration in the X direction
    this.speedX += this.accelX;
    this.speedX *= (1-(this.airresistance*world.airresistance));

    //move the object horizontally
    this.posX += this.speedX;

    //check for  horizontal edges
    if(this.posX < this.radius || this.posX > canvasWidth - this.radius) {

        //we are outside the edge - check what we are supposed to do
        switch(this.endtypeX) {

            case "bounce":
                this.speedX = -1 * this.speedX * this.elasticityX;
                break;

            case "stop":
                this.speedX = 0;
                break;

            case "loop":
                if (this.posX > canvasWidth - this.radius) { this.posX = this.radius; }
                if (this.posX < this.radius) { this.posX = canvasWidth-this.radius; }
                break;

        } // end edge type switch

        //fix position if we are outside the edge (horizontal)
        if(this.posX < this.radius) { this.posX = this.radius; }
        if(this.posX > canvasWidth-this.radius) { this.posX = canvasWidth-this.radius; }

    } //end edge detection (horizontal)

    //process acceleration in the y direction
    this.speedY += this.accelY + (this.gravity * world.gravity);
    this.speedY *= (1-(this.airresistance*world.airresistance));

    //move the object vertically
    this.posY += this.speedY;

    //check for horizontal edges
    if(this.posY < this.radius || this.posY > canvasHeight-this.radius) {

        //we are outside the edge - check what we are supposed to do
        switch(this.endtypeY) {

            case "bounce":
                this.speedY = -1 * this.speedY * this.elasticityY;
                break;

            case "stop":
                this.speedY = 0;
                break;

            case "loop":
                if (this.posY > canvasHeight - this.radius) { this.posY = this.radius; }
                if (this.posY < this.radius) { this.posY = canvasHeight-this.radius; }
                break;

        } //end edge type switch

        //fix position if we are outside the edge (vertical)
        if(this.posY < this.radius) { this.posY = this.radius; }
        if(this.posY > canvasHeight-this.radius) { this.posY = canvasHeight-this.radius; }

    } // end edge detection (vertical)

    // draw the circle
    mainContext.beginPath();
    mainContext.arc(this.posX,this.posY, this.radius, 0, Math.PI * 2, false);
    mainContext.closePath();
     
    // color in the circle
    mainContext.fillStyle = this.color;
    mainContext.fill();

} //end of update function


//setup our circles
var circle1 = new Circle(10, mainCanvas.width/2+200,mainCanvas.height/2,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+219,mainCanvas.height/2+11,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+219,mainCanvas.height/2-11,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+238,mainCanvas.height/2,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+238,mainCanvas.height/2+22,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+238,mainCanvas.height/2-22,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+257,mainCanvas.height/2+33,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+257,mainCanvas.height/2+11,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+257,mainCanvas.height/2-11,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+257,mainCanvas.height/2-33,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+276,mainCanvas.height/2-44,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+276,mainCanvas.height/2-22,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+276,mainCanvas.height/2,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+276,mainCanvas.height/2+22,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+276,mainCanvas.height/2+44,0,0,0,0,"bounce","bounce",1,1,0,0,"#006699");
objects.push(circle1);

var circle2 = new Circle(10,mainCanvas.width/2-300,mainCanvas.height/2,5,0,0,0,"bounce","bounce",0.5,0.5,0.04,0,"#FF0000");
objects.push(circle2);


function drawAndUpdate() {

    //clear the previous frame
    mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);

   // color in the background
    mainContext.fillStyle = world.bgcolor;
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

    for(var i=0; i < objects.length; i++) {
        var myObject = objects[i];
        myObject.update();
    }

    //check for collissions
    for(i=0; i<objects.length; i++) {
        for(var j=0; j<objects.length; j++) {
            a = objects[i].posX;
            b = objects[i].posY;
            x = objects[j].posX;
            y = objects[j].posY;

            if(i!=j) {
                dist = Math.pow((Math.pow((a-x),2)+Math.pow((b-y),2)),0.5);
                if(dist < Math.abs(objects[i].radius + objects[j].radius)) {

                    //impact angle
                    impact_angle = Math.atan((y-b)/(x-a))
                    console.log(impact_angle);


                    //assume final speed of balls match
                    //assume angles around the impact angle sum to 90?

                    //get direction and magnitude of velocity j;



                    //calculate new direction and magnitude of velocity i;

                    console.log("collision! "+i+":"+j+" "+dist+":"+(objects[i].radius+objects[j].radius)+" "+a+":"+b+" "+x+":"+y);
                


                }                
            }
        }
    }



    requestAnimationFrame(drawAndUpdate);
}

drawAndUpdate();

