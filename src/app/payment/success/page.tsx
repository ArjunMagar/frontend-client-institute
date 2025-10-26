import { Suspense } from "react";
import PaymentVerify from "./PaymentVerify";



export default function Page() {
  return (
    <Suspense fallback={<div>Loading PaymentVerify...</div>}>
      <PaymentVerify/>
    </Suspense>
  );
}
