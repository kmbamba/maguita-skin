# ⚡ GUIDE DE DÉMARRAGE RAPIDE - Maguita Skin

## 🎯 Démarrer le projet en 5 minutes

---

## 📋 PRÉREQUIS

Avant de commencer, installez :
- ✅ **Node.js** v18+ ([télécharger](https://nodejs.org))
- ✅ **MongoDB** v6+ ([télécharger](https://mongodb.com/try/download/community))
- ✅ **Git** ([télécharger](https://git-scm.com))
- ✅ Éditeur de code (VS Code recommandé)

---

## 🚀 INSTALLATION EN 4 ÉTAPES

### Étape 1 : Cloner le Projet
```bash
cd C:\Users\hp\Documents
git clone <votre-repo> MAGUITA-SKIN
cd MAGUITA-SKIN
```

### Étape 2 : Installer les Dépendances

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### Étape 3 : Configuration

**Backend - Créer `.env`:**
```bash
cd backend
copy .env.example .env
```

**Éditer `backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/maguita-skin
JWT_SECRET=votre-secret-jwt-unique-et-securise
NODE_ENV=development
```

**Frontend - Créer `.env`:**
```bash
cd ../frontend
copy .env.example .env
```

**Éditer `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Étape 4 : Démarrer MongoDB
```bash
# Windows
mongod

# Ou si service installé, il démarre automatiquement
```

---

## 🎬 LANCER L'APPLICATION

### Ouvrir 2 Terminaux

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# ✅ Serveur: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# ✅ Application: http://localhost:5173
```

---

## 👤 CRÉER UN ADMIN

**Dans un 3ème terminal:**
```bash
cd backend
node scripts/createAdmin.js
```

**Ou manuellement dans MongoDB:**
```javascript
// Via MongoDB Compass ou mongosh
use maguita-skin

db.admins.insertOne({
  email: "admin@maguitaskin.com",
  password: "$2a$10$hashed_password", // Utiliser script
  role: "admin",
  createdAt: new Date()
})
```

**Identifiants par défaut:**
- Email: `admin@maguitaskin.com`
- Password: `admin123`

---

## 🧪 TESTER L'APPLICATION

### 1. Page d'Accueil
Ouvrir: http://localhost:5173

Vérifier:
- ✅ Navbar s'affiche
- ✅ Hero banner visible
- ✅ Gammes listées (ou vide si BD vide)
- ✅ Footer présent

### 2. Admin Dashboard
1. Aller sur: http://localhost:5173/admin/login
2. Login avec: `admin@maguitaskin.com` / `admin123`
3. Vérifier accès au dashboard

### 3. Créer une Gamme de Test
**Dans Admin > Gammes:**
1. Cliquer "Créer une nouvelle gamme"
2. Remplir :
   - Nom: "Gamme Test"
   - Description: "Test"
   - Prix: 25000
   - Catégorie: Collagène
   - Items: ["Savon", "Sérum", "Crème"]
3. Upload image (optionnel)
4. Sauvegarder

### 4. Vérifier Frontend
Retourner sur page d'accueil → La gamme doit apparaître

---

## 📁 STRUCTURE RAPIDE

```
MAGUITA SKIN/
├── backend/                    # API Node.js + Express
│   ├── models/                 # Schémas MongoDB
│   ├── controllers/            # Logique métier
│   ├── routes/                 # Routes API
│   ├── middleware/             # Auth, upload, etc.
│   ├── uploads/                # Images uploadées
│   ├── scripts/                # Scripts utilitaires
│   ├── .env                    # Config (à créer)
│   └── server.js               # Point d'entrée
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/              # Pages routes
│   │   ├── context/            # Context API (Cart, Auth)
│   │   ├── services/           # API calls
│   │   └── layouts/            # Layouts (Admin, Public)
│   ├── public/                 # Assets statiques
│   ├── .env                    # Config (à créer)
│   └── index.html              # HTML de base
│
└── Documentation/              # Guides (ce fichier)
```

---

## 🔧 COMMANDES UTILES

### Backend
```bash
# Démarrer serveur
npm start

# Créer admin
node scripts/createAdmin.js

# Seed BD avec données test
node scripts/seed.js

# Nettoyer uploads
rm -rf uploads/*
```

### Frontend
```bash
# Dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

### MongoDB
```bash
# Se connecter
mongosh

# Changer BD
use maguita-skin

# Lister collections
show collections

# Compter documents
db.gammes.countDocuments()

# Tout supprimer (ATTENTION!)
db.gammes.deleteMany({})
```

---

## 🐛 PROBLÈMES COURANTS

### ❌ "Cannot connect to MongoDB"
**Solution:**
```bash
# Vérifier que MongoDB est démarré
mongod --version

# Redémarrer service MongoDB
# Windows: Services → MongoDB → Restart
```

### ❌ "Port 5000 already in use"
**Solution:**
```bash
# Changer le port dans backend/.env
PORT=5001

# Ou tuer le processus
# Windows: 
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ "Module not found"
**Solution:**
```bash
# Réinstaller dépendances
rm -rf node_modules package-lock.json
npm install
```

### ❌ "CORS error"
**Solution:**
Vérifier que `backend/.env` a:
```env
FRONTEND_URL=http://localhost:5173
```

Et dans `server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
```

### ❌ Images ne s'affichent pas
**Solution:**
1. Vérifier que dossier `backend/uploads` existe
2. Vérifier route `/api/uploads` dans `server.js`
3. Vérifier URL images: `http://localhost:5000/uploads/...`

---

## 📊 DONNÉES DE TEST

### Créer des Données Manuellement

**Gamme Test:**
```javascript
// Via MongoDB Compass ou API
{
  "name": "Gamme Collagène Premium",
  "slug": "gamme-collagene-premium",
  "description": "Pour une peau éclatante et rajeunie",
  "category": "Collagène",
  "regularPrice": 35000,
  "promoPrice": 28000,
  "isPromoActive": true,
  "includedItems": [
    "Savon Gommant au Collagène",
    "Sérum Réparateur",
    "Crème de Jour SPF 30",
    "Crème de Nuit Intensive",
    "Huile Précieuse"
  ],
  "images": [],
  "inStock": true,
  "featured": true
}
```

**Témoignage Test:**
```javascript
{
  "customerName": "Fatou Diop",
  "rating": 5,
  "comment": "Excellente gamme ! Ma peau est transformée en 3 semaines. Je recommande à 100%.",
  "gamme": ObjectId("..."), // ID d'une gamme
  "approved": true,
  "featured": true
}
```

---

## 🎯 PROCHAINES ÉTAPES

Maintenant que tout fonctionne :

1. **Personnaliser** :
   - Modifier couleurs dans `tailwind.config.js`
   - Changer logo dans `public/`
   - Adapter textes

2. **Ajouter du Contenu** :
   - Créer vos gammes via Admin
   - Ajouter vraies images
   - Créer pages About/Contact

3. **Tester** :
   - Parcourir toutes les pages
   - Tester fonctionnalités (panier, commande)
   - Vérifier responsive mobile

4. **Déployer** :
   - Lire `DEPLOYMENT.md`
   - Choisir hébergeur
   - Configurer domaine

---

## 📚 DOCUMENTATION COMPLÈTE

Lire aussi :
- `README_COMPLET.md` - Documentation technique complète
- `RESUME_SESSION_COMPLETE.md` - Toutes les fonctionnalités
- `FONCTIONNALITES_SEO_COMPLETE.md` - Optimisations SEO
- `OPTIMISATIONS_FINALES.md` - Améliorations avancées
- `DEPLOYMENT.md` - Guide déploiement production

---

## 💡 ASTUCES

### Développement Rapide

**Auto-reload Backend (nodemon):**
```bash
npm install -g nodemon
nodemon server.js
```

**Ouvrir VS Code:**
```bash
code .
```

**Extensions VS Code Recommandées:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (tester API)
- Prettier

### Raccourcis Clavier

**VS Code:**
- `Ctrl + P` : Recherche fichier
- `Ctrl + Shift + F` : Recherche globale
- `Ctrl + /` : Commenter ligne
- `Alt + Shift + F` : Formater code

**Chrome DevTools:**
- `F12` : Ouvrir DevTools
- `Ctrl + Shift + M` : Mode mobile
- `Ctrl + Shift + C` : Inspect element

---

## 🎉 FÉLICITATIONS !

Vous avez maintenant Maguita Skin qui tourne localement ! 🚀

**Prêt à vendre ? Déployez ! 📦**

---

## 📞 BESOIN D'AIDE ?

**Problème technique ?**
1. Vérifier les logs (terminal backend/frontend)
2. Consulter la documentation
3. Chercher l'erreur sur Google/Stack Overflow

**Contact Support:**
- WhatsApp: +221 71 046 92 41
- Email: contact@maguitaskin.com

**Bon développement ! 💜**

Made in Senegal 🇸🇳
