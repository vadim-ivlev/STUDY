class R{
    constructor(size=10){
        this._N = size;
        this._h = {};
        this._q = [];
    }

    delete(k){
        if (k in this._h){
            delete this._h[k];
            this.removeFromQeue(k);
        }
    }

    add(k,v){
        this._h[k]=v;
        this._q.push(k);
    }

    removeTheOldest(){
        if (this._q.length >0){
            delete this._h[this._q.shift()];
        }
    }

    removeFromQeue(k){
        this._q = this._q.filter(v => v !== k)
    }

    makeRecent(k){
        this.removeFromQeue(k);
        this._q.push(k);
    }

    put(k,v){
        this.delete(k);
        if (this._q.length >= this._N){
            this.removeTheOldest();
        }
        this.add(k,v);
    }

    get(k){
        this.makeRecent(k);
        return this._h[k];
    }

}

let r = new R(3);

r.put('a','aa')
r.put('b','bb')
r.put('c','cc')
r.put('d','dd')
console.log(r._q)
r.get('c')
console.log(r._q)