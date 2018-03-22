import collections

s = ''.join(collections.OrderedDict.fromkeys('AAAB').keys())

N = 4
s = ''.join([chr(i) for i in range(ord('A'), ord('Z')+1)])
print(s)
z = zip(*[iter(s)] * N)
print(list(z))
