// import { useAuthContext } from "@/context/AuthProvider";

// export const useAuth = () => {
//   return useAuthContext();
// };

// src/hooks/useAuth.js (Exemple basé sur AuthContext)
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  // Le hook se contente d'appeler useContext pour fournir les valeurs du contexte
  const context = useContext(AuthContext);

  // Vérification pour s'assurer que le hook est utilisé à l'intérieur du AuthProvider
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }

  return context; // Retourne { user, loading, login, logout }
};
