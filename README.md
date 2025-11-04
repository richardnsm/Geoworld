# 🌍 Geoworld — Explorateur de Pays

Une application React qui permet d’explorer les pays du monde grâce à l’API [REST Countries](https://restcountries.com/).  
Tu peux consulter la liste de tous les pays avec leur drapeau, leur région et accéder à une page détaillée pour chacun.

---

## 🚀 Fonctionnalités

- Affiche la liste de tous les pays du monde 🌎  
- Recherche de pays par nom (facile à ajouter si tu veux plus tard) 🔍  
- Détails d’un pays :
  - Drapeau
  - Capitale 🏙️  
  - Région et sous-région 🌐  
  - Population 👥  
  - Pays frontaliers 🚧  

---

## 🧰 Technologies utilisées

- **React + TypeScript**
- **Tailwind CSS** pour le style
- **React Router** pour la navigation entre la liste et les détails
- **REST Countries API v3.1** pour les données

---

## 📁 Structure du projet

```plaintext
src/
├── components/
│   ├── CountryList.tsx       # Liste des pays
│   └── CountryDetails.tsx    # Détails d’un pays
├── App.tsx                   # Routes principales
├── main.tsx                  # Point d’entrée de l’app
└── index.css                 # Styles globaux
