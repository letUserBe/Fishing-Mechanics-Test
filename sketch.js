//Fishing Game Mechanics Test
//Cast a line to the shadow and catch a fish
//Random fish species,random fish length, random fish weight
//Add some minor animations

//TODO
//relate shadow size (r) to species
//relate length to species 
//relate weight to species & length
//move waves to their own class and improve animation
//move fishing line to its own class and improve animation
//implement species/length/weight/etc with arrays (generally improve)
//load bobber image
//find "cutesy images" for objects
//add raft or fisherman object
//add inventory system (lure, baits, line types, hooks)
//breakable lines
//jellyfish
//combat

let inv = []
let wavesimg
let bobberanimation
let redcaughtimg
let rideimg
let riderimg

let bobberimg
let feedbutton

//feed ride

function preload() {
  wavesimg = loadImage('textureWater.png')
  bobberanimation = loadAnimation('bobber0.png', 'bobber1.png')
  redcaughtimg = loadImage('red_lowres2.png')
  rideimg = loadImage('turtleby@kisara.png')
  riderimg = loadImage('bluefisherman.png')
}

function setup() {
  textSize(18)
  frameRate(10)
  createCanvas(800, 800);
  ride = new Ride()
  rider = new Rider()
  fish = new Fish(r = 80)
  // fishcaught = new FishPic()
  // inv.push('old fishing pole')

  feedbutton = createButton('Feed')
  feedbutton.mousePressed(ride.feed)
}

function draw() {
  clear()
  background(0, 0, 255)
  for (let x = 0; x <= width; x += 50) {
    for (let y = 0; y <= height; y += 50) {
      // tint(0,random(255))
      image(wavesimg, x, y, 50)
    }
  }
  fish.show()
  animation(bobberanimation, mouseX, mouseY)
  ride.show()
  rider.show()
  fish.fishing()
  feedbutton.position(ride.x - 22, ride.y + ride.r-40)
}

function mousePressed() {

}

class Fish {
  constructor(r) {
    this.pos = createVector(random(r, width - r), random(r, height - r), r)
    this.x = this.pos.x
    this.y = this.pos.y
    this.r = r
    this.weight = int(random(0.5, 10))
    this.length = int(random(0.5, 48))
    this.namearray = ['perch', 'whiting', 'trout', 'redfish', 'piranha']
    this.name = random(this.namearray)
    this.catchtext1 = ''
    this.catchtext2 = 'Click the shadow to start fishing.'
    this.invtext2 = ' '
  }

  show() {
    
    fill(0,0,150)
    ellipse(this.x, this.y, this.r)
  }

  fishing() {

    if (mouseIsPressed && dist(mouseX, mouseY, this.x, this.y) <= this.r / 2) {
      line(mouseX, mouseY, width / 2, height / 2)
      this.x = random(this.r, width - this.r)
      this.y = random(this.r, height - this.r)
      this.weight = int(random(10, 32))
      this.length = int(random(1, 48))
      this.catchtext1 = 'You caught a ' + this.name + '.'
      if (inv.length <= 10) {
        inv.push(this.name)
      } else if (inv.length > 10) {
        this.invtext2 = 'Inventory is full.'
      }
      this.name = random(this.namearray)
      this.catchtext2 = 'It is ' + this.length + ' inches long and weighs ' + this.weight + ' ounces.'
    }
    fill(255)
    textAlign(CENTER)
    textAlign(LEFT)
    text('Inventory: ' + inv, 10, 20)
    text(this.invtext2, 10, 45)
    textAlign(RIGHT)
    text(this.catchtext1, width - 10, height - 35)
    text(this.catchtext2, width - 10, height - 10)
    textAlign(LEFT)
    text('Once you collect 5 or more fish, you can',10, height - 35)
    text('feed them to your ride to make it grow.',10, height -10)
  }
}

class Ride {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.r = 75
    this.foodeaten = 0
  }
  show() {
    imageMode(CENTER)
    // fill(140, 70, 20)
    image(rideimg, this.x, this.y, this.r, this.r)
  }

  feed() {
    for (let i = 0; i <= 5; i++) {
      if (inv.length >= 5) {
        ride.r += 5
        inv.splice(i)
      }
    }
  }
}

class Rider {
  constructor() {
    this.x = width / 2
    this.y = height / 2
  }
  show() {
    fill(255)
    image(riderimg, this.x, this.y, 20, 20)
    fill(0, 0, 100, 255)
  }
}

class FishPic {
  constructor() {
    this.x = width / 2
    this.y = height - height / 3
    this.r = 100
  }
  show() {
    // for(let i=0;i<=30;i++){
    imageMode(CENTER)
    image(redcaughtimg, this.x, this.y, this.r, this.r)
    // }
  }
}

// function mousePressed(){
// print('mouse test')  
//     let x = mouseX
//     let y = mouseY
//   for(let i=0;i<30;i++){
//    ellipse(x,y,20)
//     x+=1
//   }
// }