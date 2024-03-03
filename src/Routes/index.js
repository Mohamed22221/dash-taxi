import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
const Index = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies.user, "user");
  useEffect(() => {
    if (!cookies.user) {
      navigate("/login");
    }
  }, [cookies.user]);

  return (
    <React.Fragment>
      <Routes>
        {cookies.user ? (
          <Route>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<VerticalLayout>{route.component}</VerticalLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        ) : (
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        )}
      </Routes>
    </React.Fragment>
  );
};

export default Index;
