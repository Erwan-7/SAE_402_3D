# ☥ Égypte - Sarcophage 3D - SAE 402

Ce projet est une expérience immersive en 3D permettant d'explorer un sarcophage anthropomorphe et son environnement funéraire. Il a été réalisé dans le cadre d'un projet collaboratif alliant modélisation 3D sur Blender et développement web moderne avec React et Three.js.

## 🚀 Lien du site hébergé
Retrouvez le projet en ligne ici : **https://seigneur-de-vie.netlify.app**

---

## 📝 Description du projet
L'application propose une scène interactive où l'utilisateur peut observer les détails d'un sarcophage égyptien au pied des pyramides. Le projet met en avant :
* **Le Visage (Le Ka)** : Receptacle de l’énergie vitale, symbolisant l'éveil éternel.
* **Le Corps** : Une "demeure d'éternité" protégée par des symboles divins.
* **L'Environnement** : Des pyramides massives au milieu d'un désert texturé.

## 🛠 Stack Technique
Le projet repose sur les technologies suivantes :
* **Vite** : Environnement de développement et outil de build.
* **React** : Bibliothèque pour la structure de l'interface utilisateur.
* **Three.js / React Three Fiber** : Moteur de rendu 3D pour afficher le fichier `.glb`.
* **Blender** : Logiciel utilisé pour la modélisation, le texturage et l'exportation.

---

## 👥 Équipe et Répartition des tâches
Le projet est le fruit d'un travail d'équipe avec une répartition précise des rôles :

* **Sofiane** : Modélisation du haut du sarcophage (visage et coiffe).
* **Erwan** : Modélisation du bas du sarcophage.
* **Enes** : Modélisation des pyramides.
* **Lucas** : Création du sol, application des textures (sable, pierre) et mise en lumière de la scène.

### Détails Techniques (Blender)
* **Extrusion & Loop Cut** : Utilisés pour donner du volume et affiner les courbes organiques du sarcophage.
* **Bevel (Ctrl+B)** : Appliqué sur les pyramides pour simuler l'érosion des arêtes et ajouter du réalisme.
* **UV Unwrapping** : Dépliage des mailles pour une application précise des textures.

---

## 💻 Installation locale

Suivez ces étapes pour installer et lancer le projet sur votre propre machine :

### 1. Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre système.

### 2. Cloner le dépôt
```bash
git clone [https://github.com/Erwan-7/SAE_402_3D.git](https://github.com/Erwan-7/SAE_402_3D.git)
cd sae_402_3d
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer le projet
```bash
npm run dev
```

## 📂 Structure du Projet

* /public : Contient le modèle 3D principal (Sarcophage.glb).
* /src/components : Contient les composants React pour la scène 3D.
* /src/pages : Les différentes vues de l'application (Accueil, Égypte).
