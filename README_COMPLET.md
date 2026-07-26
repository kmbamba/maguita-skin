# 🌸 Maguita Skin - E-Commerce Complet

## 📋 Vue d'Ensemble

Plateforme e-commerce complète pour **Maguita Skin**, spécialisée dans la vente de gammes complètes de produits cosmétiques Made in Senegal 🇸🇳.

**Slogan:** "Votre teint, notre signature"

---

## ✨ Fonctionnalités Principales

### 🛍️ E-Commerce
- ✅ Catalogue de gammes complètes (pas de vente individuelle)
- ✅ Système de panier
- ✅ Commande avec formulaire détaillé
- ✅ Intégration WhatsApp pour commandes directes
- ✅ Prix dynamiques (promo à 15,000 FCFA / normal à 20,000 FCFA)
- ✅ Toggle promo global et individuel par gamme

### 🔍 Navigation & Recherche
- ✅ Barre de recherche intelligente
- ✅ Filtrage par catégorie (Collagène, Teint Noir, Urgence, Éclat, Autre)
- ✅ Filtrage par promo (Toutes, En promo, Prix normal)
- ✅ Tri (Nom A-Z/Z-A, Prix croissant/décroissant, Plus récentes)

### ⭐ Témoignages Clients
- ✅ Carousel de témoignages sur la page d'accueil
- ✅ Système de notation (étoiles)
- ✅ Gestion admin (approbation, mise en vedette)
- ✅ Association avec gammes

### 📸 Avant/Après
- ✅ Galerie dédiée avec lightbox
- ✅ Comparaison côte à côte
- ✅ Durée du traitement
- ✅ Gestion admin complète

### 📧 Newsletter
- ✅ Formulaire d'inscription élégant
- ✅ Export d'emails pour campagnes
- ✅ Gestion des abonnés (actifs/inactifs)

### 💡 Guide d'Utilisation
- ✅ Section dans chaque page produit
- ✅ 3 étapes claires (Nettoyage, Application, Régularité)
- ✅ Conseils pour meilleurs résultats

### 📄 Pages Informatives
- ✅ À propos (histoire, valeurs, fondatrice)
- ✅ Contact (formulaire + coordonnées)
- ✅ FAQ (21 questions/réponses)
- ✅ Politique de livraison
- ✅ Conditions générales de vente

### 👨‍💼 Admin Panel
- ✅ Dashboard avec statistiques
- ✅ Gestion des gammes (CRUD + upload images)
- ✅ Gestion des commandes (statuts, paiement)
- ✅ Gestion des témoignages
- ✅ Gestion avant/après
- ✅ Gestion newsletter

---

## 🚀 Installation

### Prérequis
- Node.js v16+
- MongoDB 4.4+
- npm ou yarn

### Backend

```bash
cd backend
npm install

# Configurer .env
cp .env.example .env
# Éditer .env avec vos informations

# Démarrer MongoDB (si local)
mongod

# Démarrer le serveur
npm run dev
```

### Frontend

```bash
cd frontend
npm install

# Configurer .env
cp .env.example .env
# Éditer .env si nécessaire

# Démarrer l'application
npm run dev
```

---

## 🔐 Accès Admin

**URL:** `http://localhost:5174/admin/login`

**Identifiants par défaut:**
- Email: `admin@maguitaskin.com`
- Mot de passe: `admin123`

⚠️ **Important:** Changez ces identifiants en production!

---

## 📱 URLs Importantes

### Frontend Public
- Page d'accueil: `http://localhost:5174/`
- Détail gamme: `http://localhost:5174/gamme/:slug`
- Panier/Checkout: `http://localhost:5174/checkout`
- Avant/Après: `http://localhost:5174/before-after`
- À propos: `http://localhost:5174/about`
- Contact: `http://localhost:5174/contact`
- FAQ: `http://localhost:5174/faq`
- Livraison: `http://localhost:5174/shipping`
- CGV: `http://localhost:5174/terms`

### Admin
- Login: `http://localhost:5174/admin/login`
- Dashboard: `http://localhost:5174/admin/dashboard`
- Gammes: `http://localhost:5174/admin/gammes`
- Commandes: `http://localhost:5174/admin/orders`
- Témoignages: `http://localhost:5174/admin/testimonials`
- Avant/Après: `http://localhost:5174/admin/before-after`
- Newsletter: `http://localhost:5174/admin/newsletter`

### Backend API
- Base URL: `http://localhost:5000/api`

---

## 🗄️ Structure de la Base de Données

### Collections MongoDB

