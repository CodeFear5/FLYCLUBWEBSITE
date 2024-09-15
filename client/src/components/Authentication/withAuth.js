import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        try {
          await axios.get("http://localhost:3000/api/home", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          localStorage.removeItem("token");
          navigate("/");
        }
      };

      checkAuth();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
