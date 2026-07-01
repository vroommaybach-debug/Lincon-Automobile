import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../store/useAuth';
import { motion } from 'framer-motion';
import { ShieldCheck, Map, Clock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Delivery() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    vehicle_details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/delivery' } } });
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from('delivery_requests').insert([{
        user_id: user.id,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        // Optional car_id would go here if linking to a specific purchased car
      }]);

      if (submitError) throw submitError;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-20 min-h-screen bg-charcoal-900">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal-900/70 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2940&auto=format&fit=crop)' }}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight"
          >
            White-Glove <span className="text-silver-400">Delivery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-silver-300 font-light"
          >
            From our showroom to your driveway, with absolute care.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-b border-white/5 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-charcoal-900 p-8 rounded-3xl border border-white/5">
              <ShieldCheck className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-xl font-medium text-white mb-3">Fully Insured</h3>
              <p className="text-silver-400 leading-relaxed">Your vehicle is fully insured during transit, giving you complete peace of mind from dispatch to delivery.</p>
            </div>
            <div className="bg-charcoal-900 p-8 rounded-3xl border border-white/5">
              <Map className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-xl font-medium text-white mb-3">Nationwide Reach</h3>
              <p className="text-silver-400 leading-relaxed">While based in Lagos, our specialized transport network covers all major states across Nigeria safely.</p>
            </div>
            <div className="bg-charcoal-900 p-8 rounded-3xl border border-white/5">
              <Clock className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-xl font-medium text-white mb-3">Flexible Scheduling</h3>
              <p className="text-silver-400 leading-relaxed">We coordinate with your schedule to ensure you are present for the detailed vehicle handover process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Request Delivery Services</h2>
          <p className="text-silver-400">Need a premium vehicle transported securely? Fill out the form below.</p>
        </div>

        {success ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-charcoal-800 p-10 rounded-3xl border border-white/5 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Request Scheduled</h2>
            <p className="text-silver-400 mb-8">
              Thank you. Our logistics team will review your request and contact you shortly to confirm dates and pricing.
            </p>
            <Link to="/dashboard" className="block w-full py-4 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors">
              Go to Dashboard
            </Link>
          </motion.div>
        ) : (
          <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5 shadow-2xl">
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-silver-300 mb-1">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-silver-300 mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-silver-300 mb-1">Delivery Address</label>
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Full address including state" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-silver-300 mb-1">Vehicle Details (if applicable)</label>
                  <input type="text" name="vehicle_details" value={formData.vehicle_details} onChange={handleChange} placeholder="e.g. 2023 Range Rover Vogue" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors disabled:opacity-50 mt-8"
              >
                {loading ? 'Submitting...' : (user ? 'Submit Request' : 'Login to Submit Request')}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
