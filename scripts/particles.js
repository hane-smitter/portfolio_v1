const particles = [];
let z;
function setup() {
createCanvas(windowWidth, windowHeight);
  const particlesLength = Math.floor(window.innerWidth / 10);

  for(let i = 0; i < particlesLength; i++) {
console.log('particles length');
particles.push(new Particle());
  }
}
function draw() {
  background(144, 62, 179);//55, 100, 144
  for(let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    particles[i].checkParticle(particles.slice(i));
  }

  console.log('still running!!');
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
class Particle {
  constructor() {
    //position
    this.pos = createVector(random(window.innerWidth), random(window.innerHeight));
    //size
    this.size = 9;
    //velocity
    this.vel = createVector(random(-2, 2), random(-2, 2));
  }

  draw() {
    circle(this.pos.x, this.pos.y, this.size);
  }

  //udate movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  //detecting edges
  edges() {
    if(this.pos.x >= window.innerWidth || this.pos.x <= 0) {
      this.vel.x *= -1;
    }
    if(this.pos.y >= window.innerHeight || this.pos.y <= 0) {
      this.vel.y *= -1;
    }
  }

  //connect particles
  checkParticle(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if(d < 120) {
        stroke('rgba(255, 255, 255, 0.3)');
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}