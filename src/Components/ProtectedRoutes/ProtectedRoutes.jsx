import React, { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../Utility/DataProvider/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children, msg, redirect }) {
  const [{ user }, _] = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, []);

  return children;
}

export default ProtectedRoutes;
