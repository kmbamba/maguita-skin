import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Gamme from '../models/Gamme.js';
import dotenv from 'dotenv';

dotenv.config();

const testOrderCreation = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');

    // Récupérer une gamme existante
    const gamme = await Gamme.findOne();
    if (!gamme) {
      console.log('❌ Aucune gamme trouvée. Veuillez d\'abord exécuter le seed.');
      process.exit(1);
    }

    console.log(`📦 Test avec la gamme: ${gamme.name}`);

    // Créer une commande test
    const orderData = {
      customer: {
        name: 'Test Client',
        phone: '+221 77 123 45 67',
        email: 'test@example.com',
        address: {
          city: 'Dakar',
          details: 'Rue 10, Quartier Test'
        }
      },
      items: [{
        gamme: gamme._id,
        name: gamme.name,
        quantity: 1,
        price: gamme.getCurrentPrice()
      }],
      totalAmount: gamme.getCurrentPrice(),
      paymentMethod: 'whatsapp',
      notes: 'Commande test'
    };

    const order = await Order.create(orderData);
    
    console.log('✅ Commande créée avec succès !');
    console.log(`📝 Numéro de commande: ${order.orderNumber}`);
    console.log(`👤 Client: ${order.customer.name}`);
    console.log(`💰 Montant total: ${order.totalAmount} FCFA`);
    console.log(`📦 Items:`, order.items);

    await mongoose.connection.close();
    console.log('\n✅ Test terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Détails:', error);
    process.exit(1);
  }
};

testOrderCreation();
