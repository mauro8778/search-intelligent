import { z } from 'zod';

export const DepurationFilterSchema = z.object({
  attribute: z.string().trim().min(1),
  value: z.union([z.string().trim().min(1), z.number(), z.boolean()]),
});

export const DepurationInputSchema = z.object({
  filters: z.array(DepurationFilterSchema),
  cleanInput: z.string().trim(),
});

export type DepurationFilter = z.infer<typeof DepurationFilterSchema>;
export type DepurationInputResult = z.infer<typeof DepurationInputSchema>;
