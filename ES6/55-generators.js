function* listPeople(){
    let i=0;
    yield `wes ${i++}`;
    yield `Kate ${i++}`;
    yield `Snikers ${i++}`;
}

const people=listPeople();
console.log(people.next());
console.log(people.next());


const a=[1,2,3,4,5];

function* loop(arr){
    for (let e of arr)
        yield e;
}

const l=loop(a);
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());
console.log(l.next());