import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeBuyCars() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    make: '',
    model: '',
    year: new Date().getFullYear().toString(),
    condition: 'Tokunbo',
    asking_price: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from('buy_requests').insert([{
        name: formData.name,
        phone: formData.phone,
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        condition: formData.condition,
        asking_price: formData.asking_price ? parseFloat(formData.asking_price) : null,
        notes: formData.notes
      }]);

      if (submitError) throw submitError;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (success) {
    const waText = encodeURIComponent(`Hello Lincoln Autos, I just submitted a request to sell my ${formData.year} ${formData.make} ${formData.model}.`);
    return (
      <div className="pt-32 pb-24 min-h-[80vh] bg-charcoal-900 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-charcoal-800 p-10 rounded-3xl border border-white/5 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Request Received</h2>
          <p className="text-silver-400 mb-8">
            Thank you, {formData.name}. We will review your vehicle details and get back to you with an offer shortly.
          </p>
          <a
            href={`https://wa.me/2349073796178?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors"
          >
            Continue on WhatsApp
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Sell Your Car to Us</h1>
          <p className="text-xl text-silver-400">Get a premium offer for your vehicle today.</p>
        </div>

        <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Your Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Make</label>
                <input required type="text" name="make" value={formData.make} onChange={handleChange} placeholder="e.g. BMW" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Model</label>
                <input required type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. X5" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Year</label>
                <input required type="number" name="year" value={formData.year} onChange={handleChange} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-silver-300 mb-1">Condition</label>
                <select name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500">
                  <option value="New">New</option>
                  <option value="Tokunbo">Tokunbo (Foreign Used)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-silver-300 mb-1">Expected Asking Price (₦)</label>
                <input type="number" name="asking_price" value={formData.asking_price} onChange={handleChange} placeholder="Optional" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-silver-300 mb-1">Additional Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"></textarea>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors disabled:opacity-50 mt-8"
            >
              {loading ? 'Submitting...' : 'Submit Vehicle Details'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
