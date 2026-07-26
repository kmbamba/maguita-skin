# 📅 Guide de Gestion des Promotions - Maguita Skin

## 🎯 Fonctionnement du Système de Promo

Le site affiche automatiquement :
- **Prix Normal** : 20 000 FCFA (quand promo désactivée)
- **Prix Promo** : 15 000 FCFA (quand promo activée)
- **Badge "PROMO MAGAL"** : Affiché uniquement si promo active

---

## 🔧 Comment Gérer les Promos

### Méthode 1 : Promo Globale (Toutes les gammes)

**Via le Dashboard Admin :**

1. Se connecter à `http://localhost:5174/admin/login`
2. Aller dans **Gammes**
3. Utiliser le bouton "Toggle Promo Globale" (à ajouter)

**Via le code :**

```javascript
// Dans GammesManagePage.jsx
const handleGlobalPromo = async (activate) => {
  try {
    await gammeService.toggleGlobalPromo(activate);
    toast.success(activate ? 'Promo activée pour toutes les gammes' : 'Promo désactivée');
    fetchGammes();
  } catch (error) {
    toast.error('Erreur');
  }
};
```

### Méthode 2 : Promo Individuelle (Une gamme)

Dans le dashboard Admin > Gammes :
- Cliquer sur l'icône de toggle promo (🔴/🟢)
- La promo s'active/désactive pour cette gamme uniquement

---

## 📝 Scénarios d'Utilisation

### Scénario 1 : Promo Magal (Événement temporaire)

**Avant l'événement :**
```bash
# Via API ou Dashboard
- Activer promo globale
- Site affiche : 15 000 FCFA avec badge "PROMO MAGAL"
```

**Après l'événement :**
```bash
# Via API ou Dashboard
- Désactiver promo globale
- Site affiche : 20 000 FCFA (prix normal)
- Badge disparaît automatiquement
```

### Scénario 2 : Promo Permanente sur Une Gamme

**Exemple : "Gamme Découverte" toujours en promo**

1. Dashboard Admin > Gammes
2. Modifier la gamme
3. Laisser `isPromoActive: true`
4. Cette gamme sera toujours à 15 000 FCFA

### Scénario 3 : Changer les Prix de Promo

**Si vous voulez 18 000 au lieu de 15 000 :**

1. Dashboard Admin > Gammes
2. Modifier la gamme
3. Changer `promoPrice` de 15000 à 18000
4. Sauvegarder

---

## 🚀 Fonctionnalités Automatiques

### Ce qui se passe automatiquement :

✅ **Affichage du prix correct**
```javascript
// Le système choisit automatiquement :
const currentPrice = gamme.isPromoActive ? gamme.promoPrice : gamme.regularPrice;
```

✅ **Affichage du badge promo**
```javascript
// Badge affiché seulement si :
- isPromoActive === true
- ET regularPrice !== promoPrice
```

✅ **Calcul de la réduction**
```javascript
const discount = gamme.regularPrice - gamme.promoPrice; // 5 000 FCFA
```

✅ **Banner "MEGA PROMO"**
- ✨ **NOUVEAU**: Affiché automatiquement seulement si AU MOINS une gamme a promo active
- ✨ **NOUVEAU**: Se cache automatiquement quand toutes les promos sont désactivées
- ✨ **NOUVEAU**: Si aucune promo, une bannière normale élégante s'affiche à la place

---

## 🛠️ Ajouter le Bouton Toggle Global

Pour faciliter l'activation/désactivation globale, ajoutez ce bouton dans `GammesManagePage.jsx` :

```jsx
<div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-fuchsia-primary">Gestion des Gammes</h1>
  
  <div className="flex gap-4">
    {/* Toggle Promo Globale */}
    <button
      onClick={() => handleGlobalPromo(true)}
      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
    >
      ✅ Activer Promo Globale
    </button>
    <button
      onClick={() => handleGlobalPromo(false)}
      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
    >
      ❌ Désactiver Promo Globale
    </button>
    
    {/* Nouvelle Gamme */}
    <button
      onClick={() => { resetForm(); setShowModal(true); }}
      className="bg-fuchsia-primary text-white px-6 py-3 rounded-lg"
    >
      <FaPlus /> Nouvelle Gamme
    </button>
  </div>
</div>
```

