# ⚡ Démarrage Rapide - Maguita Skin

## 🚀 Lancement en 5 minutes

### 1️⃣ Installation Backend

```bash
cd backend
npm install
```

### 2️⃣ Configuration Backend

Créer le fichier `.env` dans `/backend` :

```env
MONGODB_URI=mongodb://localhost:27017/maguita-skin
PORT=5000
JWT_SECRET=maguita_skin_secret_2024_changez_moi
NODE_ENV=development
WHATSAPP_NUMBER=221710469241
FRONTEND_URL=http://localhost:5173
```

### 3️⃣ Initialiser la Base de Données

```bash
npm run seed
```

✅ Cela crée :
- 3 gammes de test (Collagène, Teint Noir, Urgence)
- Admin : `admin@maguitaskin.com` / `admin123`

### 4️⃣ Démarrer le Backend

```bash
npm run dev
```

✅ Backend sur : `http://localhost:5000`

### 5️⃣ Installation Frontend

Ouvrir un **nouveau terminal** :

```bash
cd frontend
npm install
```

### 6️⃣ Configuration Frontend

Créer le fichier `.env` dans `/frontend` :

```env
VITE_API_URL=http://localhost:5000/api
```

### 7️⃣ Démarrer le Frontend

```bash
npm run dev
```

✅ Site sur : `http://localhost:5173`

---

## 🎯 Tester l'Application

### Site Public
1. Ouvrir `http://localhost:5173`
2. Voir les 3 gammes avec promo active (15 000 FCFA)
3. Cliquer sur une gamme → Voir détails
4. Ajouter au panier
5. Aller au checkout
6. Remplir le formulaire
7. Confirmer → Redirection WhatsApp

### Dashboard Admin
1. Ouvrir `http://localhost:5173/admin/login`
2. Email : `admin@maguitaskin.com`
3. Password : `admin123`
4. Accéder au dashboard

**Fonctionnalités Admin :**
- 📊 **Dashboard** : Stats en temps réel
- 📦 **Gammes** : Créer, modifier, supprimer, toggle promo
- 🛒 **Commandes** : Gérer statuts, contacter clients

---

## 🎨 Charte Graphique

- Fuchsia Principal : `#800a43`
- Doré Accents : `#d4af37`
- Vert WhatsApp : `#25d366`
- Fond Soft : `#faf5f8`

---

## 📱 WhatsApp Integration

Le bouton WhatsApp redirige vers : `https://wa.me/221710469241`

Pour changer le numéro :
- Backend : `.env` → `WHATSAPP_NUMBER`
- Frontend : Composant `WhatsAppButton.jsx`

---

## 🔑 Identifiants par Défaut

**Admin :**
- Email : `admin@maguitaskin.com`
- Password : `admin123`

⚠️ **IMPORTANT** : Changez ces identifiants en production !

---

## 🐛 Problèmes Courants

### Backend ne démarre pas
```bash
# Vérifier MongoDB
mongod

# Ou installer MongoDB Community Edition
```

### Port 5000 déjà utilisé
Changer dans `backend/.env` :
```env
PORT=5001
```

Puis dans `frontend/.env` :
```env
VITE_API_URL=http://localhost:5001/api
```

### Images ne s'affichent pas
Pour le moment, les images utilisent des placeholders. Pour activer Cloudinary :
1. Créer un compte sur cloudinary.com
2. Ajouter les credentials dans `backend/.env`

---

## 📂 Structure des Fichiers

```
maguita-skin/
├── backend/
│   ├── config/          # Configuration DB
│   ├── controllers/     # Logique métier
│   ├── models/          # Modèles Mongoose
│   ├── routes/          # Routes API
│   ├── middleware/      # Auth, Upload
│   ├── scripts/         # Seed data
│   └── server.js        # Point d'entrée
│
└── frontend/
    ├── src/
    │   ├── components/  # Composants réutilisables
    │   ├── pages/       # Pages
    │   ├── context/     # Context API (Panier)
    │   ├── services/    # API calls
    │   └── layouts/     # Layouts Admin
    └── index.html
```

---

## 🚢 Prochaines Étapes

1. ✅ Tester toutes les fonctionnalités
2. 📸 Ajouter de vraies images des produits
3. 🎨 Personnaliser les couleurs si besoin
4. 📱 Configurer le numéro WhatsApp
5. 🌍 Déployer en production

---

## 📞 Support

- WhatsApp : +221 71 046 92 41
- Email : contact@maguitaskin.com

**Made in Senegal 🇸🇳 with ❤️**
