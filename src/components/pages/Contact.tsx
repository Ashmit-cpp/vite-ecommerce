import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Contact() {
  return (
    <div>
      <Card className="p-4 my-24 mx-auto max-w-[750px] space-y-2 opacity-80">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Contact us</CardTitle>
          <CardDescription>Fill the following form</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input id="name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                id="email"
                placeholder="yourmail@example.com"
                required
                type="description"
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input id="Subject" placeholder="Subject" required type="text" />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Input id="Message" placeholder="Message" required type="text" />
            </div>

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Contact;
