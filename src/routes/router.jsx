import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import NotFound from "../pages/NotFound/NotFound";
import Contact from "../pages/Contact/Contact";
import AllLoans from "../pages/AllLoans/AllLoans";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import LoanDetails from "../pages/LoanDetails/LoanDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Shared/Profile";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";
import ManagerRoute from "./ManagerRoute";
import ManageLoan from "../pages/Dashboard/Manager/ManageLoan";
import LoanApplication from "../pages/LoanApplication/LoanApplication";
import MyLoans from "../pages/Dashboard/Borrower/MyLoans";
import PendingApplication from "../pages/Dashboard/Manager/PendingApplication";
import ApprovedApplication from "../pages/Dashboard/Manager/ApprovedApplication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-loans",
        Component: AllLoans,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "loan-details/:id",
        element: (
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "apply-loan/:id",
        element: (
          <PrivateRoute>
            <LoanApplication />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-loan",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <AddLoan />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ManageLoan />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <PendingApplication />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ApprovedApplication />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-loans",
        element: (
          <PrivateRoute>
            <MyLoans />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
