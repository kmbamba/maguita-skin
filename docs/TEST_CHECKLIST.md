# ✅ Checklist de Tests - Maguita Skin

## 🧪 Tests Backend (API)

### Configuration
- [ ] MongoDB connecté avec succès
- [ ] Variables d'environnement chargées
- [ ] Serveur démarre sur le port 5000
- [ ] Script seed exécuté sans erreur

### API Gammes
- [ ] GET `/api/gammes` - Liste toutes les gammes
- [ ] GET `/api/gammes/:slug` - Détails d'une gamme
- [ ] POST `/api/gammes` - Créer une gamme (admin)
- [ ] PUT `/api/gammes/:id` - Modifier une gamme (admin)
- [ ] DELETE `/api/gammes/:id` - Supprimer une gamme (admin)
- [ ] PATCH `/api/gammes/:id/toggle-promo` - Basculer promo (admin)
- [ ] PATCH `/api/gammes/toggle-global-promo` - Promo globale (admin)

### API Commandes
- [ ] POST `/api/orders` - Créer une commande
- [ ] GET `/api/orders` - Liste commandes (admin)
- [ ] GET `/api/orders/:id` - Détails commande (admin)
- [ ] PATCH `/api/orders/:id/status` - Mettre à jour statut (admin)
- [ ] GET `/api/orders/stats` - Statistiques (admin)

### API Auth
- [ ] POST `/api/auth/login` - Connexion admin
- [ ] GET `/api/auth/me` - Profil admin (protected)

---

## 🎨 Tests Frontend (UI)

### Pages Publiques

#### Page d'accueil (/)
- [ ] Navbar affichée avec logo
- [ ] Bouton panier avec compteur
- [ ] Banner promo "MEGA PROMO MAGAL" visible
- [ ] Liste des gammes affichée (3 gammes)
- [ ] Badge "PROMO MAGAL" sur chaque carte
- [ ] Prix barré 20 000 FCFA visible
- [ ] Prix promo 15 000 FCFA en gros
- [ ] Boutons WhatsApp et Panier fonctionnels
- [ ] Footer avec coordonnées
- [ ] Bouton WhatsApp flottant en bas à droite

#### Page Détail Gamme (/gamme/:slug)
- [ ] Images de la gamme affichées
- [ ] Galerie d'images fonctionnelle (si plusieurs)
- [ ] Badge promo affiché
- [ ] Prix et réduction visibles
- [ ] Liste complète des articles inclus
- [ ] Bouton "Commander sur WhatsApp" fonctionne
- [ ] Bouton "Ajouter au panier" fonctionne
- [ ] Toast de confirmation s'affiche
- [ ] Bouton retour fonctionne

#### Page Panier (/checkout)
- [ ] Liste des articles du panier
- [ ] Augmenter/diminuer quantité fonctionne
- [ ] Supprimer un article fonctionne
- [ ] Total calculé correctement
- [ ] Formulaire de livraison affiché
- [ ] Tous les champs obligatoires validés
- [ ] Sélection mode de paiement fonctionnelle
- [ ] Bouton de confirmation crée la commande
- [ ] Redirection WhatsApp avec message pré-rempli
- [ ] Panier vidé après commande
- [ ] Message si panier vide

### Pages Admin

#### Login (/admin/login)
- [ ] Formulaire de connexion affiché
- [ ] Validation email/password
- [ ] Message d'erreur si mauvais identifiants
- [ ] Redirection au dashboard après login
- [ ] Token stocké dans localStorage

#### Dashboard (/admin/dashboard)
- [ ] Sidebar avec menu visible
- [ ] 4 cartes de statistiques affichées
- [ ] Total commandes correct
- [ ] Commandes en attente correctes
- [ ] Commandes livrées correctes
- [ ] Revenu total calculé
- [ ] Bouton déconnexion fonctionne

#### Gestion Gammes (/admin/gammes)
- [ ] Tableau des gammes affiché
- [ ] Bouton "Nouvelle Gamme" ouvre le modal
- [ ] Formulaire de création fonctionnel
- [ ] Gamme créée apparaît dans la liste
- [ ] Bouton éditer ouvre le modal pré-rempli
- [ ] Modification sauvegardée
- [ ] Toggle promo on/off fonctionne
- [ ] Badge stock "En stock" / "Rupture"
- [ ] Suppression avec confirmation

#### Gestion Commandes (/admin/orders)
- [ ] Tableau des commandes affiché
- [ ] Filtres par statut fonctionnels
- [ ] Numéro de commande généré (format MSyymmddXXXX)
- [ ] Informations client visibles
- [ ] Téléphone cliquable
- [ ] Changement de statut sauvegardé
- [ ] Bouton WhatsApp ouvre conversation client
- [ ] Montant total correct

---

## 📱 Tests Fonctionnels

### Parcours Client Complet
1. [ ] Ouvrir le site
2. [ ] Voir les 3 gammes avec promo
3. [ ] Cliquer sur "Gamme Collagène"
4. [ ] Voir les détails complets
5. [ ] Ajouter au panier
6. [ ] Vérifier le compteur panier (1)
7. [ ] Ajouter une autre gamme
8. [ ] Vérifier le compteur panier (2)
9. [ ] Aller au checkout
10. [ ] Remplir le formulaire
11. [ ] Confirmer la commande
12. [ ] Vérifier redirection WhatsApp
13. [ ] Vérifier panier vidé

### Parcours Admin Complet
1. [ ] Se connecter
2. [ ] Voir le dashboard
3. [ ] Aller dans Gammes
4. [ ] Créer une nouvelle gamme
5. [ ] Modifier la gamme créée
6. [ ] Désactiver la promo
7. [ ] Réactiver la promo
8. [ ] Aller dans Commandes
9. [ ] Voir la commande du test client
10. [ ] Changer le statut en "Confirmée"
11. [ ] Cliquer sur WhatsApp client
12. [ ] Se déconnecter

---

## 🎯 Tests de Sécurité

- [ ] Routes admin protégées sans token
- [ ] Redirection vers login si non authentifié
- [ ] Token expiré redirige vers login
- [ ] Validation des données côté serveur
- [ ] Protection CORS configurée
- [ ] Mots de passe hashés en BDD

---

## 📊 Tests de Performance

- [ ] Chargement page < 2 secondes
- [ ] Images optimisées
- [ ] Pas de console.log en production
- [ ] Responsive sur mobile
- [ ] Responsive sur tablette
- [ ] Responsive sur desktop

---

## 🐛 Bugs Connus à Tester

- [ ] Panier persiste après refresh (localStorage)
- [ ] Double-clic sur ajouter au panier (toast multiple)
- [ ] Upload d'images > 5MB refusé
- [ ] Formulaire checkout vide bloqué

---

## ✨ Tests Bonus

- [ ] Animation du badge promo
- [ ] Transition des cartes au hover
- [ ] Scrollbar personnalisée
- [ ] Favicon affiché
- [ ] Meta description pour SEO
- [ ] WhatsApp message personnalisé
- [ ] Numéro de commande unique

---

**Date de test :** _______________  
**Testeur :** _______________  
**Version :** 1.0.0  
**Résultat :** ⭐⭐⭐⭐⭐
