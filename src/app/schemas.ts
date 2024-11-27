import * as z from 'zod';

export const ShopSchema = z.object({
  name: z.string().min(2, "Shop name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logo: z.string().optional()
});

export const ProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
  stockLevel: z.number().min(0, "Stock level must be non-negative"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shopId: z.number().positive("A valid shop must be selected"),
  image: z.string().optional()
});