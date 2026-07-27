import validator from 'validator';

/**
 * Middleware pour sanitizer les inputs et prévenir les injections XSS
 * Nettoie uniquement les balises HTML dangereuses, sans échapper les entités HTML
 */
export const sanitizeInput = (req, res, next) => {
  // Liste de balises HTML dangereuses à supprimer
  const dangerousTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>|<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>|<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>|<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>|on\w+\s*=/gi;
  
  // Fonction récursive pour nettoyer les objets
  const sanitizeObject = (obj) => {
    if (typeof obj === 'string') {
      // Supprimer uniquement les balises et attributs dangereux
      // Ne pas échapper les caractères normaux pour préserver les données
      return obj
        .replace(dangerousTags, '') // Supprimer scripts, iframes, etc.
        .replace(/javascript:/gi, '') // Supprimer javascript: dans les URLs
        .trim();
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => sanitizeObject(item));
    }
    
    if (obj !== null && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    
    return obj;
  };

  // Sanitizer le body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitizer les query params
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitizer les params
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

export default sanitizeInput;
