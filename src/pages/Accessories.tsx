import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export default function Accessories() {
  const [cart, setCart] = useState<string[]>([]);
  
  const accessories = [
    { id: '1', name: 'Premium Ceramic Coating Kit', price: 150000, category: 'Care', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000' },
    { id: '2', name: 'Custom Floor Mats (All Weather)', price: 85000, category: 'Interior', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000' },
    { id: '3', name: 'Advanced Dash Cam 4K', price: 210000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000' },
    { id: '4', name: 'Luxury Car Cover', price: 65000, category: 'Exterior', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000' },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Premium Accessories</h1>
            <p className="text-silver-400 text-lg">Curated additions for your vehicle.</p>
          </div>
          
          <div className="bg-charcoal-800 p-3 rounded-full border border-white/10 flex items-center justify-center relative cursor-pointer hover:border-red-500/50 transition-colors">
            <ShoppingBag className="text-silver-300" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {accessories.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item.id} 
              className="group bg-charcoal-800 rounded-3xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-colors flex flex-col"
            >
              <div className="aspect-square overflow-hidden relative bg-charcoal-700">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-charcoal-900/80 backdrop-blur-md rounded-full text-xs font-medium text-white uppercase tracking-widest border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-medium text-white mb-2">{item.name}</h3>
                <p className="text-xl font-bold text-silver-300 mb-6">₦{item.price.toLocaleString()}</p>
                <div className="mt-auto">
                  <button 
                    onClick={() => setCart([...cart, item.id])}
                    className="w-full py-3 bg-charcoal-900 border border-white/10 text-white rounded-xl font-medium group-hover:bg-red-600 group-hover:border-red-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
