import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/LogIn";
import Searched from "./components/pages/Searched";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Wishlist from "./components/pages/Wishlist";
import { Toaster } from "./components/ui/toaster";
import AddProduct from "./components/pages/AddProduct";
import MyProducts from "./components/pages/MyProducts";
import ProductPage from "./components/pages/ProductPage";
import Contact from "./components/pages/Contact";
import ManageAccount from "./components/pages/ManageAccount";
import PaymentSuccess from "./components/pages/PaymentSuccess";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="bg-hero-pattern dark:bg-hero-patterndark">
            <div className="flex flex-col min-h-screen backdrop-blur-sm backdrop-brightness-110">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/searched/:search" element={<Searched />} />
                  
                  {/* Auth routes (redirect to home if already authenticated) */}
                  <Route 
                    path="/signup" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <SignUp />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/login" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <SignIn />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Protected routes (authentication required) */}
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/addproducts" 
                    element={
                      <ProtectedRoute>
                        <AddProduct />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/myproducts" 
                    element={
                      <ProtectedRoute>
                        <MyProducts />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/manageaccount" 
                    element={
                      <ProtectedRoute>
                        <ManageAccount />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/wishlist" 
                    element={
                      <ProtectedRoute>
                        <Wishlist />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/success" 
                    element={
                      <ProtectedRoute>
                        <PaymentSuccess />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>

              <Footer />
            </div>

            <Toaster />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
