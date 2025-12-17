// src/ui/RequireAuth.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Notez le chemin '../context/'

// Ce composant vérifie si l'utilisateur est connecté.
const RequireAuth = ({ children }) => {
    // 🚨 ATTENTION : Ceci nécessite la création de AuthContext !
    // Si AuthContext n'est pas encore créé, vous pouvez commenter cette ligne
    // ou la remplacer par une vérification simple (ex: const isAuthenticated = false;)
    const { user, loading } = useContext(AuthContext); 

    if (loading) {
        return <div>Chargement de l'utilisateur...</div>;
    }

    // Si 'user' est null ou non défini, l'utilisateur n'est pas connecté.
    if (!user) {
        // Redirige l'utilisateur vers la page de connexion
        return <Navigate to="/login" replace />;
    }

    // Si l'utilisateur est connecté, affiche le composant enfant (Tasks, Notes, etc.)
    return children;
};

export default RequireAuth;