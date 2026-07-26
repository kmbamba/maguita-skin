import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import connectDB from '../config/database.js';
import Gamme from '../models/Gamme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.production') });

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('\n📤 Upload des images locales vers Cloudinary\n');

const uploadLocalImages = async () => {
  try {
    // Connecter à la base de données
    await connectDB();
    console.log('✅ Connecté à MongoDB Atlas\n');

    // Récupérer toutes les gammes
    const gammes = await Gamme.find({});
    console.log(`📦 ${gammes.length} gamme(s) trouvée(s)\n`);

    let uploaded = 0;
    let skipped = 0;
    let errors = 0;

    for (const gamme of gammes) {
      console.log(`\n🔍 Traitement: ${gamme.name}`);
      console.log(`   ID: ${gamme._id}`);
      
      if (!gamme.images || gamme.images.length === 0) {
        console.log(`   ⚠️  Aucune image`);
        skipped++;
        continue;
      }

      let updated = false;

      for (let i = 0; i < gamme.images.length; i++) {
        const image = gamme.images[i];
        console.log(`\n   📸 Image ${i + 1}: ${image.url}`);

        // Si l'image est déjà sur Cloudinary, ignorer
        if (image.url.startsWith('http')) {
          console.log(`   ✅ Déjà sur Cloudinary`);
          skipped++;
          continue;
        }

        // Si l'image est locale, uploader vers Cloudinary
        if (image.url.startsWith('/uploads/')) {
          const localPath = path.join(__dirname, '..', image.url);
          console.log(`   📁 Chemin local: ${localPath}`);

          // Vérifier que le fichier existe
          if (!fs.existsSync(localPath)) {
            console.log(`   ❌ Fichier introuvable localement`);
            errors++;
            continue;
          }

          try {
            console.log(`   ⏳ Upload vers Cloudinary...`);
            const uploadResult = await cloudinary.uploader.upload(localPath, {
              folder: 'maguita-skin',
              public_id: `${gamme.slug}-${i + 1}-${Date.now()}`
            });

            // Mettre à jour l'URL dans la base de données
            gamme.images[i].url = uploadResult.secure_url;
            gamme.images[i].public_id = uploadResult.public_id;
            updated = true;

            console.log(`   ✅ Uploadé avec succès!`);
            console.log(`   🔗 URL: ${uploadResult.secure_url}`);
            uploaded++;
          } catch (error) {
            console.log(`   ❌ Erreur upload: ${error.message}`);
            errors++;
          }
        }
      }

      // Sauvegarder les changements si nécessaire
      if (updated) {
        await gamme.save();
        console.log(`   💾 Gamme mise à jour dans la DB`);
      }
    }

    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Uploadées: ${uploaded}`);
    console.log(`   ⏭️  Ignorées: ${skipped}`);
    console.log(`   ❌ Erreurs: ${errors}`);
    console.log(`\n✅ Migration terminée!\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

uploadLocalImages();
