
# coding: utf-8

# In[3]:



# coding=utf-8

import requests
from bs4 import BeautifulSoup
import re

# Encoding problems
# import urllib.request
# import urllib3

headers = {
# 'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
# 'accept-encoding':'gzip, deflate, br',
#'accept-language':'en-US,en',
# 'upgrade-insecure-requests':'1',
'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
}



def get_frequency(phrase="abracadabrr"):
    url='https://www.google.ru/search?ie=UTF-8&q='+'"'+phrase+'"'
    
    try:
        r = requests.get(url, headers=headers)
        print(r)
        r.raise_for_status()

    except requests.HTTPError:
        print('Sorry!!!', r)
        return -1;

    html=r.text
#     print(html)
    
# Encoding problems 
#     http = urllib3.PoolManager()
#     r = http.request('GET', url)
#     print(r.status)
#     html=r.data

# Encoding problems 
#     with urllib.request.urlopen(url) as f:
#         html = f.read()
    
    
    soup = BeautifulSoup(html, 'html.parser')

    #span that says there is no such phrase
    span = soup.find('span', class_="spell_orig")
    if span: 
        print (span.get_text())

    # div with stats
    div = soup.find(id="resultStats")
    # remove all exept digits from the inner text
    t=div.get_text()
    if div:
        t = re.sub( r'\(.*\)', '', t)
        num = re.sub( r'[^\d]', '', t)
        return (int(num) if num else 0)
    else:
        return -1
    
    
    
    

def get_frequency_y(phrase="abracadabrr"):
    url='http://yandex.ru/search/?text='+'"'+phrase+'"'

    r = requests.get(url, headers=headers)
    r.raise_for_status()
    html = r.text
    
# Encoding problems    
#     http = urllib3.PoolManager()
#     r = http.request('GET', url)
#     print(r.status)
#     html=r.data

# Encoding problems 
#     with urllib.request.urlopen(url) as f:
#         html = f.read()


    soup = BeautifulSoup(html, 'html.parser')
    

    #span that says there is no such phrase
    span = soup.find('div', class_="misspell__message")
    if span: 
        print (span.get_text())

    # div with stats
    div = soup.find('div', class_="serp-adv__found")
    # remove all exept digits from the inner text
    if div:
        t=div.get_text()
        print(t)
        num = re.sub( r'[^\d]', '', t)
        return (int(num) if num else 0)
    else:
        return -1
    
    
# print(get_frequency_y("hello"))
print(get_frequency("hello"))
    


# In[ ]:




