import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/\d/, "Include at least one number");

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z.boolean().refine((v) => v === true, "You must accept terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional().default(false),
});

// Checkout validation schemas
export const billingInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  
  companyName: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  
  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .min(5, "Street address must be at least 5 characters")
    .max(200, "Street address must be less than 200 characters"),
  
  country: z
    .string()
    .min(1, "Country is required")
    .refine((val) => val !== "Select", "Please select a country"),
  
  state: z
    .string()
    .min(1, "State is required")
    .refine((val) => val !== "Selects", "Please select a state"),
  
  zipCode: z
    .string()
    .max(10, "Zip code must be less than 10 characters")
    .optional(),
  
  email: emailSchema,
  
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  
  shipToDifferent: z.boolean().default(false)
});

export const checkoutSchema = z.object({
  billingData: billingInfoSchema,
  orderNotes: z
    .string()
    .max(500, "Order notes must be less than 500 characters")
    .optional(),
  paymentMethod: z
    .enum(['cod', 'paypal', 'amazon'], {
      errorMap: () => ({ message: "Please select a valid payment method" })
    })
});
