import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/gammes', gammeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/newsletter', newsletterRoutes);
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
