# 🌸 MAGUITA SKIN - E-Commerce Platform

Site e-commerce professionnel pour la vente de produits cosmétiques sénégalais.

## 🚀 Technologies

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Auth:** JWT

## 📦 Structure du Projet

```
maguita-skin/
├── backend/          # API Node.js
├── frontend/         # Application React
├── docs/            # Documentation complète
├── README.md        # Ce fichier
├── DEPLOYMENT.md    # Guide de déploiement
└── GUIDE_CLIENT_GESTION_PROMO.md  # Guide pour le client
```

## 🎯 Fonctionnalités

- ✅ Catalogue produits avec filtres
- ✅ Système de promotions dynamique
- ✅ Panier et commande via WhatsApp
- ✅ Dashboard admin complet
- ✅ Gestion des témoignages
- ✅ Galerie avant/après
- ✅ Newsletter
- ✅ SEO optimisé (10 pages)
- ✅ **Interface admin pour gérer les promos** (nouvelle feature !)
- ✅ Pages informatives (À Propos, Contact, FAQ, etc.)

## 📱 Pages

### Publiques (11)
- Page d'accueil, Détails produit, Panier/Commande
- À Propos, Contact, FAQ
- Politique de Livraison, CGV, Politique de Retour
- Galerie Avant/Après, Page 404

### Admin (7)
- Dashboard, Gestion Gammes, Commandes
- Témoignages, Galerie, Newsletter
- **Paramètres Promo** (nouveau !)

## 🔧 Installation Locale

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Remplir .env avec vos valeurs
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Remplir .env avec vos valeurs
npm run dev
```

## 🚀 Déploiement

Voir **[DEPLOYMENT.md](DEPLOYMENT.md)** pour le guide complet.

**Recommandé:**
- Backend: Render.com
- Frontend: Vercel
- Database: MongoDB Atlas

## 📚 Documentation

### Pour le Développeur
- `DEPLOYMENT.md` - Guide de déploiement
- `PRET_POUR_PRODUCTION.md` - Checklist production
- `COMMENT_CHANGER_PROMO.md` - Modifier les promos dans le code
- `README_FINAL_PRODUCTION.md` - Vue d'ensemble complète

### Pour le Client
- **`GUIDE_CLIENT_GESTION_PROMO.md`** - Comment gérer les promos via l'admin (à donner au client !)

### Archive
Dossier `docs/` - Documentation complète et historique

## 🎁 Nouvelle Fonctionnalité

### Gestion Promo depuis l'Admin

Le client peut maintenant changer le texte des promotions sans toucher au code !

**Accès:** `/admin/settings`

**Fonctionnalités:**
- Modifier nom court, nom complet, emoji
- 5 exemples prédéfinis (Magal, Tabaski, Ramadan, etc.)
- 12 suggestions d'emojis
- Aperçu en temps réel
- Mise à jour instantanée sur tout le site

## 🔐 Sécurité

- JWT Authentication
- Passwords hashed (bcrypt)
- CORS configuré
- Routes admin protégées
- Variables d'environnement sécurisées

## 📞 Contact

**Support Technique:**
- Repository: https://github.com/kmbamba/maguita-skin
- WhatsApp: +221 71 046 92 41

## 📄 License

Projet propriétaire - Tous droits réservés

---

**Made with 💜 in Senegal 🇸🇳**
