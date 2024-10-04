export function range(min, max) {
    const a = [];
    for (let i = min; i < max; i++) {
        a.push(i);
    }
    return a;
}
export function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}
export function toRadians(degrees) {
    return (degrees / 180) * Math.PI;
}
