import { ACCESS_TOKEN_KEY, USER_INFO_kEY } from "@/keys";
import { useState } from "react";

const useAuth = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem(ACCESS_TOKEN_KEY) ? true : false
  );
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem(USER_INFO_kEY)
      ? JSON.parse(localStorage.getItem(USER_INFO_kEY) as string)
      : null
  );

  return {
    userLoggedIn,
    setUserLoggedIn,
    userInfo,
    setUserInfo,
  };
};

export default useAuth;
