class myPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(other) {
    return Math.sqrt((this.x - other.x)**2 + (this.y - other.y)**2)
  }

  rescale(xMaxOld,xMaxNew,yMaxOld,yMaxNew){
    this.x = (this.x / xMaxOld) * xMaxNew;
    this.y = (this.y / yMaxOld) * yMaxNew; 
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
  }

  subtract(other) {
    this.x -= other.x; 
    this.y -= other.y;
  }
  multiply(scalar) {
    this.x * scalar;
    this.y * scalar;
  }

  draw(color=[0,0,0],size=10) {
    stroke(color[0],color[1],color[2]);
    strokeWeight(size);
    return point(this.x,this.y);
  }

  as_xy() {
    return [this.x,this.y];
  }

  angle(other) {
    return  Math.atan2( (other.y- this.y),  (other.x - this.x))
  }

  is_equal(other) {
    if (this.x == other.x && this.y == other.y) {
      return true
    }
    return false;
  }
  is_contained(list_of_other) {
    for (let p in list_of_other) {
      if (p.x == this.x & p.y == this.y) {
        return true
      }
    }
    return false
  }
}