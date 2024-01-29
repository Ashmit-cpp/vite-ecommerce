import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Component() {
  return (
    <Card className="my-10 mx-auto max-w-[350px] space-y-6">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Signup</CardTitle>
        <CardDescription>
          Enter your credenetials to signup
        </CardDescription>{" "}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="yourmail@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
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
        </div>
      </CardContent>
    </Card>
  );
}
