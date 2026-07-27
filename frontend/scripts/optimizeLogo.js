import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const originalLogo = path.join(publicDir, 'logo-maguita-skin.png');
const optimizedLogo = path.join(publicDir, 'logo-maguita-skin-optimized.png');
const webpLogo = path.join(publicDir, 'logo-maguita-skin.webp');

console.log('\n🎨 Optimisation du logo...\n');

const optimizeLogo = async () => {
  try {
    // Vérifier que le fichier existe
    if (!fs.existsSync(originalLogo)) {
      console.error('❌ Logo original introuvable:', originalLogo);
      process.exit(1);
    }

    const originalStats = fs.statSync(originalLogo);
    console.log(`📊 Logo original: ${(originalStats.size / 1024).toFixed(2)} KB\n`);

    // Optimiser en PNG (compression)
    console.log('⏳ Création PNG optimisé...');
    await sharp(originalLogo)
      .resize(500, null, { // Max width 500px (maintenir ratio)
        withoutEnlargement: true,
        fit: 'inside'
      })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(optimizedLogo);

    const optimizedStats = fs.statSync(optimizedLogo);
    console.log(`✅ PNG optimisé: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
    console.log(`   Économie: ${((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1)}%\n`);

    // Créer version WebP (encore plus léger)
    console.log('⏳ Création WebP...');
    await sharp(originalLogo)
      .resize(500, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85 })
      .toFile(webpLogo);

    const webpStats = fs.statSync(webpLogo);
    console.log(`✅ WebP créé: ${(webpStats.size / 1024).toFixed(2)} KB`);
    console.log(`   Économie: ${((1 - webpStats.size / originalStats.size) * 100).toFixed(1)}%\n`);

    // Remplacer l'original par la version optimisée
    console.log('🔄 Remplacement du logo original...');
    fs.unlinkSync(originalLogo);
    fs.renameSync(optimizedLogo, originalLogo);
    console.log('✅ Logo original remplacé par la version optimisée\n');

    console.log('📋 Résumé:');
    console.log(`   - logo-maguita-skin.png: ${(optimizedStats.size / 1024).toFixed(2)} KB (PNG optimisé)`);
    console.log(`   - logo-maguita-skin.webp: ${(webpStats.size / 1024).toFixed(2)} KB (WebP pour navigateurs modernes)\n`);
    
    console.log('💡 Utilisez <picture> pour servir WebP avec fallback PNG\n');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

optimizeLogo();
