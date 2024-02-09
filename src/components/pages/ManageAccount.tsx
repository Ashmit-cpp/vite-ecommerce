import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getURL } from "@/lib/helper";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import ChangePasswordForm from "../ChangePassword";

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
  const { toast } = useToast();
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
      const response = await fetch(`${getURL()}/users/findByUserId/${sub}`);
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
    fetch(`${getURL()}/users/${updatedData.id}`, {
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
          toast({
            title: "Username updated successfully.",
          });
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
    <div className="flex justify-center align-middle mb-44">
      <Tabs defaultValue="account" className="p-2 my-20 mx-auto max-h-[280px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Account</CardTitle>
              <CardDescription>
                <h1 className="lg:text-lg">
                  Make changes to your account here. Click save when you're
                  done.{" "}
                </h1>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex-col justify-between align-middle gap-2 ">
                <div className="flex p-2">
                  <h1 className="font-semibold text-sm md:text-lg lg:text-xl mr-4">
                    Your email:
                  </h1>
                  <h1 className=" text-sm md:text-lg lg:text-xl">
                    {userInfo?.email}
                  </h1>
                </div>
                <form
                  className="space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex my-2">
                      <Label
                        htmlFor="username"
                        className="mr-4 m-2 mt-3 text-sm md:text-lg lg:text-xl "
                      >
                        Username:
                      </Label>
                      <Input
                        id="username"
                        value={formData.username}
                        className="m-2    text-sm md:text-lg lg:text-lg"
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManageAccount;
