import Equation from './equation.js';

export const checkCollision = (point, tile) => {
    //check outside bound
    if (point.x > tile.x && point.x < tile.x + tile.width &&
        point.y > tile.y && point.y < tile.y + tile.height) {
            //left side check
            let tempCheck;
            if (point.x <= tile.x + tile.width/2) {

                tempCheck = tile.y + tile.height/2;
                //top side check
                if (point.y <= tempCheck) {
                    //under slope
                    return (
                        Equation.pointPos(Equation.lineEquation(
                            {x: tile.x, y: tile.y + tile.height/2},
                            {x: tile.x + tile.width/2, y: tile.y},
                        ), point) > 0
                    );
                        
                }
                //bottom side check
                else {
                    //above slope
                    return (
                        Equation.pointPos(Equation.lineEquation(
                            {x: tile.x, y: tile.y + tile.height/2},
                            {x: tile.x + tile.width/2, y: tile.y + tile.height},
                        ), point) < 0
                    );
                }
            }
            //right side check
            else {
                tempCheck = tile.y + tile.height/2;
                //top side check
                if (point.y <= tempCheck) {
                    //under slope
                    return (
                        Equation.pointPos(Equation.lineEquation(
                            {x: tile.x + tile.width/2, y: tile.y},
                            {x: tile.x + tile.width, y: tile.y + tile.height/2},
                        ), point) > 0
                    )
                }
                //bottom side check
                else {
                    //above slope
                    return (
                        Equation.pointPos(Equation.lineEquation(
                            {x: tile.x + tile.width/2, y: tile.y + tile.height},
                            {x: tile.x + tile.width, y: tile.y + tile.height/2},
                        ), point) < 0
                    );
                }
            }
        }
    return false;
}