const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const text_box = document.getElementById('text');
const section_text = document.getElementById('section-text');

const all_project_view = document.getElementById('all-project-view');
const coding_project_view = document.getElementById('coding-project-view');
const music_project_view = document.getElementById('music-project-view');
const design_project_view = document.getElementById('design-project-view');
const threeD_project_view = document.getElementById('3d-project-view');

const professional_about_view = document.getElementById('professional-about-view');
const coding_about_view = document.getElementById('coding-about-view');
const music_about_view = document.getElementById('music-about-view');
const teaching_about_view = document.getElementById('teaching-about-view');
const hobbies_about_view = document.getElementById('hobbies-about-view');
    
const blog_view = document.getElementById('blog-view');

let all_views = [all_project_view, coding_project_view, music_project_view, design_project_view, threeD_project_view, blog_view, professional_about_view, coding_about_view, music_about_view, teaching_about_view, hobbies_about_view]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Background image
const background = new Image();
background.src = 'background.svg';
let bgWidth = 0;
let bgHeight = 0;
    
// Calculate background dimensions to fill screen while maintaining aspect ratio
function updateBackgroundSize() {
  const canvasAspect = canvas.width / canvas.height;
  const bgAspect = background.width / background.height;
  
  if (canvasAspect > bgAspect) {
    // Canvas is wider than background (relative to height)
    bgWidth = canvas.width;
    bgHeight = canvas.width / bgAspect;
  } else {
    // Canvas is taller than background (relative to width)
    bgHeight = canvas.height;
    bgWidth = canvas.height * bgAspect;
  }
}
  
// When background loads, update its size
background.onload = function() {
  updateBackgroundSize();
};

// Camera properties
const camera = {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight
};

// Player properties
const player = {
  x: 50,
  y: 50,
  width: 80,
  height: 120,
  dx: 0,
  dy: 0,
  speed: 10,
  jumpStrength: 20,
  onGround: false,
  facingRight: false,  // Add this line to track facing direction
  // Spritesheet properties
  spritesheet: new Image(),
  frameWidth: 1024,  // 2048 / 4 = 512 (since there are 4 images)
  frameHeight: 1024, // Full height of each frame
  currentFrame: 0,
  frameCount: 4,    // Total frames in the spritesheet
  frameX: 0,        // Current x position in spritesheet
  frameY: 0,        // Current y position in spritesheet
  animationSpeed: 0.25,
  animationTimer: 0
};

// Load the player spritesheet
player.spritesheet.src = 'images/marius_spritesheet.png';

// IMAGES
///////////////////////////////////////////////////

// Load the image
const meImg = new Image();
meImg.src = 'images/me.png';

// Position for the image
const meImage = {
  x: 100,
  y: 100,
  width: 330,
  height: 448
};

const comImg = new Image();
comImg.src = 'images/computer.png';

// Position for the image
const comImage = {
  x: 100,
  y: 100,
  width: 667,
  height: 601
};

const bulbImg = new Image();
bulbImg.src = 'images/bulb.png';

// Position for the image
const bulbImage = {
  x: 100,
  y: 100,
  width: 185,
  height: 299
};

const handImg = new Image();
handImg.src = 'images/hand.png';

// Position for the image
const handImage = {
  x: 100,
  y: 100,
  width: 552,
  height: 280
};

const letterImg = new Image();
letterImg.src = 'images/envelope.png';

// Position for the image
const letterImage = {
  x: 100,
  y: 100,
  width: 595,
  height: 613
};


//////////////////////////////////
// Gravity
const gravity = 0.7;

// Platform
const platform = {
  x: 0,
  y: canvas.height - 100,
  width: canvas.width,
  height: 40
};

// Input state
const keys = {
  left: false,
  right: false,
  up: false
};

// Event listeners
window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
  if ((e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') && player.onGround) {
    keys.up = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
  if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = false;
});

function update() {
  // Horizontal movement
  if (keys.left) {
    player.dx = -player.speed;
    player.facingRight = true;  // Face left when moving left
  } else if (keys.right) {
    player.dx = player.speed;
    player.facingRight = false;   // Face right when moving right
  } else {
    player.dx = 0;
  }

  // Jump
  if (keys.up && player.onGround) {
    player.dy = -player.jumpStrength;
    player.onGround = false;
  }

  // Apply gravity
  player.dy += gravity;

  // Move player
  player.x += player.dx;
  player.y += player.dy;

  // Update camera position to follow player (centered)
  camera.x = player.x + player.width/2 - camera.width/2;
  
  // Keep camera within world bounds
  camera.x = Math.max(0, Math.min(camera.x, bgWidth - camera.width)); // Assuming world width of 2000
  camera.y = Math.max(0, Math.min(camera.y, 1000 - camera.height)); // Assuming world height of 1000

  // Simple ground/platform collision
  if (player.y + player.height/2 > bgHeight-player.height) {
    player.y = bgHeight-player.height - player.height/2;
    player.dy = 0;
    player.onGround = true;
  }

  // World boundaries
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > bgWidth) player.x = bgWidth - player.width; // World width boundary

  //console.log(player.x)
}

