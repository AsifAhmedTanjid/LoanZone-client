import { Link, useLocation } from "react-router";
// User Menu
import useRole from "../../../hooks/useRole";
import { HashLoader } from "react-spinners";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";

const Sidebar = ({ isActive }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  const getTitle = () => {
      const path = location.pathname;
      const segment = path.split("/").pop();
      return segment ? segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Dashboard";
  };

  const title = getTitle();

  if (isRoleLoading) {
    return (
      <div
        className={`z-10 md:static md:min-h-screen flex justify-center items-center bg-base-100 w-68 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out border-r border-base-200`}
      >
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`z-10 md:static md:min-h-screen flex flex-col justify-between overflow-x-hidden bg-base-100 w-68 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out border-r border-base-200`}
      >
        <div className="flex flex-col h-full">
         
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center  mx-auto">
               <h1 className="text-xl font-semibold text-base-content">{title}</h1>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
            
              {/* Role-Based Menu */}
              {role === 'borrower' && <BorrowerMenu></BorrowerMenu>}
              {role === 'manager' && <ManagerMenu></ManagerMenu>}
              {role === 'admin' && <AdminMenu />}
              {/* <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
              </ul> */}
            </nav>
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
