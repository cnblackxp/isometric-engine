import { Directions, tile_width, tile_height } from "./utils.js";
import { color } from "./color.js";

const _props = {
    x : 0,
    y : 0,
    color : {
        r: 50,
        g: 50,
        b: 50,
    },
    image: null,
    elevation : 0,
    direction : Directions.NONE
}

export class Tile {
    constructor(props = _props) {
        props = {..._props, ...props};
        //this is there tile position in the array
        this.x = props.x;
        this.y = props.y;
        this.color = props.color
        this.elevation = props.elevation;
        this.image = props.image;
        this.direction = props.direction;
    }


    


    draw(ctx) {
        ctx.save();
        //the new tile position is to move tile_width/2 on the x and tile_height/2 on the y
        ctx.translate(
            this.actualX(),
            //this wont have any effect if it's zer0 
            this.actualY()
        );
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(tile_width/2, tile_height/2);
        ctx.lineTo(0, tile_height);
        ctx.lineTo(-tile_width/2, tile_height/2);
        ctx.closePath();
        ctx.fillStyle = color(this.color);
        ctx.fill();


        ctx.restore();
    }

    actualX() {
        return (this.x-this.y) * tile_width/2;
    }
    actualY() {
        return (this.y+this.x) * tile_height/2;
    }
}

