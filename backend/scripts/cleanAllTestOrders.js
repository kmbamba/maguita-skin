import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis le dossier parent
dotenv.config({ path: join(__dirname, '..', '.env.production') });

// Model Order inline
const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    email: String,
    address: {
      city: String,
      details: String
    }
  },
  items: [{
    gamme: { type: mongoose.Schema.Types.ObjectId, ref: 'Gamme' },
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  notes: String,
  trackingInfo: String
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

const cleanAllOrders = async () => {
  try {
    console.log('🔌 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    console.log('\n📊 Statistiques avant nettoyage:');
    const totalBefore = await Order.countDocuments();
    console.log(`   Total commandes: ${totalBefore}`);

    // Demander confirmation
    console.log('\n⚠️  ATTENTION: Cette action va supprimer TOUTES les commandes !');
    console.log('   Voulez-vous continuer ? (Ctrl+C pour annuler)\n');
    
    // Attendre 5 secondes
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🧹 Suppression de toutes les commandes...');
    const result = await Order.deleteMany({});
    
    console.log(`\n✅ ${result.deletedCount} commande(s) supprimée(s)`);

    console.log('\n📊 Statistiques après nettoyage:');
    const totalAfter = await Order.countDocuments();
    console.log(`   Total commandes: ${totalAfter}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

cleanAllOrders();
