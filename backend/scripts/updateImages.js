import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gamme from '../models/Gamme.js';

dotenv.config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté\n');

    // Gamme Teint Noir
    const teintnoir = await Gamme.updateOne(
      { slug: 'gamme-teint-noir-eclat' },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-teint-noir-1.jpg', public_id: 'teint-noir-1' },
            { url: '/uploads/gamme-teint-noir-2.jpg', public_id: 'teint-noir-2' }
          ]
        }
      }
    );
    console.log('✅ Gamme Teint Noir mise à jour (2 images)');

    // Gamme Collagène
    const collagene = await Gamme.updateOne(
      { slug: 'gamme-collagene-ultra-eclat' },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-collagene-1.jpg', public_id: 'collagene-1' }
          ]
        }
      }
    );
    console.log('✅ Gamme Collagène mise à jour');

    // Gamme Urgence
    const urgence = await Gamme.updateOne(
      { slug: 'gamme-urgence-anti-taches' },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-urgence-1.jpg', public_id: 'urgence-1' }
          ]
        }
      }
    );
    console.log('✅ Gamme Urgence mise à jour');

    console.log('\n🎉 Toutes les images sont mises à jour !');
    console.log('\n📋 Prochaine étape :');
    console.log('   1. Vérifier le site : http://localhost:5174');
    console.log('   2. Les images devraient maintenant s\'afficher !');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

updateImages();
