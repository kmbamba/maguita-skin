import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Le nom est requis']
    },
    phone: {
      type: String,
      required: [true, 'Le téléphone est requis']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    address: {
      street: String,
      city: String,
      region: String,
      details: String
    }
  },
  items: [{
    gamme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gamme',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['wave', 'orange-money', 'cash', 'whatsapp'],
    default: 'whatsapp'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String
  },
  trackingInfo: {
    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date
  }
}, {
  timestamps: true
});

// Générer numéro de commande unique
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Compter les commandes du jour
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const count = await mongoose.model('Order').countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });
    
    this.orderNumber = `MS${year}${month}${day}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);
