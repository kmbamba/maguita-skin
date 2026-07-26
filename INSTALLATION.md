# 🚀 Guide d'Installation - Maguita Skin

## Prérequis

- Node.js (v18 ou supérieur)
- MongoDB (installé localement ou compte MongoDB Atlas)
- npm ou yarn

## 📦 Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd maguita-skin
```

### 2. Installation Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` :

```env
MONGODB_URI=mongodb://localhost:27017/maguita-skin
PORT=5000
JWT_SECRET=votre_secret_jwt_super_securise_changez_moi
NODE_ENV=development

# WhatsApp
WHATSAPP_NUMBER=221710469241

# Cloudinary (optionnel pour les images)
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Initialiser la base de données avec des données de test

```bash
npm run seed
```

Cela créera :
- 3 gammes de test
- Un compte admin par défaut
  - Email: `admin@maguitaskin.com`
  - Mot de passe: `admin123`

### 4. Démarrer le backend

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### 5. Installation Frontend

```bash
cd ../frontend
npm install
```

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Démarrer le frontend

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`

## 🎯 Accès

### Site Public
- URL: `http://localhost:5173`
- Parcourir les gammes, ajouter au panier, passer commande

### Dashboard Admin
- URL: `http://localhost:5173/admin/login`
- Email: `admin@maguitaskin.com`
- Password: `admin123`

## 🛠️ Fonctionnalités Admin

1. **Dashboard** : Statistiques des ventes et commandes
2. **Gestion des Gammes** : 
   - Créer, modifier, supprimer des gammes
   - Activer/désactiver les promos
   - Gérer le stock
3. **Gestion des Commandes** :
   - Voir toutes les commandes
   - Mettre à jour les statuts
   - Contacter les clients via WhatsApp

## 📱 Test de l'Application

1. Ouvrir `http://localhost:5173`
2. Voir les 3 gammes avec le badge "PROMO MAGAL"
3. Cliquer sur une gamme pour voir les détails
4. Ajouter au panier
5. Finaliser la commande
6. Vérifier dans l'admin que la commande est créée

## 🔧 Commandes Utiles

### Backend
```bash
npm run dev      # Démarrer en mode développement
npm start        # Démarrer en production
npm run seed     # Réinitialiser la base de données
```

### Frontend
```bash
npm run dev      # Démarrer en mode développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
```

## 🐛 Problèmes Courants

### MongoDB n'est pas connecté
- Vérifier que MongoDB est lancé : `mongod`
- Ou utiliser MongoDB Atlas et mettre à jour l'URI dans `.env`

### Port déjà utilisé
- Backend : Changer `PORT` dans `.env`
- Frontend : Changer le port dans `vite.config.js`

### Images ne s'affichent pas
- Configurer Cloudinary dans `.env`
- Ou utiliser des URLs de placeholder temporairement

## 🌍 Déploiement

### Backend (Heroku, Railway, Render)
1. Configurer les variables d'environnement
2. Connecter à MongoDB Atlas
3. Déployer

### Frontend (Vercel, Netlify)
1. Build : `npm run build`
2. Configurer `VITE_API_URL` avec l'URL du backend déployé
3. Déployer le dossier `dist`

## 📞 Support

Pour toute question : contact@maguitaskin.com
WhatsApp : +221 71 046 92 41
