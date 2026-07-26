import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.production') });

console.log('\n🧪 Test de connexion Cloudinary\n');

// Afficher la configuration (masquer les secrets)
console.log('📋 Configuration:');
console.log(`  CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ NON DÉFINI'}`);
console.log(`  API_KEY: ${process.env.CLOUDINARY_API_KEY ? '✅ Défini' : '❌ NON DÉFINI'}`);
console.log(`  API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? '✅ Défini' : '❌ NON DÉFINI'}`);

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Tester la connexion
console.log('\n🔌 Test de connexion...');
try {
  const result = await cloudinary.api.ping();
  console.log('✅ Connexion réussie!');
  console.log('   Réponse:', result);
  
  // Tester l'upload d'une image existante
  console.log('\n📤 Test d\'upload...');
  const uploadTestPath = path.join(__dirname, '../uploads/gamme-collagene-1.jpg');
  console.log('   Fichier test:', uploadTestPath);
  
  const uploadResult = await cloudinary.uploader.upload(uploadTestPath, {
    folder: 'maguita-skin',
    public_id: 'test-image-' + Date.now()
  });
  
  console.log('✅ Upload réussi!');
  console.log('   URL:', uploadResult.secure_url);
  console.log('   Public ID:', uploadResult.public_id);
  
  // Supprimer l'image test
  console.log('\n🗑️  Nettoyage...');
  await cloudinary.uploader.destroy(uploadResult.public_id);
  console.log('✅ Image test supprimée');
  
  console.log('\n✅ TOUS LES TESTS RÉUSSIS! 🎉\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ ERREUR:', error.message);
  console.error('   Stack:', error.stack);
  console.log('\n💡 Vérifiez:');
  console.log('   1. Les variables d\'environnement sont correctes');
  console.log('   2. Le compte Cloudinary est actif');
  console.log('   3. Les credentials sont valides\n');
  process.exit(1);
}
