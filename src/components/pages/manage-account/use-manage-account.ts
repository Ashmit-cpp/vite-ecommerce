import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  useAuthenticatedGet,
  useAuthenticatedPut,
} from "@/hooks/useAuthenticatedApi";
import { getURL } from "@/lib/helper";

interface UserInfo {
  id: number;
  username: string;
  email: string;
}

export function useManageAccount() {
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
    get: fetchUser,
  } = useAuthenticatedGet<UserInfo>();

  const {
    isLoading: isUpdating,
    error: updateError,
    put: updateUser,
  } = useAuthenticatedPut();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const fetchUserInfo = useCallback(async () => {
    if (!user?.id) {
      console.error("User ID not found");
      return;
    }
    try {
      await fetchUser(`${getURL()}/users/findByUserId/${user.id}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [user?.id, fetchUser]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
      setFormData({
        id: userData.id,
        username: userData.username,
      });
    }
  }, [userData]);

  const onSubmit = async () => {
    try {
      await updateUser(`${getURL()}/users/${formData.id}`, {
        username: formData.username,
      });

      toast({
        title: "Username updated successfully.",
      });

      await fetchUserInfo();
    } catch (error) {
      console.error("Error while updating user:", error);
      toast({
        title: "Failed to update username",
        description:
          (updateError as string) || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return {
    userInfo,
    formData,
    isLoadingUser,
    isUpdating,
    userError,
    handleInputChange,
    onSubmit,
  };
} 