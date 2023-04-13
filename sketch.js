
const rColor = (a) => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    a,
  ];
};

let points = randomPoints(60, window.innerWidth-300, window.innerHeight-300,300,300);

//let points = [p1,p2,p3];

let dimension = [window.innerWidth, window.innerHeight];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

}
function draw() {
  background(220); 
  scale(0.7)
  drawTriangle();
  for (let p of points) {
    stroke("black");
    strokeWeight(10);
    point(p.x,p.y)
  }
  noLoop();
  
}

function randomPoints(n, xmax, ymax,xoff=0,yoff=0) {
  let new_points = [];
  for (let i = 0; i < n; i++) {
    let x = Math.random() * xmax;
    let y = Math.random() * ymax;
    let p = new myPoint(x+xoff, y+yoff);
    new_points.push(p);
  }
  return new_points;
}
function resize() {
  let [w,h] = [ window.innerWidth,window.innerHeight];
  for (let i = 0; i< points.length; i++) {
    points[i].rescale(dimension[0],w,dimension[1],h);
  }
  dimension = [w,h]
  resizeCanvas(w,h);
}

function drawPoint(p,color="purple",size=10) {
  stroke(color);
  strokeWeight(size);
  point(p.x, p.y);

}
function drawPoints(points,color,size) {
  for (let p of points) {
  drawPoint(p,color,size);
  }
}

function mousePressed() {
  points = randomPoints(60, window.innerWidth-300, window.innerHeight-300,300,300);
  redraw();
}

document.addEventListener('click', (event) => {
  mousePressed()
})


function updatePoints() {
  for (let i = 0; i< points.length; i++) {
    points[i].x += random(-1,+1);
    points[i].y -= 1;
    if (points[i].y < 0)
    points[i].y = dimension[1];
  }
}


function drawTriangle() {
  mesh = new TriangleMesh(points);
  console.log(mesh);
  stroke([255,255,255,255]);
  strokeWeight(5);
  for (let t of mesh.triangles) {
    let [p1,p2,p3] = t.points;
    rColor()
    t.draw([0,0,0,255],[0,0,0,1],1)


   
  }
}

