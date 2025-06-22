import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "@/components/ChangePassword";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useManageAccount } from "./use-manage-account";
import { ProfileTab } from "./components/profile-tab";

export default function ManageAccountPage(): JSX.Element {
  const {
    userInfo,
    formData,
    isLoadingUser,
    isUpdating,
    userError,
    handleInputChange,
    onSubmit,
  } = useManageAccount();

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Manage Account</CardTitle>
          <CardDescription>
            Update your account information and change your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{userError as string}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab
                userInfo={userInfo}
                formData={formData}
                isUpdating={isUpdating}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
              />
            </TabsContent>

            <TabsContent value="password">
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 