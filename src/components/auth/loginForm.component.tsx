import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LOGO_IMAGE } from "@/constant";
import {
  useAdminLoginMutation,
  useLoginUserMutation,
} from "@/services/api/auth.api";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import TempPasswordDialog from "./sendTempEmail";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setAuthenticated,
  setIsRememberMe,
  setRestaurantInfo,
  setRole,
  setUserInfo,
} from "@/features/auth/authSlice";
import { encryptData } from "@/lib/utils";
import { Role } from "@/enums/role.enums";
import { RootState } from "@/types/redux.type";
import WaiterLoginDialog from "../waiter-dialog/waiter-dialog";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(
      [Role.ADMIN, Role.POS_USER, Role.WAITER, Role.KITCHEN_STAFF],
      "Invalid role"
    )
    .required("Role is required"),
  rememberMe: Yup.boolean(),
});

export default function LoginPage() {
  const [isWaiterTryToLogin, setIsWaiterTryToLogin] = useState(false);
  const dispatch = useDispatch();
  const isRememberMe = useSelector(
    (state: RootState) => state.auth.isRememberMe
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);
  const [isTempPasswordOpen, setIsTempPasswordOpen] = useState(false);

  const [
    adminLogin,
    {
      isLoading: LoadingOnAdminLogging,
      error: errorOnAdminLogin,
      isSuccess: isSuccessOnAdminLogin,
      data: adminLoginResponse,
    },
  ] = useAdminLoginMutation();

  const [
    loginUser,
    {
      isLoading: LoadingOnUserLogging,
      error: errorOnUserLogin,
      isSuccess: isSuccessOnUserLogin,
      data: userLoginResponse,
    },
  ] = useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
      restaurantCode: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.role === Role.ADMIN) {
        await adminLogin({
          email: values.email,
          password: values.password,
        });
      } else {
        await loginUser({
          email: values.email,
          password: values.password,
          restaurantCode: values.restaurantCode,
        });
      }
    },
  });

  const handleNotYou = () => {
    dispatch(setUserInfo(null));
    dispatch(setIsRememberMe(false));
  };
  useEffect(() => {
    if (isSuccessOnAdminLogin) {
      if (adminLoginResponse && adminLoginResponse?.data) {
        dispatch(
          setUserInfo({
            id: adminLoginResponse?.data?.id || "",
            name: adminLoginResponse?.data?.restaurantName || "",
            email: adminLoginResponse?.data?.email || "",
          })
        );

        dispatch(
          setRestaurantInfo({
            id: adminLoginResponse?.data?.id,
            name: adminLoginResponse?.data?.restaurantName,
            email: adminLoginResponse?.data?.email,
            bannerImage: adminLoginResponse?.data?.bannerImage,
            logoImage: adminLoginResponse?.data?.logoImage,
          })
        );

        dispatch(setRole(adminLoginResponse?.data?.role));
        dispatch(setAuthenticated(true));
        dispatch(
          setAccessToken(
            encryptData(adminLoginResponse?.data?.tokens?.accessToken)
          )
        );
        if (formik.values.rememberMe) {
          dispatch(setIsRememberMe(true));
        }

        window.location.href = "/";
      }
    }

    if (isSuccessOnUserLogin) {
      if (
        userLoginResponse &&
        userLoginResponse?.data &&
        userLoginResponse?.data?.user?.role !== Role.WAITER
      ) {
        dispatch(
          setUserInfo({
            id: userLoginResponse?.data?.user?.id || "",
            name: userLoginResponse?.data?.user?.name || "",
            email: userLoginResponse?.data?.user?.email || "",
            restaurantCode:
              userLoginResponse?.data?.restaurant?.restaurantCode || "",
          })
        );
        dispatch(
          setRestaurantInfo({
            id: userLoginResponse?.data?.user?.restaurant?.id || "",
            name: userLoginResponse?.data?.user?.restaurant?.name || "",
            email: userLoginResponse?.data?.user?.restaurant?.email || "",
            bannerImage:
              userLoginResponse?.data?.user?.restaurant?.bannerImage || "",
            logoImage:
              userLoginResponse?.data?.user?.restaurant?.logoImage || "",
          })
        );
        dispatch(setRole(userLoginResponse?.data?.user?.role));
        dispatch(
          setAccessToken(
            encryptData(userLoginResponse?.data?.tokens?.accessToken)
          )
        );
        dispatch(setAuthenticated(true));
        if (formik.values.rememberMe) {
          dispatch(setIsRememberMe(true));
        }

        if (userLoginResponse?.data?.user?.role === Role.POS_USER) {
          window.location.href = "/pos";
        }
      } else {
        setIsWaiterTryToLogin(true);
      }
    }
  }, [isSuccessOnAdminLogin, isSuccessOnUserLogin]);

  useEffect(() => {
    if (isRememberMe) {
      if (user && role) {
        formik.setFieldValue("email", user.email);
        formik.setFieldValue("role", role);
        if (role !== Role.ADMIN) {
          formik.setFieldValue("restaurantCode", user?.restaurantCode);
        }
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md overflow-hidden p-6">
        {!isRememberMe && (
          <div className="flex justify-center">
            <img src={LOGO_IMAGE} alt="logo-img" className="h-[90px]" />
          </div>
        )}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your credentials and select your role to login.
          </CardDescription>
        </CardHeader>
        {!isRememberMe && (
          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your username"
                  {...formik.getFieldProps("email")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
                {errorOnAdminLogin &&
                  "status" in errorOnAdminLogin &&
                  errorOnAdminLogin?.status === 404 && (
                    <p className="text-sm text-red-500">
                      Invalid Credentials, Please try again.
                    </p>
                  )}
                {errorOnUserLogin &&
                  "status" in errorOnUserLogin &&
                  errorOnUserLogin?.status === 401 && (
                    <p className="text-sm text-red-500">
                      Invalid Credentials, Please try again.
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formik.values.role}
                  onValueChange={(value) => formik.setFieldValue("role", value)}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                    <SelectItem value={Role.POS_USER}>Cashier</SelectItem>
                    <SelectItem value={Role.KITCHEN_STAFF}>
                      Kitchen User
                    </SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <p className="text-sm text-red-500">{formik.errors.role}</p>
                )}
              </div>
              {formik.values.role && formik.values.role !== Role.ADMIN && (
                <div className="space-y-2">
                  <Label htmlFor="restaurantCode">Restaurant Code</Label>
                  <Input
                    id="restaurantCode"
                    type="text"
                    placeholder="Enter restaurant code"
                    {...formik.getFieldProps("restaurantCode")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.restaurantCode &&
                    formik.errors.restaurantCode && (
                      <p className="text-sm text-red-500">
                        {formik.errors.restaurantCode}
                      </p>
                    )}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formik.values.rememberMe}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("rememberMe", checked)
                  }
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={LoadingOnAdminLogging || LoadingOnUserLogging}
                type="submit"
                className="w-full  transition-colors duration-200"
              >
                {LoadingOnAdminLogging || LoadingOnUserLogging ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
            <p
              onClick={() => setIsTempPasswordOpen(true)}
              className="text-sm mt-2 cursor-pointer text-center hover:underline"
            >
              forgot password?
            </p>
          </form>
        )}

        {isRememberMe && (
          <div className="w-full">
            <Avatar className="w-32 h-32 mx-auto border border-primary border-dashed rounded-full flex justify-center items-center">
              <AvatarImage
                className="rounded-full w-28 h-28"
                src={LOGO_IMAGE}
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold text-center mt-6">
              {user?.name}
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-2 mt-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
                {errorOnAdminLogin &&
                  "status" in errorOnAdminLogin &&
                  errorOnAdminLogin?.status === 404 && (
                    <p className="text-sm text-red-500">
                      Invalid Credentials, Please try again.
                    </p>
                  )}
                {errorOnUserLogin &&
                  "status" in errorOnUserLogin &&
                  errorOnUserLogin?.status === 401 && (
                    <p className="text-sm text-red-500">
                      Invalid Credentials, Please try again.
                    </p>
                  )}
              </div>
              <Button
                disabled={LoadingOnAdminLogging || LoadingOnUserLogging}
                type="submit"
                className="w-full mt-6  transition-colors duration-200"
              >
                {LoadingOnAdminLogging || LoadingOnUserLogging ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>

              <p
                className="text-sm mt-4 cursor-pointer text-center"
                onClick={handleNotYou}
              >
                Not you?
              </p>
            </form>
          </div>
        )}
      </Card>
      <TempPasswordDialog
        isOpen={isTempPasswordOpen}
        onClose={() => setIsTempPasswordOpen(false)}
      />
      <WaiterLoginDialog
        isOpen={isWaiterTryToLogin}
        onClose={() => setIsWaiterTryToLogin(false)}
      />
    </div>
  );
}
