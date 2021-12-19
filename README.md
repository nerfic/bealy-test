# bealy-test

![alt text](https://i.gyazo.com/a3358d0968714ed32fe5752f401767d4.gif)

Voici ce que j'ai réalisé pour le test technique.
J'ai fais une erreur dès le départ, au lieu de tout detailler le projet, mes routes, schéma sql etc... je me suis lancer dans le code directement. Ce qui m'a fait perdre énormement de temps.

Ce que j'ai pas pu faire : 

- Sécuriser toutes mes routes sur l'API (vérifier que l'id de la room existe, que le user a bien le droit d'accéder à une room, etc...)
- Historique des fichiers (en réalité il y a un bout de code commencer mais pas terminé car problème, il faut je debug)
- Accorder plus de temps au front pour rendre quelque chose de "sympa"

Petit soucis après la connexion, la redirection sur localhost:3000/ ne se fait pas correctement. Je n'ai jamais utilisé React Router Dom v6, j'avais pour habitude d'utiliser la v5 donc j'ai pas voulu trop m'attarder sur la doc de celle-ci.
Donc une fois connecté, il faut manuellement changer l'url ocalhost:3000/login pour localhost:3000/.

Utilisateurs de test :

Email  | Mot de passe
------------- | -------------
jdll.allan@gmail.com | test
test@gmail.com  | test

Même si je n'ai pas pu tout terminer, j'ai beaucoup appris (j'avais jamais utilisé socket.io) et pris du plaisir à faire.
Merci pour l'attention portée à mon test :)
