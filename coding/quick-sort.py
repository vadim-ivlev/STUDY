# Core:
# qsort(left) + lst[ip] + qsort(right)


def qsort(lst):
    l = len(lst)
    if l < 2:
        return lst
    if l < 3:
        return lst if lst[0] <= lst[1] else [lst[1], lst[0]]

    ip = l//2
    left = [x for i, x in enumerate(lst) if x < lst[ip] and i != ip]
    right = [x for i, x in enumerate(lst) if x >= lst[ip] and i != ip]

    # left = []
    # right = []
    # for i, v in enumerate(lst):
    #     if v < lst[ip]:
    #         left.append(v)
    #     elif i != ip:
    #         right.append(v)

    return qsort(left) + [lst[ip]] + qsort(right)


import random


lst = random.sample(range(100), 100)
slst = qsort(lst)
print(lst)
print(slst)
