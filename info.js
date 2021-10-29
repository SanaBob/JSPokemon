class Pokemon {
    constructor(name, type, img, maxHp, speed, moves) {
        this.name = name;
        this.type = type;
        this.img = img;
        this.hp = maxHp;
        this.maxHp = maxHp
        this.speed = speed;
        this.moves = moves;
    }
}

const randomize = () => {
    let p = Math.floor(Math.random() * pkList.length);
    return new Pokemon(pkList[p][0],pkList[p][1],pkList[p][2],pkList[p][3],pkList[p][4], pkList[p][5]);
}

const findPokemon = (name) => {
    for(let p = 0; p < pkList.length; p++){
        if(pkList[p][0] === name){
            return new Pokemon(pkList[p][0],pkList[p][1],pkList[p][2],pkList[p][3],pkList[p][4], pkList[p][5]);
        }
    }
}

const getHp = (player) => {
    player[0].hp = parseInt(localStorage.getItem('hp1'));
    player[1].hp = parseInt(localStorage.getItem('hp2'));
    player[2].hp = parseInt(localStorage.getItem('hp3'));
    player[3].hp = parseInt(localStorage.getItem('hp4'));
    player[4].hp = parseInt(localStorage.getItem('hp5'));
    player[5].hp = parseInt(localStorage.getItem('hp6'));
}