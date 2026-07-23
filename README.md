<<<<<<< HEAD
# 🎬 Pathé Cinéma — Frontend (React + Vite + TypeScript)

Application de réservation de billets de cinéma, connectée au backend NestJS
(`backend/cinema-api`). Réalisée pour l'examen final API REST — Licence 2 GI.

La structure d'origine du projet (4 dossiers : **Components**, **Data**, **Pages**,
**utils**) a été conservée pour faciliter la présentation en groupe.

## ✅ Ce qui a changé par rapport à la version d'origine

- Le dossier **`Data/`** contenait auparavant des données statiques
  (`Movies.ts`, `Reservations.ts`). Il contient maintenant la couche d'appel à
  l'API REST (`api.ts` + un fichier par ressource : `movies.service.ts`,
  `sessions.service.ts`, `reservations.service.ts`, `cinemas.service.ts`,
  `users.service.ts`, `admin.service.ts`, `external.service.ts`,
  `auth.service.ts`) ainsi que les types TypeScript partagés (`types.ts`).
  Tout le stockage `localStorage` a été remplacé par de vrais appels API,
  avec le JWT conservé dans `localStorage` uniquement pour l'authentification.
- **`utils/auth.ts`** s'appuie maintenant sur `Data/auth.service.ts` (même noms
  de fonctions qu'avant : `getUser`, `logout`, `isAdmin`, `isAuthenticated`).
- **`Pages/`** : `Login`, `Register`, `Dashboard`, `Films`, `Cinema`, `Home` sont
  connectées à l'API. Un sous-dossier **`Pages/Admin/`** a été ajouté pour
  l'espace administrateur complet (dashboard, gestion films/cinémas/séances/
  réservations/utilisateurs).
- **`Components/`** : `SeatPicker` et `Payment` utilisent l'API (sièges occupés
  en temps réel, création de réservation réelle avant génération du ticket
  PDF). Ajout de `ProtectedRoute.tsx` (utilisateur connecté requis) et
  `AdminRoute.tsx` (rôle admin requis). `Navbar` affiche un lien "Admin" pour
  les comptes administrateurs.

## 🗂️ Structure du projet

```
src/
├── Components/      # Composants réutilisables (dont ProtectedRoute, AdminRoute)
├── Data/            # Appels API (services) + types partagés avec le backend
├── Pages/           # Pages de l'app, dont Pages/Admin/ (espace administrateur)
└── utils/           # Fonctions utilitaires (auth.ts)
```

## 🚀 Démarrage

```bash
cd frontend/cours-react-l2e
npm install
cp .env.example .env      # ajustez VITE_API_URL si le backend tourne ailleurs
npm run dev
```

Assurez-vous que le backend (`backend/cinema-api`) tourne sur `http://localhost:3000`
(ou modifiez `VITE_API_URL` dans `.env`).

## 🔑 Comptes de démonstration (après `npm run seed` côté backend)

```
Admin : admin@pathe-cinema.com / Admin123!
```

Créez un compte utilisateur classique via `/register`.

## 🛠 Espace Administrateur (`/admin`)

Accessible uniquement aux comptes avec le rôle `admin` (vérifié côté frontend ET
côté backend via RBAC) — pages dans `Pages/Admin/` :

- **AdminDashboard** : statistiques globales (utilisateurs, films, réservations, revenu, top films)
- **AdminMovies** : création / édition / suppression de films
- **AdminCinemas** : création / édition / suppression de cinémas
- **AdminSessions** : création / édition / suppression de séances
- **AdminReservations** : vue globale des réservations, annulation
- **AdminUsers** : changement de rôle, activation/désactivation, suppression
=======
# React + TypeScript + Tailwindcss
# 🎬 Application de Gestion de Cinéma

## 📌 Description

Cette application web permet aux utilisateurs de :

- consulter les films disponibles
- voir les séances de cinéma
- réserver des places
- effectuer un paiement
- télécharger un ticket PDF avec QR Code
- créer un compte et se connecter
- réinitialiser leur mot de passe

Le projet a été développé avec React typescript et Tailwind CSS.

---

# 🚀 Fonctionnalités

## 🎥 Gestion des films
- affichage des films
- détails des films
- séances disponibles
- catégories des films

## 🎟️ Réservation
- sélection des places
- validation des réservations
- sauvegarde des réservations

## 💳 Paiement
- interface de paiement
- génération automatique de ticket PDF
- QR Code sécurisé

## 🔐 Authentification
- inscription utilisateur
- connexion utilisateur
- mot de passe oublié
- réinitialisation du mot de passe

---

# 🛠️ Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- jsPDF
- QRCode

---

# 📂 Structure du projet

```bash
src/
│
├── Components/
├── Pages/
├── Data/
├── utils/
├── App.tsx
├── main.tsx

    
>>>>>>> d8b553e9bc6e24a120ced9a5bc2d26da9b577b33
