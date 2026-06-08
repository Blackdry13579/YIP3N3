# 📄 Cahier des Charges — YIP3N3 (MVP)

**Version :** 1.0 — MVP Test  
**Date :** Juin 2026  
**Stack technique :** Supabase (PostgreSQL) en local  
**Support :** Mobile (smartphone)  
**Durée de test :** 1 semaine avec le patron

---

## 1. Contexte & Objectif

Le restaurant YIP3N3 vend du poisson braisé à différents prix (2000 FCFA, 3000 FCFA, 5000 FCFA, etc.). Actuellement, les commandes sont notées dans un cahier papier. L'objectif est de fournir un MVP permettant de digitaliser la prise de commande, le suivi en temps réel, et la génération de rapports de vente, afin de le présenter au patron et de le faire tester pendant une semaine avant développement complet.

---

## 2. Périmètre du MVP

### ✅ Ce qui est dans le MVP (IN)

- Deux rôles utilisateurs : **Patron** et **Serveur/Employé**
- Le patron définit et modifie les prix des poissons
- Prise de commande simple (sur place uniquement)
- Suivi des commandes avec statuts
- Reçu client affichable à l'écran après finalisation
- Notifications push au patron quand une commande est terminée
- Tableau de bord temps réel (total journalier, commandes en cours, commandes terminées)
- Historique des ventes commun
- Export simple (CSV ou PDF) des ventes sur une période choisie
- Classement des poissons les plus vendus (par prix)

### ❌ Ce qui est hors MVP (OUT)

- Livraison et à emporter
- Paiement intégré (Orange Money, etc.)
- Gestion des stocks
- Traçage détaillé par vendeur dans les rapports
- Compte "Cuisine" séparé
- Nom du client (hors numéro de téléphone)
- Application livreur
- Impression thermique directe

---

## 3. Acteurs & Rôles

| Rôle | Identifiant | Droits & Accès |
|------|-------------|----------------|
| **Patron** | ID Admin unique | - Définir/modifier les prix des poissons&lt;br&gt;- Voir l'**historique commun** de toutes les ventes&lt;br&gt;- Consulter le tableau de bord complet&lt;br&gt;- Recevoir les notifications push&lt;br&gt;- Exporter les ventes (CSV/PDF) |
| **Serveur / Employé** | ID différent du patron | - Prendre des commandes&lt;br&gt;- Voir **ses propres commandes**&lt;&lt;br&gt;- Voir le **tableau de bord général** (en cours / terminées / total)&lt;br&gt;- Changer le statut d'une commande&lt;br&gt;- Générer le reçu client |

---

## 4. Fonctionnalités Détaillées

### 4.1 Gestion des prix (Patron uniquement)

- Le patron accède à une interface de gestion des tarifs.
- Il peut **ajouter** un nouveau prix (ex: 2500 FCFA).
- Il peut **modifier** un prix existant.
- Il peut **désactiver** un prix sans supprimer l'historique des anciennes commandes passées à ce prix.
- Les prix modifiés s'appliquent uniquement aux **nouvelles commandes**. Les commandes déjà passées conservent leur prix initial.

### 4.2 Prise de commande (Serveur uniquement)

Lors de la création d'une commande, le serveur saisit :

| Champ | Obligatoire | Détail |
|-------|-------------|--------|
| Prix du poisson | Oui | Sélectionné dans la liste définie par le patron |
| Quantité | Oui | Nombre entier (ex: 2 poissons) |
| Téléphone client | Non | Uniquement si le client paie par mobile money (Orange Money, etc.) |
| Serveur | Auto | Rattaché automatiquement à l'ID du serveur connecté |

**Mode de commande :** "Sur place" uniquement. Pas de choix de mode pour le MVP.

### 4.3 Référence de commande

- Chaque commande se voit attribuer un **code unique de 6 caractères** généré automatiquement par le système.
- Format : alphanumérique (chiffres + lettres majuscules), exemple : `Y7K2M9`, `A4B8C2`.
- Les codes sont **infinis** (pas de séquence chronologique limitée) et **ne se réinitialisent jamais** (pas de remise à zéro quotidienne, hebdomadaire ou mensuelle).

### 4.4 Suivi des commandes & Tableau de bord

**Statuts possibles :**

| Statut | Définition |
|--------|------------|
| **En cours** | Commande créée par le serveur. En attente de préparation/cuisson. |
| **Terminée** | Le serveur a coché "Prêt/Terminée". Le poisson est cuit, payé et servi au client. |

**Tableau de bord visible par le Patron et le Serveur :**

- Liste des commandes **En cours**
- Liste des commandes **Terminées**
- **Total journalier** en FCFA (somme des commandes terminées de la journée)
- **Nombre de poissons vendus par prix** (ex: 5 poissons à 2000 FCFA, 3 poissons à 5000 FCFA)

**Règle :** Le serveur voit ses propres commandes dans l'historique, mais le tableau de bord général (en cours / terminées / total) est commun et visible par tous.

### 4.5 Reçu client

