function setup(){
    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}
img =""
status = ""
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects..."
}
function modelLoaded(){
    console.log("Model Loaded!")
    status = true
}
function gotResult(error, results){
if (error) {
    console.log(error)
}
console.log(results)
objects = results
}
objects = []
function preload(){
    img = loadImage("dog_cat.jpg")
}
function draw(){
    image(video,0,0,600,500)
    if(status!= ""){
        objectDetector.detect(video, gotResult)
      for (let i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Objects Detected!"
        document.getElementById("number").innerHTML = "Number of Objects Detected:" + objects.length
        fill("red")
        stroke("red")
        accuracy = floor(objects[i].confidence * 100)
        name = objects[i].label
        text(name + "  " + accuracy + "%" , objects[i].x +5, objects[i].y + 15)
        noFill()
        stroke("red")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        
      }
    }

}
