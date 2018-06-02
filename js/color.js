export const randomColor = () => `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
export const randomColorObject = () => ({
    r: Math.random()*255,
    g: Math.random()*255,
    b: Math.random()*255,
});
export const color = (c) => `rgb(${c.r},${c.g},${c.b})`;

export const shade = (c, shade_factor) => {
    const r = c.r * (1 - shade_factor);
    const g = c.g * (1 - shade_factor);
    const b = c.b * (1 - shade_factor);
    return {r, g, b}
};

export const bright = (c, bright_factor) => {
    const r = c.r + (255 * (1 - bright_factor));
    const g = c.g + (255 * (1 - bright_factor));
    const b = c.b + (255 * (1 - bright_factor));
    return {r, g, b}
};