- Le reçu s'affiche automatiquement à l'écran quand le serveur passe une commande au statut **"Terminée"**.
- Contenu du reçu :
  - Référence de la commande (code 6 caractères)
  - Date et heure
  - Quantité et prix unitaire
  - Total de la commande
  - Numéro de téléphone client (si renseigné)
- Le serveur peut **partager** le reçu (PDF, WhatsApp, etc.) ou l'**imprimer** si un périphérique est disponible.

### 4.6 Notifications Push

- **Seul le Patron** reçoit les notifications.
- **Déclencheur :** Une notification est envoyée au patron à chaque fois qu'une commande passe au statut **"Terminée"**.
- **Contenu :** Informations synthétiques (ex: référence commande, montant total).
- Pas de notification pour les commandes "En cours".
- Pas de notification pour les modifications de prix.

### 4.7 Rapports & Export (Patron uniquement)

**Historique :**
- Filtrage par période : Aujourd'hui, Date spécifique, Semaine, Mois.
- Affichage de la liste des commandes terminées avec détail.

**Export (CSV ou PDF simple) :**
- Le patron choisit une période (date début → date fin).
- Le système génère un fichier contenant :
  - Date de la commande
  - Référence
  - Quantité
  - Prix unitaire
  - Total
  - Téléphone client (si disponible)
- **À la fin du fichier :** un classement des **poissons les plus vendus par prix** (ex: 1er — Poisson à 3000 FCFA : 45 vendus, 2ème — Poisson à 2000 FCFA : 30 vendus, etc.).

---

## 5. Règles de Gestion Métier

| Règle | Description |
|-------|-------------|
| RG-01 | Un seul type de produit existe : "Poisson braisé". Pas de choix de type de poisson. |
| RG-02 | Les prix sont définis par le patron et peuvent évoluer selon les périodes. |
| RG-03 | Les commandes en cours peuvent être consultées par le patron et les serveurs. |
| RG-04 | Le passage au statut "Terminée" est manuel et fait par le serveur. |
| RG-05 | Le reçu n'est généré que pour les commandes au statut "Terminée". |
| RG-06 | L'historique des ventes est commun : le patron voit tout, le serveur voit ses propres commandes. |
| RG-07 | Les anciennes commandes conservent le prix appliqué au moment de la vente, même si le patron modifie le tarif ensuite. |
| RG-08 | Les notifications concernent uniquement les commandes terminées. |
| RG-09 | Le numéro de téléphone client est facultatif et sert uniquement à tracer un paiement mobile money. |

---

## 6. Modèle de Données (Schéma Conceptuel)

### Entités principales :

**`users`**  
- Stockage des comptes (Patron et Serveurs).  
- Champs : ID unique, email, mot de passe, rôle (patron/serveur), nom complet.

**`fish_prices`**  
- Tarifs définis par le patron.  
- Champs : ID unique, montant (FCFA), libellé optionnel, actif/inactif, dates de création/modification.

**`orders`**  
- Les commandes.  
- Champs : ID unique, référence (6 caractères alphanumériques), ID du serveur, téléphone client (nullable), statut (en_cours/terminee), montant total, date de création, date de finalisation.

**`order_items`**  
- Les lignes détaillées de chaque commande.  
- Champs : ID unique, ID commande, ID prix appliqué, quantité, prix unitaire (snapshot au moment de la commande), total ligne.

**`notifications`**  
- Historique des notifications envoyées au patron.  
- Champs : ID unique, ID patron, ID commande, message, statut lu/non lu, date d'envoi.

---

## 7. Contraintes Techniques

| Élément | Choix |
|---------|-------|
| Base de données | PostgreSQL via Supabase (instance locale pour le MVP) |
| Authentification | Système intégré Supabase Auth (email/mot de passe) |
| Temps réel | Supabase Realtime pour le tableau de bord |
| Notifications | Web Push ou service de notification simple (à définir selon contraintes techniques du téléphone) |
| Export | Génération côté serveur (CSV ou PDF basique) |
| Hébergement MVP | Local / pas de mise en production pour la semaine de test |

---

## 8. Livrables du MVP

1. **Application mobile fonctionnelle** (PWA ou app hybride) installable sur téléphone.
2. **Base de données Supabase locale** peuplée avec des données de test.
3. **Compte Patron** + **1 ou 2 comptes Serveur** pré-créés pour la démonstration.
4. **Scénario de démo** prêt pour le rendez-vous (créer une commande, la terminer, montrer le reçu, vérifier la notification, consulter le rapport).
5. **Document de feedback** vierge pour le patron (points à améliorer, fonctionnalités manquantes, bugs).

---

## 9. Planning suggéré (Semaine de test)

| Jour | Action |
|------|--------|
| J-2 | Installation chez le patron, création des prix, création des comptes |
| J-1 | Formation rapide (10 min) avec le serveur |
| J1 à J5 | Utilisation réelle, collecte des retours |
| J6 | Analyse des retours, décision : abandonner, itérer, ou passer à la version complète |

---

**Document validé pour développement collaborateur.**  
*Aucune maquette, aucun choix de couleur, aucun code n'est inclus dans ce document.*