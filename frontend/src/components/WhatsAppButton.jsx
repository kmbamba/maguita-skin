import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/221710469241', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-whatsapp-green text-white w-16 h-16 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center z-50 animate-bounce"
      aria-label="Contacter sur WhatsApp"
    >
      <FaWhatsapp size={32} />
    </button>
  );
};

export default WhatsAppButton;
