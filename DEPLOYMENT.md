# 🚀 Guide de Déploiement - Maguita Skin

## 📋 Prérequis Production

- [ ] Compte MongoDB Atlas (base de données cloud)
- [ ] Compte Cloudinary (pour les images)
- [ ] Compte Vercel ou Netlify (frontend)
- [ ] Compte Railway ou Render (backend)

---

## 🗄️ Étape 1 : MongoDB Atlas

### Créer la base de données

1. Aller sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un compte gratuit
3. Créer un nouveau cluster (Shared - Free)
4. Cliquer sur "Connect" → "Connect your application"
5. Copier l'URI de connexion

**Format :**
```
mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/maguita-skin
```

⚠️ Remplacer `<password>` par votre mot de passe

---

## 📸 Étape 2 : Cloudinary

### Configuration des images

1. Aller sur [cloudinary.com](https://cloudinary.com)
2. Créer un compte gratuit
3. Dashboard → Account Details
4. Noter ces 3 valeurs :
   - `Cloud Name`
   - `API Key`
   - `API Secret`

---

## 🔧 Étape 3 : Déployer le Backend

### Option A : Railway

1. Aller sur [railway.app](https://railway.app)
2. Connecter avec GitHub
3. New Project → Deploy from GitHub repo
4. Sélectionner le dossier `backend`
5. Ajouter les variables d'environnement :

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/maguita-skin
JWT_SECRET=votre_secret_jwt_super_securise_production
NODE_ENV=production
WHATSAPP_NUMBER=221710469241
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
FRONTEND_URL=https://votre-site.vercel.app
PORT=5000
```

6. Deploy → Attendre le build
7. Noter l'URL du backend : `https://votre-app.railway.app`

### Option B : Render

1. Aller sur [render.com](https://render.com)
2. New → Web Service
3. Connecter le repo GitHub
4. Root Directory : `backend`
5. Build Command : `npm install`
6. Start Command : `npm start`
7. Ajouter les variables d'environnement (mêmes que Railway)

---

## 🎨 Étape 4 : Déployer le Frontend

### Option A : Vercel (Recommandé)

1. Aller sur [vercel.com](https://vercel.com)
2. Connecter avec GitHub
3. Import Project → Sélectionner le repo
4. Root Directory : `frontend`
5. Framework Preset : Vite
6. Ajouter variable d'environnement :

```env
VITE_API_URL=https://votre-backend.railway.app/api
```

7. Deploy
8. Votre site est live ! 🎉

### Option B : Netlify

1. Aller sur [netlify.com](https://netlify.com)
2. New site from Git
3. Connecter le repo
4. Base directory : `frontend`
5. Build command : `npm run build`
6. Publish directory : `dist`
7. Environment variables :

```env
VITE_API_URL=https://votre-backend.railway.app/api
```

8. Deploy

---

## 🌱 Étape 5 : Initialiser la Base de Données

### Depuis votre machine locale

```bash
cd backend

# Mettre à jour .env avec l'URI MongoDB Atlas
MONGODB_URI=mongodb+srv://...

# Lancer le seed
npm run seed
```

Ou directement sur Railway/Render (via le terminal intégré) :

```bash
npm run seed
```

---

## ✅ Étape 6 : Vérifications Post-Déploiement

### Backend
- [ ] Accéder à `https://votre-backend.railway.app`
- [ ] Voir le message de bienvenue API
- [ ] Tester `https://votre-backend.railway.app/api/gammes`
- [ ] Vérifier que les 3 gammes sont retournées

### Frontend
- [ ] Accéder à `https://votre-site.vercel.app`
- [ ] Voir les 3 gammes affichées
- [ ] Tester ajout au panier
- [ ] Tester commande complète
- [ ] Tester login admin

### Admin
- [ ] Login avec `admin@maguitaskin.com` / `admin123`
- [ ] Voir le dashboard
- [ ] Créer une nouvelle gamme
- [ ] Voir les commandes

---

## 🔒 Étape 7 : Sécurité Production

### Changer les identifiants par défaut

```bash
# Sur Railway/Render terminal
npm run create-admin
```

Créer un nouvel admin, puis supprimer l'admin par défaut.

### Autres sécurités
- [ ] Changer `JWT_SECRET` pour une valeur aléatoire complexe
- [ ] Activer HTTPS uniquement
- [ ] Configurer CORS pour autoriser uniquement votre domaine
- [ ] Mettre en place rate limiting

---

## 📱 Étape 8 : Configuration WhatsApp Business

1. Créer un compte WhatsApp Business
2. Mettre à jour le numéro dans `.env` backend
3. Tester les redirections

---

## 🎯 Étape 9 : Domaine Personnalisé (Optionnel)

### Acheter un domaine
- Namecheap, GoDaddy, OVH, etc.
- Exemple : `maguitaskin.com`

### Configurer sur Vercel
1. Settings → Domains
2. Add Domain → `maguitaskin.com`
3. Suivre les instructions DNS

### Configurer sur Railway
1. Settings → Domains
2. Custom Domain → `api.maguitaskin.com`
3. Ajouter CNAME dans DNS

---

## 📊 Étape 10 : Monitoring

### Backend (Railway/Render)
- Logs accessibles dans le dashboard
- Alertes d'erreur par email

### Frontend (Vercel/Netlify)
- Analytics intégré
- Monitoring des builds

### Base de données (MongoDB Atlas)
- Metrics dans le dashboard
- Alertes de performance

---

## 🔄 Mise à Jour du Site

### Via GitHub (automatique)

1. Faire les modifications localement
2. Commit et push :

```bash
git add .
git commit -m "Update: description"
git push origin main
```

3. Vercel/Railway redéploient automatiquement ! ✨

---

## 🆘 Dépannage Production

### Backend ne répond pas
```bash
# Vérifier les logs Railway/Render
# Vérifier les variables d'environnement
# Vérifier MongoDB Atlas whitelist IP (0.0.0.0/0 pour tout autoriser)
```

### Frontend ne se connecte pas au backend
```bash
# Vérifier VITE_API_URL dans Vercel
# Vérifier CORS dans backend
# Vérifier que l'URL backend est accessible
```

### Images ne s'uploadent pas
```bash
# Vérifier Cloudinary credentials
# Vérifier taille fichier < 5MB
# Vérifier format (JPG, PNG, WEBP)
```

---

## 💰 Coûts Estimés

| Service | Plan | Coût |
|---------|------|------|
| MongoDB Atlas | Free | 0 € |
| Cloudinary | Free | 0 € |
| Vercel | Hobby | 0 € |
| Railway | Starter | 5$/mois |
| **Total** | | **~5$/mois** |

---

## 🎉 Félicitations !

Votre site Maguita Skin est maintenant en ligne !

- 🌐 Site : `https://votre-site.vercel.app`
- 🔧 Admin : `https://votre-site.vercel.app/admin/login`
- 🚀 API : `https://votre-backend.railway.app`

**Made in Senegal 🇸🇳 with ❤️**
