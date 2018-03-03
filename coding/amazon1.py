def get_num_pairs(seq):
    """
    returns number of pairs in a sequence seq.
    which equals to sum of arphmetic progression (n-1)...1
    where n is length of seq
    """
    n = len(seq)
    return int(n * (n-1)/2)  # sum of arphmetic progression (n-1)...1


def solution(A):

    # dictionary to keep indices for each value of A
    # A = [3, 5, 6, 3, 3, 5]
    # val_indexes = {3: [0, 3, 4], 5: [1, 5], 6: [2]}

    val_indexes = {}
    for i, val in enumerate(A):
        if val in val_indexes:
            val_indexes[val].append(i)
        else:
            val_indexes[val] = [i]

    total_num_pairs = 0
    for v in val_indexes.values():
        total_num_pairs += get_num_pairs(v)

    return total_num_pairs

# Looks like time complexity is O(N)
# Space complexity is O(N)
