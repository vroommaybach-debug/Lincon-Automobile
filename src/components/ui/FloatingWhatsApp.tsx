import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/2349073796178"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-[0_0_20px_rgba(27,107,79,0.5)] border border-silver-400/30 hover:bg-green-500 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-20"></div>
      <MessageCircle size={28} className="relative z-10" />
    </motion.a>
  );
}
