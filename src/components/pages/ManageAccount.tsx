import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

interface UserInfo {
  id: number;
  username: string;
  email: string;
  password: string;
}

function ManageAccount(): JSX.Element {
  const token: string | null = localStorage.getItem("JWT");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState({
    id: 5,
    username: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const fetchUserInfo = async () => {
    if (!token) {
      console.error("JWT token not found");
      return;
    }
    const decodedToken: DecodedToken = jwtDecode(token);
    const { sub } = decodedToken;
    try {
      const response = await fetch(
        `http://localhost:3000/users/findByUserId/${sub}`
      );
      const user = await response.json();
      // console.log(user);
      setUserInfo(user);
      setFormData({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const onSubmit = async (updatedData: { id: number; username: string }) => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }
    // console.log(updatedData);
    fetch(`http://localhost:3000/users/${updatedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: updatedData.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("user updated:", data);
        } else {
          console.error("updating user failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error while updating user:", error);
      });
  };
  return (
    <div className="min-h-screen m-4">
      <Card className="p-2 my-20 mx-auto max-w-[600px] opacity-80 ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Manage your Profile
          </CardTitle>
          <CardDescription>
            <h1 className="text-sm md:text-lg lg:text-2xl">
              Your Information:
            </h1>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between align-middle gap-2 ">
            <div className="p-2">
              <h1 className="font-semibold text-sm md:text-lg lg:text-xl">
                Your email:
              </h1>
              <h1>{userInfo?.email}</h1>
            </div>
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
              }}
            >
              <div className="flex items-center gap-8">
                <div className="grip grid-cols-2 my-2">
                  <Label
                    htmlFor="username"
                    className="text-sm md:text-lg lg:text-xl"
                  >
                    Update Username:
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    className="p-2 mt-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="h-8">Update</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Enter your password to perform this action
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Input
                    id="password"
                    type="password"
                    onChange={handleInputChange}
                  ></Input>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageAccount;
