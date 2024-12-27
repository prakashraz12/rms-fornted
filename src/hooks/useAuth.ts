import { useEffect, useState } from "react";

const useAuth = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  useEffect(() => {
    if (!userLoading && userLoggedIn) {
    }
  }, [userLoggedIn, userLoading]);
  return {};
};

export default useAuth;
