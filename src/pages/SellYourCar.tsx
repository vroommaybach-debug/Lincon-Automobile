import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, CheckSquare, UploadCloud, Users } from 'lucide-react';

export default function SellYourCar() {
  return (
    <div className="pt-20 min-h-screen bg-charcoal-900">
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal-900/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2940&auto=format&fit=crop)' }}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight"
          >
            List Your <span className="text-red-500">Vehicle</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-silver-300 font-light max-w-2xl mx-auto mb-10"
          >
            Access our network of premium buyers. List your car on Lincoln Autos and manage your listing directly from your dashboard.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/dashboard/submit-car" className="inline-block px-8 py-4 bg-white text-charcoal-900 rounded-full font-medium hover:bg-silver-300 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-display font-bold text-white mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/8 right-1/8 h-0.5 bg-white/10 -z-10" />
            
            {[
              { step: '01', icon: CheckSquare, title: 'Create Account', desc: 'Sign up to access your personal dashboard and manage your listings securely.' },
              { step: '02', icon: UploadCloud, title: 'Submit Details', desc: 'Provide comprehensive details about your vehicles condition, history, and specifications.' },
              { step: '03', icon: Camera, title: 'Upload Media', desc: 'Upload high-resolution photos and video tours to showcase your vehicle properly.' },
              { step: '04', icon: Users, title: 'Get Approved', desc: 'Our acquisition team reviews your submission and publishes it to our premium network.' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-24 h-24 mx-auto bg-charcoal-900 border border-white/10 rounded-3xl flex items-center justify-center mb-6 text-red-500 relative shadow-xl">
                  <span className="absolute -top-3 -right-3 text-4xl font-display font-bold text-white/5">{item.step}</span>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-silver-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immediate Sale Option */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal-800 rounded-3xl p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Want to sell immediately?</h2>
            <p className="text-silver-400">Skip the listing process. We buy premium vehicles directly for cash.</p>
          </div>
          <Link to="/we-buy-cars" className="px-8 py-4 bg-charcoal-900 text-white border border-white/20 rounded-full font-medium hover:border-white/40 transition-colors whitespace-nowrap">
            Request an Offer
          </Link>
        </div>
      </section>

    </div>
  );
}
