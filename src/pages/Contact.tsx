import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-silver-400 max-w-2xl mx-auto"
          >
            Our dedicated team is ready to assist you with your automotive needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-charcoal-800 p-8 rounded-3xl border border-white/5 flex items-start gap-6">
               <div className="p-4 bg-charcoal-900 rounded-full text-red-500 border border-white/5">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="text-xl font-medium text-white mb-2">Showroom Location</h3>
                 <p className="text-silver-400 leading-relaxed">
                   Balogun Busstop<br />
                   253, Iju Ishaga Road<br />
                   Iju, Agege, Lagos
                 </p>
               </div>
            </div>

            <div className="bg-charcoal-800 p-8 rounded-3xl border border-white/5 flex items-start gap-6">
               <div className="p-4 bg-charcoal-900 rounded-full text-green-500 border border-white/5">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="text-xl font-medium text-white mb-2">Direct Contact</h3>
                 <a href="tel:+2349073796178" className="block text-silver-400 hover:text-white mb-1 transition-colors">+234 907 379 6178</a>
                 <a href="mailto:hello@lincolnautos.com" className="block text-silver-400 hover:text-white transition-colors">hello@lincolnautos.com</a>
               </div>
            </div>

            <div className="bg-charcoal-800 p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-medium text-white mb-4 flex items-center">
                <MessageCircle size={20} className="text-green-500 mr-2" />
                Fastest Response
              </h3>
              <p className="text-silver-400 mb-6">For immediate assistance, our sales team is active on WhatsApp.</p>
              <a 
                href="https://wa.me/2349073796178"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-charcoal-800 p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Name</label>
                <input type="text" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Email</label>
                <input type="email" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Subject</label>
                <select className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500">
                  <option>General Inquiry</option>
                  <option>Schedule Appointment</option>
                  <option>Vehicle Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Message</label>
                <textarea rows={4} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"></textarea>
              </div>
              <button className="w-full py-4 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Locate Us</h2>
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              src="https://maps.google.com/maps?q=253,+Iju+Ishaga+Road,+Iju,+Agege,+Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed">
            </iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
