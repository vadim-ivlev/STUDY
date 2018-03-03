# v=getattr(a, 'pop')(1)
s = 'print 4 7  '
commands = {
    'print': print,
    'len': len
}


def exec_string(s):
    global commands
    chunks = s.split()
    func_name = chunks[0] if len(chunks) else 'blbl'
    func = commands.get(func_name, None)

    params = [int(x) for x in chunks[1:]]
    if func:
        func(*params)


exec_string(s)
"k"
