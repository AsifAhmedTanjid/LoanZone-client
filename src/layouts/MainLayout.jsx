import React from "react";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 99999 } }}
      />
      
    </div>
  );
};

export default MainLayout;
