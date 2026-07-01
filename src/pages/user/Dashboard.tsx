import { useEffect, useState } from 'react';
import { useAuth } from '../../store/useAuth';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Car as CarIcon, Truck, User } from 'lucide-react';

export default function Dashboard() {
  const { profile, signOut } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!profile) return;
      
      const [listingsData, deliveriesData] = await Promise.all([
        supabase.from('listings_requests').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }),
        supabase.from('delivery_requests').select('*').eq('user_id', profile.id).order('created_at', { ascending: false })
      ]);

      if (listingsData.data) setListings(listingsData.data);
      if (deliveriesData.data) setDeliveries(deliveriesData.data);
      setLoading(false);
    }
    fetchData();
  }, [profile]);

  if (loading) {
    return <div className="pt-32 min-h-screen bg-charcoal-900 text-center text-silver-400">Loading your dashboard...</div>;
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'contacted': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'acquired': 
      case 'delivered': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'declined': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'scheduled': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-silver-500/20 text-silver-500 border-silver-500/30';
    }
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Welcome, {profile?.full_name || 'User'}</h1>
            <p className="text-silver-400">Manage your listings, delivery requests, and account settings.</p>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/dashboard/submit-car"
              className="flex items-center px-6 py-3 bg-white text-charcoal-900 rounded-full font-medium hover:bg-silver-300 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              List a Car
            </Link>
            <button 
              onClick={signOut}
              className="flex items-center px-6 py-3 bg-charcoal-800 text-white rounded-full font-medium hover:bg-charcoal-700 border border-white/10 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Log Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5 h-fit">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-16 h-16 bg-charcoal-700 rounded-full flex items-center justify-center">
                <User size={32} className="text-silver-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">{profile?.full_name}</h3>
                <p className="text-silver-400 text-sm">{profile?.phone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left py-2 text-silver-300 hover:text-white transition-colors">Edit Profile</button>
              <button className="w-full text-left py-2 text-silver-300 hover:text-white transition-colors">Change Password</button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Referral Program */}
            <div className="bg-gradient-to-br from-red-900/40 to-charcoal-800 rounded-3xl p-8 border border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <User size={120} />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Lincoln Partners Program</h2>
                <p className="text-silver-300 mb-6 max-w-md">Share cars with your network. When someone buys using your unique code, they get a discount and you earn a commission.</p>
                <div className="inline-flex items-center gap-4 bg-charcoal-900/80 p-4 rounded-xl border border-white/10">
                  <div>
                    <p className="text-xs text-silver-400 uppercase tracking-wider mb-1">Your Partner Code</p>
                    <p className="text-xl font-mono font-bold text-red-400">LINC-{profile?.id?.slice(0, 6).toUpperCase() || 'USER12'}</p>
                  </div>
                  <button className="px-4 py-2 bg-white text-charcoal-900 rounded-lg text-sm font-medium hover:bg-silver-300 transition-colors">Copy</button>
                </div>
              </div>
            </div>

            {/* Insurance & Maintenance */}
            <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-white flex items-center">
                  <span className="p-2 bg-red-500/20 text-red-500 rounded-lg mr-3">🛡️</span> 
                  Insurance & Follow-up
                </h2>
              </div>
              <div className="text-center py-12 bg-charcoal-900/50 rounded-2xl border border-white/5">
                <p className="text-silver-400 mb-4">No active insurance policies linked to your account.</p>
                <button className="text-red-400 hover:text-red-300 font-medium">Request a Quote &rarr;</button>
              </div>
            </div>

            {/* My Listings */}
            <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-white flex items-center">
                  <CarIcon className="mr-3 text-red-500" /> My Submitted Cars
                </h2>
              </div>
              
              {listings.length === 0 ? (
                <div className="text-center py-12 bg-charcoal-900/50 rounded-2xl border border-white/5">
                  <p className="text-silver-400 mb-4">You haven't submitted any cars yet.</p>
                  <Link to="/dashboard/submit-car" className="text-red-400 hover:text-red-300 font-medium">Get started &rarr;</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.map(listing => (
                    <div key={listing.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-charcoal-900/50 rounded-2xl border border-white/5">
                      <div>
                        <h4 className="text-white font-medium text-lg">{listing.year} {listing.make} {listing.model}</h4>
                        <p className="text-silver-400 text-sm">{listing.condition} • ₦{listing.price?.toLocaleString()}</p>
                      </div>
                      <span className={`mt-3 sm:mt-0 px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Requests */}
            <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-white flex items-center">
                  <Truck className="mr-3 text-green-500" /> Delivery Requests
                </h2>
              </div>
              
              {deliveries.length === 0 ? (
                <div className="text-center py-12 bg-charcoal-900/50 rounded-2xl border border-white/5">
                  <p className="text-silver-400">No active delivery requests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {deliveries.map(delivery => (
                    <div key={delivery.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-charcoal-900/50 rounded-2xl border border-white/5">
                      <div>
                        <h4 className="text-white font-medium text-lg">Delivery to {delivery.address}</h4>
                        <p className="text-silver-400 text-sm">{new Date(delivery.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`mt-3 sm:mt-0 px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
