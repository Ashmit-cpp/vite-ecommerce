import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError, isLoading } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (error) {
      clearError();
    }
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (isSubmitting || isLoading) return;

    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password);
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting || isLoading;

  return {
    formData,
    isFormDisabled,
    error,
    isSubmitting,
    handleInputChange,
    handleFormSubmit,
  };
} 