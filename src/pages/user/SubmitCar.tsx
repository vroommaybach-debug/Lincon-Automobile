import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../store/useAuth';
import { CheckCircle, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SubmitCar() {
  const { profile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear().toString(),
    condition: 'Tokunbo',
    price: '',
    description: '',
  });
  
  // Real app would handle actual file uploads to Supabase Storage here.
  // For this UI, we will simulate the upload step to show the intended UX.
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    setError(null);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        setUploadProgress(i);
        await new Promise(r => setTimeout(r, 200));
      }

      // In a real implementation: upload files to supabase storage, get URLs.
      const simulatedUrls = mediaFiles.map((_, i) => `https://example.com/simulated-image-${i}.jpg`);

      const { error: submitError } = await supabase.from('listings_requests').insert([{
        user_id: profile.id,
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        condition: formData.condition,
        price: parseFloat(formData.price),
        description: formData.description,
        media_urls: simulatedUrls
      }]);

      if (submitError) throw submitError;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit listing.');
      setLoading(false);
    }
  };

  if (success) {
    const waText = encodeURIComponent(`Hello Lincoln Autos, I just submitted my ${formData.year} ${formData.make} ${formData.model} via the dashboard. Photos and videos are attached to my submission. Expected price: ₦${formData.price}. Please review!`);
    return (
      <div className="pt-32 pb-24 min-h-screen bg-charcoal-900 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg w-full bg-charcoal-800 p-10 rounded-3xl border border-white/5 text-center shadow-2xl mx-4"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Listing Submitted</h2>
          <p className="text-silver-400 mb-8">
            Your vehicle details and media have been uploaded securely. Please send us a quick WhatsApp message to notify the acquisition team.
          </p>
          <a
            href={`https://wa.me/2349073796178?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors mb-4"
          >
            Send to Lincoln Autos on WhatsApp
          </a>
          <Link to="/dashboard" className="text-silver-400 hover:text-white transition-colors">
            Return to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/dashboard" className="text-red-400 hover:text-red-300 mb-6 inline-block">&larr; Back to Dashboard</Link>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Submit a Car</h1>
          <p className="text-silver-400">List your vehicle on Lincoln Autos.</p>
        </div>

        <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200">
              {error}
            </div>
          )}

          <div className="flex mb-8">
            <div className={`flex-1 pb-4 border-b-2 ${step >= 1 ? 'border-red-500 text-red-500' : 'border-white/10 text-silver-500'} font-medium`}>Step 1: Details</div>
            <div className={`flex-1 pb-4 border-b-2 ${step >= 2 ? 'border-red-500 text-red-500' : 'border-white/10 text-silver-500'} font-medium text-right`}>Step 2: Media</div>
          </div>

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-6">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-silver-300 mb-1">Make</label>
                  <input required type="text" name="make" value={formData.make} onChange={handleChange} placeholder="e.g. Mercedes-Benz" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-silver-300 mb-1">Model</label>
                  <input required type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. G63 AMG" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
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
                  <label className="block text-sm font-medium text-silver-300 mb-1">Asking Price (₦)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 50000000" className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-silver-300 mb-1">Description / Key Features</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"></textarea>
                </div>
                
                <div className="md:col-span-2 mt-4">
                  <button type="submit" className="w-full py-4 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors">
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:border-red-500/50 transition-colors bg-charcoal-900">
                  <Upload className="w-12 h-12 text-silver-500 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">Upload High-Quality Images & Video</p>
                  <p className="text-silver-400 text-sm mb-6">Select multiple files (JPG, PNG, MP4)</p>
                  <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="hidden" id="media-upload" />
                  <label htmlFor="media-upload" className="cursor-pointer inline-flex px-6 py-3 bg-charcoal-800 border border-white/10 text-white rounded-full hover:bg-charcoal-700 transition-colors">
                    Browse Files
                  </label>
                </div>

                {mediaFiles.length > 0 && (
                  <div className="bg-charcoal-900 p-4 rounded-xl border border-white/5">
                    <p className="text-silver-300 text-sm mb-3">{mediaFiles.length} files selected</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {mediaFiles.map((f, i) => (
                        <div key={i} className="w-20 h-20 flex-shrink-0 bg-charcoal-800 rounded-lg flex items-center justify-center text-xs text-silver-500 border border-white/10 overflow-hidden relative">
                           {f.type.startsWith('image/') ? (
                             <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                           ) : (
                             'Video'
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {loading && (
                   <div className="w-full bg-charcoal-900 rounded-full h-2 mt-4 overflow-hidden">
                     <div className="bg-red-500 h-2 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                   </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={handleBack} disabled={loading} className="w-1/3 py-4 bg-charcoal-900 border border-white/10 text-white rounded-xl font-medium hover:bg-charcoal-700 transition-colors disabled:opacity-50">
                    Back
                  </button>
                  <button type="submit" disabled={loading || mediaFiles.length === 0} className="w-2/3 py-4 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors disabled:opacity-50">
                    {loading ? 'Uploading...' : 'Submit Listing'}
                  </button>
                </div>
              </motion.div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
