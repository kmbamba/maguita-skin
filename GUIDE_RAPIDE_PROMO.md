# 🚀 Guide Rapide - Gestion de la Promo

## ✨ Ce Qui a Changé

**AVANT** ❌: La bannière "TOUTES LES GAMMES EN PROMO" s'affichait toujours, même après la fin de la promo.

**MAINTENANT** ✅: La bannière change automatiquement selon l'état des promos!

---

## 📸 Ce Que Vous Verrez

### Quand la PROMO est ACTIVE:
```
🔥 MEGA PROMO MAGAL
TOUTES LES GAMMES EN PROMO
20 000 FCFA → 15 000 FCFA
Économisez 5 000 FCFA !
```
- Bannière rose avec animation
- Prix barrés: ~~20 000~~
- Prix en gros: **15 000 FCFA**
- Badge "PROMO" sur chaque gamme

### Quand la PROMO est FINIE:
```
✨ MAGUITA SKIN
DES GAMMES COMPLÈTES POUR VOTRE BEAUTÉ
⭐ 20 000 FCFA par gamme
```
- Bannière rose élégante (sans animation)
- Prix normal: **20 000 FCFA**
- Pas de prix barré
- Pas de badge "PROMO"

---

## 🎮 Comment Gérer la Promo

### Pour ACTIVER la promo:
1. Aller sur: http://localhost:5175/admin
2. Se connecter (admin@maguitaskin.com / admin123)
3. Cliquer sur "Gammes"
4. Cliquer "Activer Promo Globale" OU
5. Activer promo sur des gammes individuelles
6. ✅ La bannière promo apparaît automatiquement!

### Pour DÉSACTIVER la promo:
1. Aller sur: http://localhost:5175/admin
2. Cliquer sur "Gammes"
3. Cliquer "Désactiver Promo Globale" OU
4. Désactiver promo sur les gammes individuelles
5. ✅ La bannière normale apparaît automatiquement!

---

## 💡 Ce Qu'il Faut Retenir

### Automatique = Pas de Travail Manuel
✅ Vous activez/désactivez la promo
✅ La bannière change TOUTE SEULE
✅ Les prix changent TOUT SEULS
✅ Les badges apparaissent/disparaissent TOUT SEULS

### Toujours Professionnel
✅ Avec promo: Bannière promotionnelle attractive
✅ Sans promo: Bannière élégante normale
✅ Jamais de page vide ou moche

### Facile à Tester
1. Ouvrir le site: http://localhost:5175
2. Regarder la bannière en haut
3. Voir les prix des gammes
4. C'est tout!

---

## 🆘 Questions Fréquentes

### Q: La bannière ne change pas?
**R**: Rafraîchissez la page (F5)

### Q: Je veux changer "MEGA PROMO MAGAL"?
**R**: Voir le fichier `BANNIERE_DYNAMIQUE.md` section "Personnalisation"

### Q: Je veux des prix différents de 15 000?
**R**: Dans l'admin, modifiez le champ `promoPrice` de chaque gamme

### Q: La promo sur 1 seule gamme, ça fonctionne?
**R**: Oui! Si au moins 1 gamme a la promo, la bannière promo s'affiche

---

## 📞 Besoin d'Aide?

WhatsApp: +221 71 046 92 41

---

**Fait avec ❤️ pour Maguita Skin**
