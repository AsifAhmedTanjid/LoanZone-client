import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import NotFound from "../pages/NotFound/NotFound";
import Contact from "../pages/Contact/Contact";
import AllLoans from "../pages/AllLoans/AllLoans";
import Register from "../pages/Auth/Register/Register";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        errorElement: <NotFound />,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path: "all-loans",
                Component: AllLoans
            },
            {
                path: "about",
                Component: AboutUs
            },
            {
                path: "contact",
                Component: Contact
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
])
export default router;