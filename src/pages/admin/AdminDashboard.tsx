import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Car, ClipboardList, Truck, Tag, RefreshCcw } from 'lucide-react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    cars: 0,
    listings: 0,
    buyRequests: 0,
    deliveryRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const [
        { count: carsCount },
        { count: listingsCount },
        { count: buyCount },
        { count: deliveryCount }
      ] = await Promise.all([
        supabase.from('cars').select('*', { count: 'exact', head: true }),
        supabase.from('listings_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('buy_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('delivery_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      setCounts({
        cars: carsCount || 0,
        listings: listingsCount || 0,
        buyRequests: buyCount || 0,
        deliveryRequests: deliveryCount || 0,
      });
    } catch (error) {
      console.error('Error fetching admin counts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const StatCard = ({ title, count, icon: Icon, to, colorClass }: any) => (
    <Link to={to} className="bg-charcoal-800 p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colorClass}`}>
          <Icon size={24} />
        </div>
        <span className="text-4xl font-display font-bold text-white group-hover:scale-110 transition-transform origin-right">{count}</span>
      </div>
      <h3 className="text-silver-300 font-medium">{title}</h3>
    </Link>
  );

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Admin Overview</h1>
            <p className="text-silver-400">Manage operations, inventory, and requests.</p>
          </div>
          <button 
            onClick={fetchCounts}
            className="p-3 bg-charcoal-800 rounded-full text-silver-300 hover:text-white hover:bg-charcoal-700 transition-colors border border-white/5"
          >
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Live Inventory" 
            count={counts.cars} 
            icon={Car} 
            to="/admin/inventory" 
            colorClass="bg-red-500/20 text-red-500"
          />
          <StatCard 
            title="Pending Listings" 
            count={counts.listings} 
            icon={ClipboardList} 
            to="/admin/listings" 
            colorClass="bg-yellow-500/20 text-yellow-500"
          />
          <StatCard 
            title="Pending Buy Requests" 
            count={counts.buyRequests} 
            icon={Tag} 
            to="/admin/buy-requests" 
            colorClass="bg-green-500/20 text-green-500"
          />
          <StatCard 
            title="Pending Deliveries" 
            count={counts.deliveryRequests} 
            icon={Truck} 
            to="/admin/deliveries" 
            colorClass="bg-blue-500/20 text-blue-500"
          />
        </div>

        <div className="bg-charcoal-800 rounded-3xl p-8 border border-white/5">
           <h2 className="text-2xl font-display font-bold text-white mb-6">Quick Actions</h2>
           <div className="flex flex-wrap gap-4">
             <Link to="/admin/inventory/new" className="px-6 py-3 bg-white text-charcoal-900 rounded-xl font-medium hover:bg-silver-300 transition-colors">
               + Add New Vehicle
             </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
