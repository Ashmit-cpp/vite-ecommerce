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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
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

    // Decode the JWT token
    const decodedToken: DecodedToken = jwtDecode(token);
    // Extract email from the decoded token
    const { email } = decodedToken;
    try {
      const response = await fetch(
        `http://localhost:3000/users/email/${email}`
      );
      const user = await response.json();
      // console.log(user);
      setUserInfo(user);
      setFormData({
        id: user.id,
        username: user.username,
        email: user.email,
        password: "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState({
    id: 5,
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (updatedData: {
    id: number;
    username: string;
    email: string;
    password: string;
  }) => {
    setUserInfo({ ...updatedData });
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
        email: updatedData.email,
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

    fetch("http://localhost:3000/auth/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data?.statusCode === 200) {
          localStorage.setItem("JWT", data?.accessToken);
          login(data?.accessToken);
          console.log("working");
          navigate("/");
        } else if (data?.statusCode === 404 || data?.statusCode === 401) {
          setErrorMessage(data?.message);
        } else {
          setErrorMessage("Unexpected error occurred");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setErrorMessage("Unexpected error occurred");
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
              User Information:
            </h1>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center align-middle gap-2 ">
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
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    className="p-2 mt-2 h-8"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grip grid-cols-2">
                  <Label
                    htmlFor="email"
                    className="text-sm md:text-lg lg:text-xl"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
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
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default ManageAccount;
