const canvas = document.getElementById('pokemon');
const context = canvas.getContext('2d');
context.scale(40, 40);
let sumTime = 0;
let lastTime = 0;
const healer = {
    pos: {x: 1, y: 5},
}
const player = {
    pos: {x: parseInt(localStorage.getItem('x')), y: parseInt(localStorage.getItem('y'))},
    pokemon: [
        findPokemon(localStorage.getItem('name1')),
        findPokemon(localStorage.getItem('name2')),
        findPokemon(localStorage.getItem('name3')),
        findPokemon(localStorage.getItem('name4')),
        findPokemon(localStorage.getItem('name5')),
        findPokemon(localStorage.getItem('name6')),
    ],
    dir: {x: parseInt(localStorage.getItem('dirX')), y: parseInt(localStorage.getItem('dirY'))},
    walk: true,
    walkSwitch: false,
    img: [
        ["./data/down.png", "./data/down1.png", "./data/down2.png"],
        ["./data/up.png", "./data/up1.png", "./data/up2.png"],
        ["./data/right.png", "./data/right1.png", "./data/right2.png"],
        ["./data/left.png", "./data/left1.png", "./data/left2.png"],   
    ]
}
getHp(player.pokemon);
const grass = {
    pos: {x: 0, y: 0},
    width: 9,
    height: 3,
}
const resetBox = {
    pos: {x: 1, y: 8},
}

const createMatrix = (w, h) => {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    for(let i = grass.pos.x; i < grass.width; i++){
        for(let j = grass.pos.y; j < grass.height; j++){
            matrix[j][i] = 1;
        }
    } 
    matrix[healer.pos.y][healer.pos.x] = 2;
    matrix[resetBox.pos.y][resetBox.pos.x] = 3;
    return matrix;
}

const arena = createMatrix(32, 18);

const ableWalk = (sumTime) => {
    if (sumTime > 100){
        player.walk = true;
    }   else {
        player.walk = false;
    }
}

const update = (time = 0) => {
    sumTime += time - lastTime;
    lastTime = time;
    ableWalk(sumTime);
    draw();
    requestAnimationFrame(update);
}

const checkGrass = (player, arena) => {
    if(arena[player.pos.y][player.pos.x] === 1){
         if (Math.floor(Math.random() * 15) === 0){
             transferData();
            window.location.href = "battle.html";
         }
    }
}

const transferData = () => {
    localStorage.setItem('x', player.pos.x);
    localStorage.setItem('y', player.pos.y);
    localStorage.setItem('dirX', player.dir.x);
    localStorage.setItem('dirY', player.dir.y);
    localStorage.setItem('name1', player.pokemon[0].name);
    localStorage.setItem('name2', player.pokemon[1].name);
    localStorage.setItem('name3', player.pokemon[2].name);
    localStorage.setItem('name4', player.pokemon[3].name);
    localStorage.setItem('name5', player.pokemon[4].name);
    localStorage.setItem('name6', player.pokemon[5].name);
    localStorage.setItem('hp1', player.pokemon[0].hp);
    localStorage.setItem('hp2', player.pokemon[1].hp);
    localStorage.setItem('hp3', player.pokemon[2].hp);
    localStorage.setItem('hp4', player.pokemon[3].hp);
    localStorage.setItem('hp5', player.pokemon[4].hp);
    localStorage.setItem('hp6', player.pokemon[5].hp);
}

const checkBlock = (pos) => {
    if (arena[pos.y][pos.x] >= 2){
        return arena[pos.y][pos.x];
    }
    return 0;
}

const draw = () => {
    drawBackground() // not done
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawGrass(grass);
    drawHealer(healer.pos);
    drawResetBox(resetBox.pos);
    drawPlayer(player);
}

const drawBackground = () => {
    const img = new Image();
    img.src = "https://cdn2.bulbagarden.net/upload/9/98/Hoenn_Route_101_ORAS.png";
    context.drawImage(img, player.pos.x - 36, 0, 36, 41) //fix
}

const drawPlayer = (player) =>{
    const img = new Image();
    let temp = null;
    if(player.dir.y === 1){
        temp = player.img[0];
    } else if (player.dir.y === -1){
        temp = player.img[1];
    } else if (player.dir.x === 1){
        temp = player.img[2];
    } else if (player.dir.x === -1){
        temp = player.img[3];
    }
    if(player.walk && sumTime > 100){
        img.src = temp[0];
    } else if(!player.walk && player.walkSwitch){
        img.src = temp[1];
    } else{
        img.src = temp[2];
    }
    context.drawImage(img, player.pos.x, player.pos.y, 1, 1)
}

const drawGrass = (grass) => {
    context.fillStyle = 'green';
    for(let i = grass.pos.x; i < grass.width; i++){
        for(let j = grass.pos.y; j < grass.height; j++){
            context.fillRect(i, j, 1, 1);
        }
    }  
}

const drawHealer = (pos) => {
    context.fillStyle = 'blue';
    context.fillRect(pos.x, pos.y, 1, 1);
}

const drawResetBox = (pos) => {
    context.fillStyle = 'purple';
    context.fillRect(pos.x, pos.y, 1, 1);
}

const playerMove = (bool, value) => {
    if(player.walk){
        if(bool){
            player.dir.x = 0;
            player.dir.y = value;
            player.pos.y += value;
            if(player.pos.y >= 18 || player.pos.y < 0 || checkBlock(player.pos)) {
                player.pos.y -= value;
            }
        } else {
            player.dir.y = 0;
            player.dir.x = value;
            player.pos.x += value;
            if(player.pos.x >= 32 || player.pos.x < 0 || checkBlock(player.pos)) {
                player.pos.x -= value;
            }
        }
        player.walkSwitch = !player.walkSwitch;
        sumTime = 0;
        checkGrass(player, arena);
    } else if (bool) {
        player.dir.x = 0;
        player.dir.y = value;
    } else {
        player.dir.y = 0;
        player.dir.x = value;
    }
}

const interact = () => {
    const tempPos = {x: player.pos.x + player.dir.x, y: player.pos.y + player.dir.y}
    if(checkBlock(tempPos) === 2){
        heal()
    } else if (checkBlock(tempPos) === 3){
        reset();
    }
}

const heal = () => {
    for(const pokemon of player.pokemon){
        pokemon.hp = pokemon.maxHp;
    }
    console.log('Your pokemon have been healed!');
}

const reset = () => {
    for(let i = 0; i < player.pokemon.length; i++){
        player.pokemon[i] = randomize();
    }
    console.log('You have randomized your pokemon!')
}

document.addEventListener('keydown', event => {
    if(event.keyCode === 87){
        playerMove(1, -1);
    } else if(event.keyCode === 83){
        playerMove(1, 1);
    } else if(event.keyCode === 65){
        playerMove(0, -1);
    } else if(event.keyCode === 68){
        playerMove(0, 1);
    } else if(event.keyCode === 70){
        interact();
    }
})

update();