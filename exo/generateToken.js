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
    
function generateToken(user) {
  const userInfo = JSON.stringify(user);
  const token = btoa(userInfo);
  return token;
}

const testToken1 = generateToken(users[1]);
console.log(users[1]);
console.log("Token généré :", testToken1);

// source https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa

function verifyToken(token){
  const tokenInfo = atob(token);
  return JSON.parse(tokenInfo);
}

const userInfo = verifyToken(testToken1);
console.log("Utilisateur infos à partir de token :", userInfo);