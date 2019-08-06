"using strict"

G_X="123456"
G_Y="456789"
let rec = ""

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
    
    if (x.length <= 2 || y.length <= 2) {
        rec.length--;
        return (parseInt(x, 10) * parseInt(y, 10));
    }

    rec = rec + " ";

    if (isOdd(x.length)) {
        x = x.concat("0");
        zero_count++;
    }
    if (isOdd(y.length)) {
        y = y.concat("0");
        zero_count++;
    }

    let n = Math.max(x.length, y.length);
    let n_div_2 = Math.floor(n / 2);

    /* X split */
    let a = x.toString().slice(0, n_div_2);
    let b = x.toString().slice(n_div_2, n);
    /* Y split */
    let c = y.toString().slice(0, n_div_2);
    let d = y.toString().slice(n_div_2, n);

    console.log(rec + "x = " + x + " y = " + y);
    console.log(rec + "a = " + a + " b = " + b + " c = " + c + " d = " + d + " n = " + n + " n_div_2 = " + n_div_2);
    console.log(rec + "a* = " + (parseInt(a, 10) * Math.pow(10, n_div_2)) +
                " b = " + b +
                " c* = " + (parseInt(c, 10) * Math.pow(10, n_div_2)) +
                " d = " + d);

    let ac = karatsuba_mult(a, c);
    let bd = karatsuba_mult(b, d);
    let a_plus_b = parseInt(a, 10) + parseInt(b, 10);
    let c_plus_d = parseInt(c, 10) + parseInt(d, 10);
    let middle = karatsuba_mult(a_plus_b.toString(), c_plus_d.toString()) - ac - bd;
    let res = ac * Math.pow(10, n_div_2 * 2) + middle * Math.pow(10, n_div_2) + bd;
    res = res.toString();
    res = res.slice(0, res.length - zero_count);
    res = parseInt(res, 10);

    // let z0 = karatsuba_mult(b, d);
    // let a_plus_b = parseInt(a, 10) + parseInt(b, 10);
    // let c_plus_d = parseInt(c, 10) + parseInt(d, 10);
    // let z1 = karatsuba_mult(a_plus_b.toString(), c_plus_d.toString());
    // let z2 = karatsuba_mult(a, c);
    // let res = (z2 * Math.pow(10, n_div_2 * 2)) + ((z1 - z2 - z0) * Math.pow(10, n_div_2)) + z0

    console.log(rec + "res = " + res);


    rec.length--;
    return (res);
}

// var readline = require('readline-sync');
// var first = readline.question("Enter first number:");
// var second = readline.question("Enter second number:");

// let res = karatsuba_mult(first, second);
let res = karatsuba_mult(G_X, G_Y);

console.log(res);

/* TESTS
X: 49823261
Y: 44269423
Z: 2205647016448403
Value counter
8 ­> [5, 4, 3]
7 ­> [4, 2, 4]
X: 54761293
Y: 65394884
Z: 3581108403425012
Value counter
5 ­> [4, 2, 2]
X: 9313685456934674
Y: 7658898761837539
Z: 71332574014261268360454523927286
Value counter
18 ­> [5, 1, 2]
9 ­> [7, 3, 3]
8 ­> [8, 7, 5]
X: 3957322621234423
Y: 7748313756335578
Z: 30662577304368647842211393201494
Value counter
14 ­> [5, 1, 1]
9 ­> [6, 2, 5]
8 ­> [13, 8, 7]
X: 34215432964249374812219364786397
Y: 94541964835273822784327848699719
Z: 3234794260129733170788831535430575611379062580407060392628922443
Value counter
45 ­> [11, 3, 0]
9 ­> [28, 19, 14]
8 ­> [17, 11, 10]
X: 71611955325935479159397713213124
Y: 93567726499788166681348352945366
Z: 6700567850052179472481148730882040129649508491917840721086183384
Value counter
40 ­> [15, 4, 2]
36 ­> [11, 2, 2]
10 ­> [11, 4, 6]
X: 8436939677358274975644341226884162349535836199962392872868456892
Y: 3864264464372346883776335161325428226997417338413342945574123327
Z: 
3260256618326867558219616559269154416252277880915590189561728428727667256397684169989278971874137783355
4298336397153444191119684
Value counter
72 ­> [14, 4, 5]
69 ­> [12, 3, 0]
67 ­> [14, 1, 3]
X: 8711129198194917883527844183686122989894424943636426448417394566
Y: 2924825637132661199799711722273977411715641477832758942277358764
Z: 
2547853400725537879989485724796144554439792586917913890463615757553592157005898306500636948129561950040
6669960288667484926076424
Value counter
64 ­> [20, 5, 3]
60 ­> [12, 3, 4]
58 ­> [12, 5, 2]
*/