import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupérer le token
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupérer l'admin sans le mot de passe
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin || !req.admin.isActive) {
        return res.status(401).json({ message: 'Non autorisé - Admin inactif ou inexistant' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Non autorisé - Token invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé - Pas de token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.admin && (req.admin.role === 'admin' || req.admin.role === 'super-admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé - Admin uniquement' });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'super-admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé - Super Admin uniquement' });
  }
};
