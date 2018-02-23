# Write a function swaping 3 numbers not using an additional variable


# destructuring assignent
def swap1(n1, n2):
    n1, n2 = n2, n1
    return (n1, n2)


# use upper 8 bits to save value of one variable
def swap2(n1, n2):
    n1 = (n1 << 8) | n2
    n2 = n1 >> 8
    n1 = n1 & ((1 << 8)-1)  # 0b0000000011111111
    return n1, n2

# to trace swaping


def tr(n1, n2):
    print('{:0>9b}'.format(n1))
    print('{:0>9b}'.format(n2))
    print()


def set_bit(n, i, x):
    """Set the i-th bit of n to 1 if x is truthy, else to 0,"""
    m = 1 << i   # mask with  bit i set.
    return n | m if x else n & ~m


# swap variable bit by bit using one additional bit to keep value
def swap3(n1, n2):
    for i in range(0, 8):

        n1 = n1 | ((n1 & (1 << i)) << (8-i))

        # n1 = set_bit(n1, i, (n2 & (1 << i)))

        if n2 & (1 << i):
            n1 |= (1 << i)
        else:
            n1 &= ~(1 << i)

        n2 = n2 | ((n1 >> 8) << i)
        n1 = n1 & ((1 << 8)-1)

    return (n1, n2)


print(swap1(15, 8))
print(swap2(15, 8))
print(swap3(15, 8))
