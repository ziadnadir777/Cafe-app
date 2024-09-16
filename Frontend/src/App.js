import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Pages and Components
import MenuPage from './Pages/Menupage'; // Ensure the file name matches the import
import OrderPage from './Pages/OrderPage';
import AdminPage from './Pages/AdminPage';
import Login from './components/Auth/Login';
import CartPage from './Pages/CartPage';
//import ForgotPassword from './components/Auth/forgotPassword'; // Ensure the file name matches the import
import OrderHistoryPage from './Pages/OrderHistoryPage';
import DashboardPage from './Pages/DashboardPage';
import WaitersPage from './Pages/WaitersPage';
// Importing ProtectedRoute component
import ProtectedRoute from './components/Routes/ProtectedRoute';
import AdminMenuPage from './Pages/AdminMenuPage';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-menu-page"
          element={
            <ProtectedRoute>
              <AdminMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waiters"
          element={
            <ProtectedRoute>
              <WaitersPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
