"using strict"

G_X="123456"
G_Y="789123"

function karatsuba_mult(x, y) {
    if (x.length <= 1 || y.length <= 1) {
        x = parseInt(x, 10) | 0;
        y = parseInt(y, 10) | 0;
        console.log(x * y);
        return (x * y);
    }
    else {
        let n = Math.max(x.length, y.length);
        let n_div_2 = (a) => Math.floor(a / 2);
        let a = x.toString().slice(0, n_div_2(x.length));
        let b = x.toString().slice(n_div_2(x.length), x.length);
        let c = y.toString().slice(0, n_div_2(y.length));
        let d = y.toString().slice(n_div_2(y.length), y.length);

        console.log("a = " + a + " b = " + b + " c = " + c + " d = " + d);

        let ac = karatsuba_mult(a, c);
        let bd = karatsuba_mult(b, d);
        let a_plus_b = parseInt(a, 10) + parseInt(b, 10);
        let c_plus_d = parseInt(c, 10) + parseInt(d, 10);
        let middle = karatsuba_mult(a_plus_b, c_plus_d) - ac - bd;

        return (ac * Math.pow(10, n) + middle * Math.pow(10, n / 2) + bd);
    }
}

// x = G_X;
// y = G_Y;

// let a = x.toString().slice(0, x.length / 2);
// let b = x.toString().slice(x.length / 2, x.length);
// let c = y.toString().slice(0, y.length / 2);
// let d = y.toString().slice(y.length / 2, y.length);

// console.log("a = " + a + " b = " + b + " c = " + c + " d = " + d);

let res = karatsuba_mult(G_X, G_Y);

console.log(res);