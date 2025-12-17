// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;
  // Vérifie si le token est dans l'en-tête 'Authorization'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrait le token (Bearer <token>)
      token = req.headers.authorization.split(" ")[1];

      // Décode le token pour obtenir l'ID utilisateur
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajoute l'ID utilisateur à l'objet 'req' pour un usage ultérieur
      req.user = decoded.id; // Cet ID sera utilisé pour filtrer les données !
      next();
    } catch (error) {
      // Le token est invalide ou expiré
      res.status(401).json({ message: "Non autorisé, token invalide" });
    }
  } else {
    res.status(401).json({ message: "Non autorisé, pas de token" });
  }
};

module.exports = { protect };
