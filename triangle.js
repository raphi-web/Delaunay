class myTriangle {
  constructor(pnt1, pnt2, pnt3) {
    this.points = [pnt1, pnt2, pnt3];
    this.points = this.points.sort((a, b) => {
      a.x - b.x;
    });
  }

  get_sides() {
    let [p1, p2, p3] = this.points;
    let a = p1.distance(p2);
    let b = p2.distance(p3);
    let c = p3.distance(p1);

    return [a, b, c];
  }

  isPointInCircumcircle(pnt) {
    let circle_radius = this.circumcircle();
    let center = this.centroid();
    let distance = pnt.distance(center);
    if (distance < circle_radius) {
      return true;
    }
    return false;
  }

  area() {
    let [a, b, c] = this.get_sides();

    let s = (a + b + c) / 2;
    let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    return area;
  }
  centroid() {
    let [a, b, c] = this.points;
    let [ax, ay] = a.as_xy();
    let [bx, by] = b.as_xy();
    let [cx, cy] = c.as_xy();

    let d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    let ux =
      ((ax * ax + ay * ay) * (by - cy) +
        (bx * bx + by * by) * (cy - ay) +
        (cx * cx + cy * cy) * (ay - by)) /
      d;
    let uy =
      ((ax * ax + ay * ay) * (cx - bx) +
        (bx * bx + by * by) * (ax - cx) +
        (cx * cx + cy * cy) * (bx - ax)) /
      d;

    let x = (this.points[0].x + this.points[1].x + this.points[2].x) / 3;
    let y = (this.points[0].y + this.points[1].y + this.points[2].y) / 3;

    return new myPoint(ux, uy);
  }
  circumcircle() {
    let [pnt1, pnt2, pnt3] = this.points;
    let [a, b, c] = this.get_sides();
    let r = (a * b * c) / (4 * this.area());
    return r;
  }

  is_contained(list_of_other) {
    for (let other of list_of_other) {
      if (this.is_equal(other)) {
        return true;
      }
    }
    return false;
  }

  circumcircle_center() {
    return [this.centroid().x, this.centroid().y, this.circumcircle()];
  }

  draw_circumcircle() {
    let [cx, cy, r] = this.circumcircle_center();
    circle(cx, cy, r * 2);
    point(cx, cy);
  }

  draw(
    strokeColor = [100, 100, 100, 10],
    fillColor = [100, 100, 100, 10],
    size = 10
  ) {
    stroke(...strokeColor);
    strokeWeight(size);
    fill(...fillColor);
    let [p1, p2, p3] = this.points;
    return triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  }

  is_equal(other) {
    let pntsA = this.points;
    let pntsB = other.points;
    let cnt = 0;
    for (let p of pntsA) {
      if (pntsB.includes(p)) {
        cnt += 1;
      }
    }

    return cnt == 3;
  }

  p1() {
    return this.points[0];
  }
  p2() {
    return this.points[1];
  }
  p3() {
    return this.points[2];
  }

  as_edges() {
    let [pnt1, pnt2, pnt3] = this.points;
    let e1 = new Edge(pnt1, pnt2);
    let e2 = new Edge(pnt2, pnt3);
    let e3 = new Edge(pnt3, pnt1);

    return [e1, e2, e3];
  }

  shares_vertex(other) {
    let pntsA = this.points;
    let pntsB = other.points;

    for (let pA of pntsA) {
      for (let pB of pntsB) {
        if (pA == pB) {
          return true;
        }
      }
    }

    return false;
  }

  shares_edge(other) {
    let edgesA = this.as_edges();
    let edgesB = other.as_edges();

    for (let eA of edgesA) {
      for (let eB of edgesB) {
        if (eA === eB) {
          return [true, eA];
        }
      }
    }

    return [false, null];
  }

  as_xy() {
    return [this.points.map((p) => p.x), this.points.map((p) => p.y)];
  }
}

class Edge {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  length() {
    return this.p1.distance(this.p2);
  }

  is_equal(other) {
    let pntsA = [this.p1, this.p2];
    let pntsB = [other.p1, other.p2];

    let cnt = 0;
    for (let pA of pntsA) {
      for (let pB of pntsB) {
        if (pA.is_equal(pB)) {
          cnt += 1;
        }
      }
    }
    return cnt === 2;
  }

  is_contained(list_of_other) {
    for (let other of list_of_other) {
      if (this.is_equal(other)) {
        return true;
      }
    }
    return false;
  }
}
