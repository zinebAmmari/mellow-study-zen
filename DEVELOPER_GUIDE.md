# Guide de Développement - Mellow Study Zen

## 🔧 Architecture Frontend-Backend

### Frontend (React + Vite)

- **Port** : 8080
- **Dossier** : `/src`
- **Package manager** : npm
- **API Client** : Axios

### Backend (Express + Node.js)

- **Port** : 5000
- **Dossier** : `/server`
- **Base de données** : SQLite
- **ORM** : Requêtes directes SQLite

## 📝 Exemples d'Utilisation

### 1. Utiliser l'API dans une page React

```jsx
import { useTasks, useCreateTask } from "@/hooks/useTasks";
import { useState } from "react";

export function TasksPage() {
  const { data: tasks, isLoading } = useTasks();
  const createTaskMutation = useCreateTask();
  const [title, setTitle] = useState("");

  const handleCreateTask = async () => {
    await createTaskMutation.mutateAsync({
      title,
      description: "Description",
      priority: "medium",
    });
    setTitle("");
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={handleCreateTask}>Créer</button>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. Appeler directement l'API (sans hook)

```javascript
import { tasksAPI } from "@/lib/api";

// Récupérer toutes les tâches
const { data } = await tasksAPI.getAll();

// Créer une tâche
await tasksAPI.create({
  title: "Ma tâche",
  priority: "high",
});

// Mettre à jour
await tasksAPI.update(1, { status: "completed" });

// Supprimer
await tasksAPI.delete(1);
```

### 3. Ajouter une nouvelle route backend

**Étape 1** : Créer le fichier route (`server/routes/myroute.js`)

```javascript
import express from "express";
import db from "../config/database.js";
import { asyncHandler, sendSuccess, sendError } from "../utils/helpers.js";

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

**Étape 2** : Importer dans le serveur (`server/server.js`)

```javascript
import myRoutes from "./routes/myroute.js";

// ...
app.use("/api/myroute", myRoutes);
```

**Étape 3** : Créer le client API (`src/lib/api.js`)

```javascript
export const myAPI = {
  getAll: () => apiClient.get("/myroute"),
  create: (data) => apiClient.post("/myroute", data),
  // ... autres méthodes
};
```

**Étape 4** : Utiliser dans le frontend

```javascript
import { myAPI } from "@/lib/api";

const data = await myAPI.getAll();
```

## 🗄️ Gérer la Base de Données

### Ajouter une nouvelle table

Modifiez `server/config/database.js` :

```javascript
function initializeTables() {
  // ... tables existantes ...

  db.run(`
    CREATE TABLE IF NOT EXISTS my_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
```

### Requêtes SQLite

```javascript
// SELECT
db.all("SELECT * FROM tasks", (err, rows) => {
  console.log(rows);
});

// SELECT ONE
db.get("SELECT * FROM tasks WHERE id = ?", [1], (err, row) => {
  console.log(row);
});

// INSERT
db.run("INSERT INTO tasks (title) VALUES (?)", ["Ma tâche"], function () {
  console.log("ID:", this.lastID);
});

// UPDATE
db.run("UPDATE tasks SET title = ? WHERE id = ?", ["Titre", 1], function () {
  console.log("Changés:", this.changes);
});

// DELETE
db.run("DELETE FROM tasks WHERE id = ?", [1]);
```

## 🧪 Tester l'API

### Avec curl

```bash
# GET
curl http://localhost:5000/api/tasks

# POST
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Ma tâche","priority":"high"}'

# PUT
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# DELETE
curl -X DELETE http://localhost:5000/api/tasks/1
```

### Avec Postman

1. Importer les endpoints dans Postman
2. Créer une collection avec les requêtes API
3. Utiliser les variables d'environnement pour l'URL de base

## 🚀 Déploiement

### Frontend (Vercel)

```bash
npm run build
# Déployer le dossier `dist` sur Vercel
```

### Backend (Heroku)

```bash
git push heroku main
```

## 🐛 Déboguer

### Vue serveur

```bash
npm run dev:server
```

Accédez à http://localhost:5000/api/health pour vérifier l'état.

### Vue frontend

Les erreurs sont affichées dans la console du navigateur et dans React DevTools.

## 📚 Ressources

- [Express.js Documentation](https://expressjs.com/)
- [SQLite3 Node.js](https://github.com/mapbox/node-sqlite3)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contribution

1. Créer une branche (`git checkout -b feature/ma-fonctionnalité`)
2. Faire vos changements
3. Commiter (`git commit -m 'Ajouter ma fonctionnalité'`)
4. Pousser (`git push origin feature/ma-fonctionnalité`)
5. Créer une Pull Request

---

Pour toute question ou problème, consultez la documentation principale dans `BACKEND_SETUP.md`.
