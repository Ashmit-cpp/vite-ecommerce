import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import SignIn from "./components/LogIn";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
