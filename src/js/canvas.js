
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
world.bgcolor = "#224422";
world.airresistance = 0.1;

//initialize the objects object
var objects = [];

//define a circle object
function Circle(radius, posX, posY, speedX, speedY, accelX, accelY, endtypeX, endtypeY, elasticityX, elasticityY, airresistance, gravity, mass, color) {
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
    this.mass = mass;
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
var circle1 = new Circle(10, mainCanvas.width/2-50,mainCanvas.height/2,5,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#FFFFFF");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+150,mainCanvas.height/2,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#DDDD00");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+170,mainCanvas.height/2-11,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#700070");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+170,mainCanvas.height/2+11,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#800000");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+190,mainCanvas.height/2+22,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#800000");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+190,mainCanvas.height/2,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#000000");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+190,mainCanvas.height/2-22,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#DDDD00");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+210,mainCanvas.height/2+33,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#009900");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+210,mainCanvas.height/2+11,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+210,mainCanvas.height/2-11,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#BB0000");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+210,mainCanvas.height/2-33,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#009900");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+230,mainCanvas.height/2+44,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#BB0000");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+230,mainCanvas.height/2+22,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#006699");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+230,mainCanvas.height/2,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#FFA500");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+230,mainCanvas.height/2-22,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#700070");
objects.push(circle1);

var circle1 = new Circle(10, mainCanvas.width/2+230,mainCanvas.height/2-44,0,0,0,0,"bounce","bounce",1,1,0.05,0,1,"#FFA500");
objects.push(circle1);

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
        for(var j=i+1; j<objects.length; j++) {
            a = objects[i].posX;
            b = objects[i].posY;
            x = objects[j].posX;
            y = objects[j].posY;

            if(i!=j) {
                dist = Math.pow((Math.pow((a-x),2)+Math.pow((b-y),2)),0.5);
                if(dist < Math.abs(objects[i].radius + objects[j].radius)) {

                    //calculate relative velocity of objects (relative to objects[j])
                    rel_velocity_i_x = objects[i].speedX - objects[j].speedX;
                    rel_velocity_i_y = objects[i].speedY - objects[j].speedY;

                    //caculate the total magnitude of the object[i]'s velocity (relative to object[j])
                    rel_velocity_i = Math.sqrt(Math.pow(rel_velocity_i_x, 2) + Math.pow(rel_velocity_i_y, 2));

                    //calculate the final velocity magnitude of each object (relative to object[j] initial frame)
                    final_rel_velocity_i = rel_velocity_i * (objects[j].mass / (objects[j].mass + objects[i].mass));
                    final_rel_velocity_j = rel_velocity_i * (objects[i].mass / (objects[j].mass + objects[i].mass));

                    //calculate angle of line between centerlines and horizontal
                    center_line_angle = Math.atan((objects[i].posY - objects[j].posY)/(objects[i].posX - objects[j].posX));
                    console.log(center_line_angle);

                    //correct angle for quadrants 2 and 3
                    if(objects[j].posX < objects[i].posX) {
                        center_line_angle += Math.PI;
                    }
                    console.log(center_line_angle);

                    //calculate angle of object[i]'s relative velocity
                    rel_velocity_angle = Math.atan(rel_velocity_i_y / rel_velocity_i_x);

                    //correct angle for quadrants 2 and 3
                    if(rel_velocity_i_x < 0) {
                        rel_velocity_angle += Math.PI;
                    }
                    if(rel_velocity_angle < 0) {
                        rel_velocity_angle += 2*Math.PI;
                    }

                    //calculate the final velocity angles for each object (in object[j]'s reference plane)
                    if(rel_velocity_angle < center_line_angle) {
                        velocity_angle_i = center_line_angle - (Math.PI/2);
                    } else {
                        velocity_angle_i = center_line_angle + (Math.PI/2);
                    }
                    velocity_angle_j = center_line_angle;

                    console.log("I: "+velocity_angle_i);
                    console.log("J: "+velocity_angle_j);


                    //calculate final velocity components for each object
                    objects[i].speedX = final_rel_velocity_i * Math.cos(velocity_angle_i) + objects[j].speedX;
                    objects[i].speedY = final_rel_velocity_i * Math.sin(velocity_angle_i) + objects[j].speedY; 
                    objects[j].speedX = final_rel_velocity_j * Math.cos(velocity_angle_j) + objects[j].speedX;
                    objects[j].speedY = final_rel_velocity_j * Math.sin(velocity_angle_j) + objects[j].speedY;



                }                
            }
        }
    }



    requestAnimationFrame(drawAndUpdate);
}

drawAndUpdate();

