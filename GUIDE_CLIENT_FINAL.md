# 📱 GUIDE CLIENT - Maguita Skin

**Site Web**: https://maguita-skin.vercel.app  
**Admin**: https://maguita-skin.vercel.app/admin/login

---

## 🔐 CONNEXION ADMIN

**Email**: *(fourni séparément)*  
**Mot de passe**: *(fourni séparément)*

---

## 🎨 GESTION DES GAMMES

### Créer une nouvelle gamme
1. Connexion → **Gammes**
2. Cliquer sur **"+ Nouvelle Gamme"**
3. Remplir:
   - Nom
   - Description
   - Articles inclus (un par ligne)
   - Prix normal et prix promo
   - Catégorie
   - Sélectionner les images
4. Cocher "Promo active" si besoin
5. Cliquer **"Créer"**

### Modifier une gamme
1. Cliquer sur ✏️ à côté de la gamme
2. Modifier les informations
3. Pour **changer l'image**: Sélectionner une nouvelle image (remplacera l'ancienne)
4. Cliquer **"Mettre à jour"**

### Activer/Désactiver une promo
**Option 1 - Une seule gamme**:
- Cliquer sur l'icône toggle (🔘) à côté de la gamme

**Option 2 - Toutes les gammes**:
- Cliquer sur **"✅ Activer Promo Globale"** (active pour toutes)
- Cliquer sur **"❌ Désactiver Promo Globale"** (désactive pour toutes)

---

## 🛒 GESTION DES COMMANDES

### Consulter les commandes
1. Connexion → **Commandes**
2. Filtrer par statut: Toutes / En attente / Confirmée / Livrée

### Changer le statut d'une commande
1. Cliquer sur le menu déroulant dans la colonne "Statut"
2. Choisir:
   - **En attente**: Nouvelle commande
   - **Confirmée**: Commande validée
   - **Livrée**: Commande livrée au client

### Changer le statut de paiement
1. Cliquer sur le menu déroulant dans la colonne "Paiement"
2. Choisir:
   - **En attente**: Pas encore payé
   - **Payée**: Client a payé
   - **Échouée**: Paiement refusé
   - **Remboursée**: Argent rendu au client

### Contacter un client
- Cliquer sur l'icône WhatsApp 📱 à côté de la commande

---

## ⭐ GESTION DES TÉMOIGNAGES

### Approuver un témoignage
1. Connexion → **Témoignages**
2. Voir tous les témoignages soumis
3. Cliquer sur **"Approuver"** pour le rendre visible sur le site
4. Cliquer sur **"Mettre en vedette"** pour le mettre en avant

### Supprimer un témoignage
- Cliquer sur **"Supprimer"** (rouge)

---

## 🔥 GESTION PROMO - GUIDE RAPIDE

### Changer le nom de la promo (ex: PROMO RAMADAN)
1. Connexion → **Paramètres**
2. Section "Configuration de la Promo"
3. Modifier:
   - **Nom Court**: RAMADAN (apparaît sur les badges)
   - **Nom Complet**: MEGA PROMO RAMADAN (apparaît sur la bannière)
   - **Emoji**: 🌙 (choisir un emoji approprié)
4. Cliquer **"Enregistrer"**

### Activer/Désactiver la promo
Voir section "Gestion des Gammes" ci-dessus

---

## 📧 GESTION NEWSLETTER

### Consulter les inscrits
1. Connexion → **Newsletter**
2. Voir la liste de tous les emails inscrits

### Exporter les emails
1. Cliquer sur **"Exporter Emails"**
2. Un fichier .txt se télécharge avec tous les emails actifs
3. Importer dans MailChimp, SendinBlue, etc.

### Supprimer un inscrit
- Cliquer sur **"Supprimer"** à côté de l'email

---

## 🖼️ GESTION BEFORE/AFTER

### Créer un nouveau Before/After
1. Connexion → **Avant/Après**
2. Cliquer **"+ Ajouter Before/After"**
3. Remplir:
   - Titre (ex: "Transformation teint éclatant")
   - Description (optionnel)
   - Gamme utilisée
   - Durée du traitement (ex: "4 semaines")
   - Nom du client (optionnel, ex: "Fatou D.")
4. Sélectionner **2 images**: Avant et Après
5. Cliquer **"Créer"**

### Approuver/Mettre en vedette
- **Approuver**: Rend visible sur le site
- **Mettre en vedette**: Apparaît en premier

---

## 📱 ACCÈS MOBILE

Le dashboard admin fonctionne parfaitement sur téléphone:
1. Ouvrir le navigateur
2. Aller sur: https://maguita-skin.vercel.app/admin/login
3. Se connecter
4. Utiliser le menu hamburger ☰ en haut à droite

---

## ⚠️ IMPORTANT - SÉCURITÉ

### ✅ À FAIRE:
- Changer le mot de passe admin régulièrement
- Ne jamais partager les identifiants
- Se déconnecter après utilisation

### ❌ À NE PAS FAIRE:
- Ne pas donner l'accès admin à tout le monde
- Ne pas utiliser le même mot de passe ailleurs
- Ne pas se connecter sur un WiFi public

---

## 🆘 PROBLÈMES COURANTS

### "Le site ne charge pas"
- **Cause**: Le backend Render s'est endormi (inactif 15 min)
- **Solution**: Attendre 30-60 secondes, rafraîchir la page

### "L'image ne s'affiche pas après upload"
- **Cause**: Temps de traitement Cloudinary
- **Solution**: Attendre 10-20 secondes, rafraîchir la page

### "Je ne vois pas mes changements"
- **Cause**: Cache du navigateur
- **Solution**: Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)

---

## 📞 SUPPORT TECHNIQUE

Pour toute question technique, contacter votre développeur.

**Informations système**:
- Backend: Render.com (Free tier)
- Frontend: Vercel (Free tier)
- Images: Cloudinary
- Base de données: MongoDB Atlas

---

## 🎉 FÉLICITATIONS !

Votre site e-commerce est **100% opérationnel** avec:
- ✅ 4 gammes de produits
- ✅ Système de commandes
- ✅ Gestion des promos
- ✅ Témoignages clients
- ✅ Before/After
- ✅ Newsletter
- ✅ Design responsive (mobile + desktop)
- ✅ Sécurité renforcée
- ✅ Images optimisées

**Bon business ! 🚀**