#### Gamme
```javascript
{
  name: String,
  slug: String,
  description: String,
  includedItems: [String],
  regularPrice: Number,
  promoPrice: Number,
  isPromoActive: Boolean,
  images: [{url, public_id}],
  category: String,
  inStock: Boolean,
  featured: Boolean
}
```

#### Order
```javascript
{
  orderNumber: String,
  items: [{gamme, quantity, price}],
  totalAmount: Number,
  customer: {name, phone, email, address, city, country},
  status: String,
  paymentStatus: String,
  notes: String
}
```

#### Testimonial
```javascript
{
  name: String,
  location: String,
  rating: Number,
  comment: String,
  gamme: ObjectId,
  image: {url, public_id},
  isApproved: Boolean,
  isFeatured: Boolean
}
```

#### BeforeAfter
```javascript
{
  title: String,
  description: String,
  beforeImage: {url, public_id},
  afterImage: {url, public_id},
  gamme: ObjectId,
  duration: String,
  customerName: String,
  isApproved: Boolean,
  isFeatured: Boolean,
  order: Number
}
```

#### Newsletter
```javascript
{
  email: String,
  isActive: Boolean,
  subscribedAt: Date,
  unsubscribedAt: Date
}
```

#### Admin
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String,
  isActive: Boolean
}
```

---

## 🎨 Design & UI

### Palette de Couleurs
- **Fuchsia Primary:** `#800a43`
- **Gold Accent:** `#d4af37`
- **WhatsApp Green:** `#25D366`
- **Soft Background:** `#FFF5F7`

### Composants Principaux
- Navbar responsive avec recherche
- Hero sections (promo/normal)
- Cards avec hover effects
- Modals pour formulaires
- Carousels pour témoignages
- Lightbox pour galeries
- Filtres avec dropdowns
- Tables admin avec actions

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid adaptatif
- Navigation mobile avec menu hamburger

---

## 📡 API Endpoints

### Gammes
```
GET    /api/gammes              - Liste des gammes
GET    /api/gammes/:slug        - Détail d'une gamme
POST   /api/gammes              - Créer gamme (admin)
PUT    /api/gammes/:id          - Modifier gamme (admin)
DELETE /api/gammes/:id          - Supprimer gamme (admin)
PATCH  /api/gammes/:id/toggle-promo - Toggle promo (admin)
```

### Commandes
```
GET    /api/orders              - Liste commandes (admin)
GET    /api/orders/stats        - Statistiques (admin)
POST   /api/orders              - Créer commande
PATCH  /api/orders/:id/status   - Modifier statut (admin)
```

### Témoignages
```
GET    /api/testimonials                - Témoignages approuvés
GET    /api/testimonials/admin/all      - Tous (admin)
POST   /api/testimonials                - Créer témoignage
PATCH  /api/testimonials/:id/approve    - Approuver (admin)
PATCH  /api/testimonials/:id/feature    - Mettre en vedette (admin)
DELETE /api/testimonials/:id            - Supprimer (admin)
```

### Avant/Après
```
GET    /api/before-after                - Photos approuvées
GET    /api/before-after/admin/all      - Toutes (admin)
POST   /api/before-after                - Créer (admin)
PUT    /api/before-after/:id            - Modifier (admin)
PATCH  /api/before-after/:id/approve    - Approuver (admin)
PATCH  /api/before-after/:id/feature    - Mettre en vedette (admin)
DELETE /api/before-after/:id            - Supprimer (admin)
```

### Newsletter
```
POST   /api/newsletter/subscribe        - S'inscrire
POST   /api/newsletter/unsubscribe      - Se désinscrire
GET    /api/newsletter/subscribers      - Liste inscrits (admin)
DELETE /api/newsletter/:id              - Supprimer inscrit (admin)
```

### Upload
```
POST   /api/upload/gamme/:id            - Upload images gamme (admin)
POST   /api/upload/before-after/:id     - Upload images avant/après (admin)
DELETE /api/upload/gamme/:gammeId/image/:imageId - Supprimer image (admin)
```

### Auth
```
POST   /api/auth/login                  - Connexion admin
GET    /api/auth/me                     - Profil admin
```

---

## 🛠️ Technologies Utilisées

### Frontend
- **React** 18.2.0 - Framework UI
- **React Router DOM** 6.27.0 - Routing
- **Tailwind CSS** 3.4.17 - Styling
- **Axios** 1.7.9 - HTTP client
- **React Icons** 5.4.0 - Icônes
- **React Toastify** 10.0.6 - Notifications
- **Vite** 5.4.14 - Build tool

