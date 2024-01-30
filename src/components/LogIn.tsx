import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  email: string;
  password: string;
}

export default function Component(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
          console.log("hehehe");
          localStorage.setItem("JWT", data?.accessToken);
          login(data?.accessToken);
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
    <Card className="my-16 mx-auto max-w-[350px] space-y-6 ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="yourmail@example.com"
              required
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
