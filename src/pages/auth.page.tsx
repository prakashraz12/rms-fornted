import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "@/components/auth/loginForm.component";
import { Role } from "@/enums/role.enums";
import { useSelector } from "react-redux";
import { RootState } from "@/types/redux.type";

const AuthPage: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role) {
      const roleRedirectMap = {
        [Role.ADMIN]: "/",
        [Role.POS_USER]: "/pos",
        [Role.KITCHEN_STAFF]: "/kitchenboard",
      };

      navigate(roleRedirectMap[role] || "/restaurant/portal/login", {
        replace: true,
      });
    }
  }, [isAuthenticated, role, navigate]);

  return <LoginPage />;
};

export default AuthPage;