### Backend
- **Node.js** - Runtime
- **Express** 4.21.2 - Framework web
- **MongoDB** - Base de données
- **Mongoose** 8.9.4 - ODM
- **JWT** - Authentification
- **Bcrypt** - Hashing mots de passe
- **Multer** - Upload fichiers
- **CORS** - Cross-origin
- **Dotenv** - Variables d'environnement

---

## 📦 Scripts Utiles

### Backend

#### Créer un admin
```bash
node backend/scripts/createAdmin.js
```

#### Seed la base de données
```bash
node backend/scripts/seed.js
```

#### Fixer les slugs
```bash
node backend/scripts/fixSlugs.js
```

#### Fixer les images
```bash
node backend/scripts/fixImages.js
```

#### Nettoyer les commandes de test
```bash
node backend/scripts/cleanTestOrders.js
```

#### Tester une commande
```bash
node backend/scripts/testOrder.js
```

---

## 🔒 Sécurité

### Mesures Implémentées
- ✅ JWT pour authentification
- ✅ Hashing bcrypt pour mots de passe
- ✅ Middleware de protection des routes admin
- ✅ Validation des données côté serveur
- ✅ CORS configuré
- ✅ Variables d'environnement pour secrets
- ✅ Sanitization des inputs

### À Faire en Production
- [ ] HTTPS obligatoire
- [ ] Rate limiting
- [ ] Helmet.js
- [ ] Validation renforcée
- [ ] Logs de sécurité
- [ ] Backup automatique BDD
- [ ] Monitoring

---

## 🚀 Déploiement

### Backend (Railway/Render/Heroku)

1. Créer compte sur la plateforme
2. Connecter le repo Git
3. Configurer les variables d'environnement:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Déployer

### Frontend (Vercel/Netlify)

1. Connecter le repo Git
2. Définir build command: `npm run build`
3. Définir output directory: `dist`
4. Configurer variable: `VITE_API_URL=https://votre-backend.com/api`
5. Déployer

### MongoDB (MongoDB Atlas)

1. Créer cluster gratuit
2. Configurer IP whitelist (0.0.0.0/0 pour prod)
3. Créer user database
4. Copier connection string
5. Mettre à jour `MONGODB_URI`

---

## 📞 Contact & Support

**WhatsApp:** +221 71 046 92 41

**Email Admin:** admin@maguitaskin.com

**Pays:** Sénégal 🇸🇳

---

## 📝 Changelog

### v4.0.0 (Janvier 2026)
- ✨ Ajout témoignages clients
- ✨ Ajout galerie avant/après
- ✨ Ajout newsletter
- ✨ Ajout filtrage/tri
- ✨ Ajout guide d'utilisation
- 🎨 Améliorations UI/UX

### v3.0.0 (Décembre 2025)
- ✨ Pages informatives complètes
- ✨ Barre de recherche
- 🐛 Corrections bugs images
- 🐛 Corrections bugs commandes

### v2.0.0 (Novembre 2025)
- ✨ Admin panel complet
- ✨ Gestion commandes
- ✨ Upload d'images
- 🎨 Dashboard amélioré

### v1.0.0 (Octobre 2025)
- 🎉 Version initiale
- ✨ E-commerce de base
- ✨ Panier et checkout
- ✨ Intégration WhatsApp

---

## 🎯 Roadmap Future

### Phase 1 - Q1 2026
- [ ] Application mobile (React Native)
- [ ] Push notifications
- [ ] Programme de fidélité

### Phase 2 - Q2 2026
- [ ] Paiement en ligne (Orange Money, Wave)
- [ ] Suivi de livraison en temps réel
- [ ] Chat en direct

### Phase 3 - Q3 2026
- [ ] Marketplace (permettre d'autres vendeurs)
- [ ] Système d'affiliation
- [ ] Blog et contenu éducatif

---

## 📄 Licence

Propriétaire - Maguita Skin © 2026

Tous droits réservés. Ce code est la propriété de Maguita Skin et ne peut être reproduit, distribué ou utilisé sans autorisation écrite.

---

## 👥 Équipe

**Développement:** Équipe Technique Maguita Skin

**Design:** Équipe Creative Maguita Skin

**Fondatrice:** Maguita Diop

---

## 🙏 Remerciements

Merci à tous nos clients qui nous font confiance pour prendre soin de leur peau.

**"Votre teint, notre signature" 🌸**

---

**Date:** 25 Juillet 2026
**Version:** 4.0.0
**Statut:** ✅ Production Ready
