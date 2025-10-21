import { z } from 'zod';

// Account Settings Schema
export const accountSettingsSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
});

// Billing Address Schema
export const billingAddressSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  companyName: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters'),
  city: z.string()
    .min(2, 'Please select a city')
    .max(50, 'City name must be less than 50 characters'),
  zipCode: z.string()
    .min(3, 'Zip code must be at least 3 characters')
    .max(10, 'Zip code must be less than 10 characters')
    .optional(),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
});

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(6, 'Current password must be at least 6 characters'),
  newPassword: z.string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

