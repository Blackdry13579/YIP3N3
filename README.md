# YIP3N3 — MVP Application Mobile

> Le goût authentique du poisson braisé de Koudougou 🐟🔥

Application mobile de gestion des commandes pour le restaurant YIP3N3. Permet la prise de commande, le suivi en temps réel, la gestion des prix et la génération de rapports de vente.

---

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- [Git](https://git-scm.com/)
- Un smartphone Android ou iOS
- L'application **Expo Go** installée sur ton téléphone

---

## 1. Installer Expo Go sur ton téléphone

| Plateforme | Lien |
|------------|------|
| Android | [Télécharger sur Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) |
| iOS | [Télécharger sur l'App Store](https://apps.apple.com/app/expo-go/id982107779) |

---

## 2. Cloner le projet

Ouvre un terminal et exécute :

```bash
git clone https://github.com/pyCode-octet/YIP3N3.git
cd YIP3N3
```

---

## 3. Installer les dépendances

```bash
npm install --legacy-peer-deps
```

---

## 4. Lancer le serveur de développement

```bash
npx expo start --clear
```

Un QR code va apparaître dans le terminal.

---

## 5. Ouvrir l'app sur ton téléphone

- **Android** : Ouvre l'app **Expo Go** → appuie sur **"Scan QR code"** → scanne le QR code affiché dans le terminal
- **iOS** : Ouvre l'app **Appareil photo** → pointe vers le QR code → appuie sur la notification qui apparaît

> ⚠️ Ton téléphone et ton ordinateur doivent être connectés au **même réseau Wi-Fi**.

---

## Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Patron | `patron@yip3n3.com` | `123456` |
| Serveur | `serveur@yip3n3.com` | `123456` |

---

## Structure du projet

```
YIP3N3/
├── App.tsx                          # Point d'entrée
├── src/
│   ├── screens/
│   │   ├── auth/                    # Splash, Connexion, Erreur
│   │   ├── dashboard/               # Tableau de bord
│   │   ├── orders/                  # Commandes (25 écrans)
│   │   ├── prices/                  # Gestion des prix
│   │   ├── reports/                 # Rapports & exports
│   │   └── settings/                # Profil & déconnexion
│   ├── components/                  # Composants réutilisables
│   ├── navigation/                  # Configuration navigation
│   ├── context/                     # AuthContext
│   ├── lib/                         # Supabase client + mock data
│   └── theme/                       # Couleurs & typographie
```

---

## Stack technique

- **React Native** + **Expo SDK 54**
- **React Navigation v7** (stack + bottom tabs)
- **Supabase** (PostgreSQL + Auth + Realtime) — à configurer
- **TypeScript**

---

## Configurer Supabase (optionnel pour le test)

Dans `src/lib/supabase.ts`, remplace les valeurs par celles de ton instance Supabase locale :

```ts
const SUPABASE_URL = 'http://localhost:54321';
const SUPABASE_ANON_KEY = 'ta_clé_anon';
```

Pour l'instant l'app tourne avec des **données de test** (mock data) sans connexion à Supabase.

---

## MVP Version 1.0
