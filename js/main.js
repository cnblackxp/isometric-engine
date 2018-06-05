import { randomColor, randomColorObject, color, shade, bright } from "./color.js";

const canvas = document.querySelector('canvas[iso-background]');
const ctx = canvas.getContext('2d');

const canvasPlayer = document.querySelector('canvas[iso-player]');
const ctxPlayer = canvasPlayer.getContext('2d');

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasPlayer.width = window.innerWidth;
    canvasPlayer.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);


let keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);


const mouse = {
    x: 0,
    y: 0,

    actualX() {
        return this.x - canvasX;
    },
    actualY() {
        return this.y - canvasY;
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // console.log(mouse);
})


const tile_width = 20;
const tile_height = tile_width/2;





const drawTile = (x, y, c) => {
    ctx.save();
    //the new tile position is to move tile_width/2 on the x and tile_height/2 on the y
    ctx.translate(
        (x-y) * tile_width/2,
        //this wont have any effect if it's zer0 
        (y+x) * tile_height/2
    );
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tile_width/2, tile_height/2);
    ctx.lineTo(0, tile_height);
    ctx.lineTo(-tile_width/2, tile_height/2);
    ctx.closePath();
    ctx.fillStyle = color(c);
    ctx.fill();


    ctx.restore();
}
const drawBlock = (x, y, z, c) => {

    let top = '#eee',
        right = '#ccc',
        left = '#999';


    if (c) {
        // console.log(c);
        top = color(c);
        right = color(shade(c, 0.2)); //dark
        left = color(shade(c, 0.5)); //darker
    }

    ctx.save();
    ctx.translate((x-y) * tile_width/2, (y+x) * tile_height/2);
    
    

    //top side
    ctx.beginPath();
    ctx.moveTo(0, -z * tile_height);
    ctx.lineTo(tile_width/2, tile_height/2 -z * tile_height);
    ctx.lineTo(0, tile_height -z * tile_height);
    ctx.lineTo(-tile_width/2, tile_height/2 -z * tile_height);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();

    //left side
    ctx.beginPath();
    ctx.moveTo(-tile_width/2, tile_height/2 -z * tile_height);
    ctx.lineTo(0, tile_height -z * tile_height);
    ctx.lineTo(0, tile_height);
    ctx.lineTo(-tile_width/2, tile_height/2);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();


    //same as above we changed -tile_width/2 to tile_width/2
    //right side
    ctx.beginPath();
    ctx.moveTo(tile_width/2, tile_height/2 -z * tile_height);
    ctx.lineTo(0, tile_height -z * tile_height);
    ctx.lineTo(0, tile_height);
    ctx.lineTo(tile_width/2, tile_height/2);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();



    ctx.restore();
}

const draw3DBlock = (x, y, z, c) => {

    let top = '#eee',
        right = '#ccc',
        left = '#999';


    if (c) {
        // console.log(c);
        top = color(c);
        right = color(shade(c, 0.2)); //dark
        left = color(shade(c, 0.5)); //darker
    }

    ctx.save();
    ctx.translate((x-y) * tile_width/2, (y+x) * tile_height/2);

    // if (z > 5) {
    //     ctx.globalAlpha = 0.2;
    // }
    
    

    //top side
    ctx.beginPath();
    ctx.moveTo(0, -z * tile_height);
    ctx.lineTo(tile_width/2, tile_height/2 -z * tile_height);
    ctx.lineTo(0, tile_height -z * tile_height);
    ctx.lineTo(-tile_width/2, tile_height/2 -z * tile_height);
    ctx.closePath();
    ctx.fillStyle = top;
    ctx.fill();

    //left side
    ctx.beginPath();
    ctx.moveTo(-tile_width/2, tile_height/2 -z * tile_height);
    ctx.lineTo(0, tile_height -z * tile_height);
    ctx.lineTo(0, tile_height -(z-1) * tile_height);
    ctx.lineTo(-tile_width/2, tile_height/2 -(z-1) * tile_height);
    ctx.closePath();
    ctx.fillStyle = left;
    ctx.fill();


    //same as above we changed -tile_width/2 to tile_width/2
    //right side
    ctx.beginPath();
    ctx.moveTo(tile_width/2, tile_height/2 -z * tile_height);
    ctx.lineTo(0, tile_height -z * tile_height);
    ctx.lineTo(0, tile_height-(z-1) * tile_height);
    ctx.lineTo(tile_width/2, tile_height/2-(z-1) * tile_height);
    ctx.closePath();
    ctx.fillStyle = right;
    ctx.fill();
    ctx.globalAlpha = 1;



    ctx.restore();
}


