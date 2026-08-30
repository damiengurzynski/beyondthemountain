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

let enemies = {e1: {hp: 0, sleep: false, mad: false}, e2: {hp: 0, sleep: false, mad: false}, e3: {hp: 0,  sleep: false, mad: false}};
let currentenemy = 'e1';
let players = {flute: {hp: 100, songs: [1,1,1]}, drum: {hp: 100, songs: [1,1,0]}, guitar: {hp: 100, songs: [1,1,1]}};
let currentplayer = null;

let songs = {flute: [['Slumber',[0,0,0,0,98,110,98,110,130.81,164.81,220,0,164.81,0,130.81,164.81,196,0,164.81,0,130.81,164.81,174.61,0,164.81,130.81]],['Love',[0,0,0,0,110,138.595,164.815,207.655,246.945,0,220,246.945,0,220,207.655,138.595,0,123.47,146.835,185,220,277.185,0,246.945,277.185,246.945,0,207.655,220]],['Folly',[0,0,0,0,207.65,196,155.56,130.81,155.56,130.81,146.83,130.81,155.56,130.81,207.65,130.81,233.08,146.83,207.65,146.83,174.61,146.83,196,174.61,155.56,130.81]]], guitar: [['Sunshine',[]],['Rain',[]],['Snow',[]]], drum: [['Envy',[]],['Anger',[]],['Ego',[]]]};
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

let targetplayer = null;
let enemyhit = false;
let playerhit = false;
let turntimer = 0;
let combat = false;
let menu = null;
let ui = {sheet: document.querySelectorAll('.songcol'), piano: document.getElementById('piano'), song: document.getElementById('song'), attacks: document.getElementById('attacks'), players: document.getElementById('players'), enemies: document.getElementById('enemies'), mountain: document.getElementById('mountain'), map: document.getElementById('map'), level: document.getElementById('level'), back: document.getElementById('back'), next: document.getElementById('next')};

//FUNCTIONS
function initCanvas() {
  canvas.width = screenX;
  canvas.height = screenY;
}

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

  master.gain.value = 1;
  master.connect(a_ctx.destination);
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
    ctx.fillStyle = 'orange';
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

    //show damage
    if (playerhit) {
      ui.players.children[Object.keys(players).indexOf(targetplayer)].style.backgroundColor = 'red';
      setTimeout(() => {ui.players.children[Object.keys(players).indexOf(targetplayer)].style.backgroundColor = 'lightgrey'},2000);
      playerhit = false;
    }

    if (enemyhit) {
      ui.enemies.children[Object.keys(enemies).indexOf(currentenemy)].style.backgroundColor = 'red';
      setTimeout(() => {
        ui.enemies.children[Object.keys(enemies).indexOf(currentenemy)].style.backgroundColor = 'lightgrey';
      },2000);
      enemyhit = false;
    }

    //check players state
    Object.entries(players).forEach((e,i) => {
      if (e[1].hp < 1) document.querySelectorAll('.player')[i].hidden = true;
      else {
        document.querySelectorAll('.player')[i].hidden = false;
        document.querySelectorAll('.player')[i].innerHTML = e[1].hp;
      }
    })

    //check ennemies state
    Object.entries(enemies).forEach((e,i) => {
      if (e[1].hp < 1) document.querySelectorAll('.enemy')[i].hidden = true;
      else {
        document.querySelectorAll('.enemy')[i].hidden = false;
        document.querySelectorAll('.enemy')[i].innerHTML = e[1].hp;
      }
    })

    //check menus
    if (menu == 'attacks') {
      let p = Object.keys(players).indexOf(currentplayer);
      for (let i = 0; i < 3; i++) {
        if (i != p) ui.players.children[i].hidden = true
      }
      ui.attacks.style.display = 'flex';
      players[currentplayer].songs.forEach((e,i) => {
        if (e) {
          ui.attacks.children[i].innerHTML = songs[currentplayer][i][0];
          ui.attacks.children[i].disabled = false;
        }
      });
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
      Array.from(ui.sheet[0].children).forEach(e => e.style.backgroundColor = 'red');

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (currentsheet[i][j]) ui.sheet[j].children[i].innerHTML = '♩';
          else ui.sheet[j].children[i].innerHTML = '&#8193';
        }
      }
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

function playerAttack() {
  let completion = Math.round((notehits/targethits)*100);

  if (currentsong[0] === 'Slumber' && completion > 50) {
    //enemies[currentenemy].sleep = true;

    if (completion > 80) {
      enemies[currentenemy].hp -= 35;
      //turntimer = 2;
    }
    else {
      enemies[currentenemy].hp -= 15;
      //turntimer = 1;
    }

    enemyhit = true;

    console.log('Dealing damage to enemy:', currentenemy);
  }

  targethits = 0;
  notehits = 0;

  draw();

  setTimeout(() => {
    // Enemy died
    if (enemies[currentenemy].hp <= 0) {
      currentenemy = 'e1';
    }

    // All players/enemies died
    if (!checkStates()) {
      return;
    }

    draw();
    enemyAttack();

  }, 2000);
}

function checkStates() {
  let pl = 0;
  let el = 0;

  const livingEnemy = Object.entries(enemies).find(([key, enemy]) => enemy.hp > 0);

  if (livingEnemy) currentenemy = livingEnemy[0];

  Object.values(players).forEach(p => {
    if (p.hp > 0) pl++;
  });

  Object.values(enemies).forEach(e => {
    if (e.hp > 0) el++;
  });

  if (el === 0) {
    menu = null;
    currentlevel = null;
    levelscene = 0;
    currentscreen = 'map';
    return false;
  }

  if (pl === 0) {
    console.log('gameover');
    return false;
  }

  draw();
  return true;
}

function enemyAttack() {
  const re = rand(0,2);
  const rp = rand(0,2);
  let e = Object.entries(enemies)[re][1];
  let p = Object.entries(players)[rp][1];
  targetplayer = Object.entries(players)[rp][0];

  if (checkStates()) {
    if (e.hp > 0 && e.sleep == false) {
      if (p.hp > 0) {
        let rh = rand(0,4)
        if (rh > 1) {
          p.hp -= 15;
          playerhit = true;
          console.log('Dealing damage to player: ' + currentplayer);
        }
        else console.log('Enemy has missed');
      }
    }
    else enemyAttack();
  }
  draw();
}

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
    Array.from(ui.sheet[0].children)[k].style.backgroundColor = 'green';
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
    if (e.key == 'ArrowLeft') playKey(0);
    if (e.key == 'ArrowRight') playKey(1);
    if (e.key == 'ArrowUp') playKey(2);
    if (e.key == 'ArrowDown') playKey(3);
  }
})

//RUNTIME
initCanvas();
initAudio();
draw();