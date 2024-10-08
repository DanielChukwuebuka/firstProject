import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "./ContextApi/Contextapi";

const Authenticate = () => {
  const location = useLocation();
const {USER, Writer, verifiedUser} = useContext(ThemeContext)
  console.log("Authenticate1", verifiedUser);
  console.log("Authenticate", USER);
  console.log("Authenticate", Writer);

    if (USER) {
    return <Outlet />;
  } else {
    return <Navigate to="../login" state={{ from: location }} replace />;
  }
}
export default Authenticate;
