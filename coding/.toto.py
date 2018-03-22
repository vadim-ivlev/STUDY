import networkx as nx
from networkx.drawing.nx_agraph import write_dot, graphviz_layout
import matplotlib.pyplot as plt


def build_graph(g, t):
    if not t:
        return

    left = t.get_left()
    if left:
        g.add_edge(t.get_value(), left.get_value(), label='left')
        build_graph(g, left)

    right = t.get_right()
    if right:
        g.add_edge(t.get_value(), right.get_value(), label='right')
        build_graph(g, right)


def draw_graph(t):
    G = nx.DiGraph()
    build_graph(G, t)

    pos = graphviz_layout(G, prog='dot')

    nx.draw(G,
            pos,
            with_labels=True,
            width=2,
            node_size=1000,
            node_color="orange",
            alpha=1.0)
    # nx.draw_networkx_nodes(G, pos, node_size=2000, nodelist=['x'])
#     nx.draw_networkx_edges(G, pos, alpha=0.9, width=6, edge_color="orange", edgelist=[(1, 'Petya')])

    lbls = nx.get_edge_attributes(G, 'label')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=lbls)
    plt.show()
    return G


class BinaryTree:
    def __init__(self, val):
        self.value = val
        self.right = None
        self.left = None

    def get_value(self):
        return self.value

    def set_value(self, val):
        self.value = val

    def get_right(self):
        return self.right

    def get_left(self):
        return self.left

    def insert_left(self, v):
        t = BinaryTree(v)
        if self.left:
            t.left = self.left
        self.left = t
        return t

    def insert_right(self, v):
        t = BinaryTree(v)
        if self.right:
            t.right = self.right
        self.right = t
        return t


# from pythonds.basic.stack import Stack
# from pythonds.trees.binaryTree import BinaryTree

def buildParseTree(fpexp):
    fplist = fpexp.split()
    pStack = []  # Stack()
    eTree = BinaryTree('')
    pStack.append(eTree)  # push(eTree)
    currentTree = eTree

    for i in fplist:
        if i == '(':
            currentTree.insert_left('')  # insertLeft('')
            pStack.append(currentTree)  # push(currentTree)
            currentTree = currentTree.get_left()  # getLeftChild()

        elif i in ['+', '-', '*', '/']:
            currentTree.set_value(i)  # setRootVal(i)
            currentTree.insert_right('')  # insertRight('')
            pStack.append(currentTree)  # push(currentTree)
            currentTree = currentTree.get_right()  # getRightChild()

        elif i == ')':
            currentTree = pStack.pop()

        elif i not in ['+', '-', '*', '/', ')']:
            try:
                currentTree.set_value(int(i))  # setRootVal(int(i))
                parent = pStack.pop()
                currentTree = parent

            except ValueError:
                raise ValueError("token '{}' is not a valid integer".format(i))

    return eTree


pt = buildParseTree("( ( 10 + 5 ) * 3 )")
g = draw_graph(pt)
print(pt)
