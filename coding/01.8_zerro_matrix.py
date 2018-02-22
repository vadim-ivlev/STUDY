# Zero Matrix:
# Write an algorithm such that if an element in an MxN matrix is 0,
# its entire row and column are set to 0.


matrix = [
    [1, 2, 3, 4, 5, 6, 8, 9],
    [1, 0, 3, 4, 5, 6, 8, 9],
    [1, 2, 3, 4, 5, 6, 8, 9],
    [1, 2, 3, 4, 0, 6, 8, 9],
    [1, 2, 3, 4, 5, 6, 8, 9],
    [1, 2, 3, 4, 5, 6, 8, 9]
]


def nullify_row(i, m, N):
    for j in range(N):
        m[i][j] = 0


def nullify_col(j, m, M):
    for i in range(M):
        m[i][j] = 0


def zerro_matrix(m):
    M = len(matrix)
    N = len(matrix[0])
    rows = set()
    cols = set()

    for i in range(M):
        for j in range(N):
            if m[i][j] == 0:
                rows.add(i)
                cols.add(j)

    for r in rows:
        nullify_row(r, m, N)

    for c in cols:
        nullify_col(c, m, M)


print(repr(matrix).replace('],', '],\n'))
print()

zerro_matrix(matrix)

print(repr(matrix).replace('],', '],\n'))
