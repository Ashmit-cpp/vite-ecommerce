import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

interface UserInfo {
  // Define the structure of user info as per your API response
  id: number;
  username: string;
  email: string;
  password: string;
}

function ManageAccount(): JSX.Element {
  const token: string | null = localStorage.getItem("JWT");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!token) {
      console.error("JWT token not found");
      return;
    }

    // Decode the JWT token
    const decodedToken: DecodedToken = jwtDecode(token);
    // Extract email from the decoded token
    const { email } = decodedToken;

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/email/${email}`
        );
        const user = await response.json();
        // console.log(user);
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <div className="min-h-screen">
      <Card className="flex-col align-middle justify-center p-2 my-10 mx-auto max-w-[450px] opacity-80 ">
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
          <div className="flex justify-evenly align-middle  p-4">
            <h1 className="text-sm md:text-lg lg:text-2xl">
              Username: {userInfo?.username}
            </h1>
            <h1 className="text-sm md:text-lg lg:text-2xl">
              Email: {userInfo?.email}
            </h1>
          </div>
        </CardContent>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default ManageAccount;
