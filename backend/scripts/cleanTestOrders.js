import mongoose from 'mongoose';
import Order from '../models/Order.js';
import dotenv from 'dotenv';

dotenv.config();

const cleanTestOrders = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');

    // Supprimer les commandes de test
    const result = await Order.deleteMany({ 'customer.name': 'Test Client' });
    
    console.log(`🧹 ${result.deletedCount} commande(s) de test supprimée(s)`);

    await mongoose.connection.close();
    console.log('✅ Nettoyage terminé !');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

cleanTestOrders();
