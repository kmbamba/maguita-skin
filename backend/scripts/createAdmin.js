import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté\n');

    console.log('=== Création d\'un nouvel administrateur ===\n');

    const username = await question('Nom d\'utilisateur : ');
    const email = await question('Email : ');
    const password = await question('Mot de passe : ');
    const confirmPassword = await question('Confirmer mot de passe : ');

    if (password !== confirmPassword) {
      console.log('\n❌ Les mots de passe ne correspondent pas');
      process.exit(1);
    }

    console.log('\nRôle :');
    console.log('1. Super Admin (tous les droits)');
    console.log('2. Admin (gestion courante)');
    console.log('3. Manager (consultation)');
    
    const roleChoice = await question('\nChoisir (1-3) : ');
    
    const roles = {
      '1': 'super-admin',
      '2': 'admin',
      '3': 'manager'
    };

    const role = roles[roleChoice] || 'admin';

    // Vérifier si l'email existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('\n❌ Cet email est déjà utilisé');
      process.exit(1);
    }

    // Créer l'admin
    const admin = await Admin.create({
      username,
      email,
      password,
      role
    });

    console.log('\n✅ Admin créé avec succès !');
    console.log('\n📋 Détails :');
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Rôle: ${admin.role}`);
    console.log(`   ID: ${admin._id}`);
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    rl.close();
    process.exit(1);
  }
};

createAdmin();
