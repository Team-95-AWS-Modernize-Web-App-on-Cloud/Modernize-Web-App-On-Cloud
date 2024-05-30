import { VerificationForm } from "@/components/auth/VerificationForm";
import React from "react";
import { Suspense } from "react";

const VerifyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationForm />
    </Suspense>
  );
};

export default VerifyPage;
