// src/App.tsx\
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/outerSite/LoginPage";
import ForgotPasswordPage from "./pages/outerSite/ForgotPasswordPage";
import OTPVerPage from "./pages/outerSite/OTPVerPage";
import UpdatePassword from "./pages/outerSite/UpdatePassword";
import Done from "./pages/outerSite/Done";
import SignUp from "./pages/outerSite/SignUp";
import ContactUs from "./pages/Contact/ContactUs";
import Profile from "./pages/innerSite/Profile";
import HomePage from "./pages/innerSite/HomePage";
import MapLocation from "./pages/Location/map-location";
import Notification from "./pages/Notifications/Notification";
import SignLanguage from "./pages/SignLanguage/SignLanguage";
import SpeechToText from "./pages/Speech&Text/SpeechToText";
import TextToSpeech from "./pages/Speech&Text/TextToSpeech";
import TranslateSign from "./pages/SignLanguage/TranslateSign";
import ObjectRecognition from "./pages/Object/ObjectRecognition";
import Shopping from "./pages/Shopping/Shopping";
import Cart from "./pages/Shopping/Cart";
import ProductDetails from "./pages/Shopping/ProductDetails";
import DoneOrder from "./pages/Shopping/OrderDone";
import Favourite from "./pages/Shopping/Favourite";
import Complete from "./pages/Shopping/Complete";
import { CartProvider } from "./pages/Shopping/CartContext";
import { FavouritesProvider } from "./pages/Shopping/FavouritesContext";
import Auth from "./components/Auth";
import { Toaster } from "react-hot-toast";

const token = localStorage.getItem("token");
function App() {
  return (
    <CartProvider>
      <FavouritesProvider>
        <Router>
          <Routes>
            <Route path="/Complete" element={<Complete />} />
            <Route path="/Favourite" element={<Favourite />} />
            <Route path="/OrderDone" element={<DoneOrder />} />
            <Route
              path="/STT"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <SpeechToText />{" "}
                </Auth>
              }
            />
            <Route path="/TTS" element={<TextToSpeech />} />
            <Route path="/TranslateSign" element={<TranslateSign />} />
            <Route path="/ObjectRecognition" element={<ObjectRecognition />} />
            <Route path="/Shopping" element={<Shopping />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
            <Route path="/Alerts" element={<Notification />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Location" element={<MapLocation />} />
            <Route path="/SignLanguage" element={<SignLanguage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify" element={<OTPVerPage />} />
            <Route path="/UpdatePassword" element={<UpdatePassword />} />
            <Route path="/Done" element={<Done />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </Router>
        <Toaster />
      </FavouritesProvider>
    </CartProvider>
  );
}

export default App;
