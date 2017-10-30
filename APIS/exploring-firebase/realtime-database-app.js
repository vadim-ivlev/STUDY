(function(){

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBf0HcjdRYF4pFcLb6R7IZ7RhnMOKaSqRI",
            authDomain: "exploring-firebase-project.firebaseapp.com",
            databaseURL: "https://exploring-firebase-project.firebaseio.com",
            projectId: "exploring-firebase-project",
            storageBucket: "exploring-firebase-project.appspot.com",
            messagingSenderId: "912683338910"
        };
        firebase.initializeApp(config);

        const inp=document.getElementById("inp");
        const btn=document.getElementById("btn");
        const info=document.getElementById("info");
        const pre=document.getElementById("pre");
        const ul=document.getElementById("ul");

        const obj=firebase.database().ref().child('object');
        const hobbies = obj.child('hobbies');

        let t0=0;

        btn.addEventListener('click', ev =>{
            t0=Date.now();
            // firebase.database().ref('object/age').set(inp.value);
            obj.child('hobbies').push().set(inp.value);
        });

        obj.on('value', snap =>{
            pre.innerText =  JSON.stringify( snap.val(),null,3 );
        });


        hobbies.on('child_added', snap =>{
            info.innerText=(Date.now()-t0)/1000.;
            const li=document.createElement('li');
            li.id = snap.key;
            li.innerText = snap.val();
            ul.appendChild(li);
        });


        hobbies.on('child_changed', snap =>{
            const li=document.getElementById(snap.key);
            li.innerText = snap.val();
            
        });


        hobbies.on('child_removed', snap =>{
            const li=document.getElementById(snap.key);
            ul.removeChild(li);
        });





}());