//VARIABLES

//canvas
let screenX = window.innerWidth;
let screenY = window.innerHeight;

let img_intro = '';
let img_map = '';
let img_town = '';
let img_lake = '';
let img_forest = '';
let img_mountain = '';
let img_end = '';

let img_flute = '';
let img_drum = '';
let img_guitar = '|000000:3j,2i,-7,0,-7,0,-6,2,-7,7,-6,7,-6,9,-4,6,-2,6,-2,6,-2,8,-1,7,-1,8,0,9,0,9,0,6,1,9,2,9,2,7,5,6,6,4,8,4,8,2,8,1,6,0,8,0,7,-1,8,-5,8,-5,7,-6,8,-7,8,-a,3,-6,6,-a,3,-8,2,-9,0,-a,0,-9,-1,-7,-3,-7,-4,-7,-5,-6,-6,-6,-8,-4,-8,-4,-6,-3,-6,-2,-6,-2,-7,-2,-6,0,-7,0,-6,4,-7,8,-4,6,-5,8,-4,9,-3,7,-3,a,-2,a,-1,6,-1,6,-1,c,0,6,0,b,0,a,2,7,3,7,4,8,5,7,7,1,9,0,a,-1,a,-3,9,-3,7,-3,7,-5,7,-5,9,-8,9,-a,7,-9,6,-8,3,-6,2,-7,0,-8,0,-9,-2,-9,-4,-9,-5,-9,-6,-9,-6,-7,-6,-5,-6,-4,-8,-3,-6,-2,-6,-2,-6,-2,-6,0,-8,0,-7,2,-6,2,-6,2,-4,6,-4,6,-2,6,-4,6,-3,6,-2,6,-2,6,-2,6,-1,8,-1,7,-2,6,1,6|000000:2q,3g,0,7,0,7,0,7,0,7,0,8,6,4,4,-6,4,-9,3,-6,0,-7,-1,-6,-6,-7,-6,-2,-4,7,-2,7,-1,6,-1,6,0,6,0,8,6,4,5,-6,4,-8,3,-6,1,-6,-1,-7,-4,-6,-6,-6|000000:4c,3f,0,6,0,7,0,6,0,7,1,7,1,6,6,0,4,-6,1,-6,3,-6,-1,-6,-3,-8,-5,-6,-6,3,-3,8,-2,7,-1,7,-1,6,1,6,6,3,7,0,6,-3,3,-6,0,-6,1,-8,0,-6,-3,-6,-6,-1|000000:3f,8o,-7,0,-c,0,-8,0,-6,2,-a,6,-b,c,-5,a,-3,9,1,7,7,7,8,3,8,0,8,-1,8,-2,9,-4,6,-3,8,-5,a,-7,8,-7,4,-6,0,-8,-5,-7,-8,-4,-7,-2,-8,-2,-7,0,-6,0,-8,2,-8,5,-9,6,-8,a,-6,8,-5,8,-4,9,-2,8,0,6,b,4,6,2,6,1,7,1,7,0,7,0,7,-1,6,-3,a,-6,6,-4,9,-8,7,-7,5,-7,2,-9,0,-9,-1,-7,-4,-7,-7,-6,-9,-1,-6,0,-a,0,-a,3,-8,4,-8,6,-8,a,-4,7,-4,6,-7,8,-2,8,-1,8,-1,9,0,6,8,2,9,0,a,1,9,0,9,-5,9,-8,8,-8,8,-7,8,-8,7,-8,5,-7,3,-6,-4,-8,-3,-6|000000:3z,8o,8,-6,9,-8,a,-6,8,-6,8,-5,7,-5,8,-5,8,-5,8,-5,7,-5,7,-5,7,-6|000000:47,8w,8,-5,8,-5,7,-4,8,-5,7,-4,6,-4,8,-4,6,-3,7,-5,6,-4,6,-5,6,-5,6,-6,4,-7,-5,-6,-4,-6,-3,-6,6,-4,7,-3,7,-3,6,-3,7,4,4,6,-2,6,-8,8,-6,4,-6,3,3,6,-1,-6|000000:4g,6d,-7,0,-9,0,-7,0,-8,0,-8,0,-8,3,-6,1,-8,3,-7,4,-6,3,-6,4,-7,5,-8,7,-7,5,-6,5,-4,6,-5,6,-5,6,-5,6,-5,6,-5,8,-3,6,-2,9,-1,7,0,6,2,6,3,6,7,7,7,5,6,2,8,1,7,0,8,-1,6,-2,5,-8,0,-7,1,6,0,7|000000:4g,6c,6,0,6,6,5,6,4,6,4,6,6,5,6,4,6,2|000000:6c,7k,6,6,4,7,-1,6,-6,2,-6,2,-6,0,-7,0,-7,-4,-5,-6,-2,-6,-6,-1,-4,7,-3,6,6,5,-5,-6,-6,-6,-1,6,6,5,6,3,6,0,6,1,6,1,7,1,6,1,7,0,7,-1,2,-6,0,-6,-6,-5|000000:20,9t,8,4,8,-1,6,-1,3,-8,1,-6,-5,-8,-4,8,2,6,7,1|000000:2v,9k|000000:2v,9k,-6,-3,-8,-4,-7,-1,-6,0,-6,1,-6,3,-6,4,-5,-6,0,-6,0,-8,0,-7,1,-6,1,-7,1,-6,5,-7,4,-6,6,-7,6,-6|000000:28,7j,0,9,0,8,0,9,0,6,0,6,0,7|000000:4i,78,0,8,0,7,0,6,0,6,0,6|000000:4h,7k,6,4,7,5|000000:2e,am,0,6,0,6,0,6,0,7,-1,8,-1,6,0,7,-1,6,-2,8,-2,9,-3,9,-2,6,-3,7,-1,6|000000:4i,8w,-1,c,0,8,0,a,0,c,0,d,0,d,0,d,0,d,0,b,0,9,0,8,1,8,1,7,2,8,2,8,2,7,b,-a,1,-m,0,-v,0,-w,-6,-v,-5,-h,-8,-j,-8,-f,-9,-c,-9,-b,-9,-8,-6,-7,1,7,a,d,5,7,6,8,5,b,8,k,5,f,6,n,4,f,3,g,2,b,1,7,1,6,-2,8,-3,9,-2,8,0,6,0,6|000000:4t,cx|000000:28,3s,0,-6,0,-7,-1,-7,-3,-8,-4,-b,-2,-9,-1,-8,-1,-9,-1,-7,0,-8,1,-7,2,-6,2,-7,1,-6,0,-6,0,-6,3,9,4,8,3,6,6,4,6,6,5,6,6,5,6,1,6,1,7,0,6,1,8,0,6,-1,6,-6,7,-7,4,-6,4,-7,3,-6,3,-7,4,-7,4,-6,3,6,0,a,0,6,0,a,0,6,0,a,0,8,1,6,2,7,1,7,0,7,1,8,1,7,1,7,0,7,0,6,0,6|000000:32,4p,0,6,4,6,6,0,6,-6,6,4,1,-6,5,-6,1,-8,1,-6|000000:2t,57,6,0,6,0,5,6,6,2,6,0,1,-7,7,4,6,1,5,-6,0,6,-6,5,-6,4,-6,2,-6,2,-9,0,-9,0,-6,-1,-5,-6,-3,-6,6,-5,6,0,6,0,6,3,7,1,6,0,6,0,7,-1,-3,6,-6,2,-6,1,-6,1,-7,1,-6,1,-7,0,-6,-2,-6,-2,-1,-6|000000:3a,6g,-7,1,-7,0,-6,2,-7,5,-a,6,-8,6,-7,5,-6,5,-6,5,-7,6,-5,6,-2,6,-5,8,-4,6,-5,8,-4,8,-3,8,-1,6,0,7,0,6,0,8,5,6,7,2,6,2,7,0,6,0,6,0,6,0,6,-2|000000:20,9l,-4,-7,-3,-6,-3,-6,-1,-9,-1,-6,0,-6,2,-8,3,-6,4,-7,5,-7,6,-5,5,7,-1,9,-1,a,0,a,0,7,0,6|000000:2z,6n,7,0,8,0,6,0,6,1,7,1,8,-1,9,-1,7,-2,7,0,6,1,6,3,4,6,3,8,3,6,6,2|000000:68,7l,2,8,1,6,-6,3,-7,4|000000:41,8m,8,-4,8,-6,6,-6,7,-5,7,-4,8,-5,6,-4,6,-6,7,-5,7,-5,8,-6,7,-5,6,-3,6,-4|000000:2a,aq,0,8,0,8,0,7,0,7,0,8,0,9,0,7,0,6,0,7,0,6,-2,6,-5,7,-5,8,1,-6,3,-6,2,-6,4,-9,1,-7,1,-7,1,-7,1,-6,0,-b,0,-7,0,-8,0,-8,-1,-8|000000:4x,cz,0,-7,0,-7,0,-8,0,-6,0,-6,0,-9,0,-7,0,-8,0,-a,0,-8,0,-8,-1,-9,-1,-9,-1,-6,-3,-a,-2,-7,-1,-8,0,-7,-1,-7,1,-6,0,-6|000000:4m,7y,0,-6|000000:45,8h,8,-6,8,-5,7,-5,8,-5,7,-4,6,-1,7,-2,7,-2,7,-2,6,-3,8,-4,7,-4,6,-4,-6,6,-9,9,-9,8,-6,5,-8,4,-6,4,-6,4,-7,4,-7,4,-7,3,-7,3,-6,2|000000:6e,6n,3,6,6,5,6,4,6,3,4,-6,2,-7,1,-6,0,-8,0,-6,-6,-1,-7,-1,-6,2,-6,7,-2,6,-1,6,3,6|000000:27,3d,0,-a,0,-6,0,-8,0,-9,0,-8,0,-7,0,-8,0,-7,-1,-8,0,-8,-2,-7,-2,-7,-1,-6,-2,-6,-1,6,1,7,1,6,2,9,0,6,-1,8,-3,a,-2,a,-1,6,-2,6,-1,a,0,8,5,-9,4,-9,1,-6,0,-a,0,-8,1,-7,0,-9,1,-9,0,-7,-2,-8,-1,-6,2,7,2,6,4,6,7,6,6,5,7,5,7,7,7,5,9,3,7,2,6,1,6,1,8,-1,7,-4,5,-7,3,-7,3,-7,1,-8,0,-9,1,-6,3,-6,3,a,1,9,1,b,0,9,0,7,0,6,0,9,0,8,0,7,-1,7,0,7,0,a,2,8,6,1,3,-7,4,-7,2,-7,3,-9,2,-6|000000:1y,2r,0,8,0,6,7,1,8,1,8,3|000000:2u,93,-3,8,-3,7,-1,-6,2,-9,3,-7,6,-4,7,0,6,2,4,6,4,6,0,7,-1,6,-6,2,-6,1,-6,1,-8,-3,-6,-4,0,-7,0,-7,6,-4,8,-3,8,-2,7,2,4,6,0,7,-3,8,-5,6,-6,4,-7,-3,-6,-4,0,-6,0,-6,2,-6,6,-2,7,0,6,7,2,6,-2,6,-7,4,-8,0,-8,-1,-6,-1,-1,-6';

