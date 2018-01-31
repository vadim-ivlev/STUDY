function print(s) {
    console.log(s);
    if (typeof element !== 'undefined')
        element.html(element.html + s + '<br>\n');
}

class R {
    constructor(n) {
        this.N = n;
        this.h = {};
        this.q = [];
    }

    put(k, v) {
        if (k in this.h) {
            this.h[k] = v;
            this.make_it_recent(k);
            return;
        }

        if (Object.keys(this.h).length >= this.N) {
            this.remove_the_oldest();
        }

        this.h[k] = v;
        this.make_it_recent(k);
    }

    get(k) {
        this.make_it_recent(k);
        return this.h[k];
    }


    make_it_recent(k) {
        const i = this.q.indexOf(k);
        if (i !== -1) {
            this.q.splice(i, 1);
        }
        this.q.push(k);
    }


    remove_the_oldest() {
        if (this.q.length > 0) {
            delete this.h[this.q[0]];
            this.q.shift();
        }
    }

    print() {
        for (let k of this.q) {
            print(`${k} -> ${this.h[k]}`);
        }
        print("------------------");
    }


}

const r = new R(5);
r.put("a", "aa");
r.put("b", "bb");
r.put("c", "cc");
r.put("d", "dd");
r.put("e", "ee");
r.put("f", "ff");
r.print();

r.get("b");
r.print();

r.put("g", "gg");
r.print();

r.put("e", "eee");
r.print();




