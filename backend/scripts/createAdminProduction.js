import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger .env.production
dotenv.config({ path: join(__dirname, '..', '.env.production') });

// Schéma Admin (copié du modèle)
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

const createAdmin = async () => {
  try {
    console.log('🔌 Connexion à MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas\n');

    // Vérifier si un admin existe
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('⚠️  Un admin existe déjà:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Nom: ${existingAdmin.name}`);
      console.log('\n💡 Si vous voulez créer un nouvel admin, supprimez l\'ancien depuis MongoDB Atlas.\n');
      process.exit(0);
    }

    // Créer le nouvel admin
    const hashedPassword = await bcrypt.hash('Admin2026!', 10);
    
    const admin = await Admin.create({
      email: 'admin@maguitaskin.com',
      password: hashedPassword,
      name: 'Administrateur Maguita Skin',
      role: 'admin'
    });

    console.log('✅ Admin créé avec succès!\n');
    console.log('📋 IDENTIFIANTS DE CONNEXION:');
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('   Email:     admin@maguitaskin.com');
    console.log('   Password:  Admin2026!');
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔗 Connectez-vous sur: https://maguita-skin.vercel.app/admin/login\n');
    console.log('⚠️  IMPORTANT: Changez le mot de passe après la première connexion!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

createAdmin();
