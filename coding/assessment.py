def solution(A):
    h = set(A)

    l = len(h)
    for i in range(1, l+1):
        if i not in h:
            return i
    return -1


# final check
print(solution([1, 2, 3, 4, 6]))
