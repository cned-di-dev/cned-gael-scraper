------------------------

CNED GAEL NodeJS Scraper

------------------------



Installation :
--------------
- Assurez-vous d'avoir téléchargé/installé NodeJS pour Windows : https://nodejs.org (préférez la version LTS)
- Récupérer la dernière version du programme (archive transmise par mail)
- Créer un nouveau dossier dans votre dossier personnel (ex: C:\users\votrecompte)
- Dans ce dossier nouvellement créé, décompresser l'archive
- Votre dossier nouvellement créé doit ressembler à ça :
  - public /
    -- .gitignore
    -- last-step.png
    -- package.json
    -- server.js
    -- readme.txt

Lancement du programme :
------------------------
- Allez dans le menu démarrer > Tous les programmes > Node.js > Node.js command prompt
- Allez dans votre dossier nouvellement créé, en tapant : cd mon-nouveau-dossier
- La première fois, tapez : npm install
- Ensuite, tapez : node server.js
- Normalement, le programme doit retourner : Gael Scraper is running on 127.0.0.1:7777 :)
- Si c'est le cas, ouvrez un navigateur et tapez http://127.0.0.1:7777 ou si votre ordinateur est bien configuré : http://localhost:7777


Utilisation :
-------------
- http://127.0.0.1:7777 (ou http://localhost:7777 ): la liste de l'échantillon d'inscrits
- http://127.0.0.1:7777//userInfo/?id=2-251-56-0007-4 (ou 2-251-56-0007-4 est un identifiant d'inscrit) : permet d'accéder directement à une liste de notes d'inscrit
- http://127.0.0.1:7777//closeSession : pour fermer la session à GAEL (ça reste toujours plus rapide que se logger sur GAEL pour taper BYE)
- http://127.0.0.1:7777//listAllUsers : lance la récupération et l'affichage des copies de tous les inscrits


FAQ :
-----
- Q: Sur la page de notes d'un inscrit, je n'ai ni notes, ni nom, que faire ?
- R: Deux problèmes possibles : soit une session GAEL est déjà ouverte, soit GAEL est HS (Erreur de connexion au serveur TPX).
Dans le premier cas, il faut fermer la session (soit manuellement, soit en allant à l'adresse http://127.0.0.1:7777//closeSession)
