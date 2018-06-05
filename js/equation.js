// const lineEquation = (point1, point2) => (x) => ( slope(point1, point2) * (x - point1.x) ) + point1.y;
const lineEquation = 
    (point1, point2, _point = {x: 0, y: 0}) => 
    (x) => {
    const _point1 = {
        x: point1.x + _point.x,
        y: point1.y + _point.y,
    };
    const _point2 = {
        x: point2.x + _point.x,
        y: point2.y + _point.y,
    };
    return ( slope(_point1, _point2) * (x - _point1.x) ) + _point1.y;
}
// const lineEquationString = (point1, point2) => `${slope(point1, point2)} * (x - ${point1.x}) + ${point1.y}`;
const slope = (point1, point2) => (point2.y-point1.y)/(point2.x-point1.x);


const pointPos = (line, point) => {
    if (point.y > line(point.x)) return 1;
    else if (point.y < line(point.x)) return -1;
    return 0;
}

export default {
    lineEquation, 
    // lineEquationString,
    // lineEquationFrom,
    slope,
    pointPos
}