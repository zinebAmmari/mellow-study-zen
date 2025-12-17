# Mellow Study Zen - Full Stack Application

Une application complète de productivité avec gestion des tâches, des notes, du calendrier et d'une minuterie d'étude utilisant React + Express + Node.js.

## 🏗️ Architecture

Le projet est maintenant une application fullstack avec :

- **Frontend** : React + Vite + TailwindCSS + shadcn/ui
- **Backend** : Express.js + Node.js + SQLite

## 📁 Structure du Projet

```
mellow-study-zen/
├── src/                          # Code frontend (React)
│   ├── components/              # Composants React
│   ├── pages/                   # Pages de l'application
│   ├── lib/
│   │   └── api.js              # Client API (axios)
│   ├── hooks/                   # Hooks React personnalisés
│   └── main.jsx                # Point d'entrée React
│
├── server/                       # Code backend (Express)
│   ├── server.js               # Application Express principale
│   ├── routes/                 # Routes API
│   │   ├── tasks.js
│   │   ├── notes.js
│   │   ├── calendar.js
│   │   └── timer.js
│   ├── models/                 # Modèles de données
│   ├── controllers/            # Contrôleurs
│   ├── middleware/             # Middleware Express
│   ├── config/
│   │   └── database.js         # Configuration SQLite
│   └── utils/                  # Utilitaires
│
├── data/                        # Dossier pour la base de données SQLite
├── package.json                # Dépendances et scripts
├── .env                        # Variables d'environnement frontend
├── .env.server                 # Variables d'environnement backend
└── README.md
```

## 🚀 Installation et Démarrage

### Prérequis

- Node.js (v18+)
- npm ou bun

### 1. Installation des dépendances

```bash
npm install
# ou
bun install
```

### 2. Configuration de l'environnement

Les fichiers `.env` et `.env.server` sont déjà configurés. Vous pouvez les modifier selon vos besoins :

**Frontend (.env)** :

```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (.env.server)** :

```env
PORT=5000
NODE_ENV=development
```

### 3. Démarrage du développement

Pour démarrer à la fois le frontend et le backend en parallèle :

```bash
npm run dev
# ou
npm start
```

Cela lancera :

- **Frontend** : http://localhost:8080
- **Backend** : http://localhost:5000

### 4. Démarrage séparé (optionnel)

**Frontend uniquement** :

```bash
npm run dev:frontend
```

**Backend uniquement** :

```bash
npm run dev:server
```

## 📚 API Endpoints

### Tasks (Tâches)

- `GET /api/tasks` - Récupérer toutes les tâches
- `GET /api/tasks/:id` - Récupérer une tâche
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

### Notes

- `GET /api/notes` - Récupérer toutes les notes
- `GET /api/notes/:id` - Récupérer une note
- `POST /api/notes` - Créer une note
- `PUT /api/notes/:id` - Mettre à jour une note
- `DELETE /api/notes/:id` - Supprimer une note

### Calendar (Calendrier)

- `GET /api/calendar` - Récupérer tous les événements
- `GET /api/calendar/:id` - Récupérer un événement
- `POST /api/calendar` - Créer un événement
- `PUT /api/calendar/:id` - Mettre à jour un événement
- `DELETE /api/calendar/:id` - Supprimer un événement

### Timer (Minuterie)

- `GET /api/timer` - Récupérer toutes les sessions
- `GET /api/timer/:id` - Récupérer une session
- `POST /api/timer` - Créer une session
- `PUT /api/timer/:id/complete` - Marquer une session comme complétée
- `DELETE /api/timer/:id` - Supprimer une session

### Health

- `GET /api/health` - Vérifier l'état du serveur

## 🔧 Scripts npm

```bash
# Démarrage (frontend + backend)
npm start
npm run dev

# Démarrage séparé
npm run dev:frontend    # Frontend uniquement (port 8080)
npm run dev:server      # Backend uniquement (port 5000)

# Build
npm run build           # Build production du frontend
npm run build:dev       # Build développement

# Linting
npm run lint            # Vérifier le code

# Prévisualisation
npm run preview         # Prévisualiser la build
```

## 🗄️ Base de Données

La base de données SQLite est stockée dans le dossier `data/app.db`.

Tables créées automatiquement :

- `tasks` - Gestion des tâches
- `notes` - Gestion des notes
- `calendar_events` - Gestion des événements
- `timer_sessions` - Gestion des sessions de minuterie

## 🔌 Utilisation de l'API dans le Frontend

Exemples d'utilisation du client API :

```javascript
import { tasksAPI, notesAPI, calendarAPI, timerAPI } from "@/lib/api";

// Récupérer toutes les tâches
const { data } = await tasksAPI.getAll();

// Créer une tâche
await tasksAPI.create({
  title: "Ma tâche",
  description: "Description",
  priority: "high",
  dueDate: "2025-12-31",
});

// Mettre à jour une tâche
await tasksAPI.update(1, {
  status: "completed",
});

// Supprimer une tâche
await tasksAPI.delete(1);
```

## 📦 Dépendances Principales

### Frontend

- React 18
- Vite
- TailwindCSS
- shadcn/ui
- React Router
- React Query
- Axios
- Zod (validation)

### Backend

- Express.js
- SQLite3
- dotenv
- cors

## 🛠️ Développement

### Ajouter une nouvelle route

1. Créez un fichier dans `server/routes/`
2. Définissez les endpoints
3. Importez-le dans `server/server.js`
4. Utilisez-le dans le frontend via `@/lib/api.js`

Exemple :

```javascript
// server/routes/myroute.js
import express from "express";
import db from "../config/database.js";
import { asyncHandler, sendSuccess } from "../utils/helpers.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Votre logique
    sendSuccess(res, { message: "Success" });
  })
);

export default router;
```

## 📝 Notes

- La base de données est réinitialisée automatiquement au premier démarrage
- Les fichiers `.env` sont déjà configurés pour la développement local
- Utilisez `npm run dev` pour démarrer les deux serveurs simultanément

## 🎯 Prochaines étapes

- [ ] Ajouter l'authentification des utilisateurs
- [ ] Implémenter la persistance des données utilisateur
- [ ] Ajouter des tests (Jest, Vitest)
- [ ] Déployer en production (Vercel, Heroku, etc.)
- [ ] Ajouter des websockets pour les mises à jour en temps réel

## 📄 Licence

MIT
