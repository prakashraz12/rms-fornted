import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSendForgotPasswordEmailToRestaurantMutation } from "@/services/api/auth.api";
import { toast } from "@/hooks/use-toast";

interface TempPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TempPasswordDialog: React.FC<TempPasswordDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [
    sendForgotPasswordEmailToRestaurant,
    {
      isLoading: isLoadingOnSendForgotPasswordEmailToRestaurant,
      error: errorOnSendForgotPasswordEmailToRestaurant,
      isSuccess: isSuccessOnSendForgotPasswordEmailToRestaurant,
    },
  ] = useSendForgotPasswordEmailToRestaurantMutation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSendPassword = async () => {
    if (!email) {
      return;
    }

    await sendForgotPasswordEmailToRestaurant({ email });
  };

  const handleClose = () => {
    setEmail("");
    setSuccess(false);
    onClose();
  };

  const isLoading = isLoadingOnSendForgotPasswordEmailToRestaurant;

  const error = errorOnSendForgotPasswordEmailToRestaurant as any;

  const isSucess = isSuccessOnSendForgotPasswordEmailToRestaurant;

  useEffect(() => {
    if (isSucess) {
      toast({
        title: "Success",
        description:
          "Password sent successfully, please check your email and login.",
      });
    }
  }, [isSucess]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Temporary Password</DialogTitle>
          <DialogDescription>
            Enter the email address to send a temporary password.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSendPassword}>
          <div>
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="col-span-3 mt-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              required
              value={role}
              onValueChange={(value) => setRole(value)}
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
          </div>

          {error?.status === 404 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Not found with this email.</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Temporary password has been sent to your email.
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSendPassword} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TempPasswordDialog;
