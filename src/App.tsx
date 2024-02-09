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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="bg-hero-pattern dark:bg-hero-patterndark">
            <div className="backdrop-blur-sm backdrop-brightness-110">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/addproducts" element={<AddProduct />} />
                <Route path="/myproducts" element={<MyProducts />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/manageaccount" element={<ManageAccount />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/searched/:search" element={<Searched />} />
              </Routes>
              <Footer />
            </div>
            <Toaster />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
