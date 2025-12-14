import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import { HashLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  if (role === "admin") return children;
  return <Navigate to="/" replace="true" />;
};

export default AdminRoute;
