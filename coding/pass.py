from itertools import combinations
import re

def get_pairs(s):
    s=set(s)
    comb=combinations(s,2)
    d=dict()
    for c in comb:
        d[c]=''.join(list(s-set(c)))
    return d

def remove_chars(s,chars):
    return re.sub('['+chars+']','',s)
    
def is_valid(s):
    return re.search(r'(.)\1',s) is None

def twoCharaters(s):
    pairs=get_pairs(s)
    ma=0
    for pair,left_chars in pairs.items():
        word=remove_chars(s,left_chars)
        if is_valid(word):
            ma=max(ma,len(word))
    return ma




# print(get_pairs("aaabcd"))
# print (remove_chars("abcdab",'ba'))
# print (is_valid('abch'))
print (twoCharaters("abcadd"))
