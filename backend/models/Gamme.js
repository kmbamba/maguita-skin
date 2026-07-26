import mongoose from 'mongoose';

const gammeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la gamme est requis'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'La description est requise']
  },
  includedItems: [{
    type: String,
    required: true
  }],
  regularPrice: {
    type: Number,
    default: 20000,
    required: true
  },
  promoPrice: {
    type: Number,
    default: 15000,
    required: true
  },
  isPromoActive: {
    type: Boolean,
    default: true
  },
  images: [{
    url: String,
    public_id: String
  }],
  category: {
    type: String,
    enum: ['collagene', 'teint-noir', 'urgence', 'eclat', 'autre'],
    default: 'autre'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Générer slug automatiquement
gammeSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Méthode pour obtenir le prix actuel
gammeSchema.methods.getCurrentPrice = function() {
  return this.isPromoActive ? this.promoPrice : this.regularPrice;
};

// Méthode pour calculer la réduction
gammeSchema.methods.getDiscount = function() {
  return this.regularPrice - this.promoPrice;
};

export default mongoose.model('Gamme', gammeSchema);
