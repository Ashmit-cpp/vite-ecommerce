import { getURL } from "@/lib/helper";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
  tax_ids: any[];
}

interface SessionDetails {
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

const PaymentSuccess: React.FC = () => {
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
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching session details:", err);
          setError("Failed to retrieve session details. Please try again.");
          setLoading(false);
        });
    } else {
      setError("No session ID found.");
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      {sessionDetails && (
        <Card className="w-1/4">
          {sessionDetails.payment_status == "paid" && (
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600 text-center">
                {" "}
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-center text-lg mt-2">
                {" "}
                Thank you for your purchase.
              </CardDescription>
            </CardHeader>
          )}
          <CardContent>
            {/* <ul className="list-disc list-inside mb-6">
                  {sessionDetails.line_items.map((item) => (
              <li key={item.id} className="mb-2">
                {item.quantity} x {item.product.name} - $
                {item.totalPrice.toFixed(2)}
              </li>
            ))}
                </ul> */}

            <p className="font-semibold text-center text-lg mb-4">
              Amount ${(sessionDetails.amount_total / 100).toFixed(2)}
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Your Details:</h3>
              <p>{`Name: ${sessionDetails.customer_details.name}`}</p>
              <p>{`Email: ${sessionDetails.customer_details.email}`}</p>
              <p>
                {`Address: 
                ${sessionDetails.customer_details.address.line1},
                ${sessionDetails.customer_details.address.city},
                ${sessionDetails.customer_details.address.state},
                ${sessionDetails.customer_details.address.country},
                ${sessionDetails.customer_details.address.postal_code}`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentSuccess;
