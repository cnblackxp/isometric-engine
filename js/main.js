const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const tile_width = 50;
const tile_height = 25;


const randomColor = () => `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
const randomColorObject = () => ({
    r: Math.random()*255,
    g: Math.random()*255,
    b: Math.random()*255,
});
const color = (c) => `rgb(${c.r},${c.g},${c.b})`;

const shade = (c, shade_factor) => {
    const r = c.r * (1 - shade_factor);
    const g = c.g * (1 - shade_factor);
    const b = c.b * (1 - shade_factor);
    return {r, g, b}
}


const drawTile = (x, y, color) => {
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
    ctx.fillStyle = color;
    ctx.fill();


    ctx.restore();
}
const drawBlock = (x, y, z, c) => {

    let top = '#eee',
        right = '#ccc',
        left = '#999';


    if (c) {
        console.log(c);
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


const drawMap = (w, h) => {
    for (let x = 0; x < w; x ++) {
        for (let y = 0; y < h; y ++) {
            drawTile(x, y, randomColor());
        }
    }
}

const drawBlockMap = (w, h) => {
    for (let x = 0; x < w; x ++) {
        for (let y = 0; y < h; y ++) {
            // drawBlock(x, y, Math.floor(Math.random() * 4) );
            // drawBlock(x, y, Math.floor(Math.random() * 4), randomColorObject() );
            drawBlock(x, y, Math.random() * 5, randomColorObject() );
        }
    }

}


//translate canvas to the middle
ctx.translate(canvas.width/ 2, 100);




// drawMap(25,25);
drawBlockMap(25,25);