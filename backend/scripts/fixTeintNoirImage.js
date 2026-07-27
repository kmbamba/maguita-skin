import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from '../config/database.js';
import Gamme from '../models/Gamme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.production') });

console.log('\n🔧 Correction de l\'image cassée "Gamme Teint Noir"\n');

const fixImage = async () => {
  try {
    await connectDB();
    console.log('✅ Connecté à MongoDB Atlas\n');

    // Trouver la gamme "Teint Noir"
    const gamme = await Gamme.findOne({ name: /teint noir/i });
    
    if (!gamme) {
      console.log('❌ Gamme "Teint Noir" introuvable');
      process.exit(1);
    }

    console.log(`📦 Gamme trouvée: ${gamme.name}`);
    console.log(`   ID: ${gamme._id}`);
    console.log(`   Images actuelles (${gamme.images.length}):`);
    
    gamme.images.forEach((img, i) => {
      console.log(`   ${i + 1}. ${img.url}`);
      if (!img.url.startsWith('http')) {
        console.log(`      ⚠️  Image locale (à supprimer)`);
      }
    });

    // Supprimer les images locales (qui ne fonctionnent pas en production)
    const cloudinaryImages = gamme.images.filter(img => img.url.startsWith('http'));
    
    console.log(`\n🔄 Suppression des images locales...`);
    console.log(`   Avant: ${gamme.images.length} images`);
    console.log(`   Après: ${cloudinaryImages.length} images (Cloudinary uniquement)`);

    gamme.images = cloudinaryImages;
    await gamme.save();

    console.log(`\n✅ Images mises à jour avec succès!`);
    console.log(`   Images restantes:`);
    gamme.images.forEach((img, i) => {
      console.log(`   ${i + 1}. ${img.url}`);
    });

    console.log(`\n💡 Note: Si la gamme n'a plus d'images, allez dans l'admin et uploadez-en une nouvelle.\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

fixImage();
