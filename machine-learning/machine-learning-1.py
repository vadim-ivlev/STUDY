
# coding: utf-8

# In[2]:

# from IPython.display import YouTubeVideo
# YouTubeVideo('cKxRvEZd3Mw')




# In[14]:

from sklearn  import tree

fs =  [ [130, 'smooth'], [140, 'smooth'], [150, 'bumby'], [170, 'bumpy'] ]
ls = ['apple', 'apple', 'orange', 'orange']

f=[[130,1], [140,1], [150,0], [170,0]]
l=[1, 1, 0, 0]

c=tree.DecisionTreeClassifier()
c=c.fit(f,ls)
print(c.predict([[125, 0]]))
 


# In[26]:

# YouTubeVideo('tNa99PG8hR8', width=600, height=337)


# In[35]:

# Import Dataset
from sklearn.datasets import load_iris
iris = load_iris()
print(iris.feature_names)
print(iris.target_names)
print(iris.data[0:3])
print(iris.target[0:3])


# Training a classifier
# Predict label for new flower
# Visualise the tree
  
