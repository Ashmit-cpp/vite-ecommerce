import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getURL } from "@/lib/helper";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData =  {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch(`${getURL()}/auth/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Logged in");
        localStorage.setItem("JWT", data.accessToken);
        login(data.accessToken);
        navigate("/");
      } else if (response.status === 404 || response.status === 401) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Card className="mx-auto max-w-[450px] space-y-6 opacity-80">
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
    </div>
  );
}
