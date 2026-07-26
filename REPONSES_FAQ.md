# ❓ FAQ - Questions Fréquentes Maguita Skin

## 📸 Images

### Q: Les images ne s'affichent pas, que faire ?

**R:** Le projet utilise maintenant des images de démonstration depuis Unsplash. Pour utiliser vos propres images :

**Option 1 : Images locales (simple)**
1. Placez vos images dans `backend/uploads/`
2. Nommez-les : `gamme-collagene-1.jpg`, etc.
3. Dans le dashboard admin, modifiez l'URL des images

**Option 2 : Cloudinary (recommandé pour production)**
1. Créer un compte sur cloudinary.com
2. Ajouter les credentials dans `backend/.env` :
```env
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```
3. Modifier `backend/middleware/upload.js` pour utiliser Cloudinary
4. Redémarrer le backend

**Option 3 : Changer les URLs dans la base de données**
```bash
# Ouvrir MongoDB
mongo maguita-skin

# Modifier une gamme
db.gammes.updateOne(
  { name: "Gamme Collagène Ultra-Éclat" },
  { $set: { "images.0.url": "https://votre-url-image.jpg" } }
)
```

---

## 🎯 Gestion des Promos

### Q: Comment désactiver la promo après le Magal ?

**R:** Méthode ultra-simple :

1. Se connecter au dashboard : http://localhost:5174/admin/login
2. Aller dans **Gammes**
3. Cliquer sur **"❌ Désactiver Promo Globale"**
4. ✅ Terminé ! Toutes les gammes passent à 20 000 FCFA

**Alternative manuelle :**
- Cliquer sur le toggle promo (🟢/🔴) pour chaque gamme individuellement

### Q: Le badge "PROMO MAGAL" reste affiché ?

**R:** Le badge disparaît automatiquement quand :
- `isPromoActive = false`
- OU quand `regularPrice === promoPrice`

Si le problème persiste :
1. Vérifier dans le dashboard que la promo est bien désactivée
2. Rafraîchir le navigateur (Ctrl+F5)
3. Vider le cache du navigateur

### Q: Comment changer les prix de promo (15 000 → 18 000) ?

**R:** Dashboard > Gammes > Modifier la gamme :
1. Changer `Prix Promo` de 15000 à 18000
2. Sauvegarder
3. La gamme affiche maintenant 18 000 FCFA en promo

### Q: Comment créer une promo "Ramadan" avec d'autres prix ?

**R:** 2 étapes simples :

**1. Changer les prix :**
- Dashboard > Gammes > Modifier chaque gamme
- Prix Promo : 17 000 (par exemple)
- Activer promo globale

**2. Changer le texte :**
- Fichier `frontend/src/components/HeroPromo.jsx`
- Ligne 8 : Changer "PROMO MAGAL" → "PROMO RAMADAN"
- Sauvegarder et rafraîchir

---

## 🛒 Commandes & WhatsApp

### Q: Les commandes WhatsApp fonctionnent ?

**R:** Oui ! Le bouton redirige vers :
```
https://wa.me/221710469241?text=Message
```

Pour changer le numéro :
1. Backend : `.env` → `WHATSAPP_NUMBER=votre_numero`
2. Frontend : `WhatsAppButton.jsx` ligne 4

### Q: Comment voir les commandes passées ?

**R:** Dashboard Admin > Commandes
- Liste complète des commandes
- Filtres par statut (en attente, confirmée, livrée)
- Contacter le client via WhatsApp

### Q: Le panier se vide après refresh ?

**R:** Non ! Le panier est sauvegardé dans `localStorage` :
- Persiste après rafraîchissement
- Disponible même après fermeture du navigateur
- Vidé uniquement après validation de commande

---

## 🔐 Administration

### Q: Comment créer un nouveau compte admin ?

**R:** 2 méthodes :

**Méthode 1 : Via script (recommandé)**
```bash
cd backend
npm run create-admin
# Suivre les instructions
```

**Méthode 2 : Manuellement via MongoDB**
```javascript
// Le mot de passe sera hashé automatiquement
{
  username: "manager",
  email: "manager@maguitaskin.com",
  password: "password123",
  role: "admin"
}
```

### Q: Mot de passe admin oublié ?

**R:** Réinitialiser via MongoDB :
```bash
cd backend
node scripts/resetPassword.js
# Entrer l'email de l'admin
```

Ou créer un nouveau compte admin avec `npm run create-admin`

### Q: Comment supprimer le compte admin par défaut ?

**R:** Après avoir créé un nouveau compte :

Via Dashboard : (à implémenter)
Via MongoDB :
```javascript
db.admins.deleteOne({ email: "admin@maguitaskin.com" })
```

---

## 🌐 Déploiement & Production

### Q: Comment mettre le site en ligne ?

**R:** Suivre le guide complet : **DEPLOYMENT.md**

Résumé rapide :
1. MongoDB Atlas (base de données cloud)
2. Railway/Render (backend)
3. Vercel/Netlify (frontend)
4. Total : ~5$/mois

### Q: Le site est-il sécurisé pour la production ?

**R:** Oui, avec ces précautions :

