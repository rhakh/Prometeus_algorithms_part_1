"using strict"

/* Doesn't work with huge numbers (2^53) */

function isOdd(num) {
    switch (num % 2) {
        case 0:
            return false;
        case 1:
            return true;
    }
}

function karatsuba_mult(x, y) {
    let zero_count = 0;
    
    /* numbers are small enough to multiply */
    if (x.length <= 4 || y.length <= 4) {
        return (parseInt(x, 10) * parseInt(y, 10));
    }

    /* Add zeroes to the end to make of number even */
    if (isOdd(x.length)) {
        x = x.concat("0");
        zero_count++;
    }
    if (isOdd(y.length)) {
        y = y.concat("0");
        zero_count++;
    }
    
    /* Make numbers equal by length */
    let smaller = x.length < y.length ? x : y;
    let bigger = x.length > y.length ? x : y;
    while (smaller.length < bigger.length) {
        smaller += "0";
        zero_count++;
    }

    let n = Math.max(x.length, y.length);
    let n_div_2 = Math.floor(n / 2);

    /* X split |X| = |a|b| */
    let a = x.toString().slice(0, n_div_2);
    let b = x.toString().slice(n_div_2, n);
    /* Y split |Y| = |c|d| */
    let c = y.toString().slice(0, n_div_2);
    let d = y.toString().slice(n_div_2, n);

    /* X * Y = ac * 10^n + ((a + b)(c + d) - ac - bd) * 10^n/2 + bd */
    let ac = karatsuba_mult(a, c);
    let bd = karatsuba_mult(b, d);
    let a_plus_b = parseInt(a, 10) + parseInt(b, 10);
    let c_plus_d = parseInt(c, 10) + parseInt(d, 10);
    let middle = karatsuba_mult(a_plus_b.toString(), c_plus_d.toString()) - ac - bd;
    let res = ac * Math.pow(10, n_div_2 * 2) + middle * Math.pow(10, n_div_2) + bd;

    /* Remove zeroes that was added above */
    res = res.toString();
    res = res.slice(0, res.length - zero_count);
    res = parseInt(res, 10);

    return (parseInt(res, 10));
}

var readline = require('readline-sync');
var first = readline.question("Enter first number:");
var second = readline.question("Enter second number:");

let res = karatsuba_mult(first, second);

console.log(res);
