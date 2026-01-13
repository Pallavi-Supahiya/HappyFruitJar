import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./Pages/Home";
import FAQ from "./Pages/FAQ";
import HowItWorks from "./Pages/HowItWorks";
import Farmers from "./Pages/Farmers";
import Trees from "./Pages/Trees";
import Contact from "./Pages/Contact";

function App() {

  // For adding tree on click
  useEffect(() => {
    // Disable on touch devices (mobile)
    if ("ontouchstart" in window) return;

    const handleClick = () => {
      document.body.classList.add("tree-cursor");

      // revert back to sapling after 300ms
      setTimeout(() => {
        document.body.classList.remove("tree-cursor");
      }, 300);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/trees" element={<Trees />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
