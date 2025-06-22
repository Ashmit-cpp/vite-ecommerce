import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUpForm } from "./use-sign-up-form";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const { formData, isSubmitting, handleInputChange, handleFormSubmit } =
    useSignUpForm();

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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              placeholder="********"
            />
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <Separator className="my-8" />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 