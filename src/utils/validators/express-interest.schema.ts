import { z } from 'zod';
import { messages } from '@/config/messages';

export const expressInterestSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  skillId: z.string().optional(),
});

// generate form types from zod validation schema
export type ExpressInterestFormInput = z.infer<typeof expressInterestSchema>;
