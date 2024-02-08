import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { jwtDecode } from "jwt-decode";
import { getURL } from "@/lib/helper";
import { PopoverClose } from "@radix-ui/react-popover";

interface DecodedToken {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

interface Props {
  productId: number;
  onSuccess: () => void;
}

const AddReviewButton: React.FC<Props> = ({ productId, onSuccess }) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(0);
  const { toast } = useToast();
  const token: string | null = localStorage.getItem("JWT");
  if (!token) {
    console.error("JWT token not found");
    return null;
  }
  const decodedToken: DecodedToken = jwtDecode(token);
  const { sub } = decodedToken;

  const AddReview = async () => {
    try {
      if (!reviewText || !reviewRating) {
        console.error("Please provide both review text and rating.");
        return;
      }

      const response = await fetch(
        `${getURL()}/products/addreview/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: reviewText,
            rating: reviewRating,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error adding review:", response.statusText);
        return;
      }

      console.log("Review added successfully!");
      setReviewText("");
      setReviewRating(0);
      onSuccess();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 ">
      <h1>Write your review below:</h1>
      <Input
        type="text"
        placeholder="Write your review here"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <h1>Add rating below:</h1>
      <Input
        type="number"
        placeholder="Rating (1-5)"
        value={reviewRating}
        onChange={(e) => {
          const ratingValue = parseInt(e.target.value, 10);
          // Check if the rating is within the valid range (1-5)
          if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
            setReviewRating(ratingValue);
          }
        }}
      />
      <PopoverClose>
        <Button
          onClick={() => {
            AddReview();
            toast({
              title: "Review added",
            });
          }}
        >
          Submit
        </Button>
      </PopoverClose>
    </div>
  );
};

export default AddReviewButton;