---

## 📊 Cas Pratiques

### Cas 1 : "La Promo Magal est finie"

**Actions :**
1. Se connecter au dashboard
2. Cliquer sur "Désactiver Promo Globale"
3. ✅ Toutes les gammes passent à 20 000 FCFA
4. ✅ Badges disparaissent
5. ✅ Banner "MEGA PROMO" se cache

**Résultat site :**
- ✨ **Bannière normale élégante s'affiche** (au lieu de la bannière promo)
- Prix affichés : 20 000 FCFA
- Pas de prix barré
- Pas de badge promo
- Site en mode normal

### Cas 2 : "Nouvelle Promo Ramadan"

**Actions :**
1. Dashboard > Gammes > Modifier toutes les gammes
2. Changer `promoPrice` à 17 000 FCFA (nouvelle promo)
3. Activer promo globale
4. ✅ Gammes à 17 000 FCFA

**Optionnel :** Changer le texte "PROMO MAGAL" en "PROMO RAMADAN" dans `HeroPromo.jsx`

### Cas 3 : "Promo sur 2 gammes seulement"

**Actions :**
1. Dashboard > Gammes
2. Gamme 1 : Toggle promo ON 🟢
3. Gamme 2 : Toggle promo ON 🟢
4. Gamme 3 : Toggle promo OFF 🔴

**Résultat :**
- Gamme 1 : 15 000 FCFA (avec badge)
- Gamme 2 : 15 000 FCFA (avec badge)
- Gamme 3 : 20 000 FCFA (sans badge)

---

## 🎨 Personnaliser le Texte de Promo

### Changer "PROMO MAGAL" en autre chose

**Fichier :** `frontend/src/components/HeroPromo.jsx`

```jsx
// Ligne 8 : Changer le texte
<div className="inline-block bg-gold-accent text-fuchsia-primary px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
  🔥 PROMO RAMADAN  {/* ← Modifier ici */}
</div>

// Ligne 11 : Changer le titre
<h2 className="text-3xl md:text-5xl font-bold mb-4">
  PROMO EXCEPTIONNELLE RAMADAN  {/* ← Modifier ici */}
</h2>
```

**Fichier :** `frontend/src/components/GammeCard.jsx`

```jsx
// Ligne 30 : Badge sur les cartes
{hasPromo && (
  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
    PROMO RAMADAN  {/* ← Modifier ici */}
  </div>
)}
```

---

## ⚙️ API Endpoints

Pour gérer via code/API :

```bash
# Activer promo globale
PATCH http://localhost:5000/api/gammes/toggle-global-promo
Body: { "isActive": true }

# Désactiver promo globale
PATCH http://localhost:5000/api/gammes/toggle-global-promo
Body: { "isActive": false }

# Toggle promo d'une gamme
PATCH http://localhost:5000/api/gammes/:id/toggle-promo
```

---

## 🤖 Automatisation Future (Optionnel)

### Idée 1 : Promo avec Date de Fin

Ajouter au modèle Gamme :
```javascript
promoEndDate: { type: Date },
```

Vérifier automatiquement :
```javascript
const isPromoValid = gamme.isPromoActive && new Date() < gamme.promoEndDate;
```

### Idée 2 : Scheduler (Cron Job)

```javascript
// Désactiver automatiquement après une date
cron.schedule('0 0 * * *', async () => {
  // Tous les jours à minuit
  await Gamme.updateMany(
    { promoEndDate: { $lt: new Date() } },
    { isPromoActive: false }
  );
});
```

---

## 📞 Support

Pour toute question sur la gestion des promos :
- WhatsApp : +221 71 046 92 41
- Email : admin@maguitaskin.com

**Made in Senegal 🇸🇳 with ❤️**