✅ **Déjà implémenté :**
- Mots de passe hashés (bcrypt)
- JWT pour authentification
- CORS configuré
- Validation des données

⚠️ **À faire avant production :**
1. Changer `JWT_SECRET` dans `.env`
2. Supprimer compte admin par défaut
3. Configurer HTTPS uniquement
4. Limiter tentatives de connexion (rate limiting)

### Q: Les images fonctionneront en production ?

**R:** Deux options :

**Option 1 : Cloudinary (recommandé)**
- Upload automatique
- CDN mondial rapide
- Gratuit jusqu'à 25GB

**Option 2 : Serveur de fichiers**
- Stocker dans `/uploads`
- Servir via Express
- Prévoir backup régulier

---

## 💾 Base de Données

### Q: Comment réinitialiser la base de données ?

**R:**
```bash
cd backend
npm run seed
```

⚠️ **Attention** : Cela supprime TOUTES les données !

### Q: Comment faire un backup de la BDD ?

**R:** Avec MongoDB :
```bash
# Backup
mongodump --db maguita-skin --out ./backup

# Restaurer
mongorestore --db maguita-skin ./backup/maguita-skin
```

### Q: Comment ajouter des données de test ?

**R:** Modifier `backend/scripts/seed.js` et ajouter vos gammes, puis :
```bash
npm run seed
```

---

## 🐛 Bugs & Erreurs

### Q: Erreur "MongoDB connection failed" ?

**R:** Vérifier que MongoDB est lancé :
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongodb

# Vérifier le service
Get-Service -Name MongoDB
```

Si le problème persiste, changer dans `.env` :
```env
MONGODB_URI=mongodb://127.0.0.1:27017/maguita-skin
```

### Q: Erreur "Port already in use" ?

**R:** Un autre processus utilise le port :

**Backend (5000) :**
```bash
# Trouver le processus
netstat -ano | findstr :5000

# Tuer le processus (Windows)
taskkill /PID <PID> /F
```

Ou changer le port dans `.env` :
```env
PORT=5001
```

### Q: Le frontend ne se connecte pas au backend ?

**R:** Vérifier :
1. Backend lancé ? → http://localhost:5000
2. `.env` frontend correct ?
```env
VITE_API_URL=http://localhost:5000/api
```
3. CORS activé dans `backend/server.js` ?

### Q: "Cannot find module" après installation ?

**R:**
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Mobile & Responsive

### Q: Le site est-il responsive ?

**R:** Oui ! Testé sur :
- ✅ Mobile (320px+)
- ✅ Tablette (768px+)
- ✅ Desktop (1024px+)

Design **Mobile First** selon le cahier des charges.

### Q: Comment tester sur mobile ?

**R:** 3 options :

**Option 1 : DevTools du navigateur**
- F12 → Mode responsive
- Sélectionner iPhone, Samsung, etc.

**Option 2 : Sur votre téléphone**
```bash
npm run dev:frontend -- --host
# Accéder via : http://[votre-ip]:5174
```

**Option 3 : Tunnel (ngrok)**
```bash
ngrok http 5174
# Accéder via l'URL ngrok
```

---

## 🎨 Personnalisation

### Q: Comment changer les couleurs du site ?

**R:** Fichier `frontend/tailwind.config.js` :
```javascript
colors: {
  fuchsia: {
    primary: '#800a43',  // Changer ici
  },
  gold: {
    accent: '#d4af37',   // Changer ici
  }
}
```

### Q: Comment changer le logo ?

**R:** 
1. Ajouter votre logo dans `frontend/public/logo.svg`
2. Dans `Navbar.jsx`, remplacer le texte par :
```jsx
<img src="/logo.svg" alt="Maguita Skin" className="h-10" />
```

### Q: Comment ajouter une nouvelle gamme ?

**R:** Dashboard Admin > Gammes > Nouvelle Gamme :
1. Nom de la gamme
2. Description
3. Articles inclus (un par ligne)
4. Prix normal et promo
5. Catégorie
6. Sauvegarder

---

## 📊 Statistiques

### Q: Comment voir les statistiques de vente ?

**R:** Dashboard Admin > Dashboard :
- Total des commandes
- Commandes en attente
- Commandes livrées
- Revenu total

### Q: Comment exporter les commandes en Excel ?

**R:** (À implémenter) Via l'API :
```bash
GET http://localhost:5000/api/orders?format=csv
```

---

## 🔄 Mises à Jour

### Q: Comment mettre à jour le site après modifications ?

**R:** 

**En local :**
1. Modifier le code
2. Sauvegarder (Hot reload automatique)

**En production :**
1. Commit + Push GitHub
2. Vercel/Railway redéploient automatiquement

### Q: Comment ajouter de nouvelles fonctionnalités ?

**R:** Consulter :
- `PROJECT_SUMMARY.md` → Architecture
- `frontend/src/` → Composants React
- `backend/` → API endpoints

Ou demander de l'aide : +221 71 046 92 41

---

## 📞 Support

**Besoin d'aide ?**
- 📱 WhatsApp : +221 71 046 92 41
- 📧 Email : contact@maguitaskin.com
- 📚 Documentation : Tous les fichiers `.md`

**Made in Senegal 🇸🇳 with ❤️**
