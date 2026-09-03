//VARIABLES

//canvas
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let screenX = window.innerWidth;
let screenY = window.innerHeight;

//game
let levels = {lake: ['darkblue',4,30], forest: ['darkgreen',6,15], mountain: ['darkgray',1,40]};
let currentlevel = null;
let levelscene = 0;
let currentscreen = 'map';

let enemies = {e1: {hp: 0, sleep: [false,0], mad: [false,0], weak: [false,0]}, e2: {hp: 0, sleep: [false,0], mad: [false,0], weak: [false,0]}, e3: {hp: 0,  sleep: [false,0], mad: [false,0], weak: [false,0]}};
let currentenemy = 'e1';
let players = {flute: {hp: 80, songs: [1,1,1]}, drum: {hp: 150, songs: [1,1,1]}, guitar: {hp: 100, songs: [1,1,1]}};
let currentplayer = null;

let songs = {flute: [
  ['Slumber',[0,0,0,0,98,110,98,110,130.81,164.81,220,0,164.81,0,130.81,164.81,196,0,164.81,0,130.81,164.81,174.61,0,164.81,130.81]],
  ['Love',[0,0,0,0,110,138.595,164.815,207.655,246.945,0,220,246.945,0,220,207.655,138.595,0,123.47,146.835,185,220,277.185,0,246.945,277.185,246.945,0,207.655,220]],
  ['Folly',[0,0,0,0,207.65,196,155.56,130.81,155.56,130.81,146.83,130.81,155.56,130.81,207.65,130.81,233.08,146.83,207.65,146.83,174.61,146.83,196,174.61,155.56,130.81]]
], 
guitar: [
  ['Sunshine',[]],
  ['Rain',[]],
  ['Snow',[0,0,0,0,138.59,174.61,207.65,110.00,138.59,164.81,92.50,116.54,123.47,110.00,138.59,155.56,123.47,155.56,233.08,138.59,174.61,261.63,110.00,138.59,207.65,92.50,116.54,174.61]]
],
drum: [
  ['Envy',[0,0,0,0,50,0,50,50,0,80,0,50,0,50,50,0,80,0]],
  ['Anger',[]],
  ['Ego',[]]
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
let ui = {middle: document.getElementById('middle'), sheet: document.querySelectorAll('.songcol'), piano: document.getElementById('piano'), song: document.getElementById('song'), attacks: document.getElementById('attacks'), players: document.getElementById('players'), enemies: document.getElementById('enemies'), mountain: document.getElementById('mountain'), map: document.getElementById('map'), level: document.getElementById('level'), back: document.getElementById('back'), next: document.getElementById('next')};

//FUNCTIONS
//initializing
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


//canvas - UI
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

    //combat screen
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
      const pe = ui.players.children[i];
      if (e[1].hp < 1) pe.hidden = true;
      else {
        pe.hidden = false;
        pe.innerHTML = e[1].hp;
      }
    })

    //check ennemies state
    Object.entries(enemies).forEach((e,i) => {
      const ee = ui.enemies.children[i];
      if (e[1].hp < 1) ee.hidden = true;
      else {
        ee.hidden = false;
        ee.innerHTML = e[1].hp;
      }
      if (e[1].sleep[0]) ee.style.backgroundColor = 'blue';
      else if (e[1].mad[0]) ee.style.backgroundColor = 'violet';
      else if (e[1].weak[0]) ee.style.backgroundColor = 'lightgreen';
      else ee.style.backgroundColor = 'lightgrey';
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
    setTimeout(() => {
      ui.mountain.disabled = false;
      currentscreen = 'map';
      draw();
      ui.back.hidden = true;
      ui.next.hidden = true;
      ui.level.style.display = 'none';
      ui.map.style.display = 'block';
    },2000)
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

  //conditional next step
  if (!livingEnemy) {notify('Battle won !'); next(); return false};
  if (!livingPlayer) {notify('Game Over'); setTimeout(() => window.location.reload(), 2000)};

  draw();
  return true;
}

//deal damages/effects to players/enemies
function playerAttack() {
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
    console.log('lol');
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
      p.hp -= strength;
      playerhit = true;
      notify('Player ' + playerKey + ' takes damage');
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