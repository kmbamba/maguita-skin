import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Maguita Skin - Votre teint, notre signature',
  description = 'Gammes complètes de produits cosmétiques Made in Senegal. Collagène, Teint Noir, Urgence - Des résultats visibles en 4 semaines. Livraison dans tout le Sénégal.',
  keywords = 'cosmétiques sénégal, produits beauté dakar, teint éclatant, collagène, maguita skin, beauté afro, soins visage',
  image = '/logo-maguita-skin.png',
  url = window.location.href,
  type = 'website'
}) => {
  const siteUrl = 'https://www.maguitaskin.com'; // Production domain
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  return (
    <Helmet>
      {/* Titre de la page */}
      <title>{title}</title>
      
      {/* Meta descriptions */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Maguita Skin" />
      <meta property="og:locale" content="fr_SN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonique */}
      <link rel="canonical" href={url} />
      
      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#800a43" />
    </Helmet>
  );
};

export default SEO;
