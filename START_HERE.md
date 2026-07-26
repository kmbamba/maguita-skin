# 🚀 COMMENCEZ ICI - Maguita Skin

Bienvenue sur le projet **Maguita Skin** ! 

Ce fichier vous guide pour démarrer rapidement.

---

## 📋 Que contient ce projet ?

Une plateforme e-commerce complète pour la vente de gammes de produits cosmétiques avec :
- ✅ Site public responsive
- ✅ Dashboard administration
- ✅ Intégration WhatsApp
- ✅ Paiement mobile (Wave/Orange Money)
- ✅ Système de promo dynamique

---

## ⚡ Démarrage Ultra-Rapide (5 minutes)

### Étape 1 : Vérifier les prérequis
```bash
node --version   # v18 ou supérieur
npm --version    # v9 ou supérieur
```

### Étape 2 : Installer MongoDB
Si pas installé : [Guide MongoDB](https://www.mongodb.com/docs/manual/installation/)

### Étape 3 : Installation

#### Option A : Installation automatique (recommandé)
```bash
npm run install:all
```

#### Option B : Installation manuelle
```bash
# Backend
cd backend
npm install

# Frontend (nouveau terminal)
cd frontend
npm install
```

### Étape 4 : Configuration

#### Backend - Créer `backend/.env`
```env
MONGODB_URI=mongodb://localhost:27017/maguita-skin
PORT=5000
JWT_SECRET=maguita_secret_change_moi
NODE_ENV=development
WHATSAPP_NUMBER=221710469241
FRONTEND_URL=http://localhost:5173
```

#### Frontend - Créer `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

### Étape 5 : Initialiser la base de données
```bash
npm run seed
```

✅ Cela crée :
- 3 gammes de test
- Admin : `admin@maguitaskin.com` / `admin123`

### Étape 6 : Lancer l'application

#### Terminal 1 - Backend
```bash
npm run dev:backend
```

#### Terminal 2 - Frontend
```bash
npm run dev:frontend
```

### Étape 7 : Ouvrir dans le navigateur

- **Site** : http://localhost:5173
- **Admin** : http://localhost:5173/admin/login

---

## 📚 Documentation Disponible

Selon vos besoins, consultez :

| Document | Quand l'utiliser |
|----------|-----------------|
| **QUICK_START.md** | Guide de démarrage détaillé |
| **INSTALLATION.md** | Installation complète pas à pas |
| **DEPLOYMENT.md** | Mettre le site en ligne |
| **TEST_CHECKLIST.md** | Tester toutes les fonctionnalités |
| **PROJECT_SUMMARY.md** | Comprendre le projet en détail |

---

## 🎯 Que faire ensuite ?

### Pour tester
1. ✅ Parcourir le site public
2. ✅ Ajouter des gammes au panier
3. ✅ Passer une commande
4. ✅ Se connecter à l'admin
5. ✅ Créer une nouvelle gamme
6. ✅ Gérer les commandes

### Pour personnaliser
1. 📸 Remplacer les images placeholder
2. 🎨 Ajuster les couleurs dans `tailwind.config.js`
3. 📱 Configurer votre numéro WhatsApp
4. 🏷️ Modifier les textes et descriptions

### Pour déployer
1. 🌍 Suivre le guide **DEPLOYMENT.md**
2. 🔒 Changer les identifiants admin
3. 🚀 Mettre en ligne !

---

## 🆘 Besoin d'aide ?

### Problème : MongoDB ne démarre pas
```bash
# Démarrer MongoDB
mongod

# Ou vérifier le service
sudo systemctl start mongodb
```

### Problème : Port déjà utilisé
Changer le port dans `.env` :
```env
PORT=5001  # Au lieu de 5000
```

### Problème : Packages manquants
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 🎉 Félicitations !

Vous êtes prêt à utiliser **Maguita Skin** !

Pour toute question : +221 71 046 92 41 (WhatsApp)

**Made in Senegal 🇸🇳 with ❤️**
