import validator from 'validator';

/**
 * Middleware pour sanitizer les inputs et prévenir les injections XSS
 */
export const sanitizeInput = (req, res, next) => {
  // Fonction récursive pour nettoyer les objets
  const sanitizeObject = (obj) => {
    if (typeof obj === 'string') {
      // Échapper les caractères HTML dangereux
      return validator.escape(obj);
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
