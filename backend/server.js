import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import sanitizeInput from './middleware/sanitize.js';
import connectDB from './config/database.js';
import gammeRoutes from './routes/gammeRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import beforeAfterRoutes from './routes/beforeAfterRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger variables d'environnement
dotenv.config();

// Connecter la base de données
connectDB();

const app = express();

// Sécurité - Désactiver X-Powered-By
app.disable('x-powered-by');

// Helmet pour sécuriser les headers HTTP
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé car conflit avec Vite en dev
  crossOriginEmbedderPolicy: false
}));

// CORS restreint
const allowedOrigins = [
  'https://maguita-skin.vercel.app',
  'https://www.maguitaskin.com',
  'http://localhost:5173' // Dev local
];

app.use(cors({
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origin (mobile apps, postman, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par CORS'));
    }
  },
  credentials: true
}));

// Rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives max
  message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10, // 10 commandes max par heure (plus permissif)
  message: 'Trop de commandes créées. Réessayez dans 1 heure.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Ne compte que les erreurs
});

const testimonialLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 heures
  max: 3, // 3 témoignages max par jour
  message: 'Limite de témoignages atteinte. Réessayez demain.',
  standardHeaders: true,
  legacyHeaders: false,
});

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // 5 inscriptions max par heure
  message: 'Trop d\'inscriptions. Réessayez dans 1 heure.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protection contre les injections NoSQL
app.use(mongoSanitize());

// Protection contre les injections XSS
app.use(sanitizeInput);

// Servir les fichiers statiques (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/gammes', gammeRoutes);
app.use('/api/orders', orderLimiter, orderRoutes); // Rate limit sur les commandes
app.use('/api/auth', loginLimiter, authRoutes); // Rate limit sur le login
app.use('/api/upload', uploadRoutes);
app.use('/api/testimonials', testimonialLimiter, testimonialRoutes); // Rate limit sur les témoignages
app.use('/api/newsletter', newsletterLimiter, newsletterRoutes); // Rate limit sur newsletter
app.use('/api/before-after', beforeAfterRoutes);
app.use('/api/settings', settingsRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🌸 Bienvenue sur l\'API Maguita Skin',
    version: '1.0.0',
    endpoints: {
      gammes: '/api/gammes',
      orders: '/api/orders',
      auth: '/api/auth'
    }
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
