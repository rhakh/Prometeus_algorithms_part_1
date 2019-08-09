import math
import sys


def isOdd(num):
    if (num % 2 == 0):
        return False
    else:
        return True


def isPowerOfTwo(x):
    return (x != 0) and ((x & (x - 1)) == 0)


def karatsuba_mult(x, y):
    if (len(x) <= 1 or len(y) <= 1):
        return (int(x) * int(y))

    if (len(x) < len(y)):
        zero_count = len(y) - len(x)
        x = ('0' * zero_count) + x
    else:
        zero_count = len(x) - len(y)
        y = ('0' * zero_count) + y

    if (isOdd(len(x))):
        x = '0' + x
        y = '0' + y

    n = len(x)
    n2 = math.floor(n / 2)

    a = x[0:n2]
    b = x[n2:n]

    c = y[0:n2]
    d = y[n2:n]

    ac = karatsuba_mult(a, c)
    bd = karatsuba_mult(b, d)
    a_plus_b = int(a) + int(b)
    c_plus_d = int(c) + int(d)
    middle = karatsuba_mult(str(a_plus_b), str(c_plus_d)) - ac - bd
    res = ac * (10 ** (n2 * 2)) + middle * (10 ** n2) + bd

    return res


def main():
    first = int(input('Enter first number: '), 10)
    second = int(input('Enter second number: '), 10)
    res = karatsuba_mult(str(first), str(second))

    print(res)

if __name__ == "__main__":
    main()
    pass