const drawMapRandom = (w, h) => {
    for (let x = 0; x < w; x ++) {
        for (let y = 0; y < h; y ++) {
            drawTile(x, y, randomColorObject());
        }
    }
}

const drawMap = (map) => {
    for (let y = 0; y < map.length; y ++) {
        for (let x = 0; x < map[y].length; x ++) {
            if (!map[y][x].elevation || (map[x][y].elevation == 0)) {
                drawTile(x, y, map[y][x].color);
                console.log('tile')
            }
            else 
                drawBlock(x, y, map[y][x].elevation, map[y][x].color)
        }
    }   
}


const drawRandomBlockMap = (w, h) => {
    for (let x = 0; x < w; x ++) {
        for (let y = 0; y < h; y ++) {
            // drawBlock(x, y, Math.floor(Math.random() * 4) );
            // drawBlock(x, y, Math.floor(Math.random() * 4), randomColorObject() );
            drawBlock(x, y, Math.random() * 5, randomColorObject() );
        }
    }

}

const drawBlockMap = (w, h) => {
    for (let x = 0; x < w; x ++) {
        for (let y = 0; y < h; y ++) {
            // drawBlock(x, y, Math.floor(Math.random() * 4) );
            drawBlock(x, y, Math.floor(Math.random() * 4), randomColorObject() );
            // drawBlock(x, y, Math.random() * 5, randomColorObject() );
        }
    }

}

const draw3DMap = (w, h, l) => {
    for (let z = 0; z < l; z ++) {
        for (let y = 0; y < h; y ++) {
            for (let x = 0; x < w; x ++) {
                // if (Math.random() < 0.5)
                // if (z%5 === 0)
                    draw3DBlock(x, y, z, randomColorObject() );
            }
        }
    }
}

const drawImage = (x, y, img, _ctx) => {

    if (_ctx === undefined)
        _ctx = ctx;

    _ctx.save();
    //the new tile position is to move tile_width/2 on the x and tile_height/2 on the y
    _ctx.translate(
        (x-y) * tile_width/2,
        //this wont have any effect if it's zer0 
        (y+x) * tile_height/2
    );
    
    _ctx.drawImage(img, -img.width/2, -img.height + tile_height/2);


    _ctx.restore();
}

const preloadImage = (src, cb) => {
    if (cb === undefined) cb = () => 1;
    const img = new Image();
    img.onload = () => cb(img);
    img.src = src;
    return img;
}

//





//translate canvas to the middle
let canvasY = 300;
let canvasX = canvas.width/ 2;

const clearCtx = (_ctx, _canvas) => {
    _ctx.translate(-canvasX, -canvasY);
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    _ctx.translate(canvasX, canvasY);
}
ctx.translate(canvasX, canvasY);
// ctx.rotate(-45 * Math.PI / 180);
ctxPlayer.translate(canvasX, canvasY);





const playerSystem = () => {
    ctx.globalAlpha = 0.5;
    // drawMapRandom(50, 50);
    ctx.globalAlpha = 1;
    const playerImage = preloadImage('assets/player.png')//, (img) => drawImage(0,0, img,ctxPlayer));
    let playerX = 0;
    let playerY = 0;
    let playerSpeed = 1;

    setInterval(() => {
        if (keys['w']) {
            playerY -= playerSpeed;
        }
        else if (keys['a']) {
            playerX -= playerSpeed;
        }
        else if (keys['s']) {
            playerY += playerSpeed;
        }
        else if (keys['d']) {
            playerX += playerSpeed;
        }


        // ctxPlayer.clearRect(0,0, canvasPlayer.width, canvasPlayer.height);
        clearCtx(ctxPlayer, canvasPlayer);
        // drawImage(playerX, playerY, playerImage, ctxPlayer);

        //mouseSHIT
        ctxPlayer.fillStyle = 'red';
        ctxPlayer.strokeStyle = 'white';
        ctxPlayer.fillRect(mouse.actualX(), mouse.actualY(), 5, 5);
        ctxPlayer.strokeRect(mouse.actualX(), mouse.actualY(), 5, 5);

    }, 1000/30)


}
playerSystem();




draw3DMap(25,25,25);
















random_map_btn.addEventListener('click', () => {    
    clearCtx(ctx, canvas);
    drawRandomBlockMap(50, 50)
});
random_block_map_btn.addEventListener('click', () => {    
    clearCtx(ctx, canvas);
    drawBlockMap(50, 50)
});
random_tiled_map_btn.addEventListener('click', () => {
    ctx.translate(- canvas.width/2, -50);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width/2, 50);
    drawMapRandom(50, 50)
});



