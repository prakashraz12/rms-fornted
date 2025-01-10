import { Role } from "@/enums/role.enums";
import useAuth from "@/hooks/useAuth";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorizationLayout = ({
  children,
  requiredRoles,
}: {
  children: React.ReactNode;
  requiredRoles: Role[];
}) => {
  const { userInfo } = useAuth();

  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useLayoutEffect(() => {
    if (!userLoggedIn) {
      navigate("/restaurant/portal/login");
      return;
    }

    if (userInfo === null || !userInfo?.role) {
      navigate("/unauthorized");
      return;
    }

    if (!requiredRoles?.includes(userInfo?.role)) {
      navigate("/unauthorized");
      return;
    }
    setIsAuthorized(true);
  }, [userLoggedIn, userInfo?.role, requiredRoles, navigate]);

  if (!isAuthorized) return null;

  return <>{children}</>;
};

export default AuthorizationLayout;
