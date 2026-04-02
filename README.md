☥ Égypte 3D - Sarcophage & Pyramides
Ce projet est une expérience immersive en 3D permettant d'explorer un sarcophage anthropomorphe et son environnement funéraire (pyramides et désert). Il a été réalisé dans le cadre d'un projet collaboratif alliant modélisation 3D et développement web moderne.

🚀 Lien du site hébergé
Retrouvez le projet en ligne ici : https://seigneur-de-vie.netlify.app/egypt

📝 Description du projet
L'application propose une scène interactive où l'utilisateur peut observer les détails d'un sarcophage égyptien. Le projet met en avant :

La modélisation détaillée du Ka (visage) et du corps du défunt.

Un environnement historique avec des pyramides modélisées sur Blender.

Une interface web fluide permettant la manipulation de la caméra autour du modèle 3D.

🛠 Stack Technique
Le projet utilise les technologies suivantes :

Vite : Pour un environnement de développement ultra-rapide.

React : Pour la structure de l'interface utilisateur.

Three.js / React Three Fiber : Pour le rendu de la scène 3D et du fichier .glb.

Blender : Pour la création et l'exportation des modèles 3D (Sarcophage et Pyramides).

💻 Installation locale
Suivez ces étapes pour installer le projet sur votre propre machine :

1. Prérequis
Assurez-vous d'avoir Node.js installé sur votre ordinateur.

2. Cloner le projet
Bash
git clone https://github.com/[ton-nom-utilisateur]/sae_402_3d.git
cd sae_402_3d
3. Installer les dépendances
Utilisez npm pour installer tous les paquets nécessaires (React, Three.js, etc.) :

Bash
npm install
4. Lancer le projet
Pour démarrer le serveur de développement local :

Bash
npm run dev
Une fois la commande lancée, ouvrez votre navigateur à l'adresse indiquée (généralement http://localhost:5173).

👥 L'Équipe
Sofiane : Modélisation du haut du sarcophage.

Erwan : Modélisation du bas du sarcophage.

Enes : Modélisation des pyramides (utilisation de l'outil Bevel).

Lucas : Environnement, textures, lumière et mise en ligne.

📂 Structure des fichiers 3D
Le modèle principal se trouve dans le dossier public :

public/Sarcophage.glb : Modèle complet exporté depuis Blender.
