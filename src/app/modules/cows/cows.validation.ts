import { z } from 'zod';
import { breeds, categories, labels, locations } from './cows.constants';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...locations] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...breeds] as [string, ...string[]], {
      required_error: 'Breed is required',
    }),
    label: z.enum([...labels] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum([...categories] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string({
      required_error: 'Seller is required',
    }),
  }),
});
const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...locations] as [string, ...string[]]).optional(),
    breed: z.enum([...breeds] as [string, ...string[]]).optional(),
    label: z.enum([...labels] as [string, ...string[]]).optional(),
    category: z.enum([...categories] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
