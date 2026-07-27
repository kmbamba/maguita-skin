import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-fuchsia-primary text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold-accent">MAGUITA SKIN</h3>
            <p className="text-sm opacity-90 mb-4">
              Votre teint, notre signature. <br />
              Gammes complètes de produits cosmétiques Made in Senegal 🇸🇳
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold-accent transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/before-after" className="hover:text-gold-accent transition-colors">
                  Avant/Après
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="hover:text-gold-accent transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-gold-accent transition-colors">
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold-accent transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <a href="https://wa.me/221710469241" target="_blank" rel="noopener noreferrer" className="hover:text-gold-accent transition-colors">
                  Service Client
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nous Contacter</h3>
            <div className="space-y-3 text-sm mb-4">
              <a 
                href="tel:+221710469241" 
                className="flex items-center gap-2 hover:text-gold-accent transition-colors"
              >
                <FaPhone />
                <span>+221 71 046 92 41</span>
              </a>
              <a 
                href="https://wa.me/221710469241" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-accent transition-colors"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
              <a 
                href="mailto:dakar2026@gmail.com" 
                className="flex items-center gap-2 hover:text-gold-accent transition-colors"
              >
                <FaEnvelope />
                <span>dakar2026@gmail.com</span>
              </a>
            </div>
            
            <div className="flex gap-3 mt-4">
              <a 
                href="https://www.instagram.com/maguitaskin" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white text-fuchsia-primary rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://vt.tiktok.com/ZS4J5oMTh/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white text-fuchsia-primary rounded-full flex items-center justify-center hover:bg-gold-accent hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Maguita Skin. Tous droits réservés. Made with ❤️ in Senegal 🇸🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
