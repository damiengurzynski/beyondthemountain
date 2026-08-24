//VARIABLES
//debug
let debug = document.getElementById('debug');

//canvas
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let screenX = window.innerWidth;
let screenY = window.innerHeight;

//game
let levels = {town: ['darkorange'],lake: ['darkblue',5], forest: ['darkgreen',8], mountain: ['darkgray',1]};
let currentlevel = levels.town;
let currentscene = 0;
let currentscreen = 'map';
let currentenemies = [[null,0,0,100],[null,screenX/3,0,100],[null,screenX-screenX/3,0,100]];
let currentplayers = [['flute',0,screenY-screenY/3,100],['drum',screenX/3,screenY-screenY/3,100],['guitar',screenX-screenX/3,screenY-screenY/3,100]];
let selectedplayer = currentplayers[0];
let songs = {flute: [['Slumber',[50,57,60,40]],['Love',[]],['Folly',[]]], guitar: [['Sunshine',[]],['Rain',[]],['Snow',[]]], drum: [['Envy',[]],['Anger',[]],['Ego',[]]]};
let combat = false;
let ui = {mountain: document.getElementById('mountain'), map: document.getElementById('map'), level: document.getElementById('level'), back: document.getElementById('back'), next: document.getElementById('next')};

//FUNCTIONS
function initCanvas() {
  canvas.width = screenX;
  canvas.height = screenY;
}

function rand(min,max) {
  let mi = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - mi + 1) + mi);
}

function draw() {
  ctx.clearRect(0,0,screenX,screenY);
  
  if (currentscreen == 'map') {
    //draw map background
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,screenX,screenY);
  }
  
  if (currentscreen == 'level') {
    ui.map.style.display = 'none';
    ui.back.hidden = false;
    ui.level.style.display = 'flex';

    //draw level background
    ctx.fillStyle = currentlevel[0];
    ctx.fillRect(0,0,screenX,screenY);
    
    if (currentlevel != levels[0]) ui.next.hidden = false
  }
}

function loadLevel(level) {
  currentlevel = level;
  currentscreen = 'level';
  
  //spawn random num of enemies
  if (rand(0,3) > 0 && currentlevel[0] != 'town') {
    combat = true;
    for (let i = 0; i <= rand(0,2); i++) {currentenemies[i][0] = 1}
  }
  
  draw();
  
  debug.innerHTML = Object.keys(levels).find(k => levels[k] === currentlevel);
}

function back() {
  currentscene = 0;
  currentscreen = 'map';
  draw();
  ui.back.hidden = true;
  ui.next.hidden = true;
  ui.level.style.display = 'none';
  ui.map.style.display = 'block';
  console.log('back');
}

function next() {
  if (currentscene < currentlevel[1]) {
    currentscene++;
    loadLevel(currentlevel);
  }
  else {
    ui.mountain.disabled = false;
    currentscreen = 'map';
    draw();
    ui.back.hidden = true;
    ui.next.hidden = true;
    ui.level.style.display = 'none';
    ui.map.style.display = 'block';
  }
}

//LISTENERS
//left click-touch
canvas.addEventListener('click', e => {

})


//RUNTIME
initCanvas();
draw();