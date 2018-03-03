import random


def pick_one(lst):
    i = random.randrange(0, len(lst))
    return lst[i]


class Rule:
    def __init__(self, old_val, new_val):
        self.old = old_val
        self.new = new_val

    def is_useful(self, s):
        return s.find(self.old) != -1

    def use_it(self, s):
        return s.replace(self.old, self.new, 1)


def solution(S):

    rules = [
        Rule('AB', 'AA'),
        Rule('BA', 'AA'),
        Rule('CB', 'CC'),
        Rule('BC', 'CC'),
        Rule('AA', 'A'),
        Rule('CC', 'C')
    ]

    useful_rules = [r for r in rules if r.is_useful(S)]
    ss = S

    while len(useful_rules) > 0:
        useful_rule = pick_one(useful_rules)
        ss = useful_rule.use_it(ss)
        useful_rules = [r for r in rules if r.is_useful(ss)]

    return ss


print(solution("ABBCC"))
