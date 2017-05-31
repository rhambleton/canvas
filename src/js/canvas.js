
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

//initialize some variables for tracking the framerate
var startingT;
var lastT;
var totalT;
var deltaT;
var currentT;

//define a circle object
function Circle(radius, posX, posY, speedX, speedY, endtypeX, endtypeY, elasticityX, elasticityY, airresistance, gravity, mass, color) {
    
    //alert(gravity);

    this.type = "circle";
    this.radius = radius;
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.accelX = 0;
    this.accelY = 0;
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
    this.speedX += this.accelX;//* deltaT;
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

    //check for vertical edges
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

function colDetect() {

    //check for collissions
    for(i=0; i<objects.length; i++) {

        for(var j=i+1; j<objects.length; j++) {

            if(i!=j) {

                //calculate relative velocity of objects (relative to objects[j])
                var rel_velocity = {};
                rel_velocity.x = objects[i].speedX - objects[j].speedX;
                rel_velocity.y = objects[i].speedY - objects[j].speedY;
                rel_velocity.magnitude = Math.sqrt(Math.pow(rel_velocity.x, 2) + Math.pow(rel_velocity.y, 2));
                rel_velocity.angle = Math.atan2(rel_velocity.y, rel_velocity.x);

                //calculate the x and y components of a unit vector in the direction of the relative velocity
                rel_velocity.unit = {};
                rel_velocity.unit.x = Math.sin(rel_velocity.angle);
                rel_velocity.unit.y = Math.cos(rel_velocity.angle);

                //check how far i will move relative to j in a single frame
                deltaDist = rel_velocity.magnitude * deltaT;

                //calculate the distance between the objects
                var dist = {};
                dist.x = objects[j].posX - objects[i].posX;
                dist.y = objects[j].posY - objects[i].posY;
                dist.magnitude = Math.sqrt((Math.pow((dist.x),2)+Math.pow((dist.y),2)));
                dist.angle = Math.atan2(dist.y , dist.x);

                //calculate the dot product between the relative velocity and distance vectors
                var distDot = dist.x * rel_velocity.x + dist.y * rel_velocity.y;

                //calculate an intermediate value
                var d = dist.x * rel_velocity.unit.x + dist.y * rel_velocity.unit.y;

                //calculate distance between our trajectory and the center of the target
                var f = Math.pow(dist.magnitude,2) - Math.pow(d, 2);

                //quick check for a collision to see if we need to check further
                if(deltaDist > dist.magnitude - objects[i].radius - objects[j].radius && distDot > 0 && f <= Math.pow((objects[i].radius + objects[j].radius),2)) {

                    //we may have a collision - calculate the impact distance
                    var t = Math.pow((objects[i].radius + objects[j].radius),2) - f;
                    var impact_distance = d - Math.sqrt(t);

                    if(impact_distance <= rel_velocity.magnitude) {

                        //we have a collission - correct the objects speed and position
                        collision(i,j,rel_velocity,dist);

                    } //end impact code
                } //end quick escapes
            } // end check that both objects are the same object
        } // end inner loop over all objects
    } // end outer loop over all objects

}

function collision(i,j,rel_velocity,dist) {

    //calculate the final velocity magnitude of each object (relative to object[j] initial frame)
    final_rel_velocity = {};
    final_rel_velocity.i = rel_velocity.magnitude * (objects[j].mass / (objects[j].mass + objects[i].mass));
    final_rel_velocity.j = rel_velocity.magnitude * (objects[i].mass / (objects[j].mass + objects[i].mass));

    //calculate the final velocity angles for each object (in object[j]'s reference plane)
    if(rel_velocity.angle < dist.angle) {
        velocity_angle_i = dist.angle - (Math.PI/2);
    } else {
        velocity_angle_i = dist.angle + (Math.PI/2);
    }
    velocity_angle_j = dist.angle;

    //calculate final velocity components for each object
    objects[i].speedX = final_rel_velocity.i * Math.cos(velocity_angle_i) + objects[j].speedX;
    objects[i].speedY = final_rel_velocity.i * Math.sin(velocity_angle_i) + objects[j].speedY; 
    objects[j].speedX = final_rel_velocity.j * Math.cos(velocity_angle_j) + objects[j].speedX;
    objects[j].speedY = final_rel_velocity.j * Math.sin(velocity_angle_j) + objects[j].speedY;

}

function addCircle (e) {

    //grab user parameters
    var radius = $("#user_radius").val();
    var mass = $("#user_mass").val();
    var color = $("#user_color").val();
    var gravity = $("#user_gravity").val();
    var xspeed = $("#user_speedx").val();
    var yspeed = $("#user_speedy").val();

    objects.push(new Circle(radius,e.clientX,e.clientY,xspeed,yspeed,"bounce","bounce",1,1,0.05,gravity,mass,color));
}

function drawAndUpdate(currentT) {

    //track the frame rate
    if(!startingT) { startingT = currentT; }
    if(!lastT) { lastT = currentT; }
    totalT = (currentT - startingT) / 1000;
    deltaT = (currentT - lastT) / 1000;
    lastT = currentT;

    //clear the previous frame
    mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);

   // color in the background
    mainContext.fillStyle = world.bgcolor;
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

    for(var i=0; i < objects.length; i++) {
        var myObject = objects[i];
        myObject.update(deltaT);
    }

    //perform collision detection
    colDetect();

    requestAnimationFrame(drawAndUpdate);
}

//add an event listener for mouse clicks
$("#viewPort").mousedown(event, addCircle);

drawAndUpdate();

