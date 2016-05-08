# Premier essai serieux de packaging tiddlywiki pour openshift

Ce depot permet de demarrer sur un gear openshift un tiddlywiki nodeJS.

il est fixé sur la version 5.1.11 de tiddlywiki

Les logins mdp par defaut sont :

\<username\>
\<password\>

il est neanmoins possible de les changer au moment du deploiement ou apres le deploiement.

## deploiement  en ligne de commande :

1. installer l'environnement de deploiement rhc : [rhc doc : getting started ](https://developers.openshift.com/getting-started/index.html)

2. aller dans un repertoire approprié genre ~/app_rhc/

3. ` rhc app create tw nodejs-0.10 TW_USER=mon_user TW_PASSWD=mon_passwd --from-code=https://github.com/Grillon/tiddlywiki.git `

..* mon_user et mon_passwd seront les user / passwd de votre choix.

..* tw est le nom choisi pour l'application.

4. un repertoire tw doit avoir été créé il represente le clone de l'application. Vous ne verrez rien d'autres que l'arborescence ci dessous car j'ai indiqué tiddliwiki comme dependance et non comme appli :)

## sauvegarde :

`  rhc save-snapshot tw ` ou tw est le nom de votre application

## changement de mot de passe : 

` rhc set-env TW_PASSWD=mon_nouveau_passwd TW_USER=mon_nouveau_username tw 
  rhc restart tw
		`


## arborescence : 

```

├── deplist.txt
├── LICENSE
├── node_modules
│   └── .gitkeep
├── .openshift
│   ├── action_hooks
│   │   ├── deploy          <----------- IMPORTANT
│   │   └── README.md
│   ├── cron
│   │   ├── daily
│   │   │   └── .gitignore
│   │   ├── hourly
│   │   │   └── .gitignore
│   │   ├── minutely
│   │   │   └── .gitignore
│   │   ├── monthly
│   │   │   └── .gitignore
│   │   ├── README.cron
│   │   └── weekly
│   │       ├── chrono.dat
│   │       ├── chronograph
│   │       ├── jobs.allow
│   │       ├── jobs.deny
│   │       └── README
│   ├── markers
│   │   └── README.md
│   └── README.md
├── package.json <----------------- IMPORTANT
├── README.md
├── .README.md.swp
└── server.js <---------------- IMPORTANT

```

## description des fichiers

### deploy

script lancé par openshift juste avant l'execution de l'application. Dans ce script :

* j'initialise des variables d'environnement temporaires pour simplifier la lecture du script

* j'initialise tiddlywiki (cad que je cree le tiddlywiki.info)

* j'ajoute le plugin francais

* je corrige un bug openshift d'interpretation des slash, cf : [escape des caracteres](https://github.com/ericmiao/TiddlyWiki5/commit/a04ca60a87c560366aad4d3066a7a84100a95a4b)  **merci Eric Miao**

### package.json

certainement le fichier le plus important, il determine le point d'entrée de l'application. Dans notre cas c'est server.js.
J'ai repris le fichier par defaut d'openshift, j'ai lu un peu la doc et ça m'a permis d'eviter de cloner le depot de **Jeremy Ruston**

### server.js

point d'entree de l'application. J'ai repris celui de **Eric Miao** encore merci à lui.
J'y ai ajouté la possibilité de customiser le user/password grace aux variables d'environnement TW_USER et TW_PASSWD.


---