let img_elake = '';
let img_eforest = '';
let img_emountain = '';

//game
let levels = {lake: ['darkblue',4,30,img_lake], forest: ['darkgreen',6,15,img_forest], mountain: ['darkgray',1,40,img_mountain]};
let currentlevel = null;
let levelscene = 0;
let currentscreen = 'intro';

let enemies = {e1: {hp: 0, sleep: [false,0], mad: [false,0], weak: [false,0]}, e2: {hp: 0, sleep: [false,0], mad: [false,0], weak: [false,0]}, e3: {hp: 0,  sleep: [false,0], mad: [false,0], weak: [false,0]}};
let currentenemy = 'e1';
let players = {flute: {hp: 80, songs: [1,1,1], sprite: img_flute}, drum: {hp: 150, songs: [1,1,1], sprite: img_drum}, guitar: {hp: 100, songs: [1,1,1], sprite: img_guitar}};
let currentplayer = null;
let turn = 'player';

let songs = {flute: [
  ['Slumber',[0,0,0,0,98,110,98,110,130.81,164.81,220,0,164.81,0,130.81,164.81,196,0,164.81,0,130.81,164.81,174.61,0,164.81,130.81]],
  ['Love',[0,0,0,0,110,138.595,164.815,207.655,246.945,0,220,246.945,0,220,207.655,138.595,0,123.47,146.835,185,220,277.185,0,246.945,277.185,246.945,0,207.655,220]],
  ['Folly',[0,0,0,0,207.65,196,155.56,130.81,155.56,130.81,146.83,130.81,155.56,130.81,207.65,130.81,233.08,146.83,207.65,146.83,174.61,146.83,196,174.61,155.56,130.81]]
], 
guitar: [
  ['Spring',[0,0,0,0,138.59,174.61,207.65]],
  ['Summer',[0,0,0,0,138.59,174.61,207.65]],
  ['Winter',[0,0,0,0,138.59,174.61,207.65,110.00,138.59,164.81,92.50,116.54,123.47,110.00,138.59,155.56,123.47,155.56,233.08,138.59,174.61,261.63,110.00,138.59,207.65,92.50,116.54,174.61]]
],
drum: [
  ['Envy',[0,0,0,0,50,0,50,50,0,80,0,50,0,50,50,0,80,0]],
  ['Anger',[0,0,0,0,50,0,50,50,0,80,0,50,0,50,50,0,80,0]],
  ['Ego',[0,0,0,0,50,0,50,50,0,80,0,50,0,50,50,0,80,0]]
]};
let currentsong = null;
let currentnote = null;
let currentsheet = [[],[],[],[]];
let playloop = null;
let a_ctx = new AudioContext();
const master = a_ctx.createGain();
const dry = a_ctx.createGain();
const wet = a_ctx.createGain();
const delay = a_ctx.createDelay(1.0);
const feedback = a_ctx.createGain();
const instruments = {flute: [0.8,0.9,0.99,0.6], drum: [0.02,0.2,0.99,0.2], guitar: [0.02, 0.35, 0.98, 0.5]};
let notehits = 0;
let targethits = 0;

