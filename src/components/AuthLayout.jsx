import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && userStatus != authentication) {
      navigate("/login");
    } else if (!authentication && userStatus != authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, userStatus, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
