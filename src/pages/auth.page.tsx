import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "@/components/auth/loginForm.component";
import useAuth from "@/hooks/useAuth";
import { Role } from "@/enums/role.enums";

const AuthPage: React.FC = () => {
  const { userLoggedIn, userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      switch (userInfo?.role) {
        case Role.ADMIN:
          navigate("/", { replace: true });
          break;
        case Role.POS_USER:
          navigate("/pos", { replace: true });
          break;
        case Role.KITCHEN_STAFF:
          navigate("/kitchenboard", { replace: true });
          break;
        default:
          navigate("/restaurant/portal/login", { replace: true });
      }
    }
  }, [userLoggedIn, userInfo?.role, navigate]);

  if (userLoggedIn) return null;

  return <LoginPage />;
};

export default AuthPage;
