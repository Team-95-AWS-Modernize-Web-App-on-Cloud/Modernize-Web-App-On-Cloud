import { z } from "zod";

const emailValidation = z
  .string()
  .email({ message: "Invalid email address" })
  .trim();
const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[a-z]/, { message: "Password must include lowercase letters" })
  .regex(/[A-Z]/, { message: "Password must include uppercase letters" })
  .regex(/[0-9]/, { message: "Password must include digits" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must include special characters",
  });

export const LoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name is too short" })
      .max(256, { message: "Name is too long" }),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const VerificationSchema = z.object({
  email: emailValidation,
  code: z
    .string()
    .min(6, { message: "Verification code must be 6 characters long" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
export type VerificationType = z.infer<typeof VerificationSchema>;
