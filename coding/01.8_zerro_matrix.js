// Zero Matrix{
// Write an algorithm such that if an element in an MxN matrix is 0,
// its entire row and column are set to 0.



const matrix = [
    [1, 2, 3, 4, 5, 6, 8, 9],
    [1, 0, 3, 4, 5, 6, 8, 9],
    [1, 2, 3, 4, 5, 6, 8, 9],
    [1, 2, 3, 4, 0, 6, 8, 9],
    [1, 2, 3, 4, 5, 6, 8, 9],
    [1, 2, 3, 4, 5, 6, 8, 9]
];


function nullify_row(i, m, N) {
    for (let j = 0; j < N; j++) {
        m[i][j] = 0;
    }
}


function nullify_col(j, m, M) {
    for (let i = 0; i < M; i++) {
        m[i][j] = 0;
    }
}


function zerro_matrix(m) {
    var M = m.length;
    var N = m[0].length;
    var rows = new Set();
    var cols = new Set();

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (m[i][j] == 0) {
                rows.add(i);
                cols.add(j);
            }
        }
    }

    for (r of rows) {
        nullify_row(r, m, N);
    }

    for (c of cols) {
        nullify_col(c, m, M);
    }
}


function prettyPrint(matrix) {
    for (let r of matrix) {
        console.log(r.toString());
    }
    console.log();
}



prettyPrint(matrix);
zerro_matrix(matrix);
prettyPrint(matrix);
