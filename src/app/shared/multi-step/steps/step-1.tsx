'use client';

import { z } from 'zod';
import { useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormPart from '@/app/shared/multi-step/form-part';
import BasicInfo, {
  BasicInfoSchema,
  basicInfoValues,
} from '@/app/shared/multi-step/basic-info';
import UploadPhoto from '@/app/shared/multi-step/upload-photo';
import { useStepperTwo } from '@/app/shared/multi-step/steps';
import Footer from '@/app/signup/footer';

const formStoreAtom = atomWithStorage('multiStepFormOneStore', {
  ...basicInfoValues,
  // ...accommodationValues,
});

const FormSchema = BasicInfoSchema.merge(BasicInfoSchema);

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function StepTwo() {
  const { gotoNextStep } = useStepperTwo();
  const store = useAtomValue(formStoreAtom);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      propertyFor: store.propertyFor,
      propertyName: store.propertyName,
      propertyType: store.propertyType,
      constructionStatus: store.constructionStatus,
      city: store.city,
      address: store.address,
      productDescription: store.productDescription,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
    gotoNextStep();
  };

  // console.log('errors', methods.formState.errors);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-16 md:gap-20">
          <FormPart
            title="Basic Information"
            description="You only need to provide this information once, during your first listing."
          >
            <BasicInfo />
          </FormPart>

          <FormPart
            title="Add Your Resume"
            description="You only need to provide this information once, during your first listing."
          >
            <UploadPhoto />
          </FormPart>
        </div>

        <Footer />
      </form>
    </FormProvider>
  );
}
