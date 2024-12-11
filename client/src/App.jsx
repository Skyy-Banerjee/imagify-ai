import { Route, Routes } from "react-router-dom";
import BuyCreditPage from "./pages/BuyCreditPage";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { showLogin} = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      <ToastContainer position="bottom-right"/>
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/buy-credit" element={<BuyCreditPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
