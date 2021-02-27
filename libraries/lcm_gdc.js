function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if(!b) return b===0 ? a : NaN;
    return gcd2(b, a%b);
}

function gcd(array) {
    // Greatest common divisor of a list of integers
    return array.reduce((prev, cur) => gcd2(cur, prev), 0);
}

function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a*b / gcd2(a, b);
}

function lcm(array) {
    // Least common multiple of a list of integers
    return array.reduce((prev, cur) => lcm2(cur, prev), 1);
}
