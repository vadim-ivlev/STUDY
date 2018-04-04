# VISUALIZATION ----------------------

import networkx as nx
from networkx.drawing.nx_agraph import write_dot, graphviz_layout
import matplotlib.pyplot as plt

def draw_graph(G):
    plt.rcParams["figure.figsize"] = [10.,5.]
    pos =graphviz_layout(G, prog='dot')
    
    node_labels=nx.get_node_attributes(G,'name')

    
    nx.draw(G,pos, with_labels=True,labels=node_labels, width=2, node_size=1000, node_color="orange",alpha=1.0)
    lbls = nx.get_edge_attributes(G,'label')
    nx.draw_networkx_edge_labels(G, pos, edge_labels = lbls)
#     nx.draw_networkx_nodes(G,pos,node_size=2000, nodelist=['x'])
#     nx.draw_networkx_edges(G, pos, alpha=0.9, width=6, edge_color="orange", edgelist=[(1, 'Petya')])
#     plt.figure(1)
    
    plt.show()



import uuid
# import random



def build_graph(g,parent_g_node,t, edge_label=None):
#     global count
    if not t: return
    
    node= next(uid)  #str(uuid.uuid4())  #random.random()    
    g.add_node(node, name=t.get_value())
    if parent_g_node:
        g.add_edge(parent_g_node,node, label=edge_label)


    left=t.get_left()
    right=t.get_right()

    if left:
        build_graph(g,node, left, 'L')
    
    if right:
        build_graph(g,node, right, 'R')
        
    return node



G=nx.DiGraph()
root=build_graph(G,None,t )

draw_graph(G)
