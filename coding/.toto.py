class BinaryTree0034:
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
        t = BinaryTree0034(v)
        if self.left:
            t.left = self.left
        self.left = t
        return t

    def insert_right(self, v):
        t = BinaryTree0034(v)
        if self.right:
            t.right = self.right
        self.right = t
        return t

# ----------------------------------------


def build_tree():
    a = BinaryTree0034('*')
    b = a.insert_left('b')
    b.insert_right('d')

    b.insert_left('x')

    c = a.insert_right('c')
    c.insert_left('e')
    c.insert_right('f')
    return a


t = build_tree()


# VISUALIZATION ----------------------

import matplotlib.pyplot as plt
import matplotlib

import networkx as nx
from networkx.drawing.nx_agraph import write_dot, graphviz_layout


def uid_gen():
    n = 0
    while True:
        n += 1
        yield n


uid = uid_gen()


def show_tree(G):
    plt.rcParams["figure.figsize"] = [10., 5.]
    pos = graphviz_layout(G, prog='dot')

    node_labels = nx.get_node_attributes(G, 'label')

    nx.draw(G, pos, with_labels=True, labels=node_labels, width=1,
            node_size=1000, node_color="orange", alpha=1.0)
    lbls = nx.get_edge_attributes(G, 'label')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=lbls)
#     nx.draw_networkx_nodes(G,pos,node_size=2000, nodelist=['x'])
#     nx.draw_networkx_edges(G, pos, alpha=0.9, width=6, edge_color="orange", edgelist=[(1, 'Petya')])
#     plt.figure(1)

    plt.show()


def build_binary_tree_graph(nx_graph, parent_node_id, tree_node, label_attr='data', edge_label=None):
    if not tree_node:
        return

    node_id = next(uid)
    nx_graph.add_node(node_id, label=getattr(tree_node, label_attr, ''))

    if parent_node_id != None:
        nx_graph.add_edge(parent_node_id, node_id, label=edge_label)

    build_binary_tree_graph(
        nx_graph, node_id, tree_node.left, label_attr, 'left')
    build_binary_tree_graph(
        nx_graph, node_id, tree_node.right, label_attr, 'righ')


def show_binary_tree(t, label_attr='data'):
    G = nx.DiGraph()
    build_binary_tree_graph(G, None, t, label_attr)
    show_tree(G)


# matplotlib.use('MacOSX')
print(matplotlib.get_backend())
show_binary_tree(t, label_attr='value')
