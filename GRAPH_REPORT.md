# Graph Report - YIP3N3  (2026-06-08)

## Corpus Check
- 49 files · ~286,800 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 344 nodes · 595 edges · 17 communities (13 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `387a1e1b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `_` - 63 edges
2. `Colors` - 29 edges
3. `useAuth()` - 15 edges
4. `n()` - 14 edges
5. `Button()` - 14 edges
6. `E()` - 12 edges
7. `YIP3N3 — MVP Application Mobile` - 12 edges
8. `📄 Cahier des Charges — YIP3N3 (MVP)` - 10 edges
9. `Ie()` - 9 edges
10. `Order` - 9 edges

## Surprising Connections (you probably didn't know these)
- `p()` --calls--> `I()`  [INFERRED]
  Logo restaurant poisson YIP3NE_files/a_data/main.js → Logo restaurant poisson YIP3NE_files/sdk.js
- `D()` --calls--> `I()`  [INFERRED]
  Logo restaurant poisson YIP3NE_files/a_data/main.js → Logo restaurant poisson YIP3NE_files/sdk.js
- `TabNavigator()` --calls--> `useAuth()`  [EXTRACTED]
  src/navigation/MainNavigator.tsx → src/context/AuthContext.tsx
- `OrderCardProps` --references--> `Order`  [EXTRACTED]
  src/components/OrderCard.tsx → src/lib/supabase.ts
- `LoginScreen()` --calls--> `useAuth()`  [EXTRACTED]
  src/screens/auth/LoginScreen.tsx → src/context/AuthContext.tsx

## Import Cycles
- None detected.

## Communities (17 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (52): Button(), ButtonProps, styles, OrderCardProps, mockPrices, FishPrice, Order, OrderItem (+44 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (46): _, be(), Bn(), c(), Ce(), d(), E(), Ee() (+38 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (35): Attention, Bordures, Bouton principal, Bouton secondaire, 🔘 Boutons, Cartes, 📦 Cartes, Couleur principale (+27 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (25): formatTime(), OrderCard(), styles, StatCard(), StatCardProps, styles, AuthContext, AuthContextType (+17 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (30): dependencies, expo, expo-font, expo-linear-gradient, expo-splash-screen, expo-status-bar, @expo/vector-icons, react (+22 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (16): LoginErrorScreen(), Props, styles, LoginScreen(), Props, styles, Props, SplashScreen() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (20): 1. Contexte & Objectif, 2. Périmètre du MVP, 3. Acteurs & Rôles, 4.1 Gestion des prix (Patron uniquement), 4.2 Prise de commande (Serveur uniquement), 4.3 Référence de commande, 4.4 Suivi des commandes & Tableau de bord, 4.5 Reçu client (+12 more)

### Community 7 - "Community 7"
Cohesion: 0.23
Nodes (16): B(), C(), D(), f(), K(), L(), m(), n() (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (12): 1. Installer Expo Go sur ton téléphone, 2. Cloner le projet, 3. Installer les dépendances, 4. Lancer le serveur de développement, 5. Ouvrir l'app sur ton téléphone, Comptes de test, Configurer Supabase (optionnel pour le test), MVP Version 1.0 (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (11): package, expo, android, ios, name, orientation, slug, userInterfaceStyle (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): compilerOptions, paths, strict, extends, @/*

## Knowledge Gaps
- **148 isolated node(s):** `PreToolUse`, `PreToolUse`, `name`, `slug`, `version` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Colors` connect `Community 0` to `Community 3`, `Community 5`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `I()` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `PreToolUse`, `PreToolUse`, `name` to the rest of the system?**
  _148 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06018018018018018 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.0957983193277311 - nodes in this community are weakly interconnected._