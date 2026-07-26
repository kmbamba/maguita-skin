import mongoose from 'mongoose';

const beforeAfterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  beforeImage: {
    url: {
      type: String,
      required: false // Sera ajouté via upload après création
    },
    public_id: String
  },
  afterImage: {
    url: {
      type: String,
      required: false // Sera ajouté via upload après création
    },
    public_id: String
  },
  gamme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gamme'
  },
  duration: {
    type: String,
    trim: true // Ex: "4 semaines", "2 mois"
  },
  customerName: {
    type: String,
    trim: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('BeforeAfter', beforeAfterSchema);
