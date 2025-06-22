import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import HomePage from "./components/pages/home";
import CartPage from "./components/pages/cart";
import SignUpPage from "./components/pages/sign-up";
import LogInPage from "./components/pages/log-in";
import SearchedPage from "./components/pages/searched";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import WishlistPage from "./components/pages/wishlist";
import { Toaster } from "./components/ui/toaster";
import AddProductPage from "./components/pages/add-product";
import MyProductsPage from "./components/pages/my-products";
import ProductPage from "./components/pages/product-page";
import ContactPage from "./components/pages/contact";
import ManageAccountPage from "./components/pages/manage-account";
import PaymentSuccessPage from "./components/pages/payment-success";
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
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/searched/:search" element={<SearchedPage />} />
                  
                  {/* Auth routes (redirect to home if already authenticated) */}
                  <Route 
                    path="/signup" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <SignUpPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/login" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <LogInPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Protected routes (authentication required) */}
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/addproducts" 
                    element={
                      <ProtectedRoute>
                        <AddProductPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/myproducts" 
                    element={
                      <ProtectedRoute>
                        <MyProductsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/manageaccount" 
                    element={
                      <ProtectedRoute>
                        <ManageAccountPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/wishlist" 
                    element={
                      <ProtectedRoute>
                        <WishlistPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/success" 
                    element={
                      <ProtectedRoute>
                        <PaymentSuccessPage />
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