// let map = [
//     [{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 255, g:0, b:0}, elevation: 0.5}],
//     [{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 0, g:255, b:0}, elevation: 0},{color: {r: 0, g:255, b:0}, elevation: 0},{color: {r: 255, g:0, b:0}, elevation: 0.5}],
//     [{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 0, g:255, b:0}, elevation: 0},{color: {r: 0, g:255, b:0}, elevation: 0},{color: {r: 255, g:0, b:0}, elevation: 0.5}],
//     [{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 255, g:0, b:0}, elevation: 0.5},{color: {r: 255, g:0, b:0}, elevation: 0.5}],
// ];

// const map = [
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
//     [randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor(),randomColor()],
// ];


// drawMap(25,25);
// drawBlockMap(25,25);
// drawMap(map);












/////////////evelated map
const top_color = '#eee',
        right_color = '#ccc',
        left_color = '#999';
const _top_color = {
    r: 200,
    g: 200,
    b: 200,
}

const _translate = (x, y) => 
    ctx.translate((x-y) * tile_width/2, (y+x) * tile_height/2);

    
const _drawLast = [];

const _drawTile = (x, y, z) => {
    ctx.save();
    _translate(x,y);
    ctx.beginPath();
    ctx.moveTo(0, -z*tile_height);
    ctx.lineTo(tile_width/2, tile_height/2 -z*tile_height);
    ctx.lineTo(0, tile_height -z*tile_height);
    ctx.lineTo(-tile_width/2, tile_height/2 -z*tile_height);
    ctx.closePath();
    ctx.fillStyle = color(_top_color);//z > 0 ? right_color: top_color;
    ctx.fill();
    ctx.restore();
    

    if (z > 0) {
        console.log(z);

        _drawLast.push(() => {
            //x + 1, y
            ctx.save();
            _translate(x + 1, y);
            ctx.beginPath();
            ctx.moveTo(0, -z*tile_height);
            ctx.lineTo(tile_width/2, tile_height/2);
            ctx.lineTo(0, tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2 -z*tile_height);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, -0.2));
            ctx.fill();
            ctx.restore();


            //x, y + 1
            ctx.save();
            _translate(x,y + 1);
            ctx.beginPath();
            ctx.moveTo(0, -z*tile_height);
            ctx.lineTo(tile_width/2, tile_height/2 -z*tile_height);
            ctx.lineTo(0, tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, 0.2));
            ctx.fill();
            ctx.restore();

            //x - 1, y
            ctx.save();
            _translate(x - 1,y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(tile_width/2, tile_height/2 -z*tile_height);
            ctx.lineTo(0, tile_height -z*tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, 0.35));
            ctx.fill();
            ctx.restore();

            //x, y - 1
            ctx.save();
            _translate(x,y - 1);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(tile_width/2, tile_height/2);
            ctx.lineTo(0, tile_height -z*tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2  -z*tile_height);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, 0.2));
            ctx.fill();
            ctx.restore();

            //x + 1, y + 1
            ctx.save();
            _translate(x + 1,y + 1);
            ctx.beginPath();
            ctx.moveTo(0, -z*tile_height);
            ctx.lineTo(tile_width/2, tile_height/2);
            // ctx.lineTo(0, tile_height -z*tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, -0.15));
            ctx.fill();
            ctx.restore();

            //x - 1, y + 1
            ctx.save();
            _translate(x - 1,y + 1);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(tile_width/2, tile_height/2 -z*tile_height);
            ctx.lineTo(0, tile_height);
            // ctx.lineTo(-tile_width/2, tile_height/2);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, 0.3));
            ctx.fill();
            ctx.restore();

            //x + 1, y - 1
            ctx.save();
            _translate(x + 1,y - 1);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            // ctx.lineTo(tile_width/2, tile_height/2 -z*tile_height);
            ctx.lineTo(0, tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2 -z*tile_height);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, -0.15));
            ctx.fill();
            ctx.restore();

            //x - 1, y - 1
            ctx.save();
            _translate(x - 1,y - 1);
            ctx.beginPath();
            // ctx.moveTo(0, 0);
            ctx.moveTo(tile_width/2, tile_height/2);
            ctx.lineTo(0, tile_height -z*tile_height);
            ctx.lineTo(-tile_width/2, tile_height/2);
            ctx.closePath();
            ctx.fillStyle = color(shade(_top_color, 0.3));
            ctx.fill();
            ctx.restore();


        })

        
    }


}

const size = 10;


const drawElevation = () => {
    for (let x = 0; x < size; x ++) {
        for (let y = 0; y < size; y ++) {
            _drawTile(x, y, x == size/2 -1 & y == size/2 -1 ? 0.3 : 0);
        }
    }
    _drawLast.forEach(el => el());
}
// drawElevation();
















