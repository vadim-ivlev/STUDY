N = 3
m = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]


def generate_m(N):
    '''Generates a square matrix NxN'''
    k = 1
    m = []
    for i in range(0, N):
        n = []
        m.append(n)
        for j in range(0, N):
            n.append(k)
            k += 1
    return m


def print_m(m, N):
    "Pretty prints matrix"
    for i in range(0, N):
        for j in range(0, N):
            print('{0:>4d}'.format(m[i][j]), end='')
        print()
    print()


def rotate(l, n):
    '''Rotates list to the right'''
    return l[n:]+l[:n]


def rotate_m(m, N):
    for i in range(0, N//2+N % 2):
        for j in range(0, N//2):
            cp = [m[i][j], m[N-j-1][i], m[N-i-1][N-j-1], m[j][N-i-1]].copy()
            [m[i][j], m[N-j-1][i], m[N-i-1][N-j-1],
                m[j][N-i-1]] = rotate(cp, 1)


N = 5
m = generate_m(N)
print_m(m, N)

print('rotated:')
rotate_m(m, N)
print_m(m, N)

[x for x in dir() if not x.startswith('__')]
