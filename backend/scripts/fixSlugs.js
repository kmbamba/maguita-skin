import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté\n');

    const db = mongoose.connection.db;
    const collection = db.collection('gammes');

    // Fonction pour générer un slug
    const generateSlug = (name) => {
      return name
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    // Récupérer toutes les gammes
    const gammes = await collection.find({}).toArray();
    
    console.log('📦 Mise à jour des slugs:\n');
    
    for (const gamme of gammes) {
      const slug = generateSlug(gamme.name);
      
      await collection.updateOne(
        { _id: gamme._id },
        { $set: { slug: slug } }
      );
      
      console.log(`✅ ${gamme.name}`);
      console.log(`   → slug: ${slug}\n`);
    }

    console.log('🎉 Tous les slugs sont mis à jour !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

fixSlugs();
