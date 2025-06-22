import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { getURL } from "@/lib/helper";
import { useToast } from "./ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthenticatedPut } from "@/hooks/useAuthenticatedApi";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2 } from "lucide-react";

interface FormData {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

export default function ChangePasswordForm(): JSX.Element {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const { isLoading, error, put: changePassword } = useAuthenticatedPut();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isConfirmPasswordValid = (): boolean => {
    return formData.newpassword === formData.confirmpassword;
  };

  const isFormValid = (): boolean => {
    return (
      formData.currentpassword.trim() !== "" &&
      formData.newpassword.trim() !== "" &&
      formData.confirmpassword.trim() !== "" &&
      isConfirmPasswordValid()
    );
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isFormValid()) {
      toast({
        title: "Invalid form data",
        description: "Please check your input and try again.",
        variant: "destructive",
      });
      return;
    }

    if (!isConfirmPasswordValid()) {
      toast({
        title: "Password mismatch",
        description: "Confirm password does not match with new password.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Authentication error",
        description: "User information not found. Please login again.",
        variant: "destructive",
      });
      return;
    }

    try {
      await changePassword(`${getURL()}/users/change-password/${user.id}`, {
        currentPassword: formData.currentpassword,
        newPassword: formData.newpassword,
      });

      toast({
        title: "Password changed successfully",
        description: "Your password has been updated.",
      });

      // Reset form
      setFormData({
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
    } catch (error) {
      console.error("Password change failed:", error);
      toast({
        title: "Failed to change password",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Enter your current password and choose a new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="currentpassword">Current Password</Label>
            <Input
              id="currentpassword"
              type="password"
              value={formData.currentpassword}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newpassword">New Password</Label>
            <Input
              id="newpassword"
              type="password"
              value={formData.newpassword}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmpassword">Confirm New Password</Label>
            <Input
              id="confirmpassword"
              type="password"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            {formData.confirmpassword && !isConfirmPasswordValid() && (
              <p className="text-sm text-destructive">
                Passwords do not match
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
