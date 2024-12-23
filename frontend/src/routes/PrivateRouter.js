// import React from "react";
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";

// const PrivateRouter = ({ allowedRoles }) => {
//   // const roleId = useAppSelector((state) => state.user.roleId);
//   // const userInfo = useAppSelector((state) => state.user.userInfo);
//   const token= useSelector(state=>state.auth.token);
//   console.log("decoded toke private",jwtDecode(token))
//   const userInfo=jwtDecode(token);
//   const roleId= userInfo?.role
//   const location = useLocation();

//   // const token = getToken(ACCESS_TOKEN);

//   return [roleId].find((role) => allowedRoles?.includes(role)) && token ? (
//     <Outlet />
//   // ) : user?.user && token ? (
//   ) : userInfo?.sub && token ? (// just for check user email is exist or not
//     //state: allows you to pass additional data to the destination route.
//     //replace: indicates that the current route should be replaced by the new route
//     <Navigate to="/access-denied" state={{ from: location }} replace />
//   ) : !token ? (
//     //user : "",  if not found and try to access private page that time redirect to login page
//     <Navigate to="/login" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/error" state={{ from: location }} replace />
//   );
// };

// export default PrivateRouter;






// // import React from "react";
// // import { useSelector } from "react-redux";
// // import { useLocation, Navigate, Outlet } from "react-router-dom";

// // const PrivateRouter = () => {
// //   const location = useLocation();
// //   //  let token=useSelector((state=>state.auth.token));
// //   let token= localStorage.getItem("token");

// //   // Route based solely on token presence
// //   return token ? (
// //     <Outlet /> 
// //   ) : (
// //     // If token is absent, redirect to login
// //     <Navigate to="/login" state={{ from: location }} replace /> 
// //   );
// // };

// // export default PrivateRouter;



import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const PrivateRouter = ({ allowedRoles }) => {
  const token = useSelector((state) => state.auth.token); // Retrieve token from Redux
  const location = useLocation();

  // Decode the token to extract user information
  let roleId;
  try {
    const userInfo = token ? jwtDecode(token) : null;
    roleId = userInfo?.role; // Extract role from decoded token
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the role is allowed and token exists
  if (token && allowedRoles?.includes(roleId)) {
    return <Outlet />;
  }

  // Handle redirections based on conditions
  return token ? (
    <Navigate to="/access-denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRouter;
