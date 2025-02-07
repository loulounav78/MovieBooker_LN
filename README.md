Bonjour,
Je suis Loris NAVARRO et voici le code du projet MovieBooker.
Le projet est dans le dossier appelé hello-world.
Pour faire fonctionné le projet en local faire :
npm install
mpn run build
rajouter le .env a la racine du dossier hello-world qui doit contenir les variables suivante :
JWT_SECRET=supersecret
TMDB_API_KEY=a710850e0986754245941da67274c627
puis npm run start:prod

Avoir MongoDB et créer DataBase MovieBooker
Modifier app.module pour mettre le lien vers la base mongoDB local.

Le lien vers l'application déployé via render est :
https://moviebooker-ln.onrender.com/api

Les tests d'integrations de marche pas du au fait qu'il ne récupère pas les tokens.
Le test unitaire sur le createReservation ne marche pas du au fait que je créer des objets mongoDB.
