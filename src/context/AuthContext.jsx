// // src/context/AuthContext.jsx (Concept)
// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Au chargement, vérifier si un token existe dans localStorage
//     const token = localStorage.getItem("token");
//     if (token) {
//       // Idéalement, validez le token côté client (optionnel) ou du moins décoder l'ID utilisateur
//       // Ici on se contente de définir l'utilisateur comme connecté
//       setUser({ token: token, ...decodedUserData });
//     }
//     setLoading(false);
//   }, []);

//   // Fonction de connexion
//   const login = async (email, password) => {
//     const response = await axios.post("/api/auth/login", { email, password });
//     const token = response.data.token;
//     localStorage.setItem("token", token);
//     setUser({ token }); // Mettre à jour l'état
//   };

//   // Fonction de déconnexion
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
// 🚨 AJOUT : Importez la bibliothèque pour décoder le JWT
import { jwtDecode } from "jwt-decode"; // Assurez-vous d'utiliser jwt-decode ou jwtDecode, selon la version

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction utilitaire pour décoder le token et définir l'utilisateur
  const setAuthenticatedUser = (token) => {
    try {
      const decoded = jwtDecode(token); // Décoder pour obtenir les infos de l'utilisateur
      // Stocke le token et les infos décodées (ex: id, email, nom)
      setUser({ token, id: decoded.id, name: decoded.name });
      // 🚨 OPTIONNEL : Vous pouvez également stocker le token dans axios pour toutes les requêtes
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Token invalide ou expiré:", error);
      logout(); // Si le token est corrompu ou invalide, déconnecter l'utilisateur
    }
  };

  // 1. VÉRIFICATION AU MONTAGE (Chargement de la page)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticatedUser(token);
    }
    setLoading(false);
  }, []);

  // 2. FONCTION DE CONNEXION
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Assurez-vous que l'URL est correcte (ex: http://localhost:5000/api/auth/login)
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token } = response.data; // Le backend DOIT renvoyer un objet { token: "..." }

      localStorage.setItem("token", token);
      setAuthenticatedUser(token);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      // Gérer les erreurs (ex: identifiants incorrects)
      console.error("Échec de la connexion", error.response.data.message);
      return false;
    }
  };

  // 3. FONCTION DE DÉCONNEXION
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Supprimer l'en-tête d'autorisation si vous l'aviez mis globalement
    // delete axios.defaults.headers.common['Authorization'];
    // Redirection sera gérée par la navigation dans les composants (ex: Navbar)
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {/* On rend les enfants même si c'est en chargement pour éviter le "flash" */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
