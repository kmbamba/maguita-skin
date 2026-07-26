# 🖼️ Test Upload d'Images - Guide de Débogage

## 🐛 Problème Actuel

Quand vous créez une nouvelle gamme avec des images:
- ✅ La gamme est créée
- ❌ Les images ne s'affichent pas (anciennes images ou aucune image)

## 🔍 Modifications Apportées

### 1. Correction de l'URL d'Upload
**AVANT**: `/api/upload/${gammeId}` ❌  
**APRÈS**: `/api/upload/gamme/${gammeId}` ✅

### 2. Ajout de Logs de Débogage
Le système affiche maintenant dans la console du navigateur:
- Nombre d'images à uploader
- Nom et taille de chaque fichier
- URL de l'endpoint
- Statut de la réponse
- Données de réponse ou erreurs

---

## 🧪 Comment Tester

### Étape 1: Ouvrir la Console du Navigateur
```
1. Ouvrir http://localhost:5174/admin
2. Appuyer sur F12 pour ouvrir les outils développeur
3. Aller dans l'onglet "Console"
4. Garder la console ouverte pendant le test
```

### Étape 2: Créer une Nouvelle Gamme avec Image
```
1. Admin > Gammes
2. Cliquer "Nouvelle Gamme"
3. Remplir le formulaire:
   - Nom: "Test Upload"
   - Description: "Test des images"
   - Articles inclus:
     Produit 1
     Produit 2
   - Prix: 20000 / 15000
4. ✅ Sélectionner une ou plusieurs images
5. ✅ Vérifier le message: "X images sélectionnées"
6. Cliquer "Créer"
```

### Étape 3: Regarder la Console
Vous devriez voir des messages comme:
```
📤 Upload de 2 image(s) pour gamme ID: 6a64...
  1. photo1.jpg (245678 bytes)
  2. photo2.jpg (189234 bytes)
📡 URL upload: http://localhost:5000/api/upload/gamme/6a64...
📥 Réponse status: 200
📥 Réponse data: {success: true, message: "2 image(s) uploadée(s)", ...}
```

### Étape 4: Vérifier le Résultat

#### Cas de Succès ✅
```
Console:
  📤 Upload de 2 image(s)...
  📥 Réponse status: 200
  ✅ Images uploadées avec succès

Toast notification:
  ✅ Gamme créée
  ✅ Images uploadées avec succès

Page d'accueil:
  ✅ Nouvelle gamme visible avec les bonnes images
```

#### Cas d'Erreur ❌
```
Console:
  📤 Upload de 2 image(s)...
  📥 Réponse status: 401/403/500
  ❌ Erreur upload: {message: "..."}

Toast notification:
  ✅ Gamme créée
  ⚠️ Gamme créée mais erreur lors de l'upload des images
```

---

## 🔧 Erreurs Possibles et Solutions

### Erreur 1: Status 401 (Non autorisé)
**Cause**: Token admin expiré ou invalide

**Solution**:
```
1. Se déconnecter de l'admin
2. Se reconnecter
3. Réessayer l'upload
```

### Erreur 2: Status 404 (Gamme non trouvée)
**Cause**: ID de gamme invalide

**Solution**:
```
Vérifier dans la console:
- L'ID de la gamme est-il valide?
- La gamme a-t-elle bien été créée?
```

### Erreur 3: Status 500 (Erreur serveur)
**Cause**: Problème backend (dossier uploads, permissions, etc.)

**Solution**:
```
1. Vérifier que le dossier backend/uploads/ existe
2. Vérifier les logs du backend (Terminal 6)
3. Vérifier les permissions du dossier
```

### Erreur 4: Aucun log "📤 Upload"
**Cause**: Les images ne sont pas sélectionnées correctement

**Solution**:
```
Vérifier:
- Le message "X images sélectionnées" s'affiche?
- Les fichiers sont bien des images (.jpg, .png)?
- Le champ input n'est pas vide?
```

---

## 🔍 Commandes de Vérification

### Voir les Gammes en Base de Données
```bash
cd backend
node scripts/testUpload.js
```

Affiche toutes les gammes avec leurs images:
```
📦 Gammes existantes:

- Test Upload (ID: 6a64...)
  Slug: test-upload
  Images: 2
    1. /uploads/image-123456.jpg
    2. /uploads/image-789012.jpg
```

### Vérifier le Dossier Uploads
```bash
dir backend\uploads
```

Doit afficher les fichiers images uploadés.

---

## 🚨 Points de Contrôle

### Avant de Créer la Gamme
- [ ] Console du navigateur ouverte (F12)
- [ ] Images sélectionnées dans le formulaire
- [ ] Message "X images sélectionnées" visible

### Pendant la Création
- [ ] Toast "Gamme créée" apparaît
- [ ] Logs "📤 Upload" dans la console
- [ ] Logs "📥 Réponse" dans la console
- [ ] Toast "Images uploadées" ou message d'erreur

### Après la Création
- [ ] Page d'accueil rafraîchie
- [ ] Nouvelle gamme visible
- [ ] Images correctes affichées (pas les anciennes)

---

## 📝 Informations à Fournir en Cas d'Erreur

Si ça ne fonctionne toujours pas, fournir:

1. **Logs de la console** (copier-coller)
2. **Logs du backend** (Terminal 6)
3. **Résultat de** `node scripts/testUpload.js`
4. **Contenu du dossier** `backend/uploads/`
5. **Screenshots** si possible

---

## 🎯 Résumé des Modifications

### Fichiers Modifiés
1. **`frontend/src/pages/admin/GammesManagePage.jsx`**
   - ✅ Correction URL: `/api/upload/gamme/${id}`
   - ✅ Ajout de logs de débogage complets
   - ✅ Meilleure gestion des erreurs

### Fichiers Créés
1. **`backend/scripts/testUpload.js`**
   - Script pour vérifier les gammes et images en DB

### Fichiers à Vérifier
1. **`backend/routes/uploadRoutes.js`** - Routes OK ✅
2. **`backend/controllers/uploadController.js`** - Controller OK ✅
3. **`backend/middleware/upload.js`** - Multer OK ✅

---

## 🔄 Prochaines Étapes

1. **Tester avec la console ouverte**
2. **Noter les logs affichés**
3. **Vérifier si ça fonctionne maintenant**
4. **Si erreur, me fournir les logs**

---

**Date**: 25 juillet 2026  
**Version**: 2.3.0  
**Statut**: En test avec logs de débogage

**Testez maintenant et regardez la console! 🔍**
