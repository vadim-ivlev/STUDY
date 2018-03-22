// String Rotation:
// Assume you have a method isSubstringwhich checks if one word is a substring of another.
// Given two strings, sl and s2, write code to check if s2
// is a rotation of sl using only one call
// to isSubstring
// (e.g., "waterbottle" is a rotation of"erbottlewat").


function isRotation(s1, s2) {
    if (s1.length != s2.length) {
        return false;
    }
    return (s2 + s2).includes(s1);
}

console.log(isRotation("waterbottle", "erbottlewat"));
console.log(isRotation("waterbohtle", "erbottlewat"));
console.log(isRotation("waterbottl", "erbottlewat"));
