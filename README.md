Lancement du serveur BACKEND :

## Clonage du repository
Clonez le repository en installant des dépendances qui sont listées dans le fichier `package.json`

## MySQL

- Téléchargez mysql 

- Creation de la database : utilisez la ligne de code suivante dans MySQL

`CREATE DATABASE groupomania;`

- Remplacer les valeurs dans le fichier config/env.js et dans config/config.json en fonction des infos que vous avez données lors de l'installation de MySQL (username et password)

## Lancement du serveur

- Dans un terminal pointant le dossier back, lancer la ligne suivante pour charger les données initiales de la base de données (le profil admin) :

`node_modules/.bin/sequelize db:seed:all`


- Installer npm 

- Ouvrez un terminal dans le dossier BACK et tapez la ligne suivante pour lancer le serveur:

`nodemon server.js`

- Vous pouvez maintenant lancer la partie FRONTEND (voir les instructions dans le repository front)