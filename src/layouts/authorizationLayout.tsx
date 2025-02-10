import { Role } from "@/enums/role.enums";
import { RootState } from "@/types/redux.type";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthorizationLayout = ({
  children,
  requiredRoles,
}: {
  children: React.ReactNode;
  requiredRoles: Role[];
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.auth.role);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthorizationLayout - Authentication Check:", {
      isAuthenticated,
      role,
      requiredRoles,
      user,
    });

    if (!isAuthenticated) {
      navigate("/restaurant/portal/login", { replace: true });
      return;
    }

    if (!role) {
      navigate("/restaurant/portal/login", { replace: true });
      return;
    }

    if (!requiredRoles.includes(role)) {
      if (role === Role.POS_USER) {
        navigate("/pos", { replace: true });
        return;
      }
      navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, role, requiredRoles, navigate]);

  if (!isAuthenticated || !role || !requiredRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthorizationLayout;
