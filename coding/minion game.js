function minionGame(s) {
    var vowels = 'AEIOU';
    var kevinScore = 0;
    var stuartScore = 0;

    for (let i = 0; i < s.length; i++) {
        if (vowels.includes(s[i])) {
            kevinScore += (s.length - i);
        } else {
            stuartScore += (s.length - i);
        }
    }

    if (kevinScore > stuartScore) {
        console.log("Kevin", kevinScore);
    } else if (kevinScore < stuartScore) {
        console.log('Stuart', stuartScore);
    } else {
        console.log("Draw");
    }
}

const S = 'ANA';
minionGame(S);
