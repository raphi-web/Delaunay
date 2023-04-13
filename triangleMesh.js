class TriangleMesh {
  constructor(points) {
    this.delaunay(points);
  }

  delaunay(points) {
    let pnt1 = new myPoint(60, 0);
    let pnt2 = new myPoint(80, 50);
    let pnt3 = new myPoint(100, 0);

    let tri = new myTriangle(pnt1, pnt2, pnt3);
    tri.draw();

    let superTriangle = __superTriangle(points);
    let triangulation = [superTriangle];

    //superTriangle.draw([0, 0, 255, 60], [0, 0, 0, 1], 10);

    let count = 0;

    for (const point of points) {
      console.log("Iteration ---", count, point);
      point.draw(rColor(255), 30);
      console.log("Triangles 1", triangulation.length);
      
      let badTriangles = [];
      for (let tri of triangulation) {
        if (tri.isPointInCircumcircle(point)) {
          badTriangles.push(tri);
        }
      }

      let polygon = [];

      for (let triA of badTriangles) {
        for (let edgeA of triA.as_edges()) {
          let frequency = 1;
          for (let triB of badTriangles) {
            if (!triA.is_equal(triB)) {
              if (edgeA.is_contained(triB.as_edges())) {
               frequency += 1;
              }
            }
          }

          if (frequency ==1) {
            polygon.push(edgeA);
          }
        }
      }
      console.log("Triangles 2", triangulation.length);
     
      let new_triangulation = [];
      for (let tri of triangulation) {
        let isBad = false;
        for (let triBad of badTriangles) {
          if (triBad.is_equal(tri)) {
            isBad = true;
          }
        }

        if (!isBad) {
          new_triangulation.push(tri);
        }
      }
      triangulation = new_triangulation;
      console.log("Triangles 3", triangulation.length);
      for (let edge of polygon) {
        let pnt1 = edge.p1;
        let pnt2 = edge.p2;
        let new_triangle = new myTriangle(pnt1, pnt2, point);
        triangulation.push(new_triangle);
      }
      console.log("Triangles 4 (Push New )", triangulation.length);

    }
    console.log("-------Cleanup");

    let new_triangles = [];
    for (let tri of triangulation) {
      let isin = false;
      for (let pA of tri.points) {
        for (let pB of superTriangle.points) {
          if (pA.is_equal(pB)) {
            isin = true;
          }
        }
      }
      if (!isin) {
        new_triangles.push(tri);
      }
    }
    this.triangles = new_triangles;
  }
}

function __superTriangle(points) {
  let x = points.map((p) => p.x);
  let y = points.map((p) => p.y);

  
  let xmin = Math.min(...x);
  let xmax = Math.max(...x);
  let ymin = Math.min(...y);
  let ymax = Math.max(...y);
  
  let dx  = xmax - xmin;
  let dy = ymax - ymin;

  let pnt1 = new myPoint(xmin, ymin);
  let pnt2 = new myPoint(xmax, ymin);
  let yoff = ymax - ymin;
  let middle = (xmin + xmax) / 2;
  let pnt3 = new myPoint(middle, ymin);
  pnt3 = new myPoint((pnt2.x + pnt1.x) / 2, ymin - yoff);

  // y = kx + d
  let k1 = (pnt3.y - pnt1.y) / (pnt3.x - pnt1.x);
  let d1 = -k1 * pnt1.x + pnt1.y;

  const eqation1 = (y) => (y - d1) / k1;
  pnt4 = new myPoint(eqation1(ymax), ymax);

  let k2 = (pnt3.y - pnt2.y) / (pnt3.x - pnt2.x);
  let d2 = -k2 * pnt2.x + pnt2.y;
  const eqation2 = (y) => (y - d2) / k2;
  pnt5 = new myPoint(eqation2(ymax), ymax);

  let p1 = new myPoint(pnt3.x, pnt3.y);
  let p2 = new myPoint(pnt4.x, pnt4.y + 100);
  let p3 = new myPoint(pnt5.x, pnt5.y + 100);

  let xx = points.map((p) => p.x);

  for (let x of xx) {
    if (x < eqation1(x.y)) {
      console.log(true);
    }
    if (x > eqation2(x.y)) {
      console.log(true);
    }
  }
  let superTriangle = new myTriangle(p1, p2, p3);

  let fac = 1.2
  let center = superTriangle.centroid();
  let [cx,cy] = center.as_xy();


  let new_points = [];
  for (p of superTriangle.points) {
    let [px,py] = p.as_xy();
    let new_x = (px - cx) * fac + cx;
    let new_y = (py - cy) * fac + cy;
    new_points.push(new myPoint(new_x,new_y))
  }

  superTriangle.points = new_points;


  return superTriangle;
}
