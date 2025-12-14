import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
    <ScrollToTop />
    <Navbar></Navbar>
    
    <div className="min-h-screen"><Outlet></Outlet></div>
    
    <Footer></Footer>
    </div>
  );
};

export default MainLayout;
