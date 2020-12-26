video = "";
status = "";
objects = [];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    
}
function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw(){
    image(video,0,0,500,400);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0 ; i < objects.length ; i++){
       
        document.getElementById("status").innerHTML = "Status : Objects Detected !";
        document.getElementById("objects").innerHTML = "No . Of objects Detected : " + objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15 );
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y , objects[i].width,objects[i].height);
    }
    }
}

function pause(){
    video.pause();
}

function stop(){
    video.stop();
}


function modelLoaded(){
    console.log("Model Loaded !");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
    
    
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

