# import functools

vowels = set(list('AEIOU'))


def get_subwords(s, start):
    return {s[start: i+1] for i in range(start, len(s))}


def get_subwords_starting_at(string, indices):
    # return functools.reduce(lambda x, y: x | y, [get_subwords(string, i) for i in indices])
    total = set()
    for i in indices:
        total |= get_subwords(string, i)
    return total


def number_of_occurcences(subword, string):
    return sum(1 for i in range(len(string)) if string[i:].startswith(subword))


def number_of_occurcences_of_all_subwords(string, indices):
    # get subwords starting at the indices
    subwords = get_subwords_starting_at(string, indices)

    # for each subword find number of ocurences in the string and add them up
    return sum([number_of_occurcences(subword, string) for subword in subwords])


def minion_game(string):
    # get indexes of vowels and consonants in the string
    vowel_indices = [i for (i, c) in enumerate(string) if c in vowels]
    consonant_indices = [i for (i, c) in enumerate(string) if c not in vowels]

    n_v = number_of_occurcences_of_all_subwords(string, vowel_indices)
    n_c = number_of_occurcences_of_all_subwords(string, consonant_indices)

    print(n_c, n_v)
    if n_c > n_v:
        print('Stuart', n_c)
    elif n_c < n_v:
        print('Kevin', n_v)
    else:
        print('Draw')

# right solution


def minion_game1(s):

    vowels = 'AEIOU'

    kevsc = 0
    stusc = 0
    for i in range(len(s)):
        if s[i] in vowels:
            kevsc += (len(s)-i)
        else:
            stusc += (len(s)-i)

    if kevsc > stusc:
        print("Kevin", kevsc)
    elif kevsc < stusc:
        print("Stuart", stusc)
    else:
        print("Draw")


S = 'ANA'
minion_game(S)
minion_game1(S)
