'use client';

import { z } from 'zod';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@/components/ui/select';
import { Radio } from '@/components/ui/radio';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const propertyTypeOptions = [
  {
    value: 'pt1',
    name: 'Property Type - 1',
  },
  {
    value: 'pt2',
    name: 'Property Type - 2',
  },
  {
    value: 'pt3',
    name: 'Property Type - 3',
  },
  {
    value: 'pt4',
    name: 'Property Type - 4',
  },
];

const constructionStatusOptions = [
  {
    value: 'ready',
    name: 'Ready',
  },
  {
    value: 'underConstruction',
    name: 'Under Construction',
  },
  {
    value: 'used',
    name: 'Used',
  },
];

export const propertyEnum = ['rent', 'sell'] as const;
export const BasicInfoSchema = z.object({
  propertyFor: z.enum(propertyEnum, {
    errorMap: () => ({
      message: 'This field is required',
    }),
  }),
  propertyName: z.string().min(1, { message: 'Name is required' }),
  propertyType: z.string().min(1, { message: 'Property Type is required' }),
  constructionStatus: z
    .string()
    .min(1, { message: 'Construction Status is required' }),
  city: z.string().optional(),
  address: z.string().optional(),
  productDescription: z.string().optional(),
});

export const basicInfoValues = {
  propertyFor: propertyEnum[0],
  propertyName: '',
  propertyType: '',
  city: '',
  address: '',
  constructionStatus: '',
  productDescription: '',
};

export default function BasicInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:gap-y-7">
      <Input
        type="text"
        labelClassName="font-medium text-gray-900 dark:text-white"
        label="Legal name (as per Aadhaar)"
        placeholder="Enter Name (as per Aadhaar)..."
        className="col-span-2"
        {...register('propertyName')}
        error={errors.propertyName?.message as string}
      />
      <Controller
        control={control}
        name="propertyType"
        render={({ field: { value, onChange } }) => (
          <Select
            className="col-span-full md:col-span-1"
            placeholder="select property type..."
            label="Property Type"
            labelClassName="font-medium text-gray-900 dark:text-white"
            dropdownClassName="p-2 gap-1 grid"
            onChange={onChange}
            value={value}
            options={propertyTypeOptions}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              propertyTypeOptions?.find((p) => p.value === selected)?.name ?? ''
            }
            error={errors?.propertyType?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="constructionStatus"
        render={({ field: { value, onChange } }) => (
          <Select
            className="col-span-full md:col-span-1"
            placeholder="select construction status..."
            label="Construction Status"
            dropdownClassName="p-2 gap-1 grid"
            labelClassName="font-medium text-gray-900 dark:text-white"
            options={constructionStatusOptions}
            value={value}
            onChange={onChange}
            getOptionValue={(option) => option.value}
            displayValue={(selected: string) =>
              constructionStatusOptions?.find((p) => p.value === selected)
                ?.name ?? ''
            }
            error={errors?.constructionStatus?.message as string}
          />
        )}
      />

      <Input
        type="text"
        className="col-span-full"
        labelClassName="font-medium text-gray-900 dark:text-white"
        label="City"
        placeholder="city..."
        {...register('city')}
        error={errors.city?.message as string}
      />
      <Input
        type="text"
        className="col-span-full"
        labelClassName="font-medium text-gray-900 dark:text-white"
        label="Address"
        placeholder="address..."
        {...register('address')}
        error={errors.address?.message as string}
      />
    </div>
  );
}
