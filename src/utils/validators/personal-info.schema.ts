import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const personalInfoFormSchema = z.object({
  legalName: z.string().min(1, { message: messages.firstNameRequired }),
  name: z.string().optional(),
  email: validateEmail,
  phoneNumber: z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(12, { message: 'Enter the correct number' }),
  resume: z.string().optional(),
});

// generate form types from zod validation schema
export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues = {
  legalName: '',
  name: '',
  email: '',
  phone: undefined,
  resume: '',
};
