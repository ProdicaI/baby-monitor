let img = "";
let status = "";
let object = [];

async function preload() {
  img = loadImage("baby.jpg");
}

async function setup() {
  const canvas = createCanvas(640, 420);
  canvas.center();

  let objectDetector = ml5.objectDetector("cocossd", () => {
    console.log("Model loaded.");

    status = true;

    objectDetector.detect(img, (error, results) => {
      if (error) console.error(error);
      else console.log(results);

      objects = results;
    });
  });

  document.getElementById("status").innerHTML = "Status: Detecting Baby.";
}

async function draw() {
  image(img, 0, 0, 640, 480);

  if (status != "") {
    for (i = 0; i < object.length; i++) {
      document.getElementById("status").innerHTML = "Status: Baby Detected";

      fill("#FF0000");
      percent = Math.floor(objects[i].confidence * 100);
      text(`${objects[i].label} ${percent}%`, objects[i].x, objects[i].y);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }

//   fill("#FF0000");
//   text("Dog", 45, 75);
//   noFill();
//   stroke("#FF0000");
//   rect(30, 60, 450, 350);

//   fill("#FF0000");
//   text("Cat", 320, 120);
//   noFill();
//   stroke("#FF0000");
//   rect(320, 120, 200, 350);
}
