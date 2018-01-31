# coding: utf-8
get_ipython().magic('pinfo %edit')
get_ipython().magic('pinfo %save')
class R:
    
    
    def __init__(self, size=3):
        self.__N=size
        self.__h={}
        self.__q=[]

        
        
    def __remove(self,k):
        if k in self.__h:
            del self.__h[k]
            self.__q.remove(k)
            
 
    def __make_recent(self,k):
        if k in self.__q: 
            self.__q.remove(k)
        self.__q.append(k)

        
    def __append(self,k,v):
        self.__h[k]=v
        self.__q.append(k)

        
    def __remove_oldest(self):
        if len(self.__q) >0:
            k = self.__q.pop(0)
            del self.__h[k]
        
        
    def put(self,k,v):
        self.__remove(k)
        
        if len(self.__h) >= self.__N :
            self.__remove_oldest()
            
        self.__append(k, v)
        
        
    def get(self, k):
        self.__make_recent(k)
        return self.__h[k]
    
    @property
    def q(self):
        return self.__q
        
        
        
r = R(3)
r.put('a','aa')
r.put('b','bb')
r.put('c','cc')
r.put('d','dd')
print(r.q)
r.get('c')
print(r.q)

assert r.q == ['b', 'd', 'c']

    
get_ipython().magic("save 'wu2.py'")
get_ipython().magic('ls ')
ls
r.q
get_ipython().magic('ls')
class R:
    
    
    def __init__(self, size=3):
        self.__N=size
        self.__h={}
        self.__q=[]

        
        
    def __remove(self,k):
        if k in self.__h:
            del self.__h[k]
            self.__q.remove(k)
            
 
    def __make_recent(self,k):
        if k in self.__q: 
            self.__q.remove(k)
        self.__q.append(k)

        
    def __append(self,k,v):
        self.__h[k]=v
        self.__q.append(k)

        
    def __remove_oldest(self):
        if len(self.__q) >0:
            k = self.__q.pop(0)
            del self.__h[k]
        
        
    def put(self,k,v):
        self.__remove(k)
        
        if len(self.__h) >= self.__N :
            self.__remove_oldest()
            
        self.__append(k, v)
        
        
    def get(self, k):
        self.__make_recent(k)
        return self.__h[k]
    
    @property
    def q(self):
        return self.__q
        
        
        
r = R(3)
r.put('a','aa')
r.put('b','bb')
r.put('c','cc')
r.put('d','dd')
print(r.q)
r.get('c')
print(r.q)

assert r.q == ['b', 'd', 'c']

    
get_ipython().magic('ls')
get_ipython().magic("save 'wu2.py'")
get_ipython().magic('ls')
r.q
class R:
    
    
    def __init__(self, size=3):
        self.__N=size
        self.__h={}
        self.__q=[]

        
        
    def __remove(self,k):
        if k in self.__h:
            del self.__h[k]
            self.__q.remove(k)
            
 
    def __make_recent(self,k):
        if k in self.__q: 
            self.__q.remove(k)
        self.__q.append(k)

        
    def __append(self,k,v):
        self.__h[k]=v
        self.__q.append(k)

        
    def __remove_oldest(self):
        if len(self.__q) >0:
            k = self.__q.pop(0)
            del self.__h[k]
        
        
    def put(self,k,v):
        self.__remove(k)
        
        if len(self.__h) >= self.__N :
            self.__remove_oldest()
            
        self.__append(k, v)
        
        
    def get(self, k):
        self.__make_recent(k)
        return self.__h[k]
    
    @property
    def q(self):
        return self.__q
        
        
        
r = R(3)
r.put('a','aa')
r.put('b','bb')
r.put('c','cc')
r.put('d','dd')
print(r.q)
r.get('c')
print(r.q)

assert r.q == ['b', 'd', 'c']

    
get_ipython().magic("save 'wu2.py' 1-60")