let taunt = [false,0];
let targetplayer = null;
let enemyhit = false;
let playerhit = false;
let turntimer = 0;
let combat = false;
let menu = null;
let ui = {background: document.getElementById('background'), imgbuf: document.getElementById('imgbuf'), middle: document.getElementById('middle'), sheet: document.querySelectorAll('.songcol'), piano: document.getElementById('piano'), song: document.getElementById('song'), attacks: document.getElementById('attacks'), players: document.getElementById('players'), enemies: document.getElementById('enemies'), mountain: document.getElementById('mountain'), map: document.getElementById('map'), level: document.getElementById('level'), back: document.getElementById('back'), next: document.getElementById('next')};

//FUNCTIONS
//initializing
function initAudio() {
  dry.gain.value = 0.85;
  wet.gain.value = 0.10;

  delay.delayTime.value = 0.25;
  feedback.gain.value = 0.25;

  delay.connect(feedback);
  feedback.connect(delay);

  dry.connect(master);
  delay.connect(wet);
  wet.connect(master);

  master.gain.value = 1.5;
  master.connect(a_ctx.destination);
}

function rand(min,max) {
  let mi = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - mi + 1) + mi);
}


//canvas - UI
function loadImg(img) {
  let cvx = imgbuf.getContext('2d');
  cvx.clearRect(0,0,imgbuf.width,imgbuf.height);

  for (let z of img.split('|').filter(Boolean)) {
    let [c,p] = z.split(':');
    let a = p.split(',').map(x=>parseInt(x,36));
    let x = a[0];
    let y = a[1];

    cvx.strokeStyle = '#' + c;
    cvx.beginPath();
    cvx.moveTo(x,y);

    for (let i = 2; i < a.length; i += 2) cvx.lineTo(x+=a[i],y+=a[i+1]);
    cvx.stroke();
  }

  return imgbuf.toDataURL('image/png');
}

