"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { VerificationSchema, VerificationType } from "@/schema/auth.schema";
import { handleConfirmSignUp } from "@/lib/cognitoActions";

export function VerificationForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<VerificationType>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      email: email ? String(email) : "",
      code: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.setValue("email", String(email));
    }
  }, [email, form]);

  const onSubmit = async (data: VerificationType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("code", data.code);
    try {
      await handleConfirmSignUp(formData);
    } catch (error) {
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Verify Your Account</CardTitle>
        <CardDescription>
          Enter the verification code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[600px] flex-shrink-0 space-y-2"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@mail.com" type="email" {...field} disabled/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the verification code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="!mt-5 w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm">
          Didn't receive a code?{" "}
          <Link href="/auth/resend-code" className="underline">
            Resend Code
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
