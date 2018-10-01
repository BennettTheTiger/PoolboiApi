var yoff = 0.0;        // 2nd dimension of perlin noise

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
  fill('#164899');
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  
  var xoff = 0;       // Option #1: 2D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to 
    
    var y = map(noise(xoff, yoff), 0, 1, 100,200);

    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}