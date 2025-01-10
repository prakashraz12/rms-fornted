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
import { useAdminLoginMutation } from "@/services/api/auth.api";
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["admin", "cashier", "waiter", "kitchen"], "Invalid role")
    .required("Role is required"),
  rememberMe: Yup.boolean(),
});

export default function LoginPage() {
  const [
    adminLogin,
    {
      isLoading: LoadingOnAdminLogging,
      error: errorOnAdminLogin,
      isSuccess: isSuccessOnAdminLogin,
      data: adminLoginResponse,
    },
  ] = useAdminLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "edigitalclass@gmail.com",
      password: "0podpu7g1eiq",
      role: "",
      restaurantCode: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      await adminLogin({
        email: values.email,
        password: values.password,
      });
    },
  });

  // useEffect(() => {
  //   if (isSuccessOnAdminLogin && formik?.values.rememberMe) {

  //   }
  // }, [isSuccessOnAdminLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md overflow-hidden p-6">
        <div className="flex justify-center">
          <img src={LOGO_IMAGE} alt="logo-img" className="h-[90px]" />
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your credentials and select your role to login.
          </CardDescription>
        </CardHeader>
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
                errorOnAdminLogin?.status === 401 && (
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
                <p className="text-sm text-red-500">{formik.errors.password}</p>
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
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="waiter">Waiter</SelectItem>
                  <SelectItem value="kitchen">Kitchen User</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <p className="text-sm text-red-500">{formik.errors.role}</p>
              )}
            </div>
            {formik.values.role && formik.values.role !== "admin" && (
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
              disabled={LoadingOnAdminLogging}
              type="submit"
              className="w-full  transition-colors duration-200"
            >
              {LoadingOnAdminLogging ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
