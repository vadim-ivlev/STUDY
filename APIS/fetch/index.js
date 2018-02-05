const fetch=require('node-fetch');
//import fetch from 'node-fetch';

fetch('https://github.com/')
    .then(response => {
        console.log(response.headers.get('Content-Type'));
        console.log(response.headers.get('Date'));
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.type);
        console.log(response.url);
        return response.text();
    })
    .then(text =>  {
        var a=9;
        console.log(text)}
    )
    .catch(err => console.log(err));
        
    
