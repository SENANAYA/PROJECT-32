const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;
var minute;

var bg = "sunrise.png";

function preload() {
    getBackgroundImg();
    
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);
    
    if(hour>=12){
        text("Time : "+ hour%12 +":"+ minute + " PM", 50,100);
    }else if(hour==0){
        text("Time : 12 AM",100,100);
    }else{
        text("Time : "+ hour%12 + ":"+ minute +" AM", 50,100);
    }

}

async function getBackgroundImg(){

    // write code to fetch time from API
    
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    //change the data in JSON format and store it in variable responseJSON
    var responseJSON = await response.json()

    
    //fetch datetime from responseJSON
    var datetime = responseJSON.datetime
    

    // slice the datetime to extract hour
     hour = datetime.slice(11,13)
     minute =datetime.slice(14,16)
    
    if(hour>=6 && hour<12 ){
        bg = "sunrise.png";
    }else if(hour>=12 && hour <18){
 bg = "bg.png"
    }else if(hour >=18 && hour < 19){
        bg="sunset.png"
    }else{
         bg="bg2.jpg"
    }
    
    backgroundImg = loadImage(bg);
}
