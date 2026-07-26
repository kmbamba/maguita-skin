import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from '../config/database.js';
import Gamme from '../models/Gamme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.production') });

console.log('\n🔄 Migration des images (image → images[])\n');

const migrateImages = async () => {
  try {
    // Connecter à la base de données
    await connectDB();
    console.log('✅ Connecté à MongoDB Atlas');

    // Récupérer toutes les gammes
    const gammes = await Gamme.find({});
    console.log(`📦 ${gammes.length} gamme(s) trouvée(s)\n`);

    let migrated = 0;
    let skipped = 0;

    for (const gamme of gammes) {
      console.log(`\n🔍 Vérification: ${gamme.name}`);
      console.log(`   ID: ${gamme._id}`);
      console.log(`   Images actuelles: ${JSON.stringify(gamme.images)}`);
      
      // Récupérer le document brut pour voir s'il y a un champ "image"
      const rawGamme = await Gamme.collection.findOne({ _id: gamme._id });
      
      if (rawGamme.image && (!gamme.images || gamme.images.length === 0)) {
        console.log(`   ⚠️  Ancien champ "image" trouvé: ${rawGamme.image}`);
        
        // Migrer l'ancien format vers le nouveau
        gamme.images = [{
          url: rawGamme.image,
          public_id: null // Pas de public_id pour les anciennes images locales
        }];
        
        await gamme.save();
        
        // Supprimer l'ancien champ "image"
        await Gamme.collection.updateOne(
          { _id: gamme._id },
          { $unset: { image: "" } }
        );
        
        console.log(`   ✅ Migré: image → images[0]`);
        console.log(`   📸 Nouvelle URL: ${gamme.images[0].url}`);
        migrated++;
      } else if (gamme.images && gamme.images.length > 0) {
        console.log(`   ✔️  Déjà au bon format (${gamme.images.length} image(s))`);
        skipped++;
      } else {
        console.log(`   ⚠️  Aucune image trouvée`);
        skipped++;
      }
    }

    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Migrées: ${migrated}`);
    console.log(`   ⏭️  Ignorées: ${skipped}`);
    console.log(`   📦 Total: ${gammes.length}`);
    console.log(`\n✅ Migration terminée!\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

migrateImages();
