class Empty(Exception):
    pass


class Stack:
    def __init__(self):
        self.items = []

    def push(self, v):
        self.items.append(v)

    def pop(self):
        if self.is_empty():
            raise Empty('The stack is empty')
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise Empty('The stack is empty')
        return self.items[-1]

    def size(self):
        return len(self.items)

    def is_empty(self):
        return self.items == []
