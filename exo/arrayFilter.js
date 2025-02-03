//sample users généré par IA
const users = [
    {
      id: 1,
      name: "Alice Dupont",
      email: "alice.dupont@example.com",
      age: 28,
      city: "Paris",
      isActive: true
    },
    {
      id: 2,
      name: "Bob Martin",
      email: "bob.martin@example.com",
      age: 34,
      city: "Lyon",
      isActive: false
    },
    {
      id: 3,
      name: "Charlie Lefevre",
      email: "charlie.lefevre@example.com",
      age: 25,
      city: "Marseille",
      isActive: true
    }
  ];

//source https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

function tableFilter(table, key, ValeurCible, mode) {
    switch (mode) {
        case 'searchApprox':
            return table.filter(item => 
                typeof item[key] === 'string' && 
                item[key].toLowerCase().includes(ValeurCible.toLowerCase())
            );
        case 'valueUnder':
            return table.filter(item => typeof item[key] === 'number' && item[key] < ValeurCible);
        case 'valueOver':
            return table.filter(item => typeof item[key] === 'number' && item[key] > ValeurCible);
        default:
            throw new Error('mode error : searchApprox, valueUnder, valueOver');
    }
}
console.log("- - - - - - - - - - - - - - - - -");
console.log("tableFilter(users, name, Alice Dupont, searchApprox)");
console.log(tableFilter(users, "name", "Alice Dupont", "searchApprox"));
console.log("- - - - - - - - - - - - - - - - -");
console.log("tableFilter(users, city, Lyon, searchApprox)");
console.log(tableFilter(users, "city", "Lyon", "searchApprox"));
console.log("- - - - - - - - - - - - - - - - -");
console.log("tableFilter(users, age, 30, valueUnder)");
console.log(tableFilter(users, "age", 30, "valueUnder"));
console.log("- - - - - - - - - - - - - - - - -");
console.log("tableFilter(users, age, 25, valueOver)");
console.log(tableFilter(users, "age", 25, "valueOver"));