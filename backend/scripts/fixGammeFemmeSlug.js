import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from '../config/database.js';
import Gamme from '../models/Gamme.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.production') });

console.log('\n🔧 Correction du slug "Gamme femme"\n');

const fixSlug = async () => {
  try {
    await connectDB();
    console.log('✅ Connecté à MongoDB Atlas\n');

    // Trouver la gamme avec le slug "gamme-homme"
    const gamme = await Gamme.findOne({ slug: 'gamme-homme' });
    
    if (!gamme) {
      console.log('❌ Gamme avec slug "gamme-homme" introuvable');
      process.exit(1);
    }

    console.log(`📦 Gamme trouvée:`);
    console.log(`   Nom: ${gamme.name}`);
    console.log(`   Slug actuel: ${gamme.slug}`);
    console.log(`   ID: ${gamme._id}`);

    // Régénérer le slug basé sur le nom
    gamme.slug = undefined; // Force la régénération par le hook pre-save
    await gamme.save();

    console.log(`\n✅ Slug corrigé!`);
    console.log(`   Nom: ${gamme.name}`);
    console.log(`   Nouveau slug: ${gamme.slug}\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

fixSlug();
