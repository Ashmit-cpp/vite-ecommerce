import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getURL } from "@/lib/helper";

interface CustomerDetails {
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string | null;
    postal_code: string;
    state: string;
  };
  email: string;
  name: string;
  phone: string | null;
  tax_exempt: string;
  tax_ids: unknown[];
}

export interface SessionDetails {
  id: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  customer_details: CustomerDetails;
  status: string;
  line_items: {
    id: string;
    quantity: number;
    product: {
      name: string;
    };
    totalPrice: number;
  }[];
}

export function usePaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      fetch(`${getURL()}/stripe/session/${sessionId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch session details");
          }
          return response.json();
        })
        .then((data: SessionDetails) => {
          setSessionDetails(data);
        })
        .catch((err) => {
          console.error("Error fetching session details:", err);
          setError("Failed to retrieve session details. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No session ID found.");
      setLoading(false);
    }
  }, [searchParams]);

  return { loading, sessionDetails, error };
} 