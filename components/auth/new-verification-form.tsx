"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { PuffLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.succes);
        setError(data.error);
      })
      .catch(() => {
        setError("Something Went Wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming Your Verification"
      backButtonHref="/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center w-full justify-center flex-col space-y-3">
        {!success && !error && <PuffLoader />}

        <FormSuccess message={success} />
        {!success &&(    <FormError message={error} />)}
     
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
