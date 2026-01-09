let cupboardImg;
let cloudImages = [];
let clouds = [];
let cloudTexts = [
  "i wonder where my passions will take me",
  "Omga Bonga!",
  "Look up!",
  "Floaty cloud"
];

let cloudDisplayWidth = 150;
let cloudDisplayHeight = 80;
let maxClouds = 6;

// ABOUT
let showAbout = false;

// RECORD BOOK
let recordImg;
let record = {
  x: 80,
  y: 120,
  w: 110,
  h: 110,
  dragging: false,
  offsetX: 0,
  offsetY: 0
};

function preload() {
  cupboardImg = loadImage("https://raw.githubusercontent.com/s-mindroom/mindroomimages/34eb1e5ceb1061c0d9871b68f97e74af98617a2f/drawerBG_mindroom.png");
  cloudImages[0] = loadImage("https://raw.githubusercontent.com/s-mindroom/mindroomimages/34eb1e5ceb1061c0d9871b68f97e74af98617a2f/clouds-png-13369.png");
  cloudImages[1] = loadImage("https://raw.githubusercontent.com/s-mindroom/mindroomimages/34eb1e5ceb1061c0d9871b68f97e74af98617a2f/real-clouds-png-13393.png");
  cloudImages[2] = loadImage("https://raw.githubusercontent.com/s-mindroom/mindroomimages/64816ae247b53f9431802a9cab0429147fd30168/%E2%80%94Pngtree%E2%80%94cloud%20weather%20climate_8186758.png");
  recordImg = loadImage("https://raw.githubusercontent.com/s-mindroom/mindroomimages/c16d92dea89f3155a5c394842836639ae1a8e1c3/recordicon.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  textFont("Manrope");

  for (let i = 0; i < maxClouds - 1; i++) createCloud(random(0, width - cloudDisplayWidth));
  createCloud(-cloudDisplayWidth);
}

function draw() {
  image(cupboardImg, 0, 0, width, height);
  while (clouds.length < maxClouds) createCloud(-cloudDisplayWidth - random(50, 200));
  drawClouds();
  drawAboutUI();
  drawRecordIcon();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createCloud(startX = -cloudDisplayWidth) {
  let img = cloudImages[clouds.length % cloudImages.length];
  clouds.push({
    img,
    x: startX,
    y: random(height * 0.05, height * 0.4),
    speed: random(0.12, 0.25),
    text: random(cloudTexts),
    paused: false
  });
}

function drawClouds() {
  textAlign(CENTER, CENTER);
  textSize(18);
  fill("#ff3ebf");

  for (let i = clouds.length - 1; i >= 0; i--) {
    let c = clouds[i];
    if (!c.paused) c.x += c.speed;
    if (c.x > width) { clouds.splice(i, 1); continue; }

    image(c.img, c.x, c.y, cloudDisplayWidth, cloudDisplayHeight);

    let over = mouseX > c.x && mouseX < c.x + cloudDisplayWidth && mouseY > c.y && mouseY < c.y + cloudDisplayHeight;
    if (over) {
      c.paused = true;
      text(c.text, c.x + cloudDisplayWidth / 2, c.y + cloudDisplayHeight / 2);
    } else c.paused = false;
  }
}

// ABOUT
function drawAboutUI() {
  let label = "about mindroom";
  textSize(15);
  textAlign(RIGHT, TOP);
  fill(255);

  let x = width - 40;
  let y = 30;
  text(label, x, y);

  let w = textWidth(label);
  let left = x - w - 8;
  let right = x;

  if (mouseX > left && mouseX < right && mouseY > y && mouseY < y + 18) {
    stroke(255);
    line(left, y + 18, right, y + 18);
    noStroke();
  }

  if (showAbout) {
    textAlign(LEFT, TOP);
    text(
      "Mindroom is a digital drawer of drifting thoughts, soft chaos, and small ideas that float until they find a place to land.",
      width - 300,
      y + 35,
      260
    );
  }
}

// RECORD BOOK
function drawRecordIcon() {
  image(recordImg, record.x, record.y, record.w, record.h);

  let label = "Record Book";
  textSize(16);
  textAlign(CENTER, TOP);
  fill(255);

  let tx = record.x + record.w / 2;
  let ty = record.y + record.h - 2;
  text(label, tx, ty);

  let w = textWidth(label);
  if (mouseX > tx - w / 2 && mouseX < tx + w / 2 && mouseY > ty && mouseY < ty + 20) {
    stroke(255);
    line(tx - w / 2, ty + 18, tx + w / 2, ty + 18);
    noStroke();
  }
}

function mousePressed() {
  // About
  let ax = width - 40;
  let ay = 30;
  let aw = textWidth("about mindroom");
  if (mouseX > ax - aw && mouseX < ax && mouseY > ay && mouseY < ay + 18) showAbout = !showAbout;

  // Record book click
  if (mouseX > record.x && mouseX < record.x + record.w && mouseY > record.y && mouseY < record.y + record.h) {
    window.open("about:blank", "_blank");
  }

  // Drag
  if (mouseX > record.x && mouseX < record.x + record.w && mouseY > record.y && mouseY < record.y + record.h) {
    record.dragging = true;
    record.offsetX = mouseX - record.x;
    record.offsetY = mouseY - record.y;
  }
}

function mouseDragged() {
  if (record.dragging) {
    record.x = mouseX - record.offsetX;
    record.y = mouseY - record.offsetY;
  }
}

function mouseReleased() {
  record.dragging = false;
}
