var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement("canvas");
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var canvasClearColor = "#ffffff";
var canvasStrokeColor = "000000";

var context = canvas.getContext("2d");

var player = new Player();
var computer = new Computer();
var ball = new Ball(canvas.width/2, canvas.height/2, 5);

//Helper function
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 2;
};

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.xSpeed = 3;
    this.ySpeed = 3;
    this.radius = radius;
};

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

//Main loop
var step = function() {
    update();
    render();
    animate(step);
};
//Update all logic
var update = function() {
    ball.update();
};
var drawField = function() {
    context.fillStyle = canvasClearColor;
    context.fillRect(0, 0, width, height);
    context.strokeStyle = canvasStrokeColor;
    context.strokeRect(0, 0, width, height);
};
//Draw everything
var render = function() {
    //clear the screen
    drawField();

    //Update everything else
    player.render();
    computer.render();
    ball.render();
};



Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.update = function() {

};

Ball.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2*Math.PI, 0, false);
    context.fill();
};

Ball.prototype.update = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.x.clamp(0, width);
    this.y.clamp(0, height);
    if(this.x >= width || this.x <= 0) {
        this.xSpeed = -this.xSpeed;
    }
    if(this.y >= height || this.y <= 0) {
        this.ySpeed = -this.ySpeed;
    }
};

function Player() {
    this.paddle = new Paddle(0, (canvas.height/2)-25, 10, 50);
};

function Computer() {
    this.paddle = new Paddle(width-10, (canvas.height/2)-25, 10, 50);
};

Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};