# 📸 Intégration des Images Réelles - Maguita Skin

## Images Reçues du Client

### Logo
- `logo-maguita-skin.png` - Logo circulaire avec téléphone

### Gammes (Images Promo)
1. **Gamme Teint Noir** - 2 photos
   - `gamme-teint-noir-1.jpg` - Modèle fond rose avec produits
   - `gamme-teint-noir-2.jpg` - 2 modèles avec produits

2. **Gamme Collagène**
   - `gamme-collagene-1.jpg` - Modèle avec produits roses/rouges

3. **Gamme Urgence**
   - `gamme-urgence-1.jpg` - Modèle avec produits orange

---

## 🚀 Étapes d'Intégration

### Méthode 1 : Upload Manuel (Simple)

1. **Sauvegarder les images envoyées :**
   - Les nommer exactement comme ci-dessus
   - Format : JPG ou PNG

2. **Placer dans le dossier uploads :**
```
backend/uploads/
├── logo-maguita-skin.png
├── gamme-teint-noir-1.jpg
├── gamme-teint-noir-2.jpg
├── gamme-collagene-1.jpg
└── gamme-urgence-1.jpg
```

3. **Mettre à jour via MongoDB :**
```javascript
// Gamme Teint Noir
db.gammes.updateOne(
  { slug: "gamme-teint-noir-eclat" },
  { $set: { 
    images: [
      { url: "/uploads/gamme-teint-noir-1.jpg", public_id: "teint-noir-1" },
      { url: "/uploads/gamme-teint-noir-2.jpg", public_id: "teint-noir-2" }
    ]
  }}
);

// Gamme Collagène
db.gammes.updateOne(
  { slug: "gamme-collagene-ultra-eclat" },
  { $set: { 
    images: [
      { url: "/uploads/gamme-collagene-1.jpg", public_id: "collagene-1" }
    ]
  }}
);

// Gamme Urgence
db.gammes.updateOne(
  { slug: "gamme-urgence-anti-taches" },
  { $set: { 
    images: [
      { url: "/uploads/gamme-urgence-1.jpg", public_id: "urgence-1" }
    ]
  }}
);
```

4. **Logo dans le frontend :**
```bash
# Copier le logo
frontend/public/logo-maguita-skin.png
```

---

### Méthode 2 : Via Dashboard Admin (Recommandé)

1. **Lancer le site**
2. **Se connecter** : http://localhost:5174/admin/login
3. **Gammes** > Cliquer sur une gamme > **Modifier**
4. **Upload** (fonctionnalité à activer)
5. **Sélectionner les images** et sauvegarder

---

## 🔧 Commandes pour Intégration Rapide

### Script PowerShell pour copier les images

```powershell
# Créer le dossier uploads s'il n'existe pas
New-Item -ItemType Directory -Force -Path "backend\uploads"

# Copier les images depuis le dossier du client
# Remplacer [CHEMIN_SOURCE] par le chemin où se trouvent les images
Copy-Item "[CHEMIN_SOURCE]\*teint-noir*.jpg" "backend\uploads\gamme-teint-noir-1.jpg"
Copy-Item "[CHEMIN_SOURCE]\*collagene*.jpg" "backend\uploads\gamme-collagene-1.jpg"
Copy-Item "[CHEMIN_SOURCE]\*urgence*.jpg" "backend\uploads\gamme-urgence-1.jpg"
Copy-Item "[CHEMIN_SOURCE]\logo*.png" "frontend\public\logo-maguita-skin.png"
```

### Script de Mise à Jour Base de Données

Créer `backend/scripts/updateImages.js` :

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gamme from '../models/Gamme.js';

dotenv.config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');

    // Gamme Teint Noir
    await Gamme.updateOne(
      { slug: 'gamme-teint-noir-eclat' },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-teint-noir-1.jpg', public_id: 'teint-noir-1' },
            { url: '/uploads/gamme-teint-noir-2.jpg', public_id: 'teint-noir-2' }
          ]
        }
      }
    );
    console.log('✅ Gamme Teint Noir mise à jour');

    // Gamme Collagène
    await Gamme.updateOne(
      { slug: 'gamme-collagene-ultra-eclat' },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-collagene-1.jpg', public_id: 'collagene-1' }
          ]
        }
      }
    );
    console.log('✅ Gamme Collagène mise à jour');

    // Gamme Urgence
    await Gamme.updateOne(
      { slug: 'gamme-urgence-anti-taches' },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-urgence-1.jpg', public_id: 'urgence-1' }
          ]
        }
      }
    );
    console.log('✅ Gamme Urgence mise à jour');

    console.log('\n🎉 Toutes les images sont mises à jour !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

updateImages();
```

Exécuter :
```bash
cd backend
node scripts/updateImages.js
```

---

## 🎨 Intégrer le Logo

### Dans la Navbar

**Fichier :** `frontend/src/components/Navbar.jsx`

Remplacer le texte par le logo :

```jsx
// Avant
<Link to="/" className="flex flex-col items-center">
  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
    MAGUITA SKIN
  </h1>
  <p className="text-xs md:text-sm text-gold-accent italic">
    Votre teint, notre signature
  </p>
</Link>

// Après
<Link to="/" className="flex items-center gap-3">
  <img 
    src="/logo-maguita-skin.png" 
    alt="Maguita Skin" 
    className="h-16 md:h-20"
  />
  <div className="flex flex-col">
    <p className="text-xs md:text-sm text-gold-accent italic">
      Votre teint, notre signature
    </p>
  </div>
</Link>
```

### Dans le Footer

**Fichier :** `frontend/src/components/Footer.jsx`

```jsx
<div>
  <img 
    src="/logo-maguita-skin.png" 
    alt="Maguita Skin" 
    className="h-24 mb-4"
  />
  <p className="text-sm opacity-90">
    Votre teint, notre signature. <br />
    Made in Senegal 🇸🇳
  </p>
</div>
```

### Favicon

**Fichier :** `frontend/index.html`

```html
<link rel="icon" type="image/png" href="/logo-maguita-skin.png" />
```

---

## ✅ Checklist d'Intégration

- [ ] Copier les 5 images dans les bons dossiers
- [ ] Renommer selon la convention
- [ ] Exécuter script `updateImages.js`
- [ ] Vérifier sur le site que les images s'affichent
- [ ] Mettre à jour le logo dans Navbar
- [ ] Mettre à jour le logo dans Footer
- [ ] Changer le favicon
- [ ] Tester en mode responsive
- [ ] Optimiser les images (compression si > 500KB)

---

## 🔍 Vérification

Après intégration, vérifier :

1. **Page d'accueil** : Les 3 gammes avec vraies images
2. **Page détail** : Galerie d'images fonctionnelle
3. **Logo** : Affiché dans navbar et footer
4. **Favicon** : Logo dans l'onglet du navigateur
5. **Responsive** : Images bien dimensionnées sur mobile

---

## 📊 Optimisation Images (Optionnel)

### Compression

```bash
# Installer outil compression
npm install -g sharp-cli

# Compresser toutes les images
sharp -i "backend/uploads/*.jpg" -o "backend/uploads/optimized/" --quality 85
```

### Format WebP (moderne)

```bash
# Convertir en WebP (plus léger)
sharp -i "backend/uploads/*.jpg" -o "backend/uploads/*.webp" --format webp
```

---

## 📞 Support

Pour toute question sur l'intégration des images :
- WhatsApp : +221 71 046 92 41

**Made in Senegal 🇸🇳 with ❤️**
