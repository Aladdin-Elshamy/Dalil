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

const token = localStorage.getItem("authToken");
function App() {
  return (
    <CartProvider>
      <FavouritesProvider>
        <Router>
          <Routes>
            <Route
              path="/Complete"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <Complete />
                </Auth>
              }
            />
            <Route
              path="/Favourite"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <Favourite />
                </Auth>
              }
            />
            <Route
              path="/OrderDone"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <DoneOrder />
                </Auth>
              }
            />
            <Route
              path="/STT"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <SpeechToText />
                </Auth>
              }
            />
            <Route
              path="/TTS"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <TextToSpeech />
                </Auth>
              }
            />
            <Route
              path="/TranslateSign"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <TranslateSign />
                </Auth>
              }
            />
            <Route
              path="/ObjectRecognition"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <ObjectRecognition />
                </Auth>
              }
            />
            <Route
              path="/Shopping"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <Shopping />
                </Auth>
              }
            />
            <Route
              path="/Cart"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <Cart />
                </Auth>
              }
            />
            <Route
              path="/ProductDetails/:id"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <ProductDetails />
                </Auth>
              }
            />
            <Route
              path="/Alerts"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <Notification />
                </Auth>
              }
            />
            <Route
              path="/"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <HomePage />
                </Auth>
              }
            />
            <Route
              path="/Profile"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <Profile />
                </Auth>
              }
            />
            <Route
              path="/Contact"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <ContactUs />
                </Auth>
              }
            />
            <Route
              path="/Location"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <MapLocation />
                </Auth>
              }
            />
            <Route
              path="/SignLanguage"
              element={
                <Auth redirectPath="/login" isAllowed={!!token}>
                  <SignLanguage />
                </Auth>
              }
            />
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
