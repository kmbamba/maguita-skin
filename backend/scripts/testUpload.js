import mongoose from 'mongoose';
import Gamme from '../models/Gamme.js';
import dotenv from 'dotenv';

dotenv.config();

const testUpload = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');

    // Trouver toutes les gammes
    const gammes = await Gamme.find();
    
    console.log('\n📦 Gammes existantes:');
    gammes.forEach(gamme => {
      console.log(`\n- ${gamme.name} (ID: ${gamme._id})`);
      console.log(`  Slug: ${gamme.slug}`);
      console.log(`  Images: ${gamme.images.length}`);
      if (gamme.images.length > 0) {
        gamme.images.forEach((img, i) => {
          console.log(`    ${i + 1}. ${img.url}`);
        });
      } else {
        console.log('    ⚠️ Aucune image');
      }
    });

    await mongoose.connection.close();
    console.log('\n✅ Test terminé');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

testUpload();
