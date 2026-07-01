import { motion } from 'framer-motion';
import { Shield, Award, MapPin, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-charcoal-900">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal-900/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1563720225384-954f94086667?q=80&w=2940&auto=format&fit=crop)' }}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter"
          >
            Our <span className="text-silver-400">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-silver-300 font-light"
          >
            Redefining the luxury automotive experience in Lagos.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Excellence Without Compromise</h2>
            <div className="space-y-4 text-silver-400 leading-relaxed">
              <p>
                Founded in Iju Ishaga, Lagos, Lincoln Autos was established with a singular vision: to bring transparency, quality, and a truly premium experience to the Nigerian automotive market.
              </p>
              <p>
                Whether you are acquiring a brand new luxury SUV or a meticulously vetted tokunbo sedan, our standards remain uncompromising. Every vehicle in our inventory undergoes rigorous inspection to ensure it meets our strict criteria for performance and aesthetics.
              </p>
              <p>
                We don't just sell cars; we curate automotive excellence and deliver it directly to your driveway with our signature white-glove service.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1000" alt="Luxury car interior" className="rounded-2xl object-cover h-64 w-full" />
            <img src="https://images.unsplash.com/photo-1503376713175-39d6776856c8?q=80&w=1000" alt="Luxury car exterior" className="rounded-2xl object-cover h-64 w-full mt-8" />
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-charcoal-800 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-display font-bold text-white mb-16">Why Choose Lincoln Autos</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Vetted Quality', desc: 'Every vehicle undergoes a 150-point inspection.' },
              { icon: Award, title: 'Premium Selection', desc: 'Curated inventory of the worlds finest brands.' },
              { icon: Truck, title: 'White-Glove Delivery', desc: 'Secure, insured delivery to your location.' },
              { icon: Clock, title: 'Transparent Process', desc: 'Clear pricing and straightforward documentation.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto bg-charcoal-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-silver-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 text-green-500">
          <MapPin size={28} />
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-4">Visit Our Showroom</h2>
        <p className="text-silver-400 mb-8 max-w-2xl mx-auto">
          Located in the heart of Iju Ishaga, Lagos. Experience our collection in person, strictly by appointment to ensure dedicated attention.
        </p>
        <a href="https://wa.me/2349073796178" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-white text-charcoal-900 rounded-full font-medium hover:bg-silver-300 transition-colors">
          Schedule an Appointment
        </a>
      </section>
    </div>
  );
}
