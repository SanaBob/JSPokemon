const canvas = document.getElementById('pokemon');
const context = canvas.getContext('2d');
let active = 0;
let UI = 0;

const eff = [
    ['', 'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electr', 'phych', 'ice', 'dragon', 'dark', 'fairy', 'light'],
    ['normal', 1, 1, 1, 1, 1, 1/2, 1, 0, 1/2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ['fighting', 2, 1, 1/2, 1/2, 1, 2, 1/2, 0, 2, 1, 1, 1, 1, 1/2, 2, 1, 2, 1/2, 1/2],
    ['flying', 1, 2, 1, 1, 1, 1/2, 2, 1, 1/2, 1, 1, 2, 1/2, 1, 1, 1, 1, 1, 1],
    ['poison', 1, 1, 1, 1/2, 1/2, 1/2, 1, 1/2, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
    ['ground', 1, 1, 0, 2, 1, 2, 1/2, 1, 2, 2, 1, 1/2, 2, 1, 1, 1, 1, 1, 2],
    ['rock', 1, 1/2, 2, 1, 1/2, 1, 2, 1, 1/2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
    ['bug', 1, 1/2, 1/2, 1/2, 1, 1, 1, 1/2, 1/2, 1/2, 1, 2, 1, 2, 1, 1, 2, 1/2, 1/2],
    ['ghost', 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1/2, 1, 0],
    ['steel', 1, 1, 1, 1, 1, 2, 1, 1, 1/2, 1/2, 1/2, 1, 1/2, 1, 2, 1, 1, 2, 2],
    ['fire', 1, 1, 1, 1, 1, 1/2, 2, 1, 2, 1/2, 1/2, 2, 1, 1, 2, 1/2, 1, 1, 1/2],
    ['water', 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1/2, 1/2, 1, 1, 1, 1/2, 1, 1, 1],
    ['grass', 1, 1, 1/2, 1/2, 2, 2, 1/2, 1, 1/2, 1/2, 2, 1/2, 1, 1, 1, 1/2, 1, 1, 2],
    ['electr', 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1/2, 1/2, 1, 1, 1/2, 1, 1, 1/2],
    ['phych', 1, 2, 1, 2, 1, 1, 1, 1, 1/2, 1, 1, 1, 1, 1/2, 1, 1, 0, 1, 1],
    ['ice', 1, 1, 2, 1, 2, 1, 1, 1, 1/2, 1/2, 1/2, 2, 1, 1, 1/2, 2, 1, 1, 1/2],
    ['dragon', 1, 1, 1, 1, 1, 1, 1, 1, 1/2, 1, 1, 1, 1, 1, 1, 2, 1, 0, 1],
    ['dark', 1, 1/2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1/2, 1/2, 0],
    ['fairy', 1, 2, 1, 1/2, 1, 1, 1, 1, 1/2, 1/2, 1, 1, 1, 1, 1, 2, 2, 1, 1],
    ['light', 1, 1, 1, 1, 1/2, 1, 2, 2, 1/2, 1/2, 1, 1/2, 1/2, 1, 2, 1, 2, 1, 1/2],
];

const drawImage = (pk, pos) => {
    const img = new Image();
    img.src = pk.img;
    context.drawImage(img, pos.x, pos.y, 100, 100);
    context.fillStyle = 'black';
    context.fillText(pk.name, pos.x, pos.y);
}

const drawRect = (rect, bool, text = ' ') => {
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.fillRect(rect.pos.x, rect.pos.y, rect.dia.width, rect.dia.height);
    context.strokeRect(rect.pos.x, rect.pos.y, rect.dia.width, rect.dia.height);
    context.fillStyle = 'black';
    if(bool){  
        context.fillText(player[active].moves[rect.no][0], rect.pos.x + rect.dia.width/8, rect.pos.y + rect.dia.height/1.8);
    } else {
        context.fillText(text, rect.pos.x + rect.dia.width/8, rect.pos.y + rect.dia.height/1.8);
    }
}

const drawHealth = (rect, pk) => {
    context.fillStyle = 'red';
    context.fillRect(rect.pos.x, rect.pos.y, rect.dia.width, rect.dia.height);
    context.fillStyle = 'green';
    context.strokeStyle = 'black';
    const hp = rect.dia.width * (1/(pk.maxHp/pk.hp));
    context.fillRect(rect.pos.x, rect.pos.y, hp, rect.dia.height);
    context.strokeRect(rect.pos.x, rect.pos.y, rect.dia.width, rect.dia.height);
}

const drawPokemon = (active) => {
    for(let i = 0; i < player.length; i++){
        if(i != active){
            drawImage(player[i], {x:10 + 100 * i, y: 300});
        }
    }
}

const atkTurn = (player, player2) => {
    if(player[active].speed >= player2.speed){
        return true;
    }
    return false;
}

let player1pos = {x:20, y:70};
let player2pos = {x:220, y:20};
let player = [
    findPokemon(localStorage.getItem('name1')),
    findPokemon(localStorage.getItem('name2')),
    findPokemon(localStorage.getItem('name3')),
    findPokemon(localStorage.getItem('name4')),
    findPokemon(localStorage.getItem('name5')),
    findPokemon(localStorage.getItem('name6')),
];
getHp(player);
let player2 = randomize();
let turn = atkTurn(player, player2);

class Rect {
    constructor(name, x, y, width, height) {
        this.pos = {x, y};
        this.dia = {width, height};
        this.no = name;
        this.pos.x = x;
        this.pos.y = y;
        this.dia.width = width;
        this.dia.height = height;
    }
}



const rect1 = new Rect(0, 10, 200, 100, 30);
const rect2 = new Rect(1, 150, 200, 100, 30);
const rect3 = new Rect(2, 10, 250, 100, 30);
const rect4 = new Rect(3, 150, 250, 100, 30); 
const hp1 = new Rect(6, player1pos.x, player1pos.y, 40, 10);
const hp2 = new Rect(7, player2pos.x, player2pos.y, 40, 10);
const back = new Rect(8, 300, 250, 100, 30);
/*
const fight = same as rect1, 2, 3, and 4
const bag = 
const pokemon =
const run =
*/
const battleUi = () => {
    drawRect(rect1, false, 'Fight');
    drawRect(rect2, false, 'Bag');
    drawRect(rect3, false, 'Pokemon');
    drawRect(rect4, false, 'Run');
}

const fightUi = () => {
    drawRect(rect1, true);
    drawRect(rect2, true);
    drawRect(rect3, true);
    drawRect(rect4, true);
    drawRect(back, false, 'Back');
}

const bagUi = () => {
    //bag code
    drawRect(back, false, 'Back');
}

const pokemonUi = () => {
    drawPokemon(active);
    drawRect(back, false, 'Back');
}

const chooseUi = (UI) => { 
    switch(UI){
        case 0:
            battleUi();
            break;
        case 1:
            fightUi();
            break;
        case 2:
            bagUi();
            break;
        case 3:
            pokemonUi();
            break;
    }
}

const draw = () => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    chooseUi(UI)
    drawImage(player[active], player1pos);
    drawImage(player2, player2pos);
    drawHealth(hp1, player[active]);
    drawHealth(hp2, player2);
}

const update = () => {
    draw();
    requestAnimationFrame(update);
}

const checkStatus = (player, player2) => {
    let finish = false;
    if(player[active].hp <= 0){
        player[active].hp = 0;
        console.log(`${player[active].name} has fainted`);
        finish = true;
    } else if (player2.hp <= 0){
        player2.hp = 0;
        console.log(`${player2.name} has fainted`);
        finish = true;
    }
    if (finish) {
        localStorage.setItem('hp1', player[0].hp);
        localStorage.setItem('hp2', player[1].hp);
        localStorage.setItem('hp3', player[2].hp);
        localStorage.setItem('hp4', player[3].hp);
        localStorage.setItem('hp5', player[4].hp);
        localStorage.setItem('hp6', player[5].hp);
        setTimeout(function(){ window.location.href = "index.html"; }, 1500);
    }
}

const getMousePos = (canvas, event) => {
    const  rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

const isInside = (pos, rect) => {
    return pos.x > rect.pos.x && pos.x < rect.pos.x + rect.dia.width && pos.y < rect.pos.y + rect.dia.height && pos.y > rect.pos.y;
}

const attack = (name, move, bool) => {
    console.log(`${name} used ${move[0]}!`);
    let crit = 1;
    let type = move[1];
    let power = move[2];
    const atkType = eff[0].indexOf(type);
    let defType = null;
    if (Math.floor(Math.random() * 15) === 0){
        crit = 1.5;
        console.log('It was a critical hit!')
     }
    if(bool){
        defType = eff[0].indexOf(player2.type);
        player2.hp -= power * eff[atkType][defType] * crit;
        turn = false;
    } else {
        defType = eff[0].indexOf(player[active].type);
        player[active].hp -= power * eff[atkType][defType] * crit;
        turn = true;
    }
    switch(eff[atkType][defType]){
        case 0:
            console.log("It didn't have an effect...");
            break;
        case 2:
            console.log("It's super effective!");
            break;
        case 1/2:
            console.log("It's not very effective...");
            break;
        default:
            break;
    }
    checkStatus(player, player2);
    atkAuto(player2, turn);
}

const atkAuto = (pk, bool) => {
    if(bool === false){
        const move = player2.moves[Math.floor(Math.random() * player2.moves.length)];
        attack(player2.name, move, turn);
    }
}

atkAuto(player2, turn); //1st turn

canvas.addEventListener('click', function(event) {
    let mousePos = getMousePos(canvas, event);
    switch(UI){
        case 0:
            if(isInside(mousePos, rect1)){
                UI = 1;
            } else if (isInside(mousePos, rect2)){
                UI = 2;
            } else if (isInside(mousePos, rect3)){
                UI = 3;
            } else if (isInside(mousePos, rect4)){
                console.log(`${player2.name} has fleed.`)
                setTimeout(function(){ window.location.href = "index.html"; }, 1500);
            }
            break;
        case 1:
            if(isInside(mousePos, rect1)){
                attack(player[active].name, player[active].moves[0], turn);
            } else if (isInside(mousePos, rect2)){
                attack(player[active].name, player[active].moves[1], turn);
            } else if (isInside(mousePos, rect3)){
                attack(player[active].name, player[active].moves[2], turn);
            } else if (isInside(mousePos, rect4)){
                attack(player[active].name, player[active].moves[3], turn);
            } else if (isInside(mousePos, back)){
                UI = 0;
            } 
            break;
        case 2:
            if (isInside(mousePos, back)){
                UI = 0;
            } 
            break;
        case 3:
            if (isInside(mousePos, back)){
                UI = 0;
            } 
            for(let i = 0; i < player.length; i++){
                if(i != active){
                    if(isInside(mousePos, {pos: {x:10 + 100 * i, y: 300}, dia: {width: 100, height:100}})){
                        active = i;
                        console.log(`You sent out ${player[active].name}`);
                        UI = 0;
                        turn = false;
                        atkAuto(player2, turn);
                    }
                }
            }
            break;
    } 
}, false)

update();