function draw() {
  if (currentscreen == 'intro') {
    //draw intro background
    let opa = 0;
    ui.background.style.backgroundColor = 'lightgreen';
    ui.background.style.opacity = opa;
    ui.background.style.backgroundImage = `url("${loadImg(img_intro)}")`;
    let fade = setInterval(() => {
      ui.background.style.opacity = opa;
      if (opa >= 1) clearInterval(fade);
      else opa += 0.1;
    },500);
    setTimeout(() => {currentscreen = 'map'; draw()},10000);
  }

  if (currentscreen == 'map') {
    //draw map background
    ui.background.style.backgroundColor = 'orange';
    ui.back.hidden = true;
    ui.next.hidden = true;
    ui.level.style.display = 'none';
    ui.map.style.display = 'block';
    ui.background.style.backgroundImage = `url("${loadImg(img_map)}")`;
  }

  if (currentscreen == 'town') {
    //draw map background
    ui.background.style.backgroundColor = 'brown';
    ui.back.hidden = false;
    ui.map.style.display = 'none';
    ui.background.style.backgroundImage = `url("${loadImg(img_town)}")`;
  }
  
  if (currentscreen == 'level') {
    //hide map UI, show level UI
    ui.map.style.display = 'none';
    ui.back.hidden = true;
    ui.next.hidden = true;
    ui.level.style.display = 'flex';

    //draw level background
    ui.background.style.backgroundColor = currentlevel[0];
    ui.background.style.backgroundImage = `url("${loadImg(currentlevel[3])}")`;

    //combat screen
    if (combat) {
      ui.enemies.style.display = 'flex';
      Array.from(ui.enemies.children).forEach(e => e.style.border = '2px solid black');
      ui.enemies.children[Object.keys(enemies).indexOf(currentenemy)].style.border = '2px solid red';
    }
    else {
      ui.enemies.style.display = 'none';
      ui.players.style.display = 'none';
      notify('Keep going or go back ?');
      ui.back.hidden = false;
      ui.next.hidden = false;
    }

    //show damage
    if (playerhit) {
      ui.players.children[Object.keys(players).indexOf(targetplayer)].style.backgroundColor = 'darkred';
      setTimeout(() => {ui.players.children[Object.keys(players).indexOf(targetplayer)].style.backgroundColor = 'grey'},2000);
      playerhit = false;
    }

    if (enemyhit) {
      ui.enemies.children[Object.keys(enemies).indexOf(currentenemy)].style.backgroundColor = 'darkred';
      setTimeout(() => {
        ui.enemies.children[Object.keys(enemies).indexOf(currentenemy)].style.backgroundColor = 'grey';
      },2000);
      enemyhit = false;
    }

    //check players state and draw
    Object.entries(players).forEach((e,i) => {
      const pe = ui.players.children[i];
      if (e[1].hp < 1) pe.hidden = true;
      else {
        pe.hidden = false;
        pe.innerHTML = e[1].hp;
        pe.style.backgroundImage = `url("${loadImg(e[1].sprite)}")`;
      }
    })

    //check ennemies state
    Object.entries(enemies).forEach((e,i) => {
      const ee = ui.enemies.children[i];
      if (e[1].hp < 1) ee.hidden = true;
      else {
        ee.hidden = false;
        ee.innerHTML = e[1].hp;
        if (currentlevel == levels.lake) ee.style.backgroundImage = `url("${loadImg(img_elake)}")`;
        if (currentlevel == levels.forest) ee.style.backgroundImage = `url("${loadImg(img_eforest)}")`;
        if (currentlevel == levels.mountain) ee.style.backgroundImage = `url("${loadImg(img_emountain)}")`;
      }
      if (e[1].sleep[0]) ee.style.backgroundColor = 'blue';
      else if (e[1].mad[0]) ee.style.backgroundColor = 'violet';
      else if (e[1].weak[0]) ee.style.backgroundColor = 'lightgreen';
      else {ee.style.backgroundColor = 'grey'; ee.style.borderStyle = 'outset'};
    })

    //display menus
    if (menu == 'attacks') {
      let p = Object.keys(players).indexOf(currentplayer);
      for (let i = 0; i < 3; i++) {
        if (i != p) ui.players.children[i].hidden = true;
      }
      ui.attacks.style.display = 'flex';
      players[currentplayer].songs.forEach((e,i) => {
        if (e) {
          ui.attacks.children[i].innerHTML = songs[currentplayer][i][0];
          ui.attacks.children[i].disabled = false;
        }
        else ui.attacks.children[i].innerHTML = 'empty';
      });
    }
    else {
      ui.attacks.style.display = 'none';

      Object.entries(players).forEach(([key, player], i) => {
        ui.players.children[i].hidden = player.hp < 1;
      });
    }

    if (menu == 'song') {
      ui.players.style.display = 'none';
      ui.piano.style.display = 'flex';
      ui.song.style.display = 'flex';
      Array.from(ui.sheet[0].children).forEach(e => e.style.backgroundColor = 'darkred');

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (currentsheet[i][j]) ui.sheet[j].children[i].innerHTML = '◆';
          else ui.sheet[j].children[i].innerHTML = '&#8193';
        }
      }
    }
    else {
      if (combat) ui.players.style.display = 'flex';
      ui.piano.style.display = 'none';
      ui.song.style.display = 'none';
    }
  }

  if (currentscreen == 'end') {
    //draw end background
    let opa = 0;
    ui.background.style.backgroundColor = 'lightblue';
    ui.background.style.opacity = opa;
    ui.background.style.backgroundImage = `url("${loadImg(img_end)}")`;
    let fade = setInterval(() => {
      ui.background.style.opacity = opa;
      if (opa >= 1) clearInterval(fade);
      else opa += 0.1;
    },500);
  }
}

function notify(t) {
  ui.middle.innerHTML = t;
  setTimeout(() => ui.middle.innerHTML = '', 2000);
}

//game
function loadLevel(level) {
  currentlevel = level;
  currentscreen = 'level';
  
  //clear old enemies values
  Object.keys(enemies).forEach(k => {enemies[k].hp = 0});
  Object.keys(enemies).forEach(k => {enemies[k].sleep = [false,0]});
  Object.keys(enemies).forEach(k => {enemies[k].mad = [false,0]});
  Object.keys(enemies).forEach(k => {enemies[k].weak = [false,0]});
  taunt = [false,0];

  //spawn random num of enemies unless lvl Mountain
  if (currentlevel == levels.mountain) {
    combat = true;
    enemies.e1.hp = 300;
  }
  else {
    if (rand(0,4) > 0) {
      combat = true;
      const k = Object.keys(enemies);
      const r = rand(0,2);
      for (let i = 0; i < 3; i++) {
        if (i <= r) enemies[k[i]].hp = 100;
        else enemies[k[i]].hp = 0;
      }
    }
    else combat = false;
  }

  draw();
}

function loadScreen(scr) {
  levelscene = 0;
  menu = null;
  currentscreen = scr;
  draw();
}

//level
function next() {
  if (levelscene < currentlevel[1] - 1) {
    notify('Going forward');
    setTimeout(() => {
      levelscene++;
      loadLevel(currentlevel);
    },2000)
  }
  else {
    notify('Level cleared');
    if (currentlevel == levels.mountain) currentscreen = 'end';
    else {
      setTimeout(() => {
        ui.mountain.disabled = false;
        currentscreen = 'map';
        ui.map.style.display = 'block';
      },2000)
    }
    draw();
    ui.back.hidden = true;
    ui.next.hidden = true;
    ui.level.style.display = 'none';
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
  ui.attacks.children[0] = 'empty';
  ui.attacks.children[1] = 'empty';
  ui.attacks.children[2] = 'empty';
  ui.attacks.children[0].disabled = true;
  ui.attacks.children[1].disabled = true;
  ui.attacks.children[2].disabled = true;
  draw();
}

function selectEnemy(e) {
  if (menu != 'song') {
    currentenemy = e;
    draw();
  }
}

function checkStates() {
  //check players/enemies left
  const livingEnemy = Object.entries(enemies).find(([key, enemy]) => enemy.hp > 0);
  const livingPlayer = Object.entries(players).find(([key, player]) => player.hp > 0);
  
  //default to player/enemy[0] select
  if (livingEnemy) currentenemy = livingEnemy[0];
  if (livingPlayer) currentplayer = livingPlayer[0];

  if (turn == 'enemy') {
    //check effects timers
    Object.values(enemies).forEach(e => {
      if (e.sleep[1] == 0) e.sleep[0] = false;
      else (e.sleep[1]--);
      if (e.mad[1] == 0) e.mad[0] = false;
      else (e.mad[1]--);
      if (e.weak[1] == 0) e.weak[0] = false;
      else (e.weak[1]--);
    });
    if (taunt[1] == 0 || players.drum.hp < 1) taunt[0] = false;
    else (taunt[1]--);
  }

  //conditional next step
  if (!livingEnemy) {notify('Battle won !'); next(); return false};
  if (!livingPlayer) {notify('Game Over'); setTimeout(() => window.location.reload(), 2000)};

  draw();
  return true;
}

//deal damages/effects to players/enemies
function playerAttack() {
  turn = 'player';
  let completion = Math.round((notehits/targethits)*100);
  let ce = enemies[currentenemy];
  let cp = players[currentplayer];
  let cs = currentsong[0];

  if (completion > 50) {
    if (cs == 'Slumber') {
      ce.sleep[0] = true;
      if (completion > 80 && completion < 100) ce.sleep[1] = 2;
      else if (completion == 100) ce.sleep[1] = 4;
      else ce.sleep[1] = 1;
      notify('Enemy falls asleep for ' + ce.sleep[1] + ' turns');
    }

    else if (cs == 'Love') {
      if (completion > 80  && completion < 100) {
        cp.hp += 25;
        notify('Player ' + currentplayer + ' gains 25 HP');
      }
      else if (completion == 100) {
        Object.keys(players).forEach(k => {players[k].hp += 15});
        notify('All players gain 15 HP');
      }
      else {
        cp.hp += 15;
        notify('Player ' + currentplayer + ' gains 15 HP');
      }
    }

    else if (cs == 'Folly') {
      ce.mad[0] = true;
      if (completion > 80  && completion < 100) ce.mad[1] = 2;
      else if (completion == 100) ce.mad[1] = 4;
      else ce.mad[1] = 1;
      notify('Enemy goes mad for ' + ce.mad[1] + ' turns');
    }

    else if (cs == 'Envy') {
      taunt[0] = true;
      if (completion > 80  && completion < 100) taunt[1] = 2;
      else if (completion == 100) taunt[1] = 4;
      else taunt[1] = 1;
      notify('Drum taunts enemies for ' + taunt[1] + ' turns');
    }

    else if (cs == 'Anger') {
      if (completion > 80  && completion < 100) {
        Object.keys(enemies).forEach(k => {enemies[k].hp -= 10});
        notify('All enemies loose 10 HP');
      }
      else if (completion == 100) {
        Object.keys(enemies).forEach(k => {enemies[k].hp -= 15});
        notify('All enemies loose 15 HP');
      }
      else {
        Object.keys(enemies).forEach(k => {enemies[k].hp -= 5});
        notify('All enemies loose 5 HP');
      }
    }

    else if (cs == 'Ego') {
      if (completion > 80  && completion < 100) {
        ce.hp -= 30;
        players.drum.hp -= 30;
        notify('Enemy & Drum loose 30 HP');
      }
      else if (completion == 100) {
        ce.hp -= 40;
        players.drum.hp -= 40;
        notify('Enemy & Drum loose 40 HP');
      }
      else {
        ce.hp -= 20;
        players.drum.hp -= 20;
        notify('Enemy & Drum loose 20 HP');
      }
      enemyhit = true;
      playerhit = true;
    }

    else if (cs == 'Spring') {
      if (completion > 80  && completion < 100) {
        ce.hp -= 15;
        notify('Enemy looses 15 HP');
      }
      else if (completion == 100) {
        ce.hp -= 25;
        notify('Enemy looses 25 HP');
      }
      else {
        ce.hp -= 10;
        notify('Enemy looses 10 HP');
      }
      enemyhit = true;
    }

    else if (cs == 'Summer') {
      let ce2 = Object.entries(enemies).findLast(([key, enemy]) => enemy.hp > 0)[1];

      if (completion > 80  && completion < 100) {
        ce.hp -= 15;
        ce2.hp -= 10;
        notify('Enemy looses 15 HP, ricochet hits 10 HP');
      }
      else if (completion == 100) {
        ce.hp -= 25;
        ce2.hp -= 15;
        notify('Enemy looses 25 HP, ricochet hits 15 HP');
      }
      else {
        ce.hp -= 10;
        ce2.hp -= 5;
        notify('Enemy looses 10 HP, ricochet hits 5 HP');
      }
      enemyhit = true;
    }

    else if (cs == 'Winter') {
      ce.weak[0] = true;
      if (completion > 80  && completion < 100) ce.weak[1] = 2;
      else if (completion == 100) ce.weak[1] = 4;
      else ce.weak[1] = 1;
      notify('Enemy gets weak for ' + ce.weak[1] + ' turns');
    }
  }
  else notify('Song has failed');

  targethits = 0;
  notehits = 0;

  draw();

  setTimeout(() => {
    // Enemy died
    if (ce.hp <= 0) currentenemy = 'e1';

    if (checkStates()) enemyAttack();
  }, 2000);
}

function enemyAttack() {
  turn = 'enemy';
  const strength = currentlevel[2];

  const availableEnemies = Object.entries(enemies)
    .filter(([key, enemy]) =>
      enemy.hp > 0 &&
      enemy.sleep[0] == false
    );

  // No enemy can attack
  if (availableEnemies.length == 0) return;

  // Random living/awake enemy
  const [enemyKey, e] = availableEnemies[rand(0, availableEnemies.length - 1)];

  // Random living player
  const availablePlayers = Object.entries(players)
    .filter(([key, player]) => player.hp > 0);

  if (availablePlayers.length === 0) return;

  let playerKey;
  let p;
  if (taunt[0]) {
    playerKey = 'drum';
    p = players.drum;
  }
  else {[playerKey, p] = availablePlayers[rand(0, availablePlayers.length - 1)]};
  
  targetplayer = playerKey;

  const rh = rand(0,4);

  if (rh > 0) {
    if (e.mad[0]) {
      let re = availableEnemies[rand(0, availableEnemies.length - 1)];
      re[1].hp -= strength;
      notify('Mad enemy strikes ' + re[0]);
    }
    else {
      if (e.weak[0]) {
        p.hp -= strength / 2;
       notify('Player ' + playerKey + ' looses ' + (strength / 2) + ' HP');
      }
      else {
        p.hp -= strength;
        notify('Player ' + playerKey + ' looses ' + strength + ' HP');
      }
      playerhit = true;
    }
  }
  else notify('Enemy has missed');

  draw();

  setTimeout(() => {
    checkStates();
  }, 2000);
}

//song playing
function loadSong(s) {
  currentsong = songs[currentplayer][s];
  menu = 'song';

  currentsong[1].forEach(e => {
    const row = Array(currentsheet.length).fill(0);
    if (e !== 0) {
      let r = rand(0,3);
      row[r] = e;
      targethits++;
    }
    currentsheet.forEach((f,j) => f.push(row[j]));
  })

  draw();

  let note = 0;
  playloop = setInterval(() => {
    if (currentsheet[0].length < 2) {
      clearInterval(playloop);
      currentsheet = [[],[],[],[]];
      playerAttack();
      menu = null;
      draw();
    }
    else {
      playNote(instruments[currentplayer],currentsong[1][note]);
      if (note > 0) currentsheet.forEach(e => e.shift());
      draw();
      note++;
    }
  },500)
}

function playKey(k) {
  if (currentsheet[k]?.[0] !== 0) {
    notehits++;
    Array.from(ui.sheet[0].children)[k].style.backgroundColor = 'red';
  }
}

function playNote(inst, note) {
    if (note === 0) return;

    const node = a_ctx.createGain();
    node.connect(dry);
    node.connect(delay);

    const now = a_ctx.currentTime;

    const o1 = a_ctx.createOscillator();
    const g1 = a_ctx.createGain();

    o1.type = "sine";
    o1.frequency.value = note;
    g1.gain.value = 0.55;

    const o2 = a_ctx.createOscillator();
    const g2 = a_ctx.createGain();

    o2.type = "sine";
    o2.frequency.value = note * 2;
    g2.gain.value = 0.30;

    o1.connect(g1);
    o2.connect(g2);

    g1.connect(node);
    g2.connect(node);

    const duration = inst[3];

    node.gain.setValueAtTime(0, now);
    node.gain.linearRampToValueAtTime(1, now + duration * inst[0]);
    node.gain.setValueAtTime(1, now + duration * inst[1]);
    node.gain.linearRampToValueAtTime(0, now + duration * inst[2]);

    o1.start(now);
    o2.start(now);

    o1.stop(now + duration);
    o2.stop(now + duration);
}



//LISTENERS
document.addEventListener('keydown', e => {
  if (menu == 'song') {
    if (e.key == 'ArrowUp') {playKey(0), piano.children[0].disabled = true};
    if (e.key == 'ArrowDown') {playKey(1), piano.children[1].disabled = true};
    if (e.key == 'ArrowLeft') {playKey(2), piano.children[2].disabled = true};
    if (e.key == 'ArrowRight') {playKey(3), piano.children[3].disabled = true};
  }
  setTimeout(() => {Array.from(piano.children).forEach(e => e.disabled = false)},1000)
})

//RUNTIME
initAudio();
draw();