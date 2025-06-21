import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getURL } from "@/lib/helper";
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
import { useAuth } from "@/contexts/AuthContext";
import { useAuthenticatedGet, useAuthenticatedPut } from "@/hooks/useAuthenticatedApi";
import { Alert, AlertDescription } from "../ui/alert";
import { Loader2 } from "lucide-react";

interface UserInfo {
  id: number;
  username: string;
  email: string;
}

function ManageAccount(): JSX.Element {
  const { toast } = useToast();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    username: "",
  });

  const { 
    data: userData, 
    isLoading: isLoadingUser, 
    error: userError, 
    get: fetchUser 
  } = useAuthenticatedGet<UserInfo>();
  
  const { 
    isLoading: isUpdating, 
    error: updateError, 
    put: updateUser 
  } = useAuthenticatedPut();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const fetchUserInfo = async () => {
    if (!user?.id) {
      console.error("User ID not found");
      return;
    }

    try {
      await fetchUser(`${getURL()}/users/findByUserId/${user.id}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [user?.id]);

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
      setFormData({
        id: userData.id,
        username: userData.username,
      });
    }
  }, [userData]);

  const onSubmit = async (updatedData: { id: number; username: string }) => {
    try {
      await updateUser(`${getURL()}/users/${updatedData.id}`, {
        username: updatedData.username,
      });

      toast({
        title: "Username updated successfully.",
      });
      
      // Refresh user data
      await fetchUserInfo();
    } catch (error) {
      console.error("Error while updating user:", error);
      toast({
        title: "Failed to update username",
        description: updateError || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

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
              <AlertDescription>{userError}</AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile information here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <Button
                    onClick={() => onSubmit(formData)}
                    disabled={isUpdating || !formData.username.trim()}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </CardContent>
              </Card>
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

export default ManageAccount;
