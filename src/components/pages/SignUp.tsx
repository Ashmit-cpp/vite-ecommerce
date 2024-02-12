import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getURL } from "@/lib/helper";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
};

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(initialFormData);

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
      const response = await fetch(`${getURL()}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup response:", data);
        navigate("/login");
      } else {
        console.error("Signup failed:", data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Card className="my-12 mx-auto max-w-[350px] space-y-6 opacity-80">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Signup</CardTitle>
        <CardDescription>Enter your credentials to signup</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
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
            Sign Up
          </Button>
          <Separator className="my-8" />
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
