# task: reverse a string

'''
>>> reverse("abcd")
'dcba'
>>> reverse("abc")
'cba'
>>> reverse("a")
'a'
>>> reverse("")
''
'''


def reverse_recursive(string):
    if len(string) < 2:
        return string
    head = string[0:1]
    tail = string[1:]
    return reverse(tail)+head


def reverse_swaping(string):
    if len(string) < 2:
        return string

    lst = list(string)
    for i in range(len(string)//2):
        lst[-1-i], lst[i] = lst[i], lst[-1-i]
    s = ''.join(lst)

    return s


def reverse_stack(string):
    if len(string) < 2:
        return string

    import stack
    stack = stack.Stack()

    lst = list(string)

    for i in lst:
        stack.push(i)
    lst.clear()

    while not stack.is_empty():
        lst.append(stack.pop())

    return ''.join(lst)



# reverse = reverse_recursive
# reverse = reverse_swaping
reverse = reverse_stack


if __name__ == '__main__':
    import doctest
    print('---------')
    doctest.testmod()
