import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2, Shield, MapPin, Truck } from 'lucide-react';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const heroSlides = [
    'https://images.unsplash.com/photo-1503376713175-39d6776856c8?q=80&w=2940&auto=format&fit=crop', // Audi
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2940&auto=format&fit=crop', // BMW
    'https://images.unsplash.com/photo-1555353540-64fddefd1a59?q=80&w=2940&auto=format&fit=crop', // Merc
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2940&auto=format&fit=crop'  // Ferrari
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data } = await supabase
          .from('cars')
          .select('*, car_media(url, is_cover)')
          .eq('featured', true)
          .limit(3);
        if (data) setFeaturedCars(data);
      } catch (error) {
        // Handle gracefully
      }
    }
    fetchFeatured();
  }, []);

  const fallbackFeatured = [
    { id: '1', make: 'BMW', model: 'X5 M', year: 2023, price: 85000000, condition: 'New', car_media: [{ url: 'https://images.unsplash.com/photo-1555353540-64fddefd1a59?q=80&w=1000' }] },
    { id: '2', make: 'Mercedes', model: 'G63 AMG', year: 2022, price: 120000000, condition: 'Tokunbo', car_media: [{ url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000' }] },
    { id: '3', make: 'Lexus', model: 'LX 600', year: 2024, price: 150000000, condition: 'New', car_media: [{ url: 'https://images.unsplash.com/photo-1596700051187-57353fbc4a3a?q=80&w=1000' }] }
  ];

  const displayCars = featuredCars.length > 0 ? featuredCars : fallbackFeatured;

  return (
    <div className="flex flex-col">
      {/* Cinematic Hero */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900 z-10" />
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentHeroSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center mix-blend-luminosity"
            style={{ backgroundImage: `url(${heroSlides[currentHeroSlide]})` }}
          />
        </AnimatePresence>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block py-1 px-4 rounded-full border border-red-500/30 text-red-400 text-xs font-bold tracking-[0.3em] uppercase mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              The Standard in Luxury
            </motion.span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tighter text-white mb-6 uppercase leading-none italic transform -skew-x-12 flex flex-col items-center">
               <motion.span 
                 initial={{ opacity: 0, x: -100 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                 className="block drop-shadow-2xl"
               >DRIVE</motion.span>
               <motion.span 
                 initial={{ opacity: 0, x: 100 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                 className="block text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-red-500 to-red-800 drop-shadow-[0_10px_30px_rgba(239,68,68,0.8)]"
                 style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}
               >EXCELLENCE</motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-silver-300 font-light mb-12 leading-relaxed"
            >
              Curated selection of premium new and tokunbo vehicles in Lagos. Cinematic presentation, uncompromising quality.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/inventory"
                className="group relative px-8 py-4 bg-white text-charcoal-900 font-medium rounded-full overflow-hidden transition-all hover:scale-105 w-full sm:w-auto flex justify-center items-center"
              >
                <span className="relative z-10 flex items-center">
                  View Inventory <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/we-buy-cars"
                className="px-8 py-4 bg-charcoal-800/80 backdrop-blur-md text-white font-medium rounded-full border border-white/10 hover:bg-charcoal-700 hover:border-white/20 transition-all w-full sm:w-auto flex justify-center items-center"
              >
                Sell Your Car
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-silver-400/50 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-silver-400/50 to-transparent" />
        </motion.div>
      </section>

      {/* Brand Marquee Ticker */}
      <div className="py-10 bg-charcoal-900 border-b border-white/5 overflow-hidden flex relative shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal-900 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal-900 to-transparent z-10" />
        
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap items-center gap-16 px-8"
        >
          {/* Duplicate brands twice for seamless looping */}
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-20 items-center">
              <span className="text-2xl font-display font-bold text-silver-600/50 uppercase tracking-[0.2em]">Mercedes-Benz</span>
              <span className="text-2xl font-display font-bold text-silver-600/50 uppercase tracking-[0.2em]">Rolls-Royce</span>
              <span className="text-2xl font-display font-bold text-silver-600/50 uppercase tracking-[0.2em]">Bentley</span>
              <span className="text-2xl font-display font-bold text-silver-600/50 uppercase tracking-[0.2em]">Ferrari</span>
              <span className="text-2xl font-display font-bold text-silver-600/50 uppercase tracking-[0.2em]">Lamborghini</span>
              <span className="text-2xl font-display font-bold text-silver-600/50 uppercase tracking-[0.2em]">Porsche</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Section */}
      <section className="py-32 bg-charcoal-900 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Featured Collection</h2>
              <p className="text-silver-400 text-lg">Handpicked excellence, ready for delivery.</p>
            </div>
            <Link to="/inventory" className="hidden md:flex items-center text-white hover:text-silver-300 font-medium uppercase tracking-wider text-sm transition-colors">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCars.map((car, i) => {
               const cover = car.car_media?.find((m:any) => m.is_cover) || car.car_media?.[0] || { url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000' };
               return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  key={car.id} 
                  className="group rounded-3xl bg-charcoal-800 border border-white/5 overflow-hidden hover:border-red-500/30 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col h-full"
                >
                  <div className="aspect-[4/3] bg-charcoal-700 relative overflow-hidden">
                    <img src={cover.url} alt={`${car.year} ${car.make}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-charcoal-900/80 backdrop-blur-md rounded-full text-xs font-medium text-white uppercase tracking-widest border border-white/10">
                        {car.condition}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-display font-semibold text-white">
                        {car.year} {car.make} <span className="text-silver-400">{car.model}</span>
                      </h3>
                    </div>
                    <p className="text-2xl font-medium text-white mb-6">₦{car.price?.toLocaleString()}</p>
                    
                    <div className="mt-auto">
                      <Link to={`/inventory/${car.id}`} className="block w-full py-4 bg-charcoal-900 border border-white/10 text-center text-white rounded-xl font-medium group-hover:bg-red-600 group-hover:border-red-500 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
               );
            })}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/inventory" className="inline-flex items-center text-white font-medium uppercase tracking-wider text-sm border-b border-white pb-1">
              View all inventory <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trust & Delivery Section */}
      <section className="py-32 bg-charcoal-800 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
               <img src="https://images.unsplash.com/photo-1617814076367-b7c761ece704?q=80&w=2000" alt="White-glove delivery" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
               <div className="absolute bottom-8 left-8 right-8">
                 <div className="bg-charcoal-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                   <div className="p-3 bg-red-500/20 text-red-400 rounded-full">
                     <Shield size={24} />
                   </div>
                   <div>
                     <p className="text-white font-medium">100% Secure Transit</p>
                     <p className="text-silver-400 text-sm">Fully insured from showroom to your door.</p>
                   </div>
                 </div>
               </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">White-Glove Delivery Experience</h2>
              <p className="text-silver-400 text-lg mb-10 leading-relaxed">
                Experience luxury from purchase to parking. We deliver directly to your driveway across Lagos and select states, professionally handled and ready to drive.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: Truck, title: 'Nationwide Network', desc: 'Specialized enclosed transport available.' },
                  { icon: MapPin, title: 'Lagos Showroom', desc: 'Visit us in Iju Ishaga for private viewings.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="p-3 bg-charcoal-900 rounded-xl text-green-500 border border-white/5 mr-4 mt-1">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      <p className="text-silver-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/delivery" className="inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal-900 rounded-full hover:bg-silver-300 transition-colors font-medium shadow-xl">
                Request Delivery Service
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-24 bg-charcoal-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1599912027806-ce07d152e437?q=80&w=2000')] bg-cover bg-fixed bg-center mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[
              { number: '500+', label: 'Vehicles Delivered' },
              { number: '100%', label: 'Secure Transactions' },
              { number: '24/7', label: 'Concierge Support' },
              { number: '1', label: 'Standard of Excellence' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-red-500 mb-2">{stat.number}</div>
                <div className="text-silver-400 text-sm tracking-widest uppercase font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
