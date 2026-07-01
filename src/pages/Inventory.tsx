import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inventory() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters state
  const [condition, setCondition] = useState<string>('All');
  const [search, setSearch] = useState('');

  // Fallback data if DB is empty
  const fallbackCars = [
    {
      id: 'mock-1', make: 'BMW', model: 'X5 M', year: 2023, condition: 'New', price: 85000000, 
      car_media: [{ url: 'https://images.unsplash.com/photo-1555353540-64fddefd1a59?q=80&w=1000&auto=format&fit=crop', is_cover: true }]
    },
    {
      id: 'mock-2', make: 'Mercedes-Benz', model: 'G63 AMG', year: 2022, condition: 'Tokunbo', price: 120000000,
      car_media: [{ url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop', is_cover: true }]
    },
    {
      id: 'mock-3', make: 'Lexus', model: 'LX 600', year: 2024, condition: 'New', price: 150000000,
      car_media: [{ url: 'https://images.unsplash.com/photo-1596700051187-57353fbc4a3a?q=80&w=1000&auto=format&fit=crop', is_cover: true }]
    }
  ];

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      try {
        let query = supabase.from('cars').select('*, car_media(url, is_cover)');
        
        if (condition !== 'All') {
          query = query.eq('condition', condition);
        }

        const { data, error } = await query;
        if (data && data.length > 0) {
          setCars(data);
        } else {
          // Client-side filtering for fallback
          let filtered = fallbackCars;
          if (condition !== 'All') filtered = filtered.filter(c => c.condition === condition);
          setCars(filtered);
        }
      } catch (error) {
        setCars(fallbackCars);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, [condition]);

  const filteredCars = cars.filter(car => 
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Inventory</h1>
            <p className="text-silver-400 text-lg">Find your next premium vehicle.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-500" size={18} />
              <input 
                type="text" 
                placeholder="Search make, model..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-charcoal-800 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center p-3 bg-charcoal-800 border border-white/10 rounded-xl text-silver-300"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-charcoal-800 border border-white/5 rounded-3xl p-6 lg:sticky lg:top-28">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-xl font-display font-semibold text-white">Filters</h2>
                <button onClick={() => setShowFilters(false)}><X size={20} className="text-silver-400" /></button>
              </div>
              <h2 className="hidden lg:block text-xl font-display font-semibold text-white mb-6">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-silver-400 mb-3 uppercase tracking-wider">Condition</h3>
                  <div className="space-y-2">
                    {['All', 'New', 'Tokunbo'].map(cond => (
                      <label key={cond} className="flex items-center group cursor-pointer">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${condition === cond ? 'bg-red-600 border-red-600' : 'border-white/20 group-hover:border-red-500/50'}`}>
                          {condition === cond && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <span className={`text-sm ${condition === cond ? 'text-white font-medium' : 'text-silver-300'}`}>{cond}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Additional mock filters for visual completeness */}
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-sm font-medium text-silver-400 mb-3 uppercase tracking-wider">Price Range</h3>
                  <input type="range" className="w-full accent-red-500" />
                  <div className="flex justify-between text-xs text-silver-500 mt-2">
                    <span>₦0</span>
                    <span>₦200M+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-3">
            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="bg-charcoal-800 rounded-3xl h-96 animate-pulse border border-white/5"></div>
                 ))}
               </div>
            ) : filteredCars.length === 0 ? (
               <div className="bg-charcoal-800 rounded-3xl p-12 text-center border border-white/5">
                 <p className="text-silver-400 text-lg">No vehicles found matching your criteria.</p>
                 <button onClick={() => { setCondition('All'); setSearch(''); }} className="mt-4 text-red-400 hover:text-red-300">Clear filters</button>
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredCars.map((car: any) => {
                    const coverMedia = car.car_media?.find((m:any) => m.is_cover) || car.car_media?.[0] || { url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000' };
                    
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        key={car.id} 
                        className="group rounded-3xl bg-charcoal-800 border border-white/5 overflow-hidden hover:border-red-500/30 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col"
                      >
                        <div className="aspect-[4/3] bg-charcoal-700 relative overflow-hidden">
                          <img src={coverMedia.url} alt={`${car.year} ${car.make} ${car.model}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-charcoal-900/80 backdrop-blur-md rounded-full text-xs font-medium text-white uppercase tracking-widest border border-white/10">
                              {car.condition}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-display font-semibold text-white">
                              {car.year} {car.make} {car.model}
                            </h3>
                          </div>
                          <p className="text-2xl font-medium text-white mb-6">₦{car.price?.toLocaleString()}</p>
                          
                          <div className="mt-auto">
                            <Link to={`/inventory/${car.id}`} className="block w-full py-3 bg-charcoal-700 text-center text-white rounded-xl font-medium group-hover:bg-red-600 transition-colors">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
