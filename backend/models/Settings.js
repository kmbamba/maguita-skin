import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // Il n'y aura qu'un seul document de settings dans la collection
  settingsId: {
    type: String,
    default: 'global',
    unique: true
  },
  
  // Configuration de la promo
  promo: {
    name: {
      type: String,
      default: 'PROMO MAGAL'
    },
    nameFull: {
      type: String,
      default: 'MEGA PROMO MAGAL'
    },
    emoji: {
      type: String,
      default: '🔥'
    }
  }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
