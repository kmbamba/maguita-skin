# 🔥 Comment Changer le Nom de la Promo

## 📍 Problème Résolu
Avant, le texte "PROMO MAGAL" était hardcodé dans 3 fichiers différents. Maintenant tout est centralisé dans **1 seul fichier** !

---

## 🎯 Solution Rapide (2 minutes)

### Étape 1 : Ouvrir le fichier de configuration
```
frontend/src/config/constants.js
```

### Étape 2 : Modifier les textes (ligne 24-32)
```javascript
// Configuration Promo (MODIFIEZ ICI POUR CHANGER LE NOM DE LA PROMO)
export const PROMO_CONFIG = {
  name: 'PROMO MAGAL',           // ← CHANGEZ ICI
  nameFull: 'MEGA PROMO MAGAL',  // ← ET ICI
  emoji: '🔥',                    // ← ET ICI si vous voulez
};
```

### Étape 3 : Enregistrer et c'est tout ! ✅

Le changement s'applique **automatiquement** à :
- ✅ Hero bannière (haut de page d'accueil)
- ✅ Cards produits (badges rouges)
- ✅ Page détails produit (badge promo)

---

## 📝 Exemples de Promos

### Promo Tabaski
```javascript
export const PROMO_CONFIG = {
  name: 'PROMO TABASKI',
  nameFull: 'MEGA PROMO TABASKI',
  emoji: '🐑',
};
```

### Promo Ramadan
```javascript
export const PROMO_CONFIG = {
  name: 'PROMO RAMADAN',
  nameFull: 'MEGA PROMO RAMADAN',
  emoji: '🌙',
};
```

### Soldes d'Été
```javascript
export const PROMO_CONFIG = {
  name: 'SOLDES D\'ÉTÉ',
  nameFull: 'MEGA SOLDES D\'ÉTÉ',
  emoji: '☀️',
};
```

### Black Friday
```javascript
export const PROMO_CONFIG = {
  name: 'BLACK FRIDAY',
  nameFull: 'MEGA BLACK FRIDAY',
  emoji: '⚡',
};
```

### Fête des Mères
```javascript
export const PROMO_CONFIG = {
  name: 'FÊTE DES MÈRES',
  nameFull: 'SPÉCIAL FÊTE DES MÈRES',
  emoji: '💐',
};
```

### Nouvel An
```javascript
export const PROMO_CONFIG = {
  name: 'BONNE ANNÉE',
  nameFull: 'PROMO NOUVEL AN',
  emoji: '🎉',
};
```

---

## 🎨 Personnalisation Avancée

### Changer uniquement l'emoji
Si vous voulez garder "PROMO MAGAL" mais changer l'emoji :
```javascript
export const PROMO_CONFIG = {
  name: 'PROMO MAGAL',
  nameFull: 'MEGA PROMO MAGAL',
  emoji: '🎁',  // ← Changez juste ça
};
```

### Emojis populaires
- 🔥 Feu (urgence, best-seller)
- ⚡ Éclair (rapide, flash)
- 🎁 Cadeau (offre spéciale)
- 💥 Explosion (gros impact)
- ✨ Étoiles (nouveauté, luxe)
- 🎉 Fête (célébration)
- 🌟 Étoile (exclusif)
- 💜 Cœur violet (Maguita Skin)
- 🇸🇳 Drapeau Sénégal (promo locale)

### Texte sans emoji
```javascript
export const PROMO_CONFIG = {
  name: 'PROMO MAGAL',
  nameFull: 'MEGA PROMO MAGAL',
  emoji: '',  // ← Vide = pas d'emoji
};
```

---

## 🔄 Workflow Complet

### En développement (local)
1. Modifier `frontend/src/config/constants.js`
2. Enregistrer le fichier
3. Le site se recharge automatiquement
4. Vérifier sur `http://localhost:5173`

### En production (déployé)
1. Modifier `frontend/src/config/constants.js`
2. Commit et push :
   ```bash
   git add frontend/src/config/constants.js
   git commit -m "Update: Changement promo de Magal vers Tabaski"
   git push origin main
   ```
3. Vercel/Netlify redéploie automatiquement (2-3 min)
4. Vérifier sur `https://www.maguitaskin.com`

---

## ⚙️ Comment Activer/Désactiver la Promo

### Activer la promo (afficher la bannière)
Dans l'**admin dashboard** (`/admin/gammes`), vous pouvez :

1. **Activer la promo globale** (toutes les gammes)
   - Toggle "Promo Globale Active"
   - Toutes les gammes passent en promo

2. **Activer promo par gamme** (certaines gammes)
   - Cliquer "Éditer" sur une gamme
   - Cocher "Promo Active"
   - Enregistrer

### Désactiver la promo
- Toggle "Promo Globale Active" à OFF
- Ou décocher "Promo Active" gamme par gamme

**Note :** Le **nom** de la promo (MAGAL, TABASKI, etc.) se change dans le fichier `constants.js`, mais l'**activation** ON/OFF se fait dans l'admin.

---

## 📍 Où Apparaît le Nom de la Promo ?

### 1. Hero Bannière (haut page d'accueil)
```
🔥 MEGA PROMO MAGAL
Jusqu'à -25% sur toutes nos gammes exclusives
```
Utilise : `PROMO_CONFIG.emoji` + "MEGA" + `PROMO_CONFIG.name`

### 2. Cards Produits (liste gammes)
```
[Badge rouge coin supérieur droit]
🔥 PROMO MAGAL
```
Utilise : `PROMO_CONFIG.emoji` + `PROMO_CONFIG.name`

### 3. Page Détails Produit
```
[Badge rouge sous le titre]
🔥 PROMO MAGAL
```
Utilise : `PROMO_CONFIG.emoji` + `PROMO_CONFIG.name`

---

## ✅ Checklist Changement de Promo

Quand vous changez de promo (ex: Magal → Tabaski), faites ceci :

- [ ] Modifier `PROMO_CONFIG` dans `constants.js`
- [ ] Vérifier page d'accueil (hero bannière)
- [ ] Vérifier cards produits (badges)
- [ ] Vérifier page détail produit (badge)
- [ ] Ajuster les prix promo dans l'admin (si nécessaire)
- [ ] Tester commande WhatsApp (message correct)
- [ ] Commit + push si production
- [ ] Partager sur réseaux sociaux avec nouveau nom

---

## 🔧 Dépannage

### Problème : Le texte ne change pas
**Solution :**
1. Vérifier que vous avez bien enregistré `constants.js`
2. Rafraîchir la page (Ctrl+R ou Cmd+R)
3. Vider le cache (Ctrl+Shift+R ou Cmd+Shift+R)
4. Si en production, attendre 2-3 min le redéploiement

### Problème : Erreur de build
**Cause probable :** Apostrophe non échappée
**Mauvais :**
```javascript
name: 'FÊTE DES MÈRES',  // ❌ Apostrophe dans 'D'ÉTÉ'
```
**Bon :**
```javascript
name: 'FÊTE DES MÈRES',  // ✅ Échappé avec \
```

### Problème : Emoji n'apparaît pas
**Solution :**
- Certains emojis peuvent ne pas être supportés
- Utilisez des emojis standards : 🔥⚡🎁💥✨🎉🌟💜🇸🇳
- Ou utilisez des icons Font Awesome à la place

---

## 📚 Fichiers Modifiés (pour référence technique)

Cette centralisation a modifié ces fichiers :

1. **`frontend/src/config/constants.js`** ← FICHIER PRINCIPAL
   - Ajout de `PROMO_CONFIG` avec name, nameFull, emoji

2. **`frontend/src/components/GammeCard.jsx`**
   - Import de `PROMO_CONFIG`
   - Utilise `{PROMO_CONFIG.emoji} {PROMO_CONFIG.name}`

3. **`frontend/src/components/HeroPromo.jsx`**
   - Import de `PROMO_CONFIG`
   - Utilise `{PROMO_CONFIG.emoji} MEGA {PROMO_CONFIG.name}`

4. **`frontend/src/pages/GammeDetailPage.jsx`**
   - Import de `PROMO_CONFIG`
   - Utilise `{PROMO_CONFIG.emoji} {PROMO_CONFIG.name}`

**Résultat :** Changez 1 fichier → 3 endroits mis à jour automatiquement ! ✅

---

## 💡 Astuce Pro

### Planifier les promos à l'avance
Créez un calendrier de promos sénégalaises :
```
Janvier : Nouvel An
Février : Saint-Valentin  
Mars : Journée de la Femme
Avril : Tabaski (varie selon calendrier lunaire)
Mai : Fête des Mères
Juin : Début d'été
Juillet : Magal de Touba
Août : Soldes d'été
Septembre : Rentrée
Octobre : Tamxarit
Novembre : Black Friday
Décembre : Noël / Fin d'année
```

Avant chaque événement :
1. Changez `PROMO_CONFIG` (5 minutes)
2. Ajustez les prix promo dans l'admin (10 minutes)
3. Activez la promo globale (1 clic)
4. Communiquez sur réseaux sociaux

---

## 📞 Besoin d'Aide ?

**Questions sur les promos ?**
- WhatsApp: +221 71 046 92 41
- Email: contact@maguitaskin.com

**Fichier à modifier :**
`frontend/src/config/constants.js` (ligne 24-32)

---

**Fait avec 💜 au Sénégal 🇸🇳**
**Version : 6.1 - Gestion Promo Centralisée**
**Date : 26 Juillet 2026**
