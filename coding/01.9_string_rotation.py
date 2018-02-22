# String Rotation:
# Assumeyou have a method isSubstringwhich checks if one word is a substring of another.
# Given two strings, sl and s2, write code to check if s2
# is a rotation of sl using only one call
# to isSubstring
# (e.g., "waterbottle" is a rotation of"erbottlewat").


def is_rotation(s1, s2):
    if len(s1) != len(s2):
        return False
    s22 = s2*2

    if s22.find(s1) > 0:
        return True
    else:
        return False


print(is_rotation("waterbottle", "erbottlewat"))
print(is_rotation("waterbohtle", "erbottlewat"))
print(is_rotation("waterbottl", "erbottlewat"))
