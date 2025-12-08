import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import NotFound from "../pages/NotFound/NotFound";
import Contact from "../pages/Contact/Contact";

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
                path: "about",
                Component: AboutUs
            },
            {
                path: "contact",
                Component: Contact
            }
        ]
    }
])
export default router;