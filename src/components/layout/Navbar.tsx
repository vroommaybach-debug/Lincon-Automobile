import { Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = profile?.role === 'admin';
  
  return (
    <nav className="sticky top-0 z-50 bg-charcoal-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase italic transform -skew-x-12 flex items-center">
              <span className="text-white drop-shadow-md">LINCOLN</span> 
              <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-red-500 to-red-800 drop-shadow-[0_2px_10px_rgba(239,68,68,0.8)]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>AUTOS</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/inventory" className="text-silver-300 hover:text-white transition-colors">Inventory</Link>
              {user && (
                <Link to="/accessories" className="text-silver-300 hover:text-white transition-colors">Accessories</Link>
              )}
              <Link to="/sell-your-car" className="text-silver-300 hover:text-white transition-colors">Sell Your Car</Link>
              <Link to="/we-buy-cars" className="text-silver-300 hover:text-white transition-colors">We Buy Cars</Link>
              <Link to="/delivery" className="text-silver-300 hover:text-white transition-colors">Delivery</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link 
                to={isAdmin ? "/admin" : "/dashboard"} 
                className="flex items-center space-x-2 text-silver-300 hover:text-white transition-colors"
              >
                <UserIcon size={20} />
                <span>{isAdmin ? 'Admin' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link 
                to="/login"
                className="px-6 py-2 bg-charcoal-700 text-white rounded-full font-medium hover:bg-charcoal-600 transition-colors border border-white/10"
              >
                Log In
              </Link>
            )}
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-silver-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-charcoal-800 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/inventory" className="block px-3 py-2 text-silver-300 hover:text-white">Inventory</Link>
            {user && (
              <Link to="/accessories" className="block px-3 py-2 text-silver-300 hover:text-white">Accessories</Link>
            )}
            <Link to="/sell-your-car" className="block px-3 py-2 text-silver-300 hover:text-white">Sell Your Car</Link>
            <Link to="/we-buy-cars" className="block px-3 py-2 text-silver-300 hover:text-white">We Buy Cars</Link>
            <Link to="/delivery" className="block px-3 py-2 text-silver-300 hover:text-white">Delivery</Link>
            {user ? (
              <Link to={isAdmin ? "/admin" : "/dashboard"} className="block px-3 py-2 text-silver-300 hover:text-white">
                {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
              </Link>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-silver-300 hover:text-white">Log In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
