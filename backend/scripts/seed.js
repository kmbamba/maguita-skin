import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gamme from '../models/Gamme.js';
import Admin from '../models/Admin.js';

dotenv.config();

const gammes = [
  {
    name: 'Gamme Collagène Ultra-Éclat',
    description: 'Une gamme complète pour un teint éclatant et unifié grâce au collagène. Nourrissez votre peau en profondeur.',
    includedItems: [
      'Gel Douche Collagène 500ml',
      'Lait Corporel Unifiant 400ml',
      'Savon Exfoliant 200g',
      'Gommage Visage 150ml',
      'Masque Visage Offert'
    ],
    category: 'collagene',
    regularPrice: 20000,
    promoPrice: 15000,
    isPromoActive: true,
    inStock: true,
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop', public_id: 'collagene-1' }
    ]
  },
  {
    name: 'Gamme Teint Noir Éclat',
    description: 'Spécialement conçue pour sublimer et protéger les peaux noires. Hydratation intense et éclat garanti.',
    includedItems: [
      'Gel Douche Soin Intensif 500ml',
      'Lait Hydratant Nourrissant 400ml',
      'Savon Doux Naturel 200g',
      'Sérum Éclat 50ml'
    ],
    category: 'teint-noir',
    regularPrice: 20000,
    promoPrice: 15000,
    isPromoActive: true,
    inStock: true,
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=800&fit=crop', public_id: 'teint-noir-1' }
    ]
  },
  {
    name: 'Gamme Urgence Anti-Taches',
    description: 'Solution rapide et efficace contre les taches et imperfections. Résultats visibles en 7 jours.',
    includedItems: [
      'Gel Douche Anti-Taches 500ml',
      'Lait Correcteur Unifiant 400ml',
      'Savon Clarifiant 200g',
      'Crème de Nuit Réparatrice 100ml',
      'Sérum Concentré Anti-Taches 30ml'
    ],
    category: 'urgence',
    regularPrice: 20000,
    promoPrice: 15000,
    isPromoActive: true,
    inStock: true,
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop', public_id: 'urgence-1' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connexion MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');

    // Supprimer les données existantes
    await Gamme.deleteMany({});
    await Admin.deleteMany({});
    
    // Supprimer les anciens index
    try {
      await Gamme.collection.dropIndexes();
    } catch (err) {
      console.log('Pas d\'index à supprimer');
    }
    
    console.log('🗑️  Anciennes données supprimées');

    // Insérer les gammes
    const createdGammes = await Gamme.insertMany(gammes);
    console.log(`✅ ${createdGammes.length} gammes créées`);

    // Créer un admin par défaut
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@maguitaskin.com',
      password: 'admin123',
      role: 'super-admin'
    });
    console.log('✅ Admin créé:', admin.email);

    console.log('\n🎉 Base de données initialisée avec succès !');
    console.log('\n📋 Identifiants Admin:');
    console.log('   Email: admin@maguitaskin.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

seedDatabase();
