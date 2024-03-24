'use client ';
import { z } from 'zod';
import { cn } from 'rizzui';
import { Controller, useFormContext } from 'react-hook-form';
import Upload from '@/components/ui/upload';

interface Resume {
  className?: string;
}

export const ImageUploadSchema = z.object({
  resume: z.any().array(),
});

export default function UploadResume({ className }: Resume) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={cn(className)}>
      <Controller
        name="resume"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Upload accept="pdf" onChange={(v) => console.log(v)} />
        )}
      />
      {!!errors.resume?.message && (
        <p role="alert" className="mt-1.5 text-xs text-red">
          {errors.gallery?.message as string}
        </p>
      )}
    </div>
  );
}
