# import pytest
'''
https://www.testdome.com/questions/python/two-sum/14289?questionIds=14288,14289&generatorId=92&type=fromtest&testDifficulty=Easy

Write a function that, given a list and a target sum, returns zero-based indices of any two distinct elements whose sum is equal to the target sum. If there are no such elements, the function should return (-1, -1).

For example, find_two_sum([1, 3, 5, 7, 9], 12) should return a tuple containing any of the following pairs of indices:

1 and 4 (3 + 9 = 12)
2 and 3 (5 + 7 = 12)
3 and 2 (7 + 5 = 12)
4 and 1 (9 + 3 = 12)
'''


def find_index(m,a):
    try:
        return a.index(m)
    except :
        return -1
    
    
    


def find_two_sum(a, s):
    '''
    >>> (3, 4) == find_two_sum([1, 3, 5, 7, 9], 12)
    True
    '''
    if len(a)<2: 
        return (-1,-1)

    idx = dict( (v,i) for i,v in enumerate(a) )

    for i in a:
        m = s - i
        # k = find_index(m,a)
        k = idx.get(m,-1)
        if k != -1 :
            return (i,k)

    return (-1, -1)


print(find_two_sum([1, 3, 5, 7, 9], 12))


if __name__ == '__main__':
    import doctest; doctest.testmod()
    # pytest.main()
    # pass