function draw() {
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background with parallax effect (moves at 30% of camera speed)
  if (background.complete) {
    const parallaxX = camera.x * -1;
    const offsetX = parallaxX % bgWidth;
    
    // Draw as many background images as needed to fill the screen
    for (let x = -bgWidth + offsetX; x < canvas.width; x += bgWidth) {
      ctx.drawImage(background, x, 0, bgWidth, bgHeight);
    }
  }

  // Draw all other images first
  if (meImg.complete) {
    img_aspect = meImage.width / meImage.height;
    width = img_aspect * bgHeight/2
    ctx.drawImage(
      meImg, 
      (bgWidth / 5) * 4 - (bgWidth / 5 / 2) - width/2 - camera.x,
      bgHeight/2.5,  
      width, 
      bgHeight/2
    );
  }

  if (comImg.complete) {
    img_aspect = comImage.width / comImage.height;
    width = img_aspect * bgHeight/2
    ctx.drawImage(
      comImg, 
      bgWidth / 5 / 2 - width/2 - camera.x,
      bgHeight/2.5,  
      width, 
      bgHeight/2
    );
  }

  if (bulbImg.complete) {
    img_aspect = bulbImage.width / bulbImage.height;
    width = img_aspect * bgHeight/2
    ctx.drawImage(
      bulbImg, 
      (bgWidth / 5) * 2 - (bgWidth / 5 / 2) - width/2 - camera.x,
      bgHeight/2.5,  
      width, 
      bgHeight/2
    );
  }
  
  if (handImg.complete) {
    img_aspect = handImage.width / handImage.height;
    width = img_aspect * bgHeight/2
    ctx.drawImage(
      handImg, 
      (bgWidth / 5) * 3 - (bgWidth / 5 / 2) - width/2 - camera.x,
      bgHeight/2.5,  
      width, 
      bgHeight/2
    );
  }

  if (letterImg.complete) {
    img_aspect = letterImage.width / letterImage.height;
    width = img_aspect * bgHeight/2
    ctx.drawImage(
      letterImg, 
      (bgWidth / 5) * 5 - (bgWidth / 5 / 2) - width/2 - camera.x,
      bgHeight/2.5,  
      width, 
      bgHeight/2
    );
  }

  // Draw player with spritesheet (drawn last to appear in front)
  if (player.spritesheet.complete) {
    // Only update animation frame if player is moving horizontally
    if (player.dx !== 0) {
      player.animationTimer += player.animationSpeed;
      if (player.animationTimer >= 1) {
        player.animationTimer = 0;
        player.currentFrame = (player.currentFrame + 1) % player.frameCount;
        if (player.currentFrame == 0) {
          player.frameX = 0;
          player.frameY = 0;
        }
        else if (player.currentFrame == 1){
          player.frameX = player.frameWidth;
          player.frameY = 0;
        }
        else if (player.currentFrame == 2){
          player.frameX = 0;
          player.frameY = player.frameHeight;
        }
        else if (player.currentFrame == 3){
          player.frameX = player.frameWidth;
          player.frameY = player.frameHeight;
        }
      }
    } else {
      // Reset to first frame when not moving
      player.currentFrame = 0;
      player.frameX = 0;
      player.frameY = 0;
      player.animationTimer = 0;
    }

    // Save the current context state
    ctx.save();
    
    // If facing left, flip the sprite by scaling negatively on the x-axis
    if (!player.facingRight) {
      ctx.translate(player.x - camera.x + player.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(player.x - camera.x, 0);
    }

    // Draw the current frame
    ctx.drawImage(
      player.spritesheet,
      player.frameX,  // source x
      player.frameY,  // source y
      player.frameWidth,  // source width
      player.frameHeight, // source height
      player.facingRight ? 0 : 0,  // destination x (0 because we're translating)
      player.y,       // destination y
      player.width,   // destination width
      player.height   // destination height
    );
    
    // Restore the context state
    ctx.restore();
  }
  
  // Save the current context state
  ctx.save();
  
  // Translate the canvas to create camera effect
  ctx.translate(-camera.x, -camera.y);

  // Restore the context state
  ctx.restore();
}
  
function loop() {
  update();
  draw();
  text();
  requestAnimationFrame(loop);
}

// Start game loop
loop();

// Resize handling
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.width = window.innerWidth;
  camera.height = window.innerHeight;
  platform.y = 900; // Fixed position in world space
  platform.width = 2000; // Full world width
  if (background.complete) {
    updateBackgroundSize();
  }
});