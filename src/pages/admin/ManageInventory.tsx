import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Edit, Trash2 } from 'lucide-react';

export default function ManageInventory() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
      if (data) setCars(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    try {
      await supabase.from('cars').delete().eq('id', id);
      fetchCars();
    } catch (e) {
      console.error(e);
      alert('Failed to delete car');
    }
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <Link to="/admin" className="text-red-400 hover:text-red-300 mb-4 inline-flex items-center text-sm font-medium">
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Manage Inventory</h1>
            <p className="text-silver-400">Add, edit, or remove vehicles from the public listing.</p>
          </div>
          <button className="px-6 py-3 bg-white text-charcoal-900 rounded-full font-medium hover:bg-silver-300 transition-colors whitespace-nowrap">
            + Add New Car
          </button>
        </div>

        <div className="bg-charcoal-800 rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-silver-300">
              <thead className="bg-charcoal-900/50 text-silver-400 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Condition</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-silver-500">Loading inventory...</td></tr>
                ) : cars.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-silver-500">No cars found in inventory.</td></tr>
                ) : (
                  cars.map((car) => (
                    <tr key={car.id} className="hover:bg-charcoal-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-charcoal-900 border border-white/10 flex items-center justify-center text-red-500 mr-4">
                            <Car size={20} />
                          </div>
                          <div>
                            <p className="text-white font-medium">{car.year} {car.make} {car.model}</p>
                            <p className="text-xs text-silver-500">{car.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">₦{car.price.toLocaleString()}</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-charcoal-900 rounded text-xs border border-white/5">{car.condition}</span></td>
                      <td className="px-6 py-4 text-center">
                        {car.featured ? (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/20">Featured</span>
                        ) : (
                          <span className="text-silver-500 text-xs">Standard</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-silver-400 hover:text-white hover:bg-charcoal-900 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(car.id)} className="p-2 text-red-400 hover:text-white hover:bg-red-900/50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
