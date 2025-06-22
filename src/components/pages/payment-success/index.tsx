import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePaymentSuccess } from "./use-payment-success";
import { Loader2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const { loading, sessionDetails, error } = usePaymentSuccess();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-center text-lg mt-2">
                Thank you for your purchase.
              </CardDescription>
            </CardHeader>
          )}
          <CardContent>
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
} 