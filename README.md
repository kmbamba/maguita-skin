# Maguita Skin - E-Commerce Platform

Plateforme e-commerce pour la vente exclusive de gammes complètes de produits cosmétiques.

## 🚀 Stack Technique

- **Frontend**: React.js + Tailwind CSS + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Payment**: Wave/Orange Money Integration
- **Communication**: WhatsApp API

## 📦 Structure du Projet

```
maguita-skin/
├── backend/          # API Node.js/Express
│   ├── models/       # Modèles Mongoose
│   ├── routes/       # Routes API
│   ├── controllers/  # Logique métier
│   ├── middleware/   # Middlewares
│   └── config/       # Configuration
└── frontend/         # Application React
    ├── src/
    │   ├── components/  # Composants React
    │   ├── pages/       # Pages
    │   ├── services/    # Services API
    │   └── utils/       # Utilitaires
    └── public/          # Assets statiques
```

## 🎨 Charte Couleurs

- Fuchsia Principal: `#800a43`
- Doré Accents: `#d4af37`
- Vert WhatsApp: `#25d366`
- Fond Soft: `#faf5f8`

## 💰 Modèle Commercial

- Prix Standard: **20 000 FCFA**
- Prix Promo: **15 000 FCFA**
- Vente exclusive par gammes complètes (pas de vente au détail)

## 📞 Contact

- WhatsApp: +221 71 046 92 41
- Slogan: "Votre teint, notre signature"

## 🛠️ Installation

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Variables d'Environnement

Créer `.env` dans `/backend`:
```
MONGODB_URI=mongodb://localhost:27017/maguita-skin
PORT=5000
JWT_SECRET=your_jwt_secret
WHATSAPP_API_URL=https://wa.me/221710469241
```

## 📄 License

Propriété de Maguita Skin - Made in Senegal 🇸🇳
