/**
 * Middleware pour sanitizer les inputs et prévenir les injections XSS
 * Nettoie uniquement les données des requêtes POST/PUT/PATCH
 */
export const sanitizeInput = (req, res, next) => {
  // Skip sanitization pour les requêtes GET et DELETE (pas de body)
  if (req.method === 'GET' || req.method === 'DELETE') {
    return next();
  }

  // Liste de balises HTML dangereuses à supprimer
  const dangerousTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>|<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>|<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>|<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi;
  
  const dangerousAttributes = /on\w+\s*=/gi;
  
  // Fonction récursive pour nettoyer les objets
  const sanitizeObject = (obj) => {
    // Ne rien faire pour les valeurs non-string
    if (typeof obj !== 'string') {
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
    }
    
    // Pour les strings : supprimer uniquement les balises dangereuses
    let cleaned = obj;
    
    // Supprimer scripts, iframes, etc.
    cleaned = cleaned.replace(dangerousTags, '');
    
    // Supprimer attributs on* (onclick, onerror, etc)
    cleaned = cleaned.replace(dangerousAttributes, '');
    
    // Supprimer javascript: dans les URLs
    cleaned = cleaned.replace(/javascript:/gi, '');
    
    return cleaned.trim();
  };

  // Sanitiser uniquement le body pour POST/PUT/PATCH
  if (req.body && Object.keys(req.body).length > 0) {
    try {
      req.body = sanitizeObject(req.body);
    } catch (error) {
      console.error('❌ Erreur sanitization:', error);
      // En cas d'erreur, on continue sans bloquer la requête
    }
  }

  next();
};

export default sanitizeInput;
