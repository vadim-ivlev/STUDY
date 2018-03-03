def get_num_pairs(seq):
    """
    returns number of pairs in a sequence seq.
    which equals to sum of arphmetic progression (n-1)...1
    where n is length of seq
    """
    n = len(seq)
    return int(n * (n-1)/2)  # sum of arphmetic progression (n-1)...1


def solution(A):
    # scan the list to find all the monotonic index sequences
    # [[1,2,3], [3,4], [4,5,6]
    # we can use tree queues inc_queue, const_queue, dec_queue
    # to keep temporary sequences while scaning

    mono_sequences = []

    # then find total num of segments probably using the func from
    # the solution 1
    total = 0
    for seq in mono_sequences:
        total += get_num_pairs(seq)

    return total

#----------------------------------------------------------2


class Chunk:
    def __init__(self):
        self.chunks = []
        self.buffer = []

    def add(self, v):
        if len(self.buffer) == 0:
            self.buffer.append(v)
        elif v == self.buffer[-1]:
            pass
        elif (v - self.buffer[-1]) == 1:
            self.buffer.append(v)
        elif (v - self.buffer[-1]) > 1:
            self.flush()
            self.buffer.append(v)

    def flush(self):
        self.chunks.append(self.buffer.copy())
        self.buffer.clear()

    def __str__(self):
        return "chunks="+str(self.chunks) + " buffer ="+str(self.buffer)


# ================
a = [1, 2, 3, 2, 2, 2, 4, 5, 6, 7]

con = Chunk()
inc = Chunk()
dec = Chunk()

for i in range(len(a)-1):
    if a[i] < a[i+1]:
        inc.add(i)
        inc.add(i+1)
    elif a[i] > a[i+1]:
        dec.add(i)
        dec.add(i+1)
    else:
        con.add(i)
        con.add(i+1)

con.flush()
dec.flush()
inc.flush()

total = 0
total += sum(get_num_pairs(c) for c in con.chunks)
total += sum(get_num_pairs(c) for c in inc.chunks)
total += sum(get_num_pairs(c) for c in dec.chunks)

print(total)

# -`---------------------------3


def indexes(a):
    ids = []
    for t in a:
        if ids[-1:] != [t[0]]:
            ids.append(t[0])
        ids.append(t[1])
    return ids


def split(a):
    ar = []
    q = [a[0]]
    for i in range(1, len(a)):
        if a[i] - q[-1] > 1:
            ar.append(q.copy())
            q.clear()
        q.append(a[i])
    ar.append(q.copy())
    # q.clear()

    return ar


# $=================================
a = [1, 2, 3, 2, 2, 2, 4, 5, 6, 7]

pairs = [(i, i+1, a[i+1] - a[i]) for i in range(len(a)-1)]

i_pairs = [p for p in pairs if p[2] > 0]
c_pairs = [p for p in pairs if p[2] == 0]
d_pairs = [p for p in pairs if p[2] < 0]

i_ind = indexes(i_pairs)
c_ind = indexes(c_pairs)
d_ind = indexes(d_pairs)

i_c = split(i_ind)
c_c = split(c_ind)
d_c = split(d_ind)

total = 0
total += sum(get_num_pairs(c) for c in i_c)
total += sum(get_num_pairs(c) for c in c_c)
total += sum(get_num_pairs(c) for c in d_c)

print(total)
