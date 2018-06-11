import { Tile } from "./tile.js";


const _props = {
    width: 50,
    height: 50
}

export class IsoMap {
    constructor(props = _props) {
        props = {..._props, ...props};
        console.log(props);

        this.width = props.width;
        this.height = props.height;
        this.tiles = [];

        this.fill();
    }

    fill() {
        this.tiles = [];
        for (let x = 0; x < this.width; x ++) 
            for (let y = 0; y < this.height; y ++)
                this.tiles.push(new Tile({x, y}));
    }

    draw(ctx) {
        for (let i = 0; i < this.tiles.length; i ++) {
            this.tiles[i].draw(ctx);
        }
    }
}