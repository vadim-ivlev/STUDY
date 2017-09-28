class Movies extends Array {
    constructor(listName, ...items) {
        super(...items);
        this.name = listName;
        this.my=true;
    }
    add(name, rating) {
        this.push({ name, rating });
    }
    showTop(limit = 10) {
        return this.sort((a, b) => a.rating < b.rating ? 1 : -1).slice(0, limit);
    }

}

const l = new Movies("My Favorite Movies",
    { name: "Bee movie", rating: 10 },
    { name: "Srar Wars", rating: 1 },
    { name: "Virgin Suicides", rating: 7 },
    { name: "King of the road", rating: 8 }
);

l.add("Fantomas", 11);

for (let m of l) {
    console.log(m);
}

console.log(l.showTop(2));

console.log(l);