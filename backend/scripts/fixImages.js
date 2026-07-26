import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté\n');

    const db = mongoose.connection.db;
    const collection = db.collection('gammes');

    //  Trouver toutes les gammes et les afficher
    const gammes = await collection.find({}).toArray();
    console.log('📦 Gammes trouvées:');
    gammes.forEach((g, i) => {
      console.log(`  ${i+1}. ${g.name} (slug: ${g.slug})`);
    });
    console.log('');

    // Mettre à jour PAR NOM (plus fiable que slug)
    const result1 = await collection.updateOne(
      { name: /Teint Noir/i },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-teint-noir-1.jpg', public_id: 'teint-noir-1' },
            { url: '/uploads/gamme-teint-noir-2.jpg', public_id: 'teint-noir-2' }
          ]
        }
      }
    );
    console.log(`✅ Gamme Teint Noir - ${result1.modifiedCount} document(s) modifié(s)`);

    const result2 = await collection.updateOne(
      { name: /Collag/i },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-collagene-1.jpg', public_id: 'collagene-1' }
          ]
        }
      }
    );
    console.log(`✅ Gamme Collagène - ${result2.modifiedCount} document(s) modifié(s)`);

    const result3 = await collection.updateOne(
      { name: /Urgence/i },
      { 
        $set: { 
          images: [
            { url: '/uploads/gamme-urgence-1.jpg', public_id: 'urgence-1' }
          ]
        }
      }
    );
    console.log(`✅ Gamme Urgence - ${result3.modifiedCount} document(s) modifié(s)`);

    console.log('\n🎉 TOUTES LES IMAGES SONT MAINTENANT CORRIGÉES !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

fixImages();
