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
import { jwtDecode } from "jwt-decode";
import { useToast } from "./ui/use-toast";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

interface FormData {
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}
interface ErrorMessage {
  message: string;
  error: string;
  statusCode: number;
}

export default function ChangePasswordForm() {
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isConfirmPasswordValid = () => {
    return formData.newpassword === formData.confirmpassword;
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (!isConfirmPasswordValid()) {
      toast({
        title: "Confirm password does not match with New password.",
      });
    } else {
      const token: string | null = localStorage.getItem("JWT");
      if (!token) {
        console.error("JWT token not found");
        return;
      }
      const decodedToken: DecodedToken = jwtDecode(token);
      const { sub } = decodedToken;
      try {
        const response = await fetch(
          `${getURL()}/users/change-password/${sub}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword: formData.currentpassword,
              newPassword: formData.confirmpassword,
            }),
          }
        );

        if (response.ok) {
          toast({
            title: "Password changed successfully",
          });
          console.log("Password changed successfully");
        } else {
          const errorMessage: ErrorMessage = await response.json();
          toast({
            title: errorMessage.message,
          });
          console.error("Failed to change password:", errorMessage.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Password</CardTitle>
          <CardDescription>
            <h1 className="lg:text-lg">
              Enter your Current & New password in order to change your
              password.
            </h1>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2 p-2  ">
                <div>
                  <Label
                    htmlFor="currentpassword"
                    className="mr-4 mt-3 lg:text-lg"
                  >
                    Current password
                  </Label>
                  <Input
                    id="currentpassword"
                    type="password"
                    className=" text-sm md:text-lg lg:text-lg"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="newpassword" className="mr-4 mt-3 lg:text-lg">
                    New password
                  </Label>
                  <Input
                    id="newpassword"
                    type="password"
                    className="text-sm md:text-lg lg:text-lg"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="confirmpassword"
                    className="mr-4 mt-3 lg:text-lg"
                  >
                    Confirm password
                  </Label>
                  <Input
                    id="confirmpassword"
                    type="password"
                    className=" text-sm md:text-lg lg:text-lg"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit"> Change password </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
