import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../store/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Calendar, Fuel, Gauge, Settings, Maximize2, Share2, X, Download } from 'lucide-react';

export default function CarDetail() {
  const { id } = useParams();
  const { user, profile } = useAuth();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showReferralCard, setShowReferralCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mock data for initial render or if id is not found in db yet
  const mockCar = {
    id: 'mock-1',
    make: 'BMW',
    model: 'X5 M Competition',
    year: 2023,
    condition: 'New',
    price: 85000000,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    mileage: 120,
    exterior_color: 'Black Sapphire',
    interior_color: 'Sakhir Orange',
    description: 'The BMW X5 M Competition blends M typical performance with the flexibility of an X model. Experience sheer driving pleasure with a high-performance M TwinPower Turbo V8 engine.',
    media: [
      'https://images.unsplash.com/photo-1555353540-64fddefd1a59?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop'
    ]
  };

  useEffect(() => {
    async function fetchCar() {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('cars').select('*, car_media(url, is_cover)').eq('id', id).single();
        if (data) {
          // Format media
          const media = data.car_media?.length ? data.car_media.map((m: any) => m.url) : mockCar.media;
          setCar({ ...data, media });
        } else {
          setCar(mockCar);
        }
      } catch (e) {
        setCar(mockCar);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) return <div className="pt-32 min-h-screen bg-charcoal-900 text-center text-silver-400">Loading details...</div>;
  if (!car) return <div className="pt-32 min-h-screen bg-charcoal-900 text-center text-silver-400">Car not found.</div>;

  const nextImage = () => setActiveImage((prev) => (prev + 1) % car.media.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + car.media.length) % car.media.length);

  const waText = encodeURIComponent(`Hello Lincoln Autos, I am inquiring about the ${car.year} ${car.make} ${car.model} listed at ₦${car.price.toLocaleString()}. Is this vehicle still available?`);

  return (
    <div className="pt-20 min-h-screen bg-charcoal-900">
      
      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal-900/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 text-white hover:text-red-400 z-[110]">Close</button>
            <img src={car.media[activeImage]} alt="" className="max-w-full max-h-[90vh] object-contain" />
            
            <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-charcoal-800/50 text-white rounded-full hover:bg-red-600 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-charcoal-800/50 text-white rounded-full hover:bg-red-600 transition-colors">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-charcoal-800 border border-white/10 rounded-full text-xs font-medium text-silver-300 uppercase tracking-widest">{car.condition}</span>
            {car.is_dealer_owned && <span className="px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-xs font-medium text-red-400 uppercase tracking-widest">Dealer Certified</span>}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 tracking-tight">
            {car.year} {car.make} <span className="text-silver-400">{car.model}</span>
          </h1>
          <p className="text-3xl font-display text-white">₦{car.price?.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Media Gallery */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] bg-charcoal-800 rounded-3xl overflow-hidden group border border-white/5 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={car.media[activeImage]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent pointer-events-none" />

              <button onClick={() => setIsFullscreen(true)} className="absolute top-4 right-4 p-3 bg-charcoal-900/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                <Maximize2 size={20} />
              </button>

              <div className="absolute bottom-6 right-6 flex gap-2">
                <button onClick={prevImage} className="p-3 bg-charcoal-900/40 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-charcoal-900 transition-colors border border-white/10">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImage} className="p-3 bg-charcoal-900/40 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-charcoal-900 transition-colors border border-white/10">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-4 hide-scrollbar">
              {car.media.map((url: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-32 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-charcoal-900' : 'opacity-50 hover:opacity-100'}`}
                >
                  <img src={url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Overview */}
            <div className="mt-12 bg-charcoal-800 rounded-3xl p-8 border border-white/5">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Vehicle Overview</h3>
              <p className="text-silver-300 leading-relaxed text-lg font-light">
                {car.description}
              </p>
            </div>
          </div>

          {/* Sidebar / Specs */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Action Card */}
            <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5 sticky top-28 shadow-2xl">
              <h3 className="text-xl font-display font-semibold text-white mb-6">Acquire this vehicle</h3>
              
              <div className="space-y-4">
                <a 
                  href={`https://wa.me/2349073796178?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors"
                >
                  Inquire on WhatsApp
                </a>
                
                <button className="flex items-center justify-center w-full py-4 bg-charcoal-900 border border-white/10 hover:border-white/30 text-white rounded-xl font-medium transition-colors group">
                  Request Delivery <ChevronRight size={18} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
                
                <div className="pt-4 border-t border-white/5">
                  <button 
                    onClick={() => {
                      if (!user) {
                        alert("Please log in to generate your partner referral card.");
                        return;
                      }
                      setShowReferralCard(true);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-red-900/50 to-charcoal-900 text-white border border-red-500/30 rounded-xl font-medium flex items-center justify-center hover:border-red-500/80 transition-colors"
                  >
                    <Share2 size={18} className="mr-2 text-red-400" />
                    Share & Earn
                  </button>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-charcoal-800 p-6 rounded-2xl border border-white/5">
                <Calendar className="text-silver-500 mb-3" size={24} />
                <p className="text-silver-400 text-sm mb-1">Year</p>
                <p className="text-white font-medium">{car.year}</p>
              </div>
              <div className="bg-charcoal-800 p-6 rounded-2xl border border-white/5">
                <Settings className="text-silver-500 mb-3" size={24} />
                <p className="text-silver-400 text-sm mb-1">Transmission</p>
                <p className="text-white font-medium">{car.transmission || 'N/A'}</p>
              </div>
              <div className="bg-charcoal-800 p-6 rounded-2xl border border-white/5">
                <Fuel className="text-silver-500 mb-3" size={24} />
                <p className="text-silver-400 text-sm mb-1">Fuel Type</p>
                <p className="text-white font-medium">{car.fuel_type || 'N/A'}</p>
              </div>
              <div className="bg-charcoal-800 p-6 rounded-2xl border border-white/5">
                <Gauge className="text-silver-500 mb-3" size={24} />
                <p className="text-silver-400 text-sm mb-1">Mileage</p>
                <p className="text-white font-medium">{car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'}</p>
              </div>
            </div>
            
            {/* Colors */}
            <div className="bg-charcoal-800 p-6 rounded-2xl border border-white/5">
              <h4 className="text-white font-medium mb-4">Colors</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-silver-400">Exterior</span>
                  <span className="text-white">{car.exterior_color || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-silver-400">Interior</span>
                  <span className="text-white">{car.interior_color || 'N/A'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Referral Card Modal */}
      <AnimatePresence>
        {showReferralCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal-900/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <button onClick={() => setShowReferralCard(false)} className="absolute top-6 right-6 p-2 bg-charcoal-800 text-white rounded-full border border-white/10 hover:bg-red-600 transition-colors z-[110]">
              <X size={24} />
            </button>
            
            <div className="text-center mb-6 max-w-lg">
              <h2 className="text-2xl font-display font-bold text-white mb-2">Your Partner Card</h2>
              <p className="text-silver-400 text-sm">Screenshot this card and share it on your WhatsApp status or social media. When buyers use your code, they get a discount and you earn commission.</p>
            </div>

            {/* The actual card to screenshot */}
            <div 
              ref={cardRef}
              className="w-full max-w-md bg-charcoal-800 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="text-sm font-display font-bold tracking-widest text-white drop-shadow-md">LINCOLN<span className="text-red-500">AUTOS</span></span>
              </div>
              <div className="aspect-[4/3] relative">
                <img src={car.media[0]} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-charcoal-900/30" />
              </div>
              
              <div className="p-8 -mt-16 relative z-10 bg-gradient-to-t from-charcoal-800 via-charcoal-800 to-transparent">
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-lg">Special Offer</span>
                <h3 className="text-2xl font-display font-bold text-white mb-1">{car.year} {car.make} {car.model}</h3>
                <p className="text-xl font-medium text-silver-300 mb-6">₦{car.price?.toLocaleString()}</p>
                
                <div className="bg-charcoal-900 p-4 rounded-2xl border border-dashed border-red-500/50 flex flex-col items-center text-center">
                  <p className="text-xs text-silver-400 uppercase tracking-widest mb-1">Use My Code For Discount</p>
                  <p className="text-2xl font-mono font-bold text-white tracking-widest">LINC-{profile?.id?.slice(0,6).toUpperCase() || 'PROMO'}</p>
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-silver-500 text-sm flex items-center"><Download size={16} className="mr-2" /> Take a screenshot of the card above to share</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
