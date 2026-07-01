import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/useAuth';

// Layout
import RootLayout from './components/layout/RootLayout';

// Public Pages
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetail from './pages/CarDetail';
import SellYourCar from './pages/SellYourCar';
import WeBuyCars from './pages/WeBuyCars';
import Delivery from './pages/Delivery';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Accessories from './pages/Accessories';

// User Dashboard
import UserDashboard from './pages/user/Dashboard';
import SubmitCar from './pages/user/SubmitCar';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageInventory from './pages/admin/ManageInventory';

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { user, profile, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-charcoal-800 text-silver-300">Loading...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && profile?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  
  return <>{children}</>;
}

export default function App() {
  const initialize = useAuth(state => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<CarDetail />} />
          <Route path="/sell-your-car" element={<SellYourCar />} />
          <Route path="/we-buy-cars" element={<WeBuyCars />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/accessories" element={
            <ProtectedRoute>
              <Accessories />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/submit-car" element={
            <ProtectedRoute>
              <SubmitCar />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/inventory" element={
            <ProtectedRoute requireAdmin>
              <ManageInventory />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
