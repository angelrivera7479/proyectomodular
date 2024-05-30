import { Navigate, Outlet } from "react-router-dom";

//El Outlet se utiliza para varias rutas y el children para solo un componente
//isAllowed pasa a ser la validacion para mostrar children o <Outlet/>

export default function ProtectedRoute({
  isAllowed,
  children,
  redirectTo = "/",
}) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}
