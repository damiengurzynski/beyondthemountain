//VARIABLES

//canvas
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let screenX = window.innerWidth;
let screenY = window.innerHeight;

//game
let levels = {lake: ['darkblue',5], forest: ['darkgreen',8], mountain: ['darkgray',1]};
let currentlevel = null;
let levelscene = 0;
let currentscreen = 'map';
let enemies = {e1: {hp: 0}, e2: {hp: 0}, e3: {hp: 0}};
let currentenemy = 'e1';
let players = {flute: {hp: 100, songs: [1,0,0]}, drum: {hp: 100, songs: [1,0,0]}, guitar: {hp: 100, songs: [1,0,0]}};
let currentplayer = null;
let songs = {flute: [['Slumber',[50,57,60,40]],['Love',[]],['Folly',[]]], guitar: [['Sunshine',[]],['Rain',[]],['Snow',[]]], drum: [['Envy',[]],['Anger',[]],['Ego',[]]]};
let currentsong = null;
let combat = false;
let menu = null;
let ui = {piano: document.getElementById('piano'), song: document.getElementById('song'), attacks: document.getElementById('attacks'), players: document.getElementById('players'), enemies: document.getElementById('enemies'), mountain: document.getElementById('mountain'), map: document.getElementById('map'), level: document.getElementById('level'), back: document.getElementById('back'), next: document.getElementById('next')};

//FUNCTIONS
function initCanvas() {
  canvas.width = screenX;
  canvas.height = screenY;
}

function rand(min,max) {
  let mi = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - mi + 1) + mi);
}

function loadImage(img)
{
  //take img code and converts it to canvas image
}

function draw() {
  ctx.clearRect(0,0,screenX,screenY);
  
  if (currentscreen == 'map') {
    //draw map background
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,screenX,screenY);
    ui.back.hidden = true;
    ui.next.hidden = true;
    ui.level.style.display = 'none';
    ui.map.style.display = 'block';
  }

  if (currentscreen == 'town') {
    //draw map background
    ctx.fillStyle = 'brown';
    ctx.fillRect(0,0,screenX,screenY);
    ui.back.hidden = false;
    ui.map.style.display = 'none';
  }
  
  if (currentscreen == 'level') {
    //hide map UI, show level UI
    ui.map.style.display = 'none';
    ui.back.hidden = true;
    ui.next.hidden = true;
    ui.level.style.display = 'flex';

    //draw level background
    ctx.fillStyle = currentlevel[0];
    ctx.fillRect(0,0,screenX,screenY);

    //check combat
    if (combat) {
      ui.enemies.style.display = 'flex';
      Array.from(ui.enemies.children).forEach(e => e.style.border = '1px solid black');
      ui.enemies.children[Object.keys(enemies).indexOf(currentenemy)].style.border = '2px solid red';
    }
    else {
      ui.enemies.style.display = 'none';
      ui.back.hidden = false;
      ui.next.hidden = false;
    }

    //check players state
    Object.entries(players).forEach((e,i) => {
      if (e[1].hp == 0) document.querySelectorAll('.player')[i].hidden = true;
      else document.querySelectorAll('.player')[i].hidden = false;
    })

    //check ennemies state
    Object.entries(enemies).forEach((e,i) => {
      if (e[1].hp == 0) document.querySelectorAll('.enemy')[i].hidden = true;
      else document.querySelectorAll('.enemy')[i].hidden = false;
    })

    //check menus
    if (menu == 'attacks') {
      let p = Object.keys(players).indexOf(currentplayer);
      for (let i = 0; i < 3; i++) {
        if (i != p) ui.players.children[i].hidden = true
      }
      ui.attacks.style.display = 'flex';
    }
    else {
      ui.players.children[1].hidden = false;
      ui.players.children[2].hidden = false;
      ui.attacks.style.display = 'none';
    }

    if (menu == 'song') {
      ui.players.style.display = 'none';
      ui.piano.style.display = 'flex';
      ui.song.style.display = 'flex';
    }
    else {
      ui.players.style.display = 'flex';
      ui.piano.style.display = 'none';
      ui.song.style.display = 'none';
    }
  }
}

function loadLevel(level) {
  currentlevel = level;
  currentscreen = 'level';
  
  //clear old enemies values
  Object.keys(enemies).forEach(k => {enemies[k].hp = 0});

  //spawn random num of enemies
  if (rand(0,3) > 0) {
    combat = true;
    const k = Object.keys(enemies);
    const r = rand(0,2);
    for (let i = 0; i < 3; i++) {
      if (i <= r) enemies[k[i]].hp = 100;
      else enemies[k[i]].hp = 0;
    }
  }
  else combat = false;
  draw();
}

function loadScreen(scr) {
  levelscene = 0;
  menu = null;
  currentscreen = scr;
  draw();
}

function next() {
  if (levelscene < currentlevel[1]) {
    levelscene++;
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

function selectPlayer(p) {
  currentplayer = p;
  menu = 'attacks';
  draw();
}

function exitPlayer() {
  currentplayer = null;
  menu = null;
  draw();
}

function selectEnemy(e) {
  if (menu != 'song') {
    currentenemy = e;
    draw();
  }
}

function playSong(s) {
  menu = 'song';
  console.log(currentplayer);
  draw();
}

//RUNTIME
initCanvas();
draw();