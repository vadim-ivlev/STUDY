def twoStacks(x, a, b):
    score = 0
    total = 0
    while total < x:
        if a != [] and b != []:
            if a[0] < b[0]:
                if total+a[0] < x:
                    total += a.pop(0)
                    score += 1
                else:
                    break
            else:
                if total+b[0] < x:
                    total += b.pop(0)
                    score += 1
                else:
                    break
        elif a != []:
            if total+a[0] < x:
                total += a.pop(0)
                score += 1
            else:
                break
        elif b != []:
            if total+b[0] < x:
                total += b.pop(0)
                score += 1
            else:
                break

    return score


print(twoStacks(10, [4, 2, 4, 6, 1], [2, 1, 8, 5]))
