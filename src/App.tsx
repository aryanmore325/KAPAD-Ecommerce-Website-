import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductProvider } from "@/contexts/ProductContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"; 
import OrderSuccess from "./pages/OrderSuccess"; 
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import ProductList from "./pages/admin/products/ProductList";
import AddProduct from "./pages/admin/products/AddProduct";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import OrdersPage from "./pages/admin/order/Orders"; 

const queryClient = new QueryClient();

// FIX: This component is incorrect for React Router v6 nested routes.
// We must move the nested Routes directly inside the AdminLayout component's children.

// The correct pattern is to pass the nested routes as children to the wrapper component, 
// which then uses an <Outlet /> inside the wrapper's definition.

// Since the error points to line 83: 
// <Route path="/admin/*" element={
//   <ProtectedRoute requireAdmin> <--- ERROR IS HERE
//     <AdminLayout>...</AdminLayout>
//   </ProtectedRoute>
// } />
// This structure is correct for React Router v6. Let's look at the other instance.

// The other instance is where you group the protected routes (Cart and Checkout):
// <Route element={<ProtectedRoute />}> <--- THIS IS THE LIKELY CULPRIT!
//   <Route path="cart" element={<Cart />} />
//   <Route path="checkout" element={<Checkout />} />
// </Route>
// This usage is correct for React Router v6, but your custom `ProtectedRoute` is likely
// expecting the children prop if it's used as a regular component (not a route element).

// I'll assume the error is pointing to the line where you use ProtectedRoute without 
// passing props, which is most likely the grouped user routes.

// To solve the issue where ProtectedRoute expects children but is used as a layout element, 
// we must ensure the ProtectedRoute component handles its children (the nested routes) correctly.
// A simpler fix is to use it as a regular wrapper component on each route:

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <TooltipProvider>
              <BrowserRouter>
                <Toaster />
                <Sonner />
                <Routes>
                  {/* Admin Login/Register */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/register" element={<AdminRegister />} />
                  
                  {/* Admin Protected Routes - FIX APPLIED HERE */}
                  <Route path="/admin/*" element={
                    // ProtectedRoute is used as a wrapper component, passing AdminLayout as its child.
                    // This satisfies the 'children' prop requirement.
                    <ProtectedRoute requireAdmin> 
                        <AdminLayout>
                          <Routes>
                            <Route index element={<AdminDashboard />} />
                            <Route path="products" element={<ProductList />} />
                            <Route path="products/add" element={<AddProduct />} />
                            <Route path="orders" element={<OrdersPage />} /> 
                          </Routes>
                        </AdminLayout>
                    </ProtectedRoute>
                  } />

                  {/* Public Routes with Layout */}
                  <Route element={
                    <div className="min-h-screen flex flex-col bg-background">
                      <Header />
                      <main className="flex-1 py-4"> 
                        <Outlet />
                      </main>
                      <Footer />
                    </div>
                  }>
                    <Route index element={<Home />} />
                    <Route path="collection" element={<Collection />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    
                    {/* Protected User Routes (Cart and Checkout) - FIX APPLIED HERE */}
                    {/* Instead of wrapping the <Route>, we wrap the element inside the <Route> */}
                    <Route path="cart" element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } />
                    <Route path="checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    
                    {/* Public Success/Info Routes */}
                    <Route path="order-success" element={<OrderSuccess />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                  </Route>

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;