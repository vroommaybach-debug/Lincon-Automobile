import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white block mb-4">
              LINCOLN <span className="text-silver-400">AUTOS</span>
            </Link>
            <p className="text-silver-400 text-sm leading-relaxed">
              Luxury automotive marketplace for new and tokunbo cars. Curated excellence in Iju Ishaga, Lagos.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-silver-400">
              <li><Link to="/inventory" className="hover:text-red-500 transition-colors">Inventory</Link></li>
              <li><Link to="/sell-your-car" className="hover:text-red-500 transition-colors">Sell Your Car</Link></li>
              <li><Link to="/we-buy-cars" className="hover:text-red-500 transition-colors">We Buy Cars</Link></li>
              <li><Link to="/delivery" className="hover:text-red-500 transition-colors">White-Glove Delivery</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-silver-400">
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Visit Us</h4>
            <address className="not-italic text-sm text-silver-400 space-y-2">
              <p>123 Luxury Avenue</p>
              <p>Iju Ishaga, Lagos</p>
              <p>Nigeria</p>
              <div className="pt-2">
                <a href="https://wa.me/2349073796178" className="block hover:text-green-500 transition-colors">+234 907 379 6178 (WhatsApp)</a>
                <a href="mailto:hello@lincolnautos.com" className="block hover:text-red-500 transition-colors">hello@lincolnautos.com</a>
              </div>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-silver-500">
          <p>&copy; {new Date().getFullYear()} Lincoln Autos. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Drive with confidence.</p>
        </div>
      </div>
    </footer>
  );
}
