import math
import sys

def isOdd(num):
    if (num % 2 == 0):
        return False
    else:
        return True

def karatsuba_mult(x, y):
    zero_count = 0

    if (len(x) <= 4 or len(y) <= 4):
        return (int(x) * int(y))

    if (isOdd(len(x))):
        x += '0'
        zero_count += 1

    if (isOdd(len(y))):
        y += '0'
        zero_count += 1

    smaller = x if len(x) < len(y) else y
    bigger = x if len(x) > len(y) else y
    while (len(smaller) < len(bigger)):
        smaller += '0'
        zero_count += 1

    n = max(len(x), len(y))
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

    res = str(res)
    res = res[0:len(res) - zero_count]
    res = int(res)

    return res

first = int(input('Enter first number: '), 10)
second = int(input('Enter second number:'), 10)

res = karatsuba_mult(str(first), str(second))

print(res)
