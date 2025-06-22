import { Link } from "react-router-dom";
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
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginForm } from "./use-log-in-form";

export default function LogInPage(): JSX.Element {
  const {
    formData,
    isFormDisabled,
    error,
    isSubmitting,
    handleInputChange,
    handleFormSubmit,
  } = useLoginForm();

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
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="yourmail@example.com"
                required
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
                placeholder="********"
              />
            </div>

            <Button className="w-full" type="submit" disabled={isFormDisabled